//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
function enviarFormulario(evento){
    let nombreUsuario = document.getElementById('nombre').value
    if(document.getElementById('remember').checked==true){
        localStorage.setItem('nombre',nombreUsuario)
    }
    else{
        sessionStorage.setItem('nombre',nombreUsuario)
    }
    evento.preventDefault();
    console.log(evento);
    sessionStorage.setItem('logueado','true');
    window.location.href="index.html"
    localStorage.setItem('nombre',nombreUsuario)
    return true;
};

document.getElementById('formulario-login').addEventListener('submit', enviarFormulario)
document.addEventListener("DOMContentLoaded", function(e){


// location.reload();

});


