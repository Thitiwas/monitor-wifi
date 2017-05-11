/* eslint-disable */
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var cors = require('cors')
const scanner = require('node-wifi-scanner')
var snmp = require('snmp-native')
var community = 'public'
var humanizeDuration = require('humanize-duration')


app.use(cors())
app.use(bodyParser.json())
app.use(express.static('dist'))

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

var int_415 = []
var port_415 = []
var time_415 = []
var inbound = []
var outbound = []
var data415 = []

app.get('/AP', function (req, res) {
  var getintR415 = new snmp.Session({ host: '10.41.160.1', community: community })
  var oidget_int = '.1.3.6.1.2.1.2.2.1.2'
  getintR415.getSubtree({ oid: oidget_int }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      int_415.push(data.value)
    })
    getintR415.close()
  })
// /////////////////////////////////////////////////////////////////////////////////////////////
  var getportR415 = new snmp.Session({ host: '10.41.160.1', community: community })
  var oidget_port = '.1.3.6.1.2.1.2.2.1.8'
  getportR415.getSubtree({ oid: oidget_port }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      port_415.push(updown(data.value))
    })
    getportR415.close()
  })
// /////////////////////////////////////////////////////////////////////////////////////////////
  var gettimeR415 = new snmp.Session({ host: '10.41.160.1', community: community })
  var oidget_time = '.1.3.6.1.2.1.2.2.1.9'
  gettimeR415.getSubtree({ oid: oidget_time }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      time_415.push(humanizeDuration(data.value))
    })
    gettimeR415.close()
  })
// /////////////////////////////////////////////////////////////////////////////////////////////
  var getinbound = new snmp.Session({ host: '10.41.160.1', community: community })
  var oidget_inbound = '.1.3.6.1.2.1.2.2.1.10'
  getinbound.getSubtree({ oid: oidget_inbound }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      inbound.push(convert(data.value))
    })
    getinbound.close()
  })
// /////////////////////////////////////////////////////////////////////////////////////////////
  var getoutbound = new snmp.Session({ host: '10.41.160.1', community: community })
  var oidget_outbound = '.1.3.6.1.2.1.2.2.1.16'
  getoutbound.getSubtree({ oid: oidget_outbound }, function (err, varbinds) {
    varbinds.forEach(function (data) {
      outbound.push(convert(data.value))
    })
    getoutbound.close()
  })
// /////////////////////////////////////////////////////////////////////////////////////////////
  int_415.forEach(function (err, index) {
    var set = {
      int: int_415[index],
      port: port_415[index],
      time: time_415[index],
      inbound : inbound[index],
      outbound : outbound[index]
    }
    data415.push(set)
  })
  int_415 = []
  port_415 = []
  time_415 = []
  inbound = []
  outbound = []
  res.send(data415)
  data415 = []
})
// /////////////////////////////////////////////////////////////////////////////////////////////
app.get('/scan', function (req, res) {
  scanner.scan((err, networks) => {
    if (err) console.error(err)
    res.send(networks)
  })
})
function convert (byte) {
   var sizes = ['Bytes', 'Kbps', 'Mbps', 'Gbps', 'Tbps']
   byte = byte * 8
   if (byte == 0) return '0 Byte'
   var i = parseFloat(Math.floor(Math.log(byte) / Math.log(1000)))
   return parseFloat(byte / Math.pow(1000, i), 2).toFixed(2) + ' ' + sizes[i]
}

function updown (status) {
  if(status == '1') {
    return "up"
  }
  else if (status == '2') {
    return "Down"
  }
}

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
