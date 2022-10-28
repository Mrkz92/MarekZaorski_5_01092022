/*------- Get product's JSON's data from API -------*/
async function generateProductSheet() {
    const productId = new URL(location.href).searchParams.get("id");
    const productJson = await fetch(`http://localhost:3000/api/cameras/${productId}`).then(res => res.json());
    return productJson;
};

/*------- Generate  and impregnate product's sheet's html with JSON's data-------*/
generateProductSheet()
    .then(function(productJson) {
        const product = productJson;
        
        /*------- Get the product's container's element -------*/
        const productContainer = document.getElementById("product-container");
        
            /*------- Create the product's name's element -------*/
            const productName = document.createElement("h2")
            productName.setAttribute("id","product-sheet__name")
            productName.innerText = product.name
            productContainer.appendChild(productName)
            
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
                            
                    /*------- Create the description's paragraph's element -------*/
                    const productDescription = document.createElement("p")
                    productDescription.setAttribute("id","product-info__description")
                    productDescription.innerText = product.description
                    productInfo.appendChild(productDescription)
                    
                    /*------- Create the option's container -------*/
                    const productChoice = document.createElement("div")
                    productChoice.setAttribute("id", "product-info__choice")
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
                                    selectOption.classList.add("select-option")
                                    selectOption.label = each
                                    selectOption.value = each
                                    selectOption.innerText = each
                                    choiceSelect.appendChild(selectOption);
                                })
                            }
                    
                    /*------- Create the product's price's element -------*/
                    const productPrice = document.createElement("p")
                    productPrice.setAttribute("id","product-info__price")
                    productPrice.innerText = product.price/100 . toFixed(2)+'€'
                    productInfo.appendChild(productPrice)

                    /*------- Create the button to send user's choice to cart -------*/
                    const productButton = document.createElement('button')
                    productButton.setAttribute('id',"product-info__button")
                    productButton.classList.add("button")
                    productButton.setAttribute('type',"submit")
                    productButton.innerHTML = "Ajouter au panier"
                    productInfo.appendChild(productButton);

        /*------- Listen click button -------*/
        const storeProduct = document.querySelector("#product-info__button");
        storeProduct.addEventListener('click', () => {

            /* ------- Get user's choice -------*/
            const userSelect = document.querySelector('select');
            let userOption = userSelect.value;

            let userChoice = {
                name: product.name,
                price: product.price /100,
                id: product._id,
                option: userOption,
                quantity: 1,
            };

            /*------- Push user's choice in local.storage -------*/
            if (checkIfProductExist(userChoice)) {
                const localStorageContent = Array.from(JSON.parse(localStorage.getItem('product')));
                let indexOfObjectToIncrement = objIndex = localStorageContent.findIndex((obj => obj.option == userChoice.option));
                localStorageContent[indexOfObjectToIncrement].quantity = localStorageContent[indexOfObjectToIncrement].quantity+1;
                localStorage.setItem('product', JSON.stringify(localStorageContent));

            } else {
                if(localStorage.length === 0) {
                    const localStorageContent = [];
                    localStorageContent.push(userChoice);
                    localStorage.setItem('product', JSON.stringify(localStorageContent));
                    confirm(product.name + " + " + userOption + " a bien été ajouté au panier.");
                } else {
                    const localStorageContent = Array.from(JSON.parse(localStorage.getItem('product')));
                    localStorageContent.push(userChoice);
                    localStorage.setItem('product', JSON.stringify(localStorageContent));
                    confirm(product.name + " + " + userOption + " a bien été ajouté au panier.");
                }
            }
            window.location.reload()
        });
});
                
