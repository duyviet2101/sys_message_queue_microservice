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

module.exports = {
  connectToRabbitMQ, 
  connectToRabbitMQForTest
}