//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
            <a href="#" data-toggle="modal" data-target="#exampleModal">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </a>    
            </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <img src="` + imageSrc + ` "alt="" class="img-fluid rounded">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCost");
            let productCriteriaHTML = document.getElementById("productSold");
            let productCurrencyHTML = document.getElementById("productCurrency")
            let productCategoryHTML = document.getElementById("category")
            //let productRelatedHTML = document.getElementById("productRelated")
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.currency + " "+product.cost;
            productCriteriaHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

           
           //productRelatedHTML.innerHTML = product.relatedProducts;
            

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});