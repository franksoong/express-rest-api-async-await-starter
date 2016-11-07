import chai from 'chai'
import {startServer, stopServer} from '../../../src/server/server'
import {getDB} from '../../../src/server/models'

chai.should()

export default function () {
  this.registerHandler('BeforeFeatures', function (features, callback) {
    startServer().then(() => callback()).catch(callback)
  })

  this.registerHandler('AfterScenario', function (scenario, callback) {
    getDB().dropDatabase().then(() => callback()).catch(callback)
  })

  this.registerHandler('AfterFeatures', function (features, callback) {
    stopServer().then(() => callback()).catch(callback)
  })
}