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
        const productContainer = document.getElementById("product-container")
        productContainer.innerHTML = `
            <div id="product-sheet">
                
                <div>
                    <div id="product-frame">
                        <h3 id="product-frame__name">${product.name}</h3>
                        <img id="product-frame__image" src="${product.imageUrl}" alt="image-product-${product.name}">
                    </div>
                    <div id="product-info">
                        <h3 id="product-info__name">${product.name}</h3>
                        <p id="product-info__description">
                            ${product.description}
                        </p>
                        <div id="product-info__choice">
                            <legend id="choice-legend">Choisissez votre objectif</legend>
                            <select id="choice-select">
                            </select>
                        </div>
                        <p id="product-info__price">${product.price/100 . toFixed(2)+'€'}</p>
                        <button id="product-info__button" class="button">Ajouter au panier</button>
                    </div>
                </div>
            </div>`;
            
                    const productInfo = document.getElementById("product-info")
                    const optionChoice = document.getElementById("product-info__choice")

                        /*------- Create the option's dropdown's selector -------*/
                        const choiceSelect = document.getElementById("choice-select")
                        optionChoice.appendChild(choiceSelect)
                            
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

                    /*------- Create the button to send user's choice to cart -------*/
                    const productButton = document.querySelector("#product-info__button");
                    productInfo.appendChild(productButton);

        /*------- Listen click button -------*/
        const storeProduct = document.querySelector("#product-info__button");
        storeProduct.addEventListener('click', () => {

            /* ------- Get user's choice -------*/
            const userSelect = document.querySelector('select');
            let userOption = userSelect.value;
            /* ------- Create the object to push in th local.storage -------*/
            let userChoice = {
                name: product.name,
                image: product.imageUrl,
                price: product.price /100,
                id: product._id,
                option: userOption,
                quantity: 0,
            };
            addProduct(userChoice);

            /*------- Push the object in local.storage -------*/
            // if (checkIfProductExist(userChoice)) {
            //     const localStorageContent = Array.from(JSON.parse(localStorage.getItem('product')));
            //     let indexOfObjectToIncrement = objIndex = localStorageContent.findIndex((obj => obj.option == userChoice.option));
            //     localStorageContent[indexOfObjectToIncrement].quantity = localStorageContent[indexOfObjectToIncrement].quantity+1;
            //     localStorage.setItem('product', JSON.stringify(localStorageContent));

            // } else {
            //     if(localStorage.length === 0) {
            //         const localStorageContent = [];
            //         localStorageContent.push(userChoice);
            //         localStorage.setItem('product', JSON.stringify(localStorageContent));
            //         confirm(product.name + " + " + userOption + " a bien été ajouté au panier.");
            //     } else {
            //         const localStorageContent = Array.from(JSON.parse(localStorage.getItem('product')));
            //         localStorageContent.push(userChoice);
            //         localStorage.setItem('product', JSON.stringify(localStorageContent));
            //         confirm(product.name + " + " + userOption + " a bien été ajouté au panier.");
            //     }
            // }
            // window.location.reload()
        });
});
                
