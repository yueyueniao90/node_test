const request = require('request')

const geocode = (city, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(city) + '.json?access_token=sk.eyJ1IjoidG9tZnVuMjAxOXYiLCJhIjoiY2tiZ3l3ZGxhMDA4dTJwcXhkbHBwazk1MyJ9.BjAOe5rRD6ioBo4bQrllAg'
    // console.log(url)
    request({url: url, json: true}, (error, response) => {
        let data = undefined;
        console.log(response.body.features.length)
        if (error) {
            error = 'weather host server error'
        } else if (!response.body.features.length) {
            error = 'unable to get weather forecast based on input'
        } else {
            const latitude = response.body.features[0].geometry.coordinates[1]
            const longitude = response.body.features[0].geometry.coordinates[0]
            // console.log(response.body.features[0])
            error = undefined;
            data = {
                latitude:latitude,
                longitude:longitude,
                location: response.body.features[0].place_name
            }
        }
        callback(error, data);
    })
}


module.exports = geocode