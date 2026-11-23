import type { Response } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

export function setAuthCookies(
  response: Response,
  tokens: {
    accessToken: string;
    refreshToken: string;
  },
) {
  response.cookie('access_token', tokens.accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 15 * 60 * 1000,
  });

  response.cookie('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
