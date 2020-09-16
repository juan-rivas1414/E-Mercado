//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// document.addEventListener("DOMContentLoaded", function (e) {
//     getJSONData(PRODUCTS_URL).then(function(resultObj){
//         if (resultObj.status === "ok")
//         {
//             categoriesArray = resultObj.data;
//             //Muestro las categorías ordenadas
//             showCategoriesList(categoriesArray);
//         }
//     });
// });

const ORDER_ASC_POR_NOMBRE = "AZ";
const ORDER_DESC_POR_NOMBRE = "ZA";
const ORDER_BY_CANTIDAD_PRODUCTOS = "Cant";
const ORDER_BY_CANTIDAD_PRODUCTOS_menor = "Cant2";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_POR_NOMBRE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_POR_NOMBRE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_CANTIDAD_PRODUCTOS){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_CANTIDAD_PRODUCTOS_menor){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }
    

    return result;
}

function info(){
    window.location.href="product-info.html"
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src ="` + category.imgSrc + `" alt="` + category.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        
                        <h2 class="mb-1">`+ category.name +`</h2>
                        <p class="text-muted"> ` + category.soldCount + ` clientes satisfechos</p>
                    </div>
                    <br>
                    <h6>` + category.description + `</h6>
                    <br>
                    <h3> ` + category.currency  + " " + category.cost + `</h3>
                </div>
            </div>
            </div>
        `
      }
      document.getElementById("container p-5").innerHTML = htmlContentToAppend;//nombre de ID debe corregirse.
    }
  }
  


  
  function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;
  
    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }
  
    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
  
    //Muestro las categorías ordenadas
    showCategoriesList();
  }
  
  document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_POR_NOMBRE, resultObj.data);
        }
    });
  
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_POR_NOMBRE);
    });
  
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_POR_NOMBRE);
    });
  
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_CANTIDAD_PRODUCTOS);
    });

    document.getElementById("sortByCount2").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_CANTIDAD_PRODUCTOS_menor);
    });
  
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
  
        minCount = undefined;
        maxCount = undefined;
  
        showCategoriesList();
    });
  
    
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
  
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }
  
        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }
  
        showCategoriesList();
    });
  });
  