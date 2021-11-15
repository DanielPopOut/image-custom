const protocol = process.env.IS_HTTP ? 'http' : 'https';

export const PROTOCOL_AND_HOST =
  process.env.NEXT_PUBLIC_BASE_URL ||
  `${protocol}://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
