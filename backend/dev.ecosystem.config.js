module.exports = {
  apps: [
    {
      name: "dev-server-backend",
      script: "./server.js",
      env: {
        NODE_ENV: "development",
        PORT: 8000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8001
      }
    }
  ]
};