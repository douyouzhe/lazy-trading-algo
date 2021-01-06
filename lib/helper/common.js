const _ = require('lodash')
const { PERCENTAGE_THRESHOLD, TIME_INDEXES, CLOSE_PRICE_PATH } = require('../constant/constant')


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

function processData (res){
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
}


module.exports = {
    processData,
}