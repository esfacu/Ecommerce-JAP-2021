//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
/* document.addEventListener("DOMContentLoaded", function(e){

}); 
*/


// funcion requisitos usuario y contraseña

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("formulario").addEventListener('submit', validarFormulario); 
});

function validarFormulario(evento) {
  evento.preventDefault();
  var usuario = document.getElementById('usuario').value;
  if(usuario.length < 6 || usuario.length > 8) {
    alert('Usuario debe tener entre 6 y 8 caracteres');
    return;
  }
  var clave = document.getElementById('clave').value;
  if (clave.length < 4) {
    alert('La clave no es válida, debe tener al menos 4 caracteres');
    return;
  } else{
  localStorage.setItem("usuario", usuario);
  location.href="portada.html";
  }
}

//funcion loguear google 

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
    localStorage.setItem('Name: ', usuario);
    window.location.href = 'portada.html';
  }


  //funcion desloguear google
  
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      storage.clear();
    });
  window.location.href = 'index.html';
}
