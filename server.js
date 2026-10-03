import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');
const indexPath = path.join(distPath, 'index.html');

// Parse JSON and URL-encoded bodies for API requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lightweight health check endpoint for Cloud Run container probes
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Explicit Sitemap Handler with strict XML Content-Type
app.get('/sitemap.xml', (req, res) => {
  const sitemapDist = path.join(distPath, 'sitemap.xml');
  const sitemapPublic = path.join(publicPath, 'sitemap.xml');
  const targetFile = fs.existsSync(sitemapDist) ? sitemapDist : sitemapPublic;

  if (fs.existsSync(targetFile)) {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(targetFile);
  } else {
    res.status(404).type('application/xml').send('<?xml version="1.0" encoding="UTF-8"?><error>Sitemap not generated</error>');
  }
});

// Explicit RSS 2.0 Feed XML Handler
app.get(['/rss.xml', '/feed.xml', '/rss', '/feed'], (req, res) => {
  const rssDist = path.join(distPath, 'rss.xml');
  const rssPublic = path.join(publicPath, 'rss.xml');
  const targetFile = fs.existsSync(rssDist) ? rssDist : rssPublic;

  if (fs.existsSync(targetFile)) {
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(targetFile);
  } else {
    res.status(404).type('application/xml').send('<?xml version="1.0" encoding="UTF-8"?><error>RSS feed not found</error>');
  }
});

// Explicit RSD (Really Simple Discovery) XML Handler
app.get('/rsd.xml', (req, res) => {
  const rsdDist = path.join(distPath, 'rsd.xml');
  const rsdPublic = path.join(publicPath, 'rsd.xml');
  const targetFile = fs.existsSync(rsdDist) ? rsdDist : rsdPublic;

  if (fs.existsSync(targetFile)) {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile(targetFile);
  } else {
    res.status(404).type('application/xml').send('<?xml version="1.0" encoding="UTF-8"?><error>RSD file not found</error>');
  }
});

// Explicit robots.txt Handler
app.get('/robots.txt', (req, res) => {
  const robotsDist = path.join(distPath, 'robots.txt');
  const robotsPublic = path.join(publicPath, 'robots.txt');
  const targetFile = fs.existsSync(robotsDist) ? robotsDist : robotsPublic;

  if (fs.existsSync(targetFile)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.sendFile(targetFile);
  } else {
    res.type('text/plain; charset=utf-8').send("User-agent: *\nAllow: /\nSitemap: https://govindianews.com/sitemap.xml\n");
  }
});

// In-memory rate limiting map for contact endpoint: IP -> timestamps[]
const contactRateLimits = new Map();

// POST /api/contact - Truthful contact & feedback form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message, complaintType, phone, articleUrl, hp_website } = req.body;

    // 1. Honeypot check (anti-bot)
    if (hp_website) {
      // Silently reject bot submissions
      return res.status(400).json({ success: false, error: 'Submission rejected' });
    }

    // 2. Validate mandatory fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Full Name is required.' });
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email address is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }
    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return res.status(400).json({ success: false, error: 'Subject is required.' });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message content is required.' });
    }

    // 3. Rate limiting (max 5 requests per 15 minutes per IP)
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    const maxRequests = 5;

    const timestamps = (contactRateLimits.get(ip) || []).filter((t) => now - t < windowMs);
    if (timestamps.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Too many submissions from your connection. Please wait 15 minutes before sending another message.',
      });
    }
    timestamps.push(now);
    contactRateLimits.set(ip, timestamps);

    // 4. SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactTo = process.env.CONTACT_TO || 'akashsinghsolanki66@gmail.com';

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"GovIndiaNews Form" <${smtpUser}>`,
        to: contactTo,
        replyTo: email.trim(),
        subject: `[GovIndiaNews] [${complaintType || 'General'}] ${subject.trim()}`,
        text: `From: ${name.trim()} <${email.trim()}>\nPhone: ${phone || 'N/A'}\nArticle/Exam: ${articleUrl || 'N/A'}\nCategory: ${complaintType || 'General'}\n\nMessage:\n${message.trim()}`,
      });

      return res.status(200).json({
        success: true,
        message: 'Your message has been sent to our editorial desk. We will review your inquiry.',
      });
    } else {
      // Truthful acknowledgment when SMTP credentials have not been configured
      console.log(`[GovIndiaNews Contact Form] Received submission:
  Name: ${name}
  Email: ${email}
  Category: ${complaintType || 'General'}
  Subject: ${subject}
  Article: ${articleUrl || 'N/A'}`);

      return res.status(200).json({
        success: true,
        message: 'Your message has been received by our editorial desk. (Note: Live SMTP delivery will activate once SMTP credentials are set in the server environment).',
      });
    }
  } catch (err) {
    console.error('Contact endpoint error:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your message. Please email us directly at contact@govindianews.com.',
    });
  }
});

// Serve static assets from dist
app.use(express.static(distPath));

// Express 5 compatible SPA fallback middleware
app.use((req, res) => {
  // CRITICAL: Never return HTML for XML, robots, or asset requests!
  if (req.path.endsWith('.xml')) {
    res.status(404).type('application/xml').send('<?xml version="1.0" encoding="UTF-8"?><error>XML resource not found</error>');
    return;
  }
  if (req.path.endsWith('.txt') || req.path.startsWith('/api/')) {
    res.status(404).type('text/plain').send('Resource not found');
    return;
  }

  // SPA fallback for HTML page routing
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Application build in progress. Please refresh in a few moments.');
  }
});

app.listen(port, () => {
  console.log(`GovIndiaNews production server listening on port ${port}`);
});
