import axios from 'axios';
import dotenv from 'dotenv';

require('dotenv').config({
  path: '../../config/.env',
});

interface GitHubUser {
  id: number;
  name: string;
}

interface AccessTokenResponse {
  access_token: string;
}

interface UserResponse {
  id: number;
  name: string;
}

const TOKEN_URL = 'https://github.com/login/oauth/access_token';
const USER_URL = 'https://api.github.com/user';

export async function getGitHubUser(code: string) {
  const token = await getAccessToken(code);
  return getUser(token);
}

async function getAccessToken(code: string) {
  const response = await axios.post<AccessTokenResponse>(
    TOKEN_URL,
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    {
      headers: {Accept: 'application/json'},
    }
  );

  return response.data.access_token;
}
