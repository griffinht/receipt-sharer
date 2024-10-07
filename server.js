const Koa = require('koa');
const app = new Koa();

// Define a route that returns an HTML snippet
app.use(async ctx => {
  if (ctx.path === '/test') {
    ctx.type = 'html';
    ctx.body = '<h1>Hello, this is a test HTML snippet!</h1>';
  } else {
    ctx.status = 404;
    ctx.body = 'Not Found';
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
