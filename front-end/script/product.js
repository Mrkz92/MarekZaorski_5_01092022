(async function () {
    const productId = getProductId()
    const productData = await getProductData(productId)
    await generateProduct(productData)
}
)()

function getProductId() {
    return new URL (location.href).searchParams.get("id")
}

function getProductData(productId){
    fetch(`http://localhost:3000/api/cameras/${productId}`)
    .then(res => res.json())
}

function generateProduct(productData) {
    console.log(productData)

    let productContainer = document.getElementById("product-container")
    
    let productCard = document.createElement("div")
    productCard.classList.add("product-card")
    productContainer.appendChild(productCard)

    let productFrame = document.createElement("div")
    productFrame.classList.add("product-frame")
    productCard.appendChild(productFrame)

    let productImage = document.createElement("img")
    productImage.src = productData.imageUrl

    let productName = document.createElement("h2")
    productName.innerText = productData.name
    productCard.appendChild(productName.innerText)
}