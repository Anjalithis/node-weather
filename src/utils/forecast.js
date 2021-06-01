const request = require('request');

const forecast = (latitude , longitude , callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=hourly,daily,minutely&appid=64740ad59682ab11f378143c6b8f7cd1'; 
    request({url : url , json : true} , (error,response)=>{
        if(error){
            callback("Unable to connect to weather services!" , undefined);
        }else if(response.body.error){
            callback("The location is invalid!" , undefined);

        }else{
            callback(undefined , {
                timezone: response.body.timezone,
                current_temperature :  response.body.current.temp,
                humidity : response.body.current.humidity              
            })
        }
    })

}


module.exports = forecast;