

const MongoConnection = require('../mongo/mongo-connection');
const { ERRORS, COLLECTION } = require('../constants/constants')

class CompanyService {

  async list(body={}) {

    // const company = {
    //   ...body,
    // };

    const collection = MongoConnection.collection(COLLECTION.COMPANY);
    const response = await collection.find({}).toArray();

    if(!response || !response.length){
      return [{_id: 1, name : 'Default company'}]
    }
    return response;
  }

  async create(body) {
    if (!body) {
      throw { message: ERRORS.INPUT_DATA };
    }

    const company = {
      ...body,
    };

    const collection = MongoConnection.collection(COLLECTION.COMPANY);

    const insertedIdObj = await collection.insertOne(company);
    company._id = insertedIdObj._id;

    return company;
  }

}

module.exports = new CompanyService();
