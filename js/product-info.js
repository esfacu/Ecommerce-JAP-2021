// trae imagenes galeria

var product = {};


function showImagesGallery(array){

    let htmlContentToAppend = "";
//for que recorre el array con las imagenes
    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
      // si el array esta en 0 lo deja como item activo en carrusel        
    if (i==0){ htmlContentToAppend += 
       `<div class="carousel-item active">
       <img class="d-block w-100"  src="`+ imageSrc +`" alt="`+ i +` slide">
     </div>
        `
    }else{
      //si es otro no queda activo
     htmlContentToAppend += 
       `<div class="carousel-item">
       <img class="d-block w-100"  src="`+ imageSrc +`" alt="`+ i +` slide">
     </div>
        `
}
      

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//json que trae informacion producto
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

//Grupo de variables usadas en la sección de hacer un nuevo comentario
let commentSection = document.getElementById('comment-section');
let commentInput = document.getElementById('comment-input');
let commentSend = document.getElementById('comment-send');
let starOne = document.getElementById('starOne');
let starTwo = document.getElementById('starTwo');
let starThree = document.getElementById('starThree');
let starFour = document.getElementById('starFour');
let starFive = document.getElementById('starFive');
let starSelected;

function showComments(array) {
    for (item in array) {
      let innerScore;
      let productScore = array[item].score;
      innerScore = (`<span class="fa fa-star checked"></span>`).repeat(productScore);
      innerScore += (`<span class="fa fa-star"></span>`).repeat(5 - productScore);
      commentSection.innerHTML += `
          <div class="row mb-2">
          <div class="col-8">
            <div class="card">
              <div class="post-heading pl-2 pt-2">
                <div class="float-left meta">
                  <div class="title h5">
                    <h4 class="text-primary"><b>${array[item].user}</b></h4>
                  </div>
                  <h6 class="text-muted time">${array[item].dateTime}</h6>
                  <div class="mb-1"><span class="badge badge-light class="score-container">
                    ${innerScore}
                    </span></div>
                </div>
              </div>
              <div class="post-description pl-2 pr-2">
                <p>${array[item].description}</p>
              </div>
            </div>
          </div>
        </div>
          `
    }
  
  }

  
  
  //añade un comentario
  function addComment() {
    let date = new Date();
    if (commentInput.value != 0) {
      commentSection.innerHTML += `
      <div class="row mb-2">
      <div class="col-8">
        <div class="card">
          <div class="post-heading pl-2 pt-2">
            <div class="float-left meta">
              <div class="title h5">
                <h4 class="text-primary"><b>${localStorage.getItem('usuario')}</b></h4>
              </div>
              <h6 class="text-muted time">${date.getFullYear()+"-"+(date.getMonth() +1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()}</h6>
              <p><span class="badge badge-light" id="punctuationComment">${starSelected}</span></p>
            </div>
          </div>
          <div class="post-description pl-2 pr-2">
            <p>${commentInput.value}</p>
          </div>
        </div>
      </div>
    </div>
      `
    } else {
      alert("Debe ingresar un comentario")
    }
    starOne.style.color = 'black';
    starTwo.style.color = 'black';
    starThree.style.color = 'black';
    starFour.style.color = 'black';
    starFive.style.color = 'black';
  }
  
  //Función para que la calificación seleccionada se muestre en pantalla
  //al momento de hacer un nuevo comentario.

  function rateComment(){
    
    starOne.addEventListener('click', function () {
     starSelected = `<span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`;
     this.style.color = 'rgb(189, 189, 19)'
     starTwo.style.color = 'black';
     starThree.style.color = 'black';
     starFour.style.color = 'black';
     starFive.style.color = 'black';
   });
   starTwo.addEventListener('click', function () {
     starSelected = `
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`;
     starOne.style.color = 'rgb(189, 189, 19)';
     this.style.color = 'rgb(189, 189, 19)';
     starThree.style.color = 'black';
     starFour.style.color = 'black';
     starFive.style.color = 'black';
   });
   starThree.addEventListener('click', function () {
     starSelected = `
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`;
     starOne.style.color = 'rgb(189, 189, 19)';
     starTwo.style.color = 'rgb(189, 189, 19)';
     this.style.color = 'rgb(189, 189, 19)';
     starFour.style.color = 'black';
     starFive.style.color = 'black';
   });
   starFour.addEventListener('click', function () {
     starSelected = `
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>`;
     starOne.style.color = 'rgb(189, 189, 19)';
     starTwo.style.color = 'rgb(189, 189, 19)'
     starThree.style.color = 'rgb(189, 189, 19)';
     this.style.color = 'rgb(189, 189, 19)'
     starFive.style.color = 'black';
   });
   starFive.addEventListener('click', function () {
     starSelected = `
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>`;
     starOne.style.color = 'rgb(189, 189, 19)';
     starTwo.style.color = 'rgb(189, 189, 19)'
     starThree.style.color = 'rgb(189, 189, 19)';
     starFour.style.color = 'rgb(189, 189, 19)';
     this.style.color = 'rgb(189, 189, 19)'
   }); 
   }
  rateComment();
  
  
  
 
  document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (response) {
      if (response.status === "ok") {
        comments = response.data;
        showComments(comments);
      }
    });
    
    commentSend.addEventListener('click', addComment);
    commentInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        addComment();
      }
  });
    $(function () {
      $('.carousel').carousel({
          interval: 1000
      })
    });
  });


//funcion que carga elementos relacionados
/* usa variable product definida anteriormente que extrae
 json de product-info, para sacar posicion de articulo de 
 la nueva variable llamada relacionados donde se almacenan 
 todos los productos del json de products
*/
  let relacionados = [];

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            relacionados = resultObj.data;
          
            let htmlToAppend1 = "";
            let htmlToAppend2 = "";
            let related1HTML  = document.getElementById("productRelated1");
            let related2HTML  = document.getElementById("productRelated2");
            let related1imgHTML = document.getElementById("relatedImg1");
            let related2imgHTML = document.getElementById("relatedImg2");
            let relatedCost1HTML  = document.getElementById("relatedCost1");
            let relatedCost2HTML  = document.getElementById("relatedCost2");


            related1HTML.innerHTML = relacionados[product.relatedProducts[0]].name;
            related2HTML.innerHTML = relacionados[product.relatedProducts[1]].name;
            relatedCost1HTML.innerHTML = relacionados[product.relatedProducts[0]].currency +` `+ relacionados[product.relatedProducts[0]].cost;
            relatedCost2HTML.innerHTML = relacionados[product.relatedProducts[1]].currency +` `+ relacionados[product.relatedProducts[1]].cost;
            
            htmlToAppend1 += `<div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
            <a href="product-info.html">
            <img class="img-fluid img-thumbnail" src="` + relacionados[product.relatedProducts[0]].imgSrc + `" alt="">
            </a>
            </div>
            </div>`
            related1imgHTML.innerHTML = htmlToAppend1;

            htmlToAppend2 += `<div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
            <a href="product-info.html">
            <img class="img-fluid img-thumbnail" src="` + relacionados[product.relatedProducts[1]].imgSrc + `" alt="">
            </a>
            </div>
            </div>`
            related2imgHTML.innerHTML = htmlToAppend2;


            

           // showImagesGalleryRelated(relacionados[1].imgSrc);
        }
    });
});
