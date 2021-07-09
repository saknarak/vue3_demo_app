import config from '../config'

const topicMap = new Map()

const mqttClient = window.mqtt.connect(config.mqtt.url, config.mqtt.options)

mqttClient.on('connect', () => {
  console.log('MQTT: connected')
})

mqttClient.on('disconnect', () => {
  console.log('MQTT: disconnected')
})

mqttClient.on('error', error => {
  console.log('MQTT: error', error)
})

mqttClient.on('message', (topic, payload) => {
  let cb = topicMap.get(topic)
  if (!cb) {
    return
  }
  cb(topic, JSON.parse(payload.toString('utf-8')))
})

export default {
  $on(topic, cb) {
    mqttClient.subscribe(topic)
    topicMap.set(topic, cb)
  },

  $off(topic) {
    mqttClient.unsubscribe(topic)
    topicMap.delete(topic)
  },

  $emit(topic, payload) {
    if (typeof payload !== 'string') {
      payload = JSON.stringify(payload)
    }
    mqttClient.publish(topic, payload)
  },
}
