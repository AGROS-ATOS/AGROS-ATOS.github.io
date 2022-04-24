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

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";



// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const userId = firebase.auth().currentUser.uid;
console.log(userId); */

import { getDatabase, ref, set, child, update, remove }
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




//-------ref-------//
var Country = document.getElementById("country");
var City = document.getElementById("city");
var Farmname = document.getElementById("farmname");
var Area = document.getElementById("area");
var Budget = document.getElementById("budget");
var Crops = document.getElementById("crops");


var Continuea = document.getElementById("continuea");


function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.querySelectorAll(".form__input").forEach(inputElement => {
    

    inputElement.addEventListener("input", e => {
        e.preventDefault();
        clearInputError(inputElement);
        
    });
    inputElement.addEventListener("blur",e => {
        e.preventDefault();  
        if(e.target.value.length === 0){
            setInputError(inputElement,"This field is empty");
        }                    
    });
    
});


//--------------insert data-----------------//

function insertFarm() {
    if(Farmname.value.length===0||Country.value.length==0||Area.value.length==0||City.value.length==0||Budget.value.length==0||Crops.value.length==0){
        alert('Empty fields present')
    }
    else{    
    set(ref(db, "Farms/" + Farmname.value),
        {
            farmname: Farmname.value,
            country: Country.value,
            city: City.value,
            area: Area.value,
            budget: Budget.value,
            crops: Crops.value,
            userid:uid
        })
        .then(() => {
            alert("Data saved");
        })
        .catch((error) => {
            alert("Error" + error);
        });
    }
}

//----------------update-----------------//

function updateFarm() {
    if(farmname.value.length===0||country.value.length==0||area.value.length==0||farmname.value.length==0||budget.value.length==0||crops.value.length==0){
        alert('Empty fields present')
    }
    else{
    update(ref(db, "Farms/" + farmname.value),
        {
            country: Country.value,
            city: City.value,
            area: Area.value,
            budget: Budget.value,
            crops: Crops.value,

        })
        .then(() => {
            alert("Data updated");
        })
        .catch((error) => {
            alert("Error");
        });
    }
}


//---------------update data----------------//

function removeFarm() {
    if(farmname.value.length===0||country.value.length==0||area.value.length==0||farmname.value.length==0||budget.value.length==0||crops.value.length==0){
        alert('Empty fields present')
    }
    else{
    remove(ref(db, "Farms/" + farmname.value))
        .then(() => {
            alert("Data removed");
        })
        .catch((error) => {
            alert("Error");
        });
    }
}




//----------insert button-------------//
Continuea.addEventListener('click', insertFarm);


