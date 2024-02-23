const productContainer=document.querySelector('.product-container');
const loadMoreButton=document.querySelector('.load-more-button');
let currentStep=0;

async function fetchListOfProduct(getCurrentStep){
  try{
    const response=await fetch(`https://dummyjson.com/products?limit=10&skip=${getCurrentStep===0 ? 0:getCurrentStep*10}`,{
        method:"GET"
    })
    const result=await response.json();
    console.log(result);

    if(result && result.products) displayProducts(result.products);
  }
  catch(error){
    console.log(error);
  }
}


function displayProducts(productList){
    console.log(productList);

    productList.forEach(productItem => {
        const productItemWrapper=document.createElement('div');
        const productTitle=document.createElement('p');
        const productThumbnail=document.createElement('img');
        const productDescription=document.createElement('p');
        const productPrice=document.createElement("p");
        

        productTitle.textContent=productItem.title;
        productDescription.textContent=productItem.description;
        productThumbnail.src=productItem.thumbnail;
        productPrice.textContent=productItem.price;

        productItemWrapper.classList.add('product-item-wrapper');
        productTitle.classList.add('product-title');
        productThumbnail.classList.add('product-img');
        productPrice.classList.add('product-price');
        productDescription.classList.add('product-desc');


        productItemWrapper.appendChild(productThumbnail)
        productItemWrapper.appendChild(productTitle)
        productItemWrapper.appendChild(productPrice)
        productItemWrapper.appendChild(productDescription)

        productContainer.appendChild(productItemWrapper)

        if(productContainer.children.length===100){
          loadMoreButton.setAttribute('disabled',true);
        }
    });
   

}


fetchListOfProduct(currentStep);

loadMoreButton.addEventListener('click',()=>{
  fetchListOfProduct(currentStep);
  currentStep++;
})

