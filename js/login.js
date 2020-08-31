//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
function enviarFormulario(evento){
    let nombreUsuario = document.getElementById('nombre').value
    evento.preventDefault();
    console.log(evento);
    sessionStorage.setItem('logueado','true');
    var userName = document.getElementById("nombre").value;
    sessionStorage.setItem('Usuario', userName);
    window.location.href="index.html"
    return true;
};



document.getElementById('formulario-login').addEventListener('submit', enviarFormulario)
document.addEventListener("DOMContentLoaded", function(e){


// location.reload();

});