import SwaggerExpress from 'swagger-express-mw';
import express from 'express';
import path from 'path';

const config = {appRoot: __dirname};
const app = express();
export default app;

SwaggerExpress.create(config, (err, swaggerConnect) => {
  if (err) throw err;
  const port = process.env.PORT || 10010;
  swaggerConnect.register(app);
  app.listen(port);
});
