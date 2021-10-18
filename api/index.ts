import {databaseClient} from './db/database';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import {getGitHubUser} from './helpers/github-adapter';

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
  let user = await getUserByGitHubId(gitHubUser.id);
  if (!user) user = await createUser(gitHubUser.name, gitHubUser.id);
});
app.get('/hackerone', async (req, res) => {});
app.get('/bugcrowd', async (req, res) => {});
app.post('/refresh', async (req, res) => {});
app.post('/logout', (req, res) => {});
app.post('/logout-all', async (req, res) => {});
app.get('/me', async (req, res) => {});

// Run Server
async function main() {
  await databaseClient.connect();

  app.listen(process.env.PORT);
}
