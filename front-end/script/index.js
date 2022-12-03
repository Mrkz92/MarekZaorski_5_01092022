generateIndex();

function generateIndex() {
    
    getJsonData
        .then(function(listOfProducts) {
            const products = listOfProducts;
                for(let p in products) {
                    let productList = document.getElementById("product-list")

                        let productContainer = document.createElement("div")
                        productContainer.classList.add("product-container")
                        productContainer.innerHTML = `
                        <a href="product.html?id=${products[p]._id}" class="product-link">
                            <div class="product-card">
                                <div class="product-frame">
                                    <img class="product-frame__image" src="${products[p].imageUrl}" alt="image-product-${products[p].name}">
                                </div>
                                <div class="product-info">
                                    <h3 class="product-info__name">${products[p].name}</h3>
                                    <span class="product-info__price">${products[p].price/100 . toFixed(2)+'€'}</span>
                                </div>
                            </div>
                        </a>`;
                        productList.appendChild(productContainer)
                }
        })
        .catch(function(err) {
            alert('Nous rencontrons un problème serveur, veulliez réessayer ultèrieurement.')
            console.log("Veuillez nous excuser, un problème est survenu.");
        });
}
