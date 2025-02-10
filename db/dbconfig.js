// Dependencies
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();

const pgp = pgPromise();

const cn = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
};

const db = pgp(cn);

const close = async () => {
    await pgp.end(); 
};


db.connect()
  .then((cn) => {
    const { user, host, port, database } = cn.client;
    // console.log(
    //   `Postgres connection established with user:\x1b[33m${user}\x1b[0m, host:\x1b[33m${host}\x1b[0m,  port:\x1b[33m${port}\x1b[0m, database:\x1b[33m${database}\x1b[0m`
    // );
    cn.done();
  })
  .catch((error) => console.log("database connection error", error));

export { db, close };