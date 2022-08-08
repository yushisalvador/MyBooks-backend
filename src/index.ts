require("dotenv").config();
import buildServer from "./server";

function startServer() {
  const app = buildServer();
  const port: number = parseInt(<string>process.env.PORT, 10) || 8080;
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
}

startServer();
