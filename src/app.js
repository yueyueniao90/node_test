const path = require('path')


const express = require('express');
const hbs = require('hbs')


const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express();

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
// console.log(__filename)

const  publicDirectoryPath = path.join(__dirname, '../public')
const  view_path = path.join(__dirname, '../templates/views')
const  partial_path = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', view_path)
hbs.registerPartials(partial_path)
app.use(express.static(publicDirectoryPath));



app.get('', (req, res)=>{
    let data = {
        'title': 'Weather',
        'name': 'index name'
    }
    res.render('index', data)
})


app.get('/about', (req, res)=>{
    let data = {
        'title': 'about page',
        'name': 'about name'
    }
    res.render('about', data)
})


app.get('/help', (req, res)=>{
    let data = {
        'title': 'help page',
        'name': 'help name',
        'help_text': 'a help page for u'
    }
    res.render('help', data)
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({error:'you must provide an address'})
    }

    geocode(req.query.address,(error, {latitude, longitude, location}={}) =>{
        if (error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error, forecast_data) =>{
            if (error){
                return res.send({error})
            }
            let data = {
                'forecast': forecast_data,
                location,
                address: req.query.address
            }
            return res.send(data)
        })

    })
})


app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({error:'you must provide a search term'})
    }

    console.log(req.query)
    data = {
        forecast: 'raining',
        location: 'boston'
    }
    res.send(data)
})







app.get('/help/*', (req, res) =>{
    data = {
        'title': 'my 404 ',
        'name': 'system',
        'message': 'help article not exist',
    }
    res.render('my404', data)
})


app.get('*', (req, res) =>{
    data = {
        'title': 'my 404 ',
        'name': 'system',
        'message': 'page not exist',
    }
    res.render('my404', data)
})


app.listen(3000, ()=>{
  console.log('express server is running on port 3000')
})