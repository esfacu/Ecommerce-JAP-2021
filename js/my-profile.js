//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.








// saveProfile guarda los datos almacenados, crea variable perfil con Json de datos que almacenamos en localstorage
function saveProfile(){
    let name = document.getElementById("name").value;
    let surrname = document.getElementById("surrname").value;
    let edad = document.getElementById("edad").value;
    let tel = document.getElementById("tel").value;
    let mail = document.getElementById("mail").value;

    let perfil = {
        name: name,
        surrname: surrname,
        edad: edad,
        tel: tel,
        mail: mail
    }
    localStorage.setItem("dataProfile",JSON.stringify(perfil));
}


// function que se ejecuta en el evento "click"
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("guardar").addEventListener("click", function (e) {
        saveProfile();
    })

    //mostrar datos al momento de cargar pagina almacenados localstorage

    let perfil = JSON.parse(localStorage.getItem("dataProfile"));
    document.getElementById("name").value = perfil.name;
    document.getElementById("surrname").value = perfil.surrname;
    document.getElementById("edad").value = perfil.edad;
    document.getElementById("tel").value = perfil.tel;
    document.getElementById("mail").value = perfil.mail;
    
});


// function define carga archivo y muestra la preview, esto no setea local storage solo da previsual
function previewFile(){
    let preview = document.getElementById("pic");
    let file = document.getElementById("inputF").files[0];

    let reader = new FileReader(); //instancia obj.
    
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "img/prohile2.jpg";
    }
    reader.onloadend = function () {
        preview.src = reader.result;
    }
}



//Query selector se encarga de buscar el id inputFile

document.querySelector("#inputF").addEventListener("change", function () {
    const reader = new FileReader();


    // se setea em local storage imagen de usuarioo reader read as data url es lo que permite leer el url de la imagen que convertimos
    reader.addEventListener("load", () => {
        localStorage.setItem("image", reader.result);

    });
    reader.readAsDataURL(this.files[0]);
});


//se usa iff para traer la imagen en imagedataurl al atributo src de html, el else es por si no hay imagen traer una predeterminada
document.addEventListener("DOMContentLoaded", () =>{
    const imageDataUrl = localStorage.getItem("image");

    if (imageDataUrl){
        document.querySelector("#pic").setAttribute("src", imageDataUrl);
    } else {
        document.querySelector("#pic").setAttribute("src", "img/prohile2.jpg");
    }
})
