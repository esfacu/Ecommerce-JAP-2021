//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let datos = [];



document.addEventListener("DOMContentLoaded", function (e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            datos = resultObj.data;
            showCarrito();
            calcular_subtotal();
            calcular_envio()
            calcular_total();
        }
    })
});

function update(id) {
    console.log(id);
    console.log("subtotal" + id);
    var x = document.getElementById(id).value;
    document.getElementById("subtotal" + id).innerHTML =
    x * datos.articles[id].unitCost;
};

function showCarrito() {
    let html = "";
    for (let i in datos.articles) {
        console.log(datos.articles[i].name);
       let num = i;

       html = ` 
       <tr scope="row">
        <td scope="col" class="col-2"><img src="${datos.articles[i].src}" class="img-thumbnail"></td>
        <td scope="col">${datos.articles[i].name}</td>
        <td scope="col"><input type="number" class="form-control" min="0" onchange="update(${num});calcular_total();calcular_subtotal(); multiplicar();" value="${datos.articles[i].count}" name="" id="${num}"/>
        </td>
        </td>
        <td scope="col"><p name="currency${[i]}"">${datos.articles[i].currency} </p>${datos.articles[i].unitCost}</td>
        <td id="subtotal${num}"  name="subtotal" scope="col">${datos.articles[i].count*datos.articles[i].unitCost}</td>
        </tr>
       `       
       ;
       
       document.getElementById("input").innerHTML += html;
        
    }
};

const cotizacion = 40;


function multiplicar(){
    let multiplicado = (datos.articles[i].count,datos.articles[i].unitCost);
    resultado = multiplicado;
   
    if (document.getElementsByTagName(`currency${[i]}`) === 'USD'){
        resultado *= cotizacion;
    }
     document.getElementById(`subtotal${num}`).innerHTML =
        resultado;

       };

   function calcular_total() {
    let subtotales = document.getElementsByName("subtotal");
    let total = document.getElementById("total");
    let envio = document.getElementById("envio");


    let suma = 0;
    let sumamasenvio = 0;
    

    for (let i = 0; i < subtotales.length; i++) {
        suma = suma + Number(subtotales[i].innerHTML);
    }

    sumamasenvio = sumamasenvio + parseInt(suma) + parseInt(envioCost);
    total.innerHTML = "TOTAL: $ " + sumamasenvio;

}

function calcular_subtotal() {
    let subtotales = document.getElementsByName("subtotal");
    let subt = document.getElementById("subt");

    let suma = 0;

    for (let i = 0; i < subtotales.length; i++) {
        suma = suma + Number(subtotales[i].innerHTML);
    }
    
    subt.innerHTML = "Subtotal: $ " + suma;

}

let envioCost = 0;

function calcular_envio(){
   
   
    envio.innerHTML += `Envio: $` + ` 0`;
}


