// import { Sequelize } from 'sequelize';

// export const sequelize = new Sequelize({
//     dialect: 'mysql',
//     storage: './databases/wisedb.db3'
// });

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "wisedb", "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});