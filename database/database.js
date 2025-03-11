import { Sequelize } from "sequelize";

const database = new Sequelize({
    host: 'sql.freedb.tech',
    username: 'freedb_admin cilamaya',
    password: '5v4BRNbBY?cwbDF',
    database: 'freedb_coffe shop cilamaya',
    port: 3306,
    dialect: "mysql"
});

export default database;
