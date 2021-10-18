import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(cookieParser());

// Kubernetes health checking
app.get('/', (req, res) => res.send('API is healthy'));

app.get('/github', async (req, res) => {
  const {code} = req.query;

  const gitHubUser = await getGitHubUser(code as string);
});
app.get('/hackerone', async (req, res) => {});
app.get('/bugcrowd', async (req, res) => {});
app.post('/refresh', async (req, res) => {});
app.post('/logout', (req, res) => {});
app.post('/logout-all', async (req, res) => {});
app.get('/me', async (req, res) => {});

// Run Server
app.listen(3000, () => {
  console.log('We are The BountyHub');
});
