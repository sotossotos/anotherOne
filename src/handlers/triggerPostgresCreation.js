import * as pg from 'pg';
import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize('myBusinessdb', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  dialectModule: pg,
});
exports.handler = async (event) => {
  const customerTablePostgress = sequelize.define('Customer', {

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
  await customerTablePostgress.sync();
  const customerJson = event.Records[0].dynamodb.NewImage
  console.log('Customer table is up and running');
  const customerRec = customerTablePostgress.create({
    ID: `"${customerJson.ID.S}"`,
    name: `"${customerJson.name.S}"`,
    surname: `"${customerJson.surname.S}"`,
    email: `"${customerJson.email.S}"`,
    birthYear: parseInt(customerJson.birthYear.N)
  })

  console.log("Inside the Postgress handler creation function");
}
