const request = require('request')


const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=bd0e7d1018b687d94586d2680599524f&query=${encodeURIComponent(address)}&limit=1`

    request({ url }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocoding service.', undefined)
            return
        }

        const responseBody = JSON.parse(body)
        const { data: responseData } = responseBody

        if (!responseData || !responseData.length) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const data = responseData[0]
            const { latitude, longitude, label: location } = data
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode