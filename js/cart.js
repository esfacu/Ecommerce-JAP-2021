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
           // calcular_envio()
            //calcular_total();
        }
    })
});

function update(id) {
    console.log(id);
    console.log("subtotal" + id);
    var x = document.getElementById(id).value;
    multiplicado = x * datos.articles[id].unitCost;

    if(datos.articles[id].currency === "USD"){
        multiplicado *= cotizacion;
    }
    document.getElementById("subtotal" + id).innerHTML = multiplicado;
    
};



function showCarrito() {
    let html = "";
    let costitems = [datos.articles[0].unitCost*datos.articles[0].count,(datos.articles[1].unitCost*datos.articles[1].count)*cotizacion];
    for (let i in datos.articles) {
        console.log(datos.articles[i].name);
       let num = i;

       html = ` 
       <tr scope="row">
        <td scope="col" class="col-2"><img src="${datos.articles[i].src}" class="img-thumbnail"></td>
        <td scope="col">${datos.articles[i].name}</td>
        <td scope="col"><input type="number" class="form-control" min="0" onchange="update(${num});calcular_subtotal();" value="${datos.articles[i].count}" name="" id="${num}"/>
        </td>
        </td>
        <td scope="col"><p name="currency${[i]}"">${datos.articles[i].currency} </p>${datos.articles[i].unitCost}</td>
        <td id="subtotal${num}"  name="subtotal" scope="col">${costitems[i]}</td>
        </tr>
       `       
       ;
       
       document.getElementById("input").innerHTML += html;
        
    }
};

const cotizacion = 40;


function calcular_subtotal() {
    let subtotales = document.getElementsByName("subtotal");
    let subt = document.getElementById("subt");

    let suma = 0;

    for (let i = 0; i < subtotales.length; i++) {
        suma = suma + Number(subtotales[i].innerHTML);
    }
    
    subt.innerHTML = "Subtotal: $ " + suma;

}


