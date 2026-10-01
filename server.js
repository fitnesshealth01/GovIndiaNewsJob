import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Lightweight health check endpoint for Cloud Run container probes
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from dist
app.use(express.static(distPath));

// Express 5 compatible SPA fallback middleware
app.use((req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Application build in progress. Please refresh in a few moments.');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`GovIndiaNews production server listening on http://0.0.0.0:${port}`);
});
