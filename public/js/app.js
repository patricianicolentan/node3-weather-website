const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorParagraph = document.querySelector('#error-paragraph')
const weatherParagraph = document.querySelector('#weather-paragraph')

function callWeatherApi(location) {
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                updateParagraph(errorParagraph, data.error)
                updateParagraph(weatherParagraph, '')
            }
            else {
                updateParagraph(weatherParagraph, `${data.location}: ${data.forecast}`)
            }
        })
    })
}

function updateParagraph(paragraph, text) {
    paragraph.textContent = text
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    updateParagraph(errorParagraph, '')
    updateParagraph(weatherParagraph, 'Loading')

    callWeatherApi(location)
})
