import {createUser, logIn, logInGoogle} from './firebase.js'

const form_registration = document.getElementById('form-registration');
const form_login = document.getElementById('form-login');
const btn_google = document.getElementById('btn-google');

if(form_registration !== null){
    form_registration.addEventListener('submit', async (e) =>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        const {error,data} = await createUser(email,password);
    
        if(error){
            switch(data.code){
                case 'auth/email-already-in-use': alert('Correo ya registrado')
                break;
                case 'auth/weak-password': alert('contraseña debe tener mìnimo 6 letras')
                break;
                default:
                     alert('ERROR') 
                break;
            }
        }else{
            alert('Usuario registrado correctamente')
            window.location.href = '/login.html'
        }
    })
}


if(form_login !== null){
    form_login.addEventListener('submit', async (e) =>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        const {error,data} = await logIn(email,password);
    
        if(error){
            switch(data.code){
                case 'auth/wrong-password': alert('Contraseña incorrecta')
                break;
                case 'auth/user-not-found': alert('El correo no està registrado')
                break;
                default:
                    console.log(data.code)
                     alert('ERROR') 
                break;
            }
        }else{
            alert('Credenciales correctas')
            localStorage.setItem('user',JSON.stringify({email:data.email,uid:data.uid}))
            window.location.href = '/chat.html'
        }
    })
}

btn_google.addEventListener('click', () => {
    logInGoogle();
})

