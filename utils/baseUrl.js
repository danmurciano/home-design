const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://home-design-danmurciano.vercel.app"
    : "http://localhost:3000";

export default baseUrl;
