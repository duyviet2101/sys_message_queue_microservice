const { consumerToQueue } = require('./src/services/consumerQueue.service')
const queueName = 'test-topic'

consumerToQueue(queueName).then(() => {
  console.log(`message consumer started ${queueName}`)
}).catch(e => console.log(e))