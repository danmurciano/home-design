const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://home-design-l93els9ff.vercel.app"
    : "http://localhost:3000";

export default baseUrl;
