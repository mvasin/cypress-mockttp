import {getStandalone, getLocal} from 'mockttp'

const mockServerManager = getStandalone()
const mockServer = mockServerManager.start()

// Mockhttp does not have a health check endpoint, so I create a separate
// mock server just for that.
const local = getLocal()
local.start(9999)
// https://github.com/bahmutov/start-server-and-test by default uses OPTIONS
// HTTP method to test if a server is up
local.get("/").thenReply(200, 'Mock server is up')

mockServer.then(() => {
  console.log('Mock server manager is started')
})

// Probably not necessary
process.on('SIGINT', function() {
  mockServerManager.stop().then(() => {
    console.info("\nMock server manager was gracefully shut down")
    process.exit()
  })
});