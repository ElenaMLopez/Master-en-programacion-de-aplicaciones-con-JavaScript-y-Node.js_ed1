var provider = new firebase.auth.GithubAuthProvider();
var githubBtn = document.getElementById('githubLogin');
var githubLogOut = document.getElementById('githubLogOut');
var favorito = document.getElementById('favorito');
var usuarioNombre = document.getElementById('usuario');
//var pic = document.getElementById('userPic');
var usuarioDatos = document.getElementById('logData');

var userRef = firebase.database().ref("users");

var auth = firebase.auth();
var provider = new firebase.auth.GithubAuthProvider();
var storage = firebase.storage();
var storageRef = storage.bucket;


// Evento de OAUTH
function logMe (){
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // Datos q obtenemos del usuario --
    var userData = JSON.stringify(result.user);
        userData = JSON.parse(userData);
      
    // Alamacenando el usuario en /user/{{uid}}/datos...
       userRef.child(userData.uid).set(userData);
       favorito.addEventListener('click', favoritoAdd);
  // Hacer visible el botón de logOut y usuario. Oculta el de login:
       loginDisplay(userData);
       usuarioNombre.innerHTML = userData.displayName;
       
       function favoritoAdd(){
        var userFav = optionDistrict.value;
        var user = userRef.child(userData.uid);
        user.push(userFav, function(error) {
          if (error) {
            console.warn("No se han podido guardar los datos. " + error);
          } else {
            console.info("Datos guardados con exito!");
          }
       })
      }
      
  }).catch(function(error) {
      console.log( error + " Error con el login");
    })
} // end logMe()
   



function logOut (){
    firebase.auth().signOut().then(function() {
    console.log("User OUT!");
    loginDisplay();
  }).catch(function(error) {
    console.log("Ha falllado el User OUT");
  });
}


githubBtn.addEventListener('click', logMe);
githubLogOut.addEventListener('click', logOut);


function loginDisplay() {
    githubBtn.classList.toggle('hidden');
    githubLogOut.classList.toggle('hidden');
    favorito.classList.toggle('hidden');
    usuarioDatos.classList.toggle('hidden');
}

/**
 * Guardar favoitos: El usuario puede guardar datos de sus sitios favoritos
 *
 * 1. Crear formulrio de guardar favorito
 * 2. Crear modal para guardar favorito:
 *  2.1. Input de tipo de favorito (casa, trabajo, colegio, casa2, trabajo2...)
 *  2.2. Menú para seleccionar estación.
 *  2.3. Botón de guardar (toma los datos de esa escaión y los guarda en datos de favorito en firebase).
 */