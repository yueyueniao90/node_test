const request = require('request')

const forecast = (latitude, longtitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=4984b03b6b4714465367bd2ed3ca1b2c&query='+ latitude + ','+longtitude
    request({url:url, json:true},(error, response)=>{
        let data = undefined;
        if (error){
            error = 'weather host server error'
        }
        else if(response.body.error){
            error = 'unable to get weather forecast based on input'
        }
        else {
            error = undefined;
            data = 'it is currently ' + response.body.current.temperature + ' degree out. There is a ' + response.body.current.precip + '% of rain.'
        }
        callback(error, data)
    })
}

module.exports = forecast