console.log("client side javascript!!!");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');


weatherForm.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address='+location).then( (response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                messageOne.textContent = data.error;
            }
            else{
                console.log(location);
                console.log(data);
                messageOne.textContent = "Place : "+location +" Timezone : "+ data.timezone;
                messageTwo.textContent = "temperature : " + data.current_temperature+" F";
                messageThree.textContent ="Humidity : " +data.humidity;
            }
        })
    })
})