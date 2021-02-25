// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV: "mongodb+srv://admin-dan:Atlas123@cluster0-yxuhb.mongodb.net/webStore?retryWrites=true&w=majority",
    JWT_SECRET: "jur453docv6097sc48",
    JWT_SECRET_ADMIN: "gei279bfgh5293vz56",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/danmurciano/image/upload",
    CLOUDINARY_CLOUD: "danmurciano",
    CLOUDINARY_FOLDER: "homedesign",
    STRIPE_SECRET_KEY: "sk_test_51H7Xj8HM0g7Jn1Rd3d7jTJWfstfK3fKFH6fXHCj4am30DNnSsoBjbs5qzENYhThFURyHXfu4jCBCdqahTq7JDNoL00ZEwmn4At"
  },

  headers: {
    source: "/api/:path*",
    headers: [
      { key: "Access-Control-Allow-Credentials", value: "true" },
      { key: "Access-Control-Allow-Origin", value: "*" },
      { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
      { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
    ]
  }
};
