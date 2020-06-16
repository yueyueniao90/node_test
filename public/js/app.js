console.log('client side javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const message_one = document.querySelector('#message-1')
const message_two = document.querySelector('#message-2')

// message_one.textContent = 'this is the message one'
// message_one.textContent = ''

weather_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    // console.log(location)
    message_one.textContent = 'Loading...'
    message_two.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            // console.log(data)
            if (data.error) {
                message_one.textContent = data.error
                console.log(data.error)
            } else {
                message_one.textContent = data.location
                message_two.textContent = data.forecast
                console.log(data)
            }
        })
    })
})














