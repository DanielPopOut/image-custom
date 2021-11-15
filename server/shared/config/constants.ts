const protocol = process.env.IS_HTTP ? 'http' : 'https';

export const PROTOCOL_AND_HOST = `${protocol}://${
  process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_VERCEL_URL
}`;
