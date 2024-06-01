const mongoose = require('mongoose')
const connectString = 'mongodb://localhost:27017/dbDEV'

const testSchema = new mongoose.Schema({name: String})
const Test = mongoose.model('Test', testSchema)

describe('Mongoose Connection', () => {
  let connection

  beforeAll(async () => {
    connection = await mongoose.connect(connectString)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('should connect to mongoose', () =>{
    expect(mongoose.connection.readyState).toBe(1)
  })

  it('should hav a document to the database', async () => {
    const user = new Test({name: 'test'})
    await user.save()
    expect(user.isNew).toBe(false)
  })

  it('should find a document to the database', async () => {
    const user = await Test.findOne({name: 'test'})
    expect(user).toBeDefined()
    expect(user.name).toBe('test')
  })
})