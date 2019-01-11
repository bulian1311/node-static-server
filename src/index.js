const Koa = require('koa');
const serve = require('koa-static');
const favicon = require('koa-favicon');
const cors = require('@koa/cors');
const config = require('./config');
const path = require('path');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.redirect('/');
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.use(cors());
app.use(favicon(path.join(__dirname, '/../build/favicon.ico')));
app.use(serve(path.join(__dirname, '/../build')));

app.listen(config.port, () => console.log(`App listen on port ${config.port}`));
