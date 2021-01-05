// const express = require('express')
// const app = express()
// const test = require('./lib/handler/login')
 
// app.get('/', function (req, res) {
//   test
//   res.send('Hello ')
// })
 
// app.listen(3000)

const _ = require('lodash')

const PERCENTAGE_THRESHOLD = 1
const TIME_INDEXES = [21,23,39,43,47]
const CLOSE_PRICE_PATH = 'body.chart.result[0].indicators.quote[0].open'


let cash = 10000
let no_of_shares = 0

var unirest = require("unirest")
var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart")

req.query({
	"interval": "15m",
	"symbol": "BEKE",
	"range": "1d",
	"region": "US"
});

req.headers({
	"x-rapidapi-key": "8730be5bcamsh7dc663863ec84cbp1d2e53jsnb4862af77f79",
	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error)
  const close_price_arr = _.get(res,CLOSE_PRICE_PATH)

  // 6:30 PST price
  let price_starting = _.get(close_price_arr,TIME_INDEXES[0])
  // 7:00 PST price
  let price_morning = _.get(close_price_arr,TIME_INDEXES[1])
  // 11:00
  let price_noon = _.get(close_price_arr,TIME_INDEXES[2])
  // 12:00
  let price_afternoon = _.get(close_price_arr,TIME_INDEXES[3])
  // 13:00
  let price_ending = _.get(close_price_arr,TIME_INDEXES[4])

  if(isMorningBearish(price_starting,price_morning)){
    console.log('早盘大跌可加仓')
  }

  if(isMorningBullish(price_starting,price_morning)){
    console.log('早盘大涨要减仓')
  }

  if(isAfternoonBullish(price_noon,price_afternoon)){
    console.log('下午大涨只减仓')
  }

  if(isAfternoonBearish(price_afternoon,price_ending)){
    console.log('下午大跌买次日')
  }
});


function isMorningBearish(price_starting,price_morning) {
  const percentage_change = ((price_starting - price_morning)/price_starting)
  console.log(`isMorningBearish() - percentage_change: ${percentage_change}`)
  return percentage_change > (PERCENTAGE_THRESHOLD/100)
}

function isMorningBullish(price_starting,price_morning) {
  const percentage_change = ((price_morning - price_starting)/price_starting)
  console.log(`isMorningBullish() - percentage_change: ${percentage_change}`)
  return percentage_change > (PERCENTAGE_THRESHOLD/100)
}

function isAfternoonBearish(price_afternoon,price_ending) {
  const percentage_change = ((price_afternoon - price_ending)/price_afternoon)
  console.log(`isAfternoonBearish() - percentage_change: ${percentage_change}`)
  return percentage_change > (PERCENTAGE_THRESHOLD/100)
}

function isAfternoonBullish(price_noon,price_afternoon) {
  const percentage_change = ((price_afternoon - price_noon)/price_noon)
  console.log(`isAfternoonBullish() - percentage_change: ${percentage_change}`)
  return percentage_change > (PERCENTAGE_THRESHOLD/100)
}



// var etrade = require("etrade")

// var configuration = 
// {
//   key : 'aa57c6e276f30e25353e928f00897267',
//   secret : '0eaf92f71fb020b7196e0591cbadefbe93340660f2cffc34e7795f8f8f1de84e'
// }

// var et = new etrade(configuration);
// et.getRequestToken(
//   function(authorizationUrl) {
//     // Your service requires users, who will need to visit
//     // the following URL and, after logging in and 
//     // authorizing your service to access their account
//     // data, paste the E*TRADE provided ication
//     // code back into your application.
//     console.log("Please have your client visit " + 
//                 authorizationURL + 
//                 " to authorize your service"); },
//   function(error) { 
//     console.log("Error encountered while attempting " +
//                 "to retrieve a request token: " + 
//                 error); }
// );