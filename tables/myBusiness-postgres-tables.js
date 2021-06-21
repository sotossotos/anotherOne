import * as pg from 'pg';
import { Sequelize, DataTypes } from 'sequelize'

export const sequelize = new Sequelize(`${process.env.postgresDB}`, `${process.env.postgresUser}`, `${process.env.postgresPass}`, {
  host: `${process.env.host}`,
  dialect: 'postgres',
  dialectModule: pg,
});
export const customerTablePostgress = sequelize.define('Customer', {

  customer_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true

  },
  ID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
