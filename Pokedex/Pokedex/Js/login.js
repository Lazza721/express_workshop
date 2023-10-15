window.onload = init; //cuando la pagina carge va a cargar la funcion init

function init(){
    if(!localStorage.getItem("token")){

    document.querySelector('.btn-secondary').addEventListener('click', function(){
        //query selector le pasamos una clase de nuestro html

        window.location.href = "signin.html";   //nos va a dirigir a la pagina de sign in 
    });

    document.querySelector('.btn-primary').addEventListener('click', login);
  }else{
    window.location.href = "pokedex.html";
  }
}

function login(){
    //obtenemos los datos desde nuestro front end
 
    var mail = document.getElementById('input-mail').value;
    var password = document.getElementById('input-password').value;


    //mandar los datos al server de la api 
    //Lo usamos desde Axios que nos permite hacer esto y la importamos desde nuestro html
    //<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    axios.post('http://localhost:3000/user/login', {
        user_mail: mail,
        user_password: password
      })
        .then(function (res) {
          // Después de enviar los datos, axios ejecutará esta función
          // res contiene la respuesta del servidor
          if(res.data.code === 200){
              localStorage.setItem("token",res.data.message);
              //local storage existe en los browsers y guardamos el token para hacer peticiones
              //en consola en aplicacion -> local storage se almacena un file con el nombre token y el token
              window.location.href ="pokedex.html";
          }else{
            alert("usuario y/o contraseña incorrecta");
          }
        })
        .catch(function (err) {
          console.log(err);
        });

}