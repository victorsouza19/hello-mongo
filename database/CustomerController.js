const client = require('./database');

const db = client.db('store');
const collection = db.collection('customers');

class Customer{

  // create
  async insert(cpf, name, telephone){
    try{
    await client.connect();

    let result = await collection.insertOne({
      cpf, name, telephone
    });

    console.log("1 document has been inserted!");
    return result;

    }finally{
      client.close();
    }
  }

  //read
   async list(skip, limit){
    try{
      await client.connect();

      let count = await collection.find().count();
      let result = await collection.find()
      .skip(skip)
      .limit(limit)
      .toArray();

      return({customers: result, count});
      
    }finally{
      client.close();
    }
  }

  //read one
  async listOne(cpf){
    try{
      await client.connect();

      let result = await collection.findOne({cpf});
      return result;
      
    }finally{
      client.close();
    }
  }

  // edit
  async edit(data){
    try{
    await client.connect();

    let result = await collection.updateOne(
      { cpf: data.id }, 
      { $set: {cpf: data.cpf, name: data.name, telephone: data.telephone} }
    );

    console.log("1 document has been updated!");
    return result;

    }finally{
      client.close();
    }
  }

  // delete
  async delete(cpf){
    try{
      await client.connect();

      let result = await collection.deleteOne(cpf);
      console.log("1 document has been deleted!");
      return result;
      
    }finally{
      client.close();
    }
  }

}

module.exports = Customer;