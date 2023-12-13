// --------------------- Global Data ------------------------

var productNameInput = document.getElementById('productName');   //----- input kolo
var productPriceInput = document.getElementById('productPrice'); //----- input kolo
var productCategoryInput = document.getElementById('productCategory'); //----- input kolo
var productDescriptionInput = document.getElementById('productDescription'); //----- input kolo

var indexUpdate = 0;
var searchInput = document.getElementById("searchInput");
var updateBtn = document.getElementById("updateBtn"); 
var addBtn = document.getElementById("addBtn"); 



var productContainer = [];

// ------------- local-storge -------------
if(localStorage.getItem('products') != null){

  productContainer = JSON.parse(localStorage.getItem('products'));

  displayData();
}



//-----------add-product-------------

var addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',function(){
  addProduct();
});

function addProduct(){
 if(regexName() == true && regexPrice() == true && regexCategory()== true && regexDescription()){

  var product = {
    name:productNameInput.value,
    price:productPriceInput.value,
    category:productCategoryInput.value,
    description:productDescriptionInput.value
  }
 
  productContainer.push(product);

  localStorage.setItem('products',JSON.stringify(productContainer));

  displayData();

  clearForm();

  console.log(productContainer);

 }

}


//-----------clear-function-------------

 function clearForm(){
  productNameInput.value = '';
  productPriceInput.value ='';
  productCategoryInput.value ='';
  productDescriptionInput.value ='';
}



//-----------display-function-------------

function displayData(){
 var cartona = ``;
 for(var i=0; i<productContainer.length ; i++){
  cartona+= `<tr class="col-sm-9">
  <td>${i+1}</td>
  <td>${productContainer[i].name}</td>
  <td>${productContainer[i].price}</td>
  <td>${productContainer[i].category}</td>
  <td>${productContainer[i].description}</td>
  <td class="col-sm-3 m-auto">
   <button class="btn  btn-sm btn-outline-danger"onclick="setData(${i})">Update</button>   
   <button class="btn  btn-sm btn-outline-warning px-2 mt-sm-2 mt-md-0" onclick="deleteProduct(${i})" >Delete</button> 
  </td>
</tr>`
 }

 document.getElementById('tableBody').innerHTML = cartona;

}

// ------------ delete-function ----------------

function deleteProduct(elementNumber){

 productContainer.splice(elementNumber,1);

 localStorage.setItem('products',JSON.stringify(productContainer));

 displayData();

}



// ------------ search-function ----------------
var searchInput =document.getElementById('searchInput');
searchInput.addEventListener('input',function(){
  searchProduct();
});

function searchProduct(){

 var term = searchInput.value;
 var cartona = ``;
 for (var i=0 ; i< productContainer.length ; i++){
  if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
   cartona +=  `<tr class="col-sm-9">
   <td>${i+1}</td>
   <td>${productContainer[i].name}</td>
   <td>${productContainer[i].price}</td>
   <td>${productContainer[i].category}</td>
   <td>${productContainer[i].description}</td>
   <td class="col-sm-3 m-auto">
    <button class="btn  btn-sm btn-outline-danger">Update</button>   
    <button class="btn  btn-sm btn-outline-warning px-2 mt-sm-2 mt-md-0" onclick="deleteProduct(${i})" >Delete</button> 
   </td>
 </tr>`
  }
 
 }
  document.getElementById('tableBody').innerHTML = cartona;

}


// ---------------- update-function ------------------------------


//--------- setdata

function setData(index){

  indexUpdate = index;

 var currentIndex = productContainer[index];
//  console.log(currentIndex);
 productNameInput.value = currentIndex.name;
 productPriceInput.value = currentIndex.price;
 productCategoryInput.value = currentIndex.category;
 productDescriptionInput.value = currentIndex.description;

 addBtn.classList.add('d-none');
 updateBtn.classList.remove('d-none');

}


// ---------- update
var updateBtn = document.getElementById('updateBtn');
updateBtn.addEventListener('click',function(){
  updateProduct();
});

function updateProduct(){

 var product = {
  name:productNameInput.value,
  price:productPriceInput.value,
  category:productCategoryInput.value,
  description:productDescriptionInput.value
 } 
 productContainer.splice(indexUpdate,1,product);
 localStorage.setItem('products',JSON.stringify(productContainer));
 displayData();
 addBtn.classList.remove('d-none');
 updateBtn.classList.add('d-none');

 clearForm();



}


// ------------------ validation ------------------------
// validation-name

var productName = document.getElementById('productName');
productName.addEventListener('input',function(){
  regexName();
});

function regexName(){

  var messgeName = document.getElementById('messgeName');

  var regexName = /^(?:[A-Z][a-z]{2,8})$/;
  var text = productNameInput.value;
  if(regexName.test(text)==true){
    productNameInput.classList.add('is-valid');
    productNameInput.classList.remove('is-invalid');
    messgeName.classList.add('d-none');
    return true;


  } else{
    productNameInput.classList.remove('is-valid');
    productNameInput.classList.add('is-invalid');
    messgeName.classList.remove('d-none');
    return false;
  }
  
}

// validation-price
var productPrice = document.getElementById('productPrice');
productPrice.addEventListener ('input',function(){
  regexPrice();
});

function regexPrice(){

 var messgePrice = document.getElementById('messgePrice');
 
 var regexPrice = /^(?:[0-9]{3,6})$/;
 var num = productPriceInput.value;
 if(regexPrice.test(num)==true){

  productPriceInput.classList.add('is-valid');
  productPriceInput.classList.remove('is-invalid');
  messgePrice.classList.add('d-none');
  return true;

 }else{
  productPriceInput.classList.remove('is-valid');
  productPriceInput.classList.add('is-invalid');
  messgePrice.classList.remove('d-none');
  return false;
 }

}


//  validation-category
 var productCategory = document.getElementById('productCategory');
 productCategory.addEventListener('input',function(){
  regexCategory();
 });
function regexCategory(){

 var messgeCaregory = document.getElementById('messgeCaregory');

  var regexCategory = /^(?:[a-zA-z]{2,8})$/;
  var catego = productCategoryInput.value;
  if(regexCategory.test(catego) == true){

    productCategoryInput.classList.add('is-valid');
    productCategoryInput.classList.remove('is-invalid');
    messgeCaregory.classList.add('d-none');
    return true;
  }else{
    productCategoryInput.classList.remove('is-valid');
    productCategoryInput.classList.add('is-invalid');
    messgeCaregory.classList.remove('d-none');
    return false;
  }

}

//  validation-description

var productDescription = document.getElementById('productDescription');
productDescription.addEventListener('input',function(){
  regexDescription()
});

function regexDescription(){

  var messgeDescription = document.getElementById('messgeDescription');

 var regexDescription =  /^(?:[a-zA-z]{2,8})$/;
 var descr = productDescriptionInput.value;
 if(regexDescription.test(descr) == true ){

  productDescriptionInput.classList.add('is-valid');
  productDescriptionInput.classList.remove('is-invalid');
  messgeDescription.classList.add('d-none');
  return true;
  
 }else{
  productDescriptionInput.classList.remove('is-valid');
  productDescriptionInput.classList.add('is-invalid');
  messgeDescription.classList.remove('d-none');
  return false;
 }

}





