const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.maptiler.com/geocoding/'+encodeURIComponent(address)+'.json?key=glCQwegmrelFaXSNWXPQ'
    request({ url , json:true } ,(error,{body})=>{
       if (error) {
 
          callback('Unable to connect to ur server',undefined)
 
       } else if ( body.features.length===0) {
          callback('Unable to define that location',undefined)
       }else {
          callback(undefined,{
             latitude:body.features[0].center[1],
             longitude:body.features[0].center[0],
             location:body.features[0].place_name
          })
       }
 
    })
 }
 module.exports=geocode