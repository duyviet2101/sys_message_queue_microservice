const amqp = require('amqplib');

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://guest:12345@localhost')
    if (!connection) {
      throw new Error('Connection is not established!')
    }

    const channel = await connection.createChannel()

    return {channel, connection}
  } catch (error) {
    console.log(error)
  }
}

const connectToRabbitMQForTest = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ()

    // publish message to a queue
    const queue = 'test-queue'
    const message = 'heeleeoeoleoe, rabbitmq'
    await channel.assertQueue(queue)
    await channel.sendToQueue(queue, Buffer.from(message))

    // close connection
    await connection.close()
  } catch (error) {
    console.log(`Error connecting to rabbitmq:::`, error)
    throw error
  }
}

const consumerQueue = async (channel, queueName) => {
  try {
    await channel.assertQueue(queueName, {durable: true}) //durable=true: khoi dong lai server thi nhuwng tin nhan truoc do khong bi mat, van duoc gui di
    console.log('watting for messages...')
    channel.consume(queueName, msg => {
      console.log(`Received message: ${queueName}::`, msg.content.toString())
      // 1. find uer following shop
      // 2. send message to user
      // 3, yes, ok => success
      // 4. err, setup DLX
    }, {
      noAck: true // nhan tin nhan va xu li roi, dung gui lai tin nhan do
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  connectToRabbitMQ, 
  connectToRabbitMQForTest,
  consumerQueue
}