window.onload = init; //cuando la pagina carge va a cargar la funcion init

function init(){

  if(!localStorage.getItem("token")){ 
    document.querySelector('.btn-secondary').addEventListener('click', function(){
        //query selector le pasamos una clase de nuestro html

        window.location.href = "login.html";   //nos va a dirigir a la pagina de sign in 
    });

    document.querySelector('.btn-primary').addEventListener('click', signin);
  }else{
    window.location.href = "pokedex.html";
  }
}

function signin(){
    //obtenemos los datos desde nuestro front end
    var name = document.getElementById('input-name').value; 
    var mail = document.getElementById('input-mail').value;
    var password = document.getElementById('input-password').value;


    //mandar los datos al server de la api 
    //Lo usamos desde Axios que nos permite hacer esto y la importamos desde nuestro html
    //<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    axios.post('http://localhost:3000/user/signin', {
        user_name:name,
        user_mail: mail,
        user_password: password
      })
        .then(function (res) {
          // Después de enviar los datos, axios ejecutará esta función
          // res contiene la respuesta del servidor
          console.log(res);
          alert("Registro exitoso");
          window.location.href = "login.html";
          
        })
        .catch(function (err) {
        
          console.log(err);
        });

}