// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOv2HY1j-a5JoxHq0bBXX3kbY-v8W7XBU",
    authDomain: "atos-agros.firebaseapp.com",
    databaseURL: "https://atos-agros-default-rtdb.firebaseio.com",
    projectId: "atos-agros",
    storageBucket: "atos-agros.appspot.com",
    messagingSenderId: "483820044445",
    appId: "1:483820044445:web:cc17bd7a62e4b195d9d474"
};

import { getAuth, onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";



// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const userId = firebase.auth().currentUser.uid;
console.log(userId); */

import { getDatabase, ref, set, get, child, update, remove }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

const db = getDatabase();

const auth = getAuth();
let uid;
onAuthStateChanged(auth, (user) => {
  if (user) {
    
    uid = user.uid;
    console.log(uid);
    // ...
  } else {
    // User is signed out
    // ...
  }

});

//--------------------data get--------------//

const weatherForecastEl = document.getElementById('weather-forecast');
let temperature=0;
let humidity=0;
let soil_moisture=0;
var city=0;

function AddToTable() {
    //stdNo = 0;
    let otherDayForcast = ' '
    farms.forEach(element => {
        otherDayForcast += `
<div class="weather-forecast-item">
<div class="weather-item">
    <div>FARM NAME</div>
    <div>${element.farmname}</div>
  </div>
<div class="weather-item">
    <div>COUNTRY</div>
    <div>${element.country}</div>
  </div>
  <div class="weather-item">
    <div>CITY</div>
    <div>${element.city}</div>
  </div>
  <div class="weather-item">
    <div>CROP TYPE</div>
    <div>${element.crops}</div>
  </div>
  <div class="weather-item">
    <div>AREA</div>
    <div>${element.area} acres</div>
  </div>
  <div class="weather-item">
    <div>BUDGET</div>
    <div>${element.budget} USD</div>
</div> 
</div>           
            `

            city=element.city;//AddTable(element.farmname, element.country, element.city, element.area, element.budget, element.crops)
    });

    weatherForecastEl.innerHTML = '';  
    weatherForecastEl.innerHTML = otherDayForcast;

    
    console.log(city);  


}
function AddToTable2() {

  
  
  //stdNo = 0;

  let otherDayForcast = ''
  
    
      otherDayForcast += `
<div class="weather-forecast-item">
<div class="weather-item">
  <div>FARM NAME</div>
  <div>${farms2[0].farmname}</div>
</div>
<div class="weather-item">
  <div>COUNTRY</div>
  <div>${farms2[0].country}</div>
</div>
<div class="weather-item">
  <div>CITY</div>
  <div>${farms2[0].city}</div>
</div>
<div class="weather-item">
  <div>CROP TYPE</div>
  <div>${farms2[0].crops}</div>
</div>
<div class="weather-item">
  <div>AREA</div>
  <div>${farms2[0].area} acres</div>
</div>
<div class="weather-item">
  <div>BUDGET</div>
  <div>${farms2[0].budget} USD</div>
</div> 
<div class="weather-item">
  <div>HUMIDITY</div>
  <div>${humidity}</div>
</div> 
<div class="weather-item">
  <div>TEMPERATURE</div>
  <div>${temperature}</div>
</div> 
<div class="weather-item">
  <div>SOIL MOISTURE</div>
  <div>${soil_moisture}%</div>
</div> 
</div>   
<div class="weather-forecast-item">
CROP REQUIREMENTS
<div class="weather-item">
  <div>Min Temperature</div>
  <div>${mintemp}</div>
</div>
<div class="weather-item">
  <div>Max Temperature</div>
  <div>${maxtemp}</div>
</div>
<div class="weather-item">
  <div>Min Humidity</div>
  <div>${minhum}</div>
</div>
<div class="weather-item">
  <div>Max Humidity</div>
  <div>${maxhum}</div>
</div>
<div class="weather-item">
  <div>min Soil Moisture</div>
  <div>${minsm}%</div>
</div>
<div class="weather-item">
  <div>Max Soil Moisture</div>
  <div>${maxsm}%</div>
</div>
</div>          
          `

          //AddTable(element.farmname, element.country, element.city, element.area, element.budget, element.crops)
  

  weatherForecastEl.innerHTML = otherDayForcast;  
  console.log(city);
  console.log(crop);
  


}
function AddToTable3() {

  
  
  //stdNo = 0;

  
  let otherDayForcast=''
    
      otherDayForcast += `
<div class="weather-forecast-item">

</div>           
          `

          //AddTable(element.farmname, element.country, element.city, element.area, element.budget, element.crops)
  

  weatherForecastEl.innerHTML = otherDayForcast;  
  //getmessage();
  


}
        
var farms=[];

function getData() {
    const dbref = ref(db)
    get(child(dbref, "Farms" ))
        .then((snapshot) => {
          farms=[];
            
            snapshot.forEach(childSnapshot => {
                if(childSnapshot.val().userid === uid){
                  farms.push(childSnapshot.val());


                }
                
            });
            AddToTable();
        });
}

function getvalues(){
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=22bfdce89a6b55d193e506d6827ae2c4`)
    .then(response => response.json()).then(data =>
   
   show_data(data)
   )


   function show_data(data){
        console.log(data)
      
         
       let lt=data[0].lat;
       let lg=data[0].lon;
       console.log(lt);
       console.log(lg);   
       fetch(`https://api.ambeedata.com/weather/latest/by-lat-lng?lat=${lt}&lng=${lg}`, {
		"method": "GET",
		"headers": {
			"x-api-key": "1d68a95fc0781b9a9ab1e5f94c1f725e169b047c56c60df1d4246a4c130cab61",
			"Content-type": "application/json"
		}
    	})
        	.then(response => response.json()).then(data =>  show_data2(data)   ) 
	    .catch(err => {
		console.error(err);
	    });
 
        fetch(`https://api.ambeedata.com/soil/latest/by-lat-lng?lat=${lt}&lng=${lg}`, {
	    	"method": "GET",
	    	"headers": {
	    		"x-api-key": "1d68a95fc0781b9a9ab1e5f94c1f725e169b047c56c60df1d4246a4c130cab61",
	    		"Content-type": "application/json"
	    	}
	    })
	    .then(response => response.json()).then(data =>
    
        show_data3(data)
        )
        .catch(err => {
	    	console.error(err);
	    });
    

		
	function show_data3(data){
        console.log(data)
        data.data.forEach(element => { console.log(element.soil_temperature)
          soil_moisture=element.soil_moisture;
          soil_moisture=soil_moisture.toFixed(2);
            
        });
    
    }
	function show_data2(data){
        console.log(data)
        console.log(data.data.temperature);
        console.log(data.data.humidity);
        temperature=data.data.temperature;
        temperature=((temperature-32)/1.8);
        temperature=temperature.toFixed(2);
        humidity=data.data.humidity;
        humidity=humidity.toFixed(2);
            
        
    
    }
         

        
    
    }
}
let crop='';
var farms2 =[];

