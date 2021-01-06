const _ = require('lodash')
const { getTimeSeriesData } = require('./lib/service/yahoo.service')
const { PERCENTAGE_THRESHOLD, TIME_INDEXES, CLOSE_PRICE_PATH } = require('./lib/constant/constant')

let req = {}
req = _.set(req,'symbol','PYPL')
getTimeSeriesData(req)
