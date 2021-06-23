import * as pg from 'pg';
import { Sequelize, DataTypes } from 'sequelize'
import { customerTablePostgress, } from '../../tables/myBusiness-postgres-tables'

const handler = async (event) => {
  // Having a backup from the dynamodb -> postgres
  console.log(`!!!!!${event.Records[0].eventName}!!!!!`);
  if(event.Records[0].eventName === "INSERT" || event.Records[0].eventName === "MODIFY"){
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
  
}
export { handler }
