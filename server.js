const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const xpath = require('xpath')
const dom = require('xmldom').DOMParser
const socketIo = require('socket.io')
const http = require('http')
const events = require('events')
const basicAuth = require('express-basic-auth')

const evt = new events.EventEmitter()

const httpServer = http.Server(app)
const io = socketIo(httpServer)

const tmp = {}
const namespaceReq = io.of('op')

namespaceReq.on('connection', socket => {
  console.log('connected!')
  Object.keys(tmp).forEach(k => socket.emit('req', { key: k, req: tmp[k].req }))
  const evtListener = evt => {
    console.log(evt)
    socket.emit('req', evt)
  }
  evt.addListener('req', evtListener)
  socket.on('disconnect', () => {
    evt.removeListener('req', evtListener)
  })
  socket.on('res', msg => {
    tmp[msg.key].res.send(msg.res)
    delete tmp[msg.key]
  })
})
app.use(bodyParser.text({ type: 'text/html' }))

const s = (p, n) => xpath.select1(p, n)
const ss = (p, n) => xpath.select1(p, n) ? xpath.select1(p, n).textContent : undefined

app.use(express.static('./'))
app.post(
  '/cbs',
  basicAuth({
    users: { cuitao: 'cuitaopwd' },
  }),
  (req, res) => {
    const doc = new dom().parseFromString(req.body)
    const cbsHeader = s('/REQUEST/MESSAGE/HEADER', doc)
    const cbsEnquiry = s('/REQUEST/MESSAGE/ENQUIRY', doc)
    const cbsConsumer = s('APPLICANT/CONSUMER', cbsEnquiry)
    const cbsReq = {
      clientId: ss('CLIENT_ID', cbsHeader),
      userId: ss('USER_ID', cbsHeader),
      runNo: ss('RUN_NO', cbsHeader),
      accountType: ss('ENQUIRY_TYPE', cbsEnquiry),
      amount: ss('AMOUNT', cbsEnquiry),
      enquiryReference: ss('ENQUIRY_REFERENCE', cbsEnquiry),
      enquiryType: ss('ENQUIRY_TYPE', cbsEnquiry),
      productType: ss('PRODUCT_TYPE', cbsEnquiry),
      idType: ss('CID/CID1', cbsConsumer),
      idNumber: ss('CID/CID2', cbsConsumer),
      customerName: ss('CNAM/CNMU', cbsConsumer),
      dayOfBirth: ss('CDOB/DBD', cbsConsumer),
      monthOfBirth: ss('CDOB/DBM', cbsConsumer),
      yearOfBirth: ss('CDOB/DBY', cbsConsumer),
      gender: ss('CGND', cbsConsumer),
      maritalStatus: ss('CMAR', cbsConsumer),
      applicantType: ss('APPLICANT/CTYP', cbsEnquiry),
      addressType: ss('CADR/CADT', cbsConsumer),
      addressFormat: ss('CADR/CADF', cbsConsumer),
      postalCode: ss('CADR/CAD7', cbsConsumer),
      streetName: ss('CADR/CAD4', cbsConsumer),
      stateCityName: ss('CADR/CAD8', cbsConsumer),
      countryCode: ss('CADR/CAD9', cbsConsumer),
      blkHseBldgNumber: ss('CADR/CAD1', cbsConsumer),
      storeyNumber: ss('CADR/CAD2', cbsConsumer),
      unitNumber: ss('CADR/CAD3', cbsConsumer),
      buildingName: ss('CADR/CAD5', cbsConsumer),
    }
    tmp[cbsReq.runNo] = { req: cbsReq, res }
    evt.emit('req', { key: cbsReq.runNo, req: cbsReq })
  }
)

httpServer.listen(3001, () => { })
