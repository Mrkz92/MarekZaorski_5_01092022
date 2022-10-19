// const productId = new URL(location.href).searchParams.get("id");
// const productJson = fetch(`http://localhost:3000/api/cameras/${productId}`).then(res => res.json());
// console.log(productJson);

// async function getProductId() {
//     return new URL(location.href).searchParams.get("id");
// }

// async function getProductJson(productId) {
//     fetch(`http://localhost:3000/api/cameras/${productId}`).then(res => res.json());
// }


/*------- Get product's JSON's data from API -------*/
async function generateProductSheet() {
    const productId = new URL(location.href).searchParams.get("id");
    const productJson = await fetch(`http://localhost:3000/api/cameras/${productId}`).then(res => res.json());
    // console.log(productJson);
    return productJson;
};


/*------- Generate  and impregnate product's sheet's html with JSON's data-------*/
generateProductSheet()
    .then(function(productJson) {
        const product = productJson;

                /*------- Get the product's container's element -------*/
                const productContainer = document.getElementById("product-container");

                /*------- Create the product's sheet -------*/
                    const productSheet = document.createElement("div")
                    productSheet.setAttribute("id","product-sheet")
                    productContainer.appendChild(productSheet)

                        /*------- Create the product's image's frame -------*/
                        const productFrame = document.createElement("div")
                        productFrame.setAttribute("id","product-frame")
                        productSheet.appendChild(productFrame)

                            /*------- Create the product's image's element -------*/
                            const productImage = document.createElement("img")
                            productImage.setAttribute("id","product-frame__image")
                            productImage.src = product.imageUrl
                            productFrame.appendChild(productImage)
                        
                        /*------- Create the product's info's container -------*/
                        const productInfo = document.createElement("div")
                        productInfo.setAttribute("id","product-info")    
                        productSheet.appendChild(productInfo)

                            /*------- Create the product's name's element -------*/
                            const productName = document.createElement("h3")
                            productName.setAttribute("id","product-info__name")
                            productName.innerText = product.name
                            productInfo.appendChild(productName)

                            /*------- Create the description's paragraph's element -------*/
                            const productDescription = document.createElement("p")
                            productDescription.setAttribute("id","product-info__description")
                            productDescription.innerText = product.description
                            productInfo.appendChild(productDescription)

                            /*------- Create the product's price's element -------*/
                            const productPrice = document.createElement("p")
                            productPrice.setAttribute("id","product-info__price")
                            productPrice.innerText = product.price/100 . toFixed(2)+'€'
                            productInfo.appendChild(productPrice)
                            
                            /*------- Create the option's container -------*/
                            const productChoice = document.createElement("div")
                            productInfo.appendChild(productChoice)

                                /*------- Create the option's container's legend -------*/
                                const choiceLegend = document.createElement("legend")
                                choiceLegend.setAttribute("id","choice-legend")
                                choiceLegend.innerText = "Choisissez votre objectif"
                                productChoice.appendChild(choiceLegend)

                                /*------- Create the option's dropdown's selector -------*/
                                const choiceSelect = document.createElement("select")
                                choiceSelect.setAttribute("id","choice-select")
                                productChoice.appendChild(choiceSelect)
                                    
                                    /*------- Get option's JSON -------*/
                                    const optionJson = product.lenses;

                                    /*------- Fill option's elemnt with JSON -------*/
                                    fillOptionValue(choiceSelect, optionJson);
                                    function fillOptionValue(choiceSelect, optionJson) { 
                                        optionJson.forEach(each => {
                                            let selectOption = document.createElement("option")
                                            selectOption.label = each
                                            selectOption.value = each
                                            choiceSelect.appendChild(selectOption);
                                        })
                                    }

                            /*------- Create the button to send user's choice to cart -------*/
                            const productButton = document.createElement('button')
                            productButton.setAttribute('id',"product-info__button")
                            productButton.setAttribute('type',"submit")
                            productButton.innerHTML = "Ajouter au panier"
                            productInfo.appendChild(productButton);

        

        /*------- Store the user's choice in the local storage -------*/
        // function setCart(userChoice) {
        //     localStorage.setItem("product", JSON.stringify(userChoice));
        // }

        // function getCart() {
        //     let product = localStorage.getItem("product")
        //     if (product == null) {
        //         return [];
        //     } else {
        //         return JSON.parse(product);
        //     }
        // }

        // function pushCart(userChoice) {
        //     let cart = getCart();
        //     let foundProduct = cart.find(p => p.option == userChoice.option);
        //     if (foundProduct != undefined) {
        //         foundProduct.quantity++;
        //     } else {
        //         product.quantity = 1;
        //         cart.push(product);
        //     }
        //     setCart(product);
        // }

        // const sendToCart = document.getElementById("product-info__button")
        // sendToCart.addEventListener("onclick", pushCart(userChoice));

        /*------- Listen click button -------*/
        const storeProduct = document.querySelector("#product-info__button");
        storeProduct.addEventListener('click', (e) => {
            e.preventDefault

            /* ------- Get user's choice -------*/
            const userSelect = document.querySelector('select');
            let userOption = userSelect.value;

            let userChoice = {
                name: product.name,
                price: product.price /100,
                id: product._id,
                option: userOption,
                quantity: 0,
            };

            let cart = JSON.parse(localStorage.getItem("product"));

            /*------- Push user's choice in local.storage -------*/
            const pushProduct = () => {
                console.log(cart);
                cart.push(userChoice);
                localStorage.setItem("product", JSON.stringify(cart));
            }
            if (cart) {
                let foundProduct = cart.find(obj => obj.option == userChoice.option);
                
                if (foundProduct != undefined) {
                    pushProduct();
                    foundProduct.quantity++;
                }
                console.log(foundProduct);
                console.log(cart);
                console.log(foundProduct.quantity);
                console.log(obj);

            } else {
                cart = [];
                pushProduct();
                product.quantity = 1;
                console.log(cart);
                console.log(product.quantity);
            }
        });
});
                
