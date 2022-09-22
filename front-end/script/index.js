generateIndex();

function generateIndex() {
    const getJsonData = fetch('http://localhost:3000/api/cameras').then(response => response.json());
    getJsonData
        .then(function(getJsonData) {
            console.log(getJsonData)
        })
    getJsonData
        .then(function(listOfProducts) {
            const products = listOfProducts;
                for(let item in products) {
                    let productList = document.getElementById("product-list")

                    let productContainer = document.createElement("div")
                    productContainer.classList.add("product-container")
                    productList.appendChild(productContainer)

                    let getProduct = document.createElement("a")
                    getProduct.href = `product.html?id=${listOfProducts[item]._id}`
                    getProduct.classList.add("product-link")
                    productContainer.appendChild(getProduct)

                    let productCard = document.createElement("div")
                    productCard.classList.add("product-card")
                    getProduct.appendChild(productCard)

                    let productFrame = document.createElement("div")
                    productFrame.classList.add("product-frame")
                    productCard.appendChild(productFrame)

                    let productImage = document.createElement("img")
                    productImage.src = listOfProducts[item].imageUrl
                    productImage.classList.add("product-frame__image")
                    productFrame.appendChild(productImage)

                    let productInfo = document.createElement("div")
                    productInfo.classList.add("product-info")
                    productCard.appendChild(productInfo)

                    let productName = document.createElement("h3")
                    productName.innerText = listOfProducts[item].name
                    productName.classList.add("product-info__name")
                    productInfo.appendChild(productName)


                    let productPrice = document.createElement("span")
                    productPrice.innerHTML = listOfProducts[item].price/100 . toFixed(2)+'€'
                    productPrice.classList.add("product-info__price")
                    productInfo.appendChild(productPrice);

                }
        })
        .catch(function(err) {
            alert('Nous rencontrons un problème serveur, veulliez réessayer ultèrieurement.')
            console.log("Veuillez nous excuser, un problème est survenu.");
        });
}
