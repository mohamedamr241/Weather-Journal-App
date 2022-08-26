/* Global Variables */
const key ="256e28ae3045f9bcd17784f71adb0d29";
const generator= document.querySelector('#generate');
let temperatue=0;
// Create a new date instance dynamically with JS
let d = new Date();

let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear(); //here we added 1 to getMonth() because it starts count from zero

//<-----fetching with the url and return with the temperature of the region of this zip code------>//
async function lookForWeatherTemp(){
    const zipCode=document.querySelector('#zip').value;
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${key}&units=metric`;
    try{
        const res= await fetch(weatherURL);
        const data1=await res.json();
        temperatue=data1.main.temp;
        
    }catch(error){
        console.log(error);
    }
}

//<-----posting the data to the server  ------>//
async function postTHEData(){
    const feeling=document.querySelector('#feelings').value;
    
    try{
        //take the data that we want to store it to the server
        await fetch('/saveAllData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: newDate,
                temp: temperatue,
                feelings:feeling
            }),
        });
        //recieve the data that we want it
        const req=await fetch('/getAllData');
        const data2=await req.json();
        
    }catch(err){
        console.log(err);
    }
}
//<-----adding the data to each specific element to show up on the screen------>//
async function updateUI(){
    //getting the data
    const request =await fetch('/getAllData');
    try{
        const data3=await request.json();
        document.querySelector('#date').innerHTML="Date: "+data3.date;
        document.querySelector('#temp').innerHTML="temperature: "+data3.temp;
        document.querySelector('#content').innerHTML="feeling: "+data3.feelings;
    }catch(error){
        console.log(error);
    }
}

//<-----collecting all the functions together------>//
generator.addEventListener('click',function(){
    lookForWeatherTemp()
    .then(()=>postTHEData())
    .then(()=>updateUI());
});

