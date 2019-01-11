const Koa = require('koa');
const serve = require('koa-static');
const cors = require('@koa/cors');
const config = require('./config');

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
app.use(serve('build'));

app.listen(config.port, () => console.log(`App listen on port ${config.port}`));
