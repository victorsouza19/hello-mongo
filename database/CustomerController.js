const client = require('./database');

const db = client.db('store');

class Customer{

  // create
  async insert(cpf, name, telephone){
    try{
    await client.connect();
    console.log("Database connected!");

    let result = await db.collection('customers').insertOne({
      cpf, name, telephone
    });

    console.log("1 documento inserido!");
    return result;

    }finally{
      client.close();
    }
  }

  //read
   async list(){
    try{
      await client.connect();
      console.log("Database connected!");

      let result = await db.collection('customers').find().toArray();
      return result;
      
    }finally{
      client.close();
    }
  }

  async listOne(){
    try{
      await client.connect();
      console.log("Database connected!");

      let result = await db.collection('customers').findOne(id);
      return result;
      
    }finally{
      client.close();
    }
  }

  // edit
  async edit(cpf, name, telephone){
    try{
    await client.connect();
    console.log("Database connected!");

    // if structure for cpf name and telephone

    let result = await db.collection('customers').updateOne({
      cpf, name, telephone
    });

    console.log("1 documento inserido!");
    return result;

    }finally{
      client.close();
    }
  }

  // delete
  async delete(cpf){
    try{
      await client.connect();
      console.log("Database connected!");

      let result = await db.collection('customers').deleteOne(cpf);
      return result;
      
    }finally{
      client.close();
    }
  }

}

module.exports = Customer;