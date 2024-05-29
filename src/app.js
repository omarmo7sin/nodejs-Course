const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { error } = require('console');

const app = express()


//Define path for express config

const publiceDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publiceDirectoryPath))



app.get('', (req,res) =>{
    res.render('index' , {
        title : 'Weather APP',
        name : 'mohsen'
    })
})


app.get('/about' , (req,res) => {
    res.render('about' , {
        title:'This is about page',
        name:'mohsen برمجة '
    })
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        title:'this is the help page',
        name : 'mohsen will help u'
    })
})




// app.get('/weather' , (req,res) => {
//     res.send([{
//         forcast:"42,-37"
//     },
//     {
//         location:'portsaid'
//     }])
    
// })
app.get('/weather' , (req , res) => {
    if (!req.query.address)
    {
        return res.send({
            error:'you must provide an address to search'
        })
    }

    geocode(req.query.body , (error , {latitude , longitude , location}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude , longitude , (error,forecastData) =>{
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    }) 
    
    // console.log(req.query.address)
    // res.send({
    //     address : req.query.address,
    //     weather_status:'Raining'
    // })
})

app.get('/products' , (req , res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*' , (req,res) => {
    res.render('404' , {
        errorMessage : 'Help article not found !',
        name : 'mohsen'
    })
})

app.get('*', (req,res) => {
    res.render('404' , {
        title:'404 page',
        name : 'mohsen',
        errorMessage : 'Page not found'
    })
})



app.listen(3000, () => {
    console.log('server is up on 3000')
})
