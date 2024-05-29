const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b490e3fa46523622c8f45ed508a969d1&query= '+ latitude + ',' +longitude +'&units=f'
    request ( { url  , json:true} , (error , {body}) => {
    if (error) {

        callback('Unable to connect to your server',undefined)

    }else if (body.error ) {

        callback('Wrong address',undefined)

    }else {

        callback(undefined,"it's "+body.current.temperature+" currently out. but it's feel like "+body.current.feelslike+" right now")

    }

    }) 
}
module.exports=forecast