import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlite/database.db'
});

export const sync = () => sequelize.sync();

export default sequelize;
