const request = require('request')

const geocode = (address , callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5qYWxpLXNpbmdoIiwiYSI6ImNram8zM25wcTA0cHYzNG1ucHU1bHV2dWoifQ.PoWTmw9fVPg9GxWbEE8qcA';
    request({ url : url , json : true } , (error,response)=>{
        if(error){
            callback("unable to connect to weather services!" , undefined);

        }else if(response.body.features.length===0){
            callback("The location is invalid!" , undefined);

        }else{
                callback(undefined , {
                    latitude: response.body.features[0].center[1] , 
                     longitude : response.body.features[0].center[0],
                     location : response.body.features[0].place_name

                })
        }
    })

}




module.exports = geocode;
