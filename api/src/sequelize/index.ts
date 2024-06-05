import { Sequelize } from "sequelize";
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

const sequelize = new Sequelize(
    POSTGRES_DB!,
    POSTGRES_USER!,
    POSTGRES_PASSWORD!,
    {
        host: "127.0.0.1",
        port: 5432,
        dialect: "postgres"
    }
);

// test connection
sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((err) => console.error("Unable to connect to the database:", err));

export default sequelize;
