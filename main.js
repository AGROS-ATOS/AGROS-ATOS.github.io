//const flag = 1;
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCOv2HY1j-a5JoxHq0bBXX3kbY-v8W7XBU",
    authDomain: "atos-agros.firebaseapp.com",
    projectId: "atos-agros",
    storageBucket: "atos-agros.appspot.com",
    messagingSenderId: "483820044445",
    appId: "1:483820044445:web:cc17bd7a62e4b195d9d474"  
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");
    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });  


    loginForm.addEventListener("submit", e => {
        e.preventDefault();      
        const login_email=document.getElementById("user").value;
        const login_password=document.getElementById("pass").value;    
        
        signInWithEmailAndPassword(auth, login_email, login_password)
        .then((userCredential) => {
        // Signed in 
            const user = userCredential.user;
    
            const dt = new Date();
             update(ref(database, 'users/' + user.uid),{
              last_login: dt,
            })
    
             alert('User logged in successfully!');
             window.open('./weather.html','_self');
            // ...
        })
       .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;

           //alert(errorMessage);
           setFormMessage(loginForm, "error", "Invalid username/password combination");
        });
          
        
    }); 

    

    createAccountForm.addEventListener("submit",e => {
        e.preventDefault();     
        const reg_email=document.getElementById("register_email").value;
        const reg_pass=document.getElementById("register_pass").value;
        const reg_user=document.getElementById("signupUsername").value;
        createUserWithEmailAndPassword(auth, reg_email, reg_pass)
        .then((userCredential) => {
         
          const user = userCredential.user;
    
          set(ref(database, 'users/' + user.uid),{
              username: reg_user,
              email: reg_email
          })
    
          alert('user created!');
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;    
          alert(errorMessage);        
        });            
    });


    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            e.preventDefault();
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 7) {
                setInputError(inputElement, "Username must be at least 7 characters in length");
            }
        });

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
});

