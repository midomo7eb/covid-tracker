const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    createProxyMiddleware("/check", {
      target: "https://radiant-escarpment-82988.herokuapp.com",
    })
  );
};
