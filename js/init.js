const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";


var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error
        hideSpinner();
        return result;
    });
}

// document.getElementsByClassName('site-header')[0].innerHTML += `<a class="py-2 d-none d-md-inline-block" href= "my-profile.html">`+ sessionStorage.getItem() `</a> ` 

// function save(){
//   var checkbox = document.getElementById('remember');
//   if(document.getElementById('remember').checked) {
//       localStorage.setItem('remember', true);
//   }
// }

// function load(){
//   var checked = JSON.parse(localStorage.getItem('remember'));
//   if (checked == true) {
//     document.getElementById("checkbox1zaal1").checked = true;
//   }
// }


console.log(false);      
console.log(window.location);
if(
  !window.location.href.endsWith('login.html') && 
  !(sessionStorage.getItem('logueado')==='true')){
  window.location.href='login.html'
}


function Mostrarlista(orden){
  getJSONData(PRODUCTS_URL)
  .then(function(resultObj){
    if (resultObj.status === "ok")
    {
      categoriesArray = resultObj.data;
      showCategoriesList(categoriesArray,OrderValue);
    }
  })
}

document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCTS_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
      categoriesArray = resultObj.data;
      showCategoriesList(categoriesArray);
    }
  });
});

document.addEventListener("DOMContentLoaded", function(e){
  if(document.getElementById('remember').checked==true) {
    document.getElementById('profile').innerHTML = sessionStorage.getItem('nombre')
  }
  else{
    sessionStorage.setItem('nombre',nombreUsuario);
  }
});

// document.getElementsByClassName('site-header sticky-top py-1 bg-dark').innerHTML += '<a ref="my-profile.html">' + sessionStorage.getItem('nombre') + '</a>'
