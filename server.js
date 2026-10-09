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

// Production HTTP Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googlesyndication.com https://*.g.doubleclick.net https://*.google.com https://*.adtrafficquality.google https://*.google-analytics.com https://pagead2.googlesyndication.com https://www.googletagservices.com https://adservice.google.com https://www.google-analytics.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: https://*.googlesyndication.com https://*.g.doubleclick.net https://*.google.com https://*.google-analytics.com; connect-src 'self' https://*.googlesyndication.com https://*.g.doubleclick.net https://*.google.com https://*.adtrafficquality.google https://*.google-analytics.com https://pagead2.googlesyndication.com https://www.google-analytics.com https://region1.google-analytics.com; frame-src 'self' https://*.googlesyndication.com https://*.g.doubleclick.net https://*.google.com;"
  );
  next();
});

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

// Serve pre-rendered HTML files if available for clean SEO routes
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  const cleanPath = req.path.replace(/^\/|\/$/g, '');
  const candidatePrerender = cleanPath
    ? path.join(distPath, cleanPath, 'index.html')
    : path.join(distPath, 'index.html');
  if (fs.existsSync(candidatePrerender)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.sendFile(candidatePrerender);
  }
  next();
});

// Serve static assets from dist with caching
app.use(express.static(distPath, {
  maxAge: '1h',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  },
}));

// Proper 404 handler: return HTTP 404 with a real "Page not found" page linking to home
// for any path that is not in the prerendered route list or an existing static file.
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

  const notFoundHtmlPath = path.join(distPath, '404.html');
  if (fs.existsSync(notFoundHtmlPath)) {
    res.status(404).setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(notFoundHtmlPath);
    return;
  }

  // Fallback 404 semantic HTML page
  res.status(404).type('text/html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found — 404 | GovIndiaNews</title>
  <meta name="description" content="The requested page could not be found on GovIndiaNews. Browse active government recruitment notices and exam utilities on the homepage.">
  <link rel="canonical" href="https://govindianews.com/404">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 2rem; display: flex; align-items: center; justify-content: center; min-height: 80vh; }
    .card { max-width: 520px; background: white; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2.5rem; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0 0 0.5rem; }
    p { font-size: 0.95rem; color: #475569; line-height: 1.6; margin: 0 0 1.5rem; }
    a { display: inline-block; background-color: #1d4ed8; color: #ffffff; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; font-size: 0.875rem; }
    a:hover { background-color: #1e40af; }
  </style>
</head>
<body>
  <main class="card">
    <h1>404 — Page Not Found</h1>
    <p>The recruitment notice, calculator, or guide you are looking for does not exist or may have been moved. You can browse all active Central &amp; State job notifications on our homepage.</p>
    <a href="/">Return to GovIndiaNews Homepage</a>
  </main>
</body>
</html>`);
});

app.listen(port, () => {
  console.log(`GovIndiaNews production server listening on port ${port}`);
});
