import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');
const indexPath = path.join(distPath, 'index.html');

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

app.listen(port, '0.0.0.0', () => {
  console.log(`GovIndiaNews production server listening on http://0.0.0.0:${port}`);
});
