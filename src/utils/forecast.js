const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ee4146e1adf658e231fa7e97e60bd53a&query=${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
            return
        }

        const { error: responseBodyError, current: data } = body

        if (responseBodyError) {
            callback('Unable to find location.', undefined)
        } else {
            const { weather_descriptions, temperature, feelslike, uv_index } = data
            callback(undefined,
                `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The UV index is ${uv_index}.`
            )
        }
    })
}

module.exports = forecast