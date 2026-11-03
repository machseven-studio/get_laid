const nextConfig = {
  reactStrictMode: true,
  // Neon Auth's endpoint is a public URL. Expose only the URL to the browser;
  // NEON_AUTH_COOKIE_SECRET and DATABASE_URL remain server-only.
  env: {
    NEXT_PUBLIC_NEON_AUTH_URL: process.env.NEON_AUTH_BASE_URL,
  },
};

export default nextConfig;
