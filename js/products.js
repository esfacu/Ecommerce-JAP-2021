const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
const ORDER_BY_PROD_COUNT2 = "Cant2.";
const ORDER_BY_PROD_RELEVANCIA = "soldCount.";
var currentProductArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

//ordena alfabeticamente 

function sortProduct(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });

        //SE MODIFICA A.COUNT POR A.COST PARA FILTRAR POR COSTO DECENDENTE
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });

        // filtrar costo acendente   

    } else if (criteria === ORDER_BY_PROD_RELEVANCIA) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });

        //SE AGREGA ELSEIF PARA ORDENAR DECENDENTE POR RELEVANCIA TOMANDO EN CUENTA VENTAS

    } else if (criteria === ORDER_BY_PROD_COUNT2) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount < bCount) { return -1; }
            if (aCount > bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList() {

    // se usa estructura similar a category
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductArray.length; i++) {
        let product = currentProductArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {


            htmlContentToAppend += `
            <div class="col">
            <div class="card h-100 shadow-sm">
                <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="bd-placeholder-img card-img-top">
                        <h4 class="m-3">`+ product.name + `</h4>
                        <p class="float-end price-hp">UNIDADES VENDIDAS: ` + product.soldCount + `</p>
                        <div class="card-body"
                            <p class="card-text">` + product.description + `</p>
                            <small class="float-start badge rounded-pill bg-success">USD ` + product.cost + `</small>
                            
                        </div>
                </a>
            </div>
            </div>    
            `
        }

        document.getElementById("cat-product-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProduct(sortCriteria, productArray) {
    currentSortCriteria = sortCriteria;

    if (productArray != undefined) {
        currentProductArray = productArray;
    }

    currentProductArray = sortProduct(currentSortCriteria, currentProductArray);
    //Muestro los products ordenados
    showProductList();
}

/*Función que se ejecuta una vez que se haya lanzado el evento de
que el documento se encuentra cargado */

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProduct(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProduct(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProduct(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByPrice").addEventListener("click", function () {
        sortAndShowProduct(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("sortByPrice2").addEventListener("click", function () {
        sortAndShowProduct(ORDER_BY_PROD_COUNT2);
    });

    document.getElementById("sortByRelevancia").addEventListener("click", function () {
        sortAndShowProduct(ORDER_BY_PROD_RELEVANCIA);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo  para filtrar por cantidad definidas imputut

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductList();
    });
});


//funcion buscador



//constantes buscador products
const formulario = document.querySelector('#formulario');
const boton = document.querySelector('#boton');
const resultado = document.querySelector('#cat-product-container');


const filtrar = () => {
    // console.log(formulario.value);
    resultado.innerHTML = '';

    const texto = formulario.value.toLowerCase();
    for (let producto of currentProductArray) {
        let product = producto.name.toLowerCase();
        if (product.indexOf(texto) !== -1) {
            resultado.innerHTML += //`<li>${producto.name} - Valor: ${producto.cost} - Descripcion: ${producto.description}</li>` 
                `<div class="col">
            <div class="card h-100 shadow-sm">
                <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    <img src="` + producto.imgSrc + `" alt="` + product.description + `" class="bd-placeholder-img card-img-top">
                        <h4 class="float-start badge rounded-pill bg-primary">`+ producto.name + `</h4>
                        <div class="card-body">
                            <p class="card-text">` + producto.description + `</p>    
                            <small class="float-start badge rounded-pill bg-success">USD ` + producto.cost + `</small>
                            <p class="float-end price-hp">UNIDADES VENDIDAS: ` + producto.soldCount + `</p>
                        </div>
                </a>
            </div>    
            </div>
        `
        }
    }
    if (resultado.innerHTML === '') {
        resultado.innerHTML += `
        <li class="float-start badge rounded-pill bg-primary">Producto no encontrado...</li>`
    }
}


boton.addEventListener('click', filtrar);
formulario.addEventListener('keyup', filtrar);

filtrar()