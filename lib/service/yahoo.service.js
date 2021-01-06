const _ = require('lodash')
const unirest = require("unirest")
const { processData } = require('../helper/common')
const { YAHOO_API_KEY, YAHOO_API_HOST } = require('../constant/constant')

async function getTimeSeriesData(reqYahoo){
    const {symbol} = reqYahoo
    var reqYahoo = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart")

    reqYahoo.query({
        "interval": "15m",
        "symbol": symbol,
        "range": "1d",
        "region": "US"
    });

    reqYahoo.headers({
        "x-rapidapi-key": YAHOO_API_KEY,
        "x-rapidapi-host": YAHOO_API_HOST,
        "useQueryString": true
    });

    reqYahoo.end(function (resYahoo) {
        if (resYahoo.error) throw new Error(resYahoo.error)
        processData(resYahoo)
    });
}

module.exports = {
    getTimeSeriesData,
}