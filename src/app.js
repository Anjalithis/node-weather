const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const PORT = process.env.PORT || 3000;

const app = express();

const publicDirectoryPath = path.join(__dirname , '../public');
const viewPath = path.join(__dirname , '../templates/views');
const partialPath = path.join(__dirname , '../templates/partials');

console.log(partialPath)

app.set('view engine' , 'hbs');
app.set('views' , viewPath)
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));

app.get('' , (req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Anjali Singh ",
        text:"Get your weather here!"
    });
})
app.get('/about' , (req , res)=>{
    res.render('about',{
        title:"About",
        name: "AnJali Singh",
        text :"this is about page."
    })
})
app.get('/help' , (req,res)=>{
    res.render('help',{
        title:"Help",
        name: "Anjali Singh",
        text : "this is help page."
    })
})

app.get('/weather' , (req,res)=>{
    if(!req.query.address){
        return res.send("error! Adrress is required!")
    }
    address = req.query.address;
    geocode(address , (error , data)=>{
        if(error){
            return res.send({error});
        }
        forecast(data.latitude , data.longitude , (error , forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send(forecastData);
        })
    })
})
app.get('/help/*' , (req,res)=>{
    res.render('error' , {
        errortext : "Help article not found!!!",
        name : "Anjali Singh",
        title:"404"
    })
} )
app.get('*', (req , res)=>{
    res.render('error' , {
        errortext : "my 404 page!!!",
        name : "Anjali Singh",
        title:"404"

    })
})
app.listen(PORT , ()=>{
    console.log("listening to port:3000!");
})