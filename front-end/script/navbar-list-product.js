/*------- Create the option's dropdown's selector -------*/

fillProductList();

function fillProductList() {
    const getJsonData = fetch('http://localhost:3000/api/cameras')
        .then(res => res.json());
    getJsonData
        // .then(function(getJsonData) {
        // })
    getJsonData
        .then(function(listOfProducts) {
            const products = listOfProducts;
            const navProductList = document.getElementById("products-list")
                for(let p in products) {

                    /*------- Fill option's element with JSON -------*/
                    let productListLink = document.createElement("a")
                    productListLink.classList.add("products-list__link")
                    productListLink.href = `product.html?id=${products[p]._id}`
                    productListLink.innerText = `${products[p].name}`;
                    navProductList.appendChild(productListLink);
                }
        })
}