function getData2() {
  const dbref = ref(db)
  get(child(dbref, "Farms/" + farmname.value))
      .then((snapshot) => {
                 
              if((snapshot.val().userid === uid) ){
                farms2.push(snapshot.val());
                city=snapshot.val().city;
                crop=snapshot.val().crops;
                             
              }  
              getvalues();            
              setTimeout(dispCrops, 3000);
              
          
      });
}
window.onload = getData;


const farmname=document.getElementById("farm_input");
const btn1=document.getElementById("btn");
btn1.addEventListener('click', getData2);
const btn2=document.getElementById("btn2");
btn2.addEventListener('click', getData);


let maxtemp,mintemp,maxhum,minhum,maxsm,minsm;

function dispCrops() {
  const dbref = ref(db);
  get(child(dbref, "Crops/" + crop)).then((snapshots) => {
      if (snapshots.exists()) {
          mintemp = snapshots.val().minTemp;
          maxtemp = snapshots.val().maxTemp;
          minhum = snapshots.val().minRainfall;
          maxhum = snapshots.val().maxRainfall;
          maxsm = snapshots.val().sMoistureMax;
          minsm = snapshots.val().sMoistureMin;        

      }
      else {
          alert("no data");
      }

  })
      /* .catch((error) => {
          alert("error found");
      }); */setTimeout(AddToTable2, 2000);
      

}
function getmessage(){
  console.log(mintemp);
  if(temperature>mintemp && temperature<maxtemp){
    
    alert("Perfect Temperature")
  }
  else{
    alert("Wrong temperature level!")
  }
  if(humidity>minhum && humidity<maxhum){
    alert("Perfect humidity")
  }
  else{
    alert("Wrong humidity level!")
  }
  if(soil_moisture>minsm && soil_moisture<maxsm){
    alert("Perfect soil moisture")
  }
  else{
    alert("Wrong soil moisture level!")
  }
  

}

const sign=document.getElementById("signout");
sign.addEventListener("click",(e)=>{
  e.preventDefault();
  signOut(auth).then(()=>{
    alert("user logout successfully" );
    window.open('./index.html','_self');
  } ).catch((error) => {
    alert("Signout unsuccesfull" + error)
  });

})



const toggleButton = document.getElementById('togglebtn')
const navbarLinks = document.getElementById('nlink')

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
  console.log('toggle')
})