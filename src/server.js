import app from './app';

app.listen(process.env.PORT, () =>
  console.log(`server on port ${process.env.PORT}`)
);
