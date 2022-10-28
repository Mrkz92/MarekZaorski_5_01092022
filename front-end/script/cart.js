const cartSection = document.querySelector('#cart-section');
    
const userInformations = 
    `<h2>Vos informations</h2>
    <form action="">
        <label for="last-name">Nom:</label>
        <input type="text" id="last-name" name="last-name">
        <label for="first-name">Prénom:</label>
        <input type="text" id="first-name" name="first-name"></br>
        <label for="adress">Adresse:</label>
        <input type="text" id="adress" name="adress">
        <label for="city">Ville:</label>
        <input type="text" id="city" name="city">
        <label for="email">Adresse mail:</label>  
        <input type="email" id="email" name="email">  
    </form>`;


/*------- Store the user's choice in the local storage -------*/
getCart();
function getCart() {
    if (localStorageContent === null) {
        alert("Le panier est vide.");
        const cartEmpty = document.createElement("div")
        cartEmpty.setAttribute("id", "cart-empty")
        cartEmpty.innerText = "Votre panier est vide."
        cartSection.appendChild(cartEmpty);
        return [];
    } else {   
        const cartContainer = document.createElement("div")
        cartContainer.innerHTML = `
            <h2>Votre panier</h2>
            <table class="cart-table" id="cart-table">
                <thead class="cart-table__part" id="cart-table__head">
                    <tr>
                        <th id="table-head__product--name">Produit</td>
                        <th id="table-head__product--option">Objectif</td>
                        <th id="table-head__product--price">Prix Unitaire</td>
                        <th id="table-head__product--quantity">Quantité</td>
                        <th id="table-head__product--total-price">Prix total</td>
                    </tr>
                </thead>
                <tbody class="cart-table__part" id="cart-table__body"></tbody>
                <tfoot class="cart-table__part" id="cart-table__foot"></tfoot> 
            </table>
            `;
        cartSection.appendChild(cartContainer);

        for(p = 0; p < localStorageContent.length; p++) {

            const cartNotEmpty = document.createElement("tr")
            cartNotEmpty.classList.add("table__product")
            cartNotEmpty.innerHTML = `
                <td class="table__product--name">${localStorageContent[p].name}</td>
                <td class="table__product--option">${localStorageContent[p].option}</td>
                <td class="table__product--price">${localStorageContent[p].price + ",00€"}</td>
                <td class="table__product--quantity">
                    ${"x" + localStorageContent[p].quantity}
                    <span class="change-quantity">
                        <i class="fa-solid fa-square-minus product-button__minus change-quantity__button"></i>
                        <i class="fa-solid fa-square-plus product-button__plus change-quantity__button"></i>
                    </span>
                </td>
                <td class="table__product--total-price">${(localStorageContent[p].price)*(localStorageContent[p].quantity) + ",00€"}</td>
                `;
            const cartBody = document.querySelector("#cart-table__body")
            cartBody.appendChild(cartNotEmpty);

            const productButtonMinus = () => {
                document.querySelector(".product-button__minus").addEventListener('click', (e) => {
                    localStorageContent[p].quantity = localStorageContent[p].quantity-1;
                    console.log(localStorageContent[product].quantity);
                    window.location.reload()
                });
            }

            // const productButtonPlus = () => document.querySelector(".product-button__plus")
            // productButtonPlus.setAttribute("type", "submit")
            // productButtonPlus.addEventListener('click', (e) => {
            //     localStorageContent[p].quantity = localStorageContent[p].quantity+1;
            //     console.log(localStorageContent[product].quantity);
            //     window.location.reload()
            // });

            // const changeQuantity = document.querySelector(".change-quantity")
            // changeQuantity.appendChild(productButtonPlus);

            const clearProductButton = document.createElement("button")
            clearProductButton.classList.add("remove-button")
            clearProductButton.setAttribute("id", "clear__product-button")
            clearProductButton.innerHTML = `<i class="fa-solid fa-trash"></i>`
            clearProductButton.addEventListener('click', () => {
                localStorage.clear(localStorageContent[p]);
                confirm(localStorageContent[p].name + " + " + localStorageContent[p].option + " a bien été retiré du panier.") 
                window.location.reload()
            });
            cartNotEmpty.appendChild(clearProductButton);
        };
        
        const cartTotal = document.createElement("tr")
        cartTotal.setAttribute("id", "cart__total")
        cartTotal.innerHTML = `
            <td id="cart__total--title">Total du panier</td>
            <td id="cart__total--quantity">${"x" + cartTotalQuantity}</td>
            <td id="cart__total--price">${cartTotalPrice + ",00€"}</td>
            `;
        const cartFoot = document.querySelector("#cart-table__foot")
        cartFoot.appendChild(cartTotal);

        const clearCartButton = document.createElement("button")
        clearCartButton.setAttribute("id", "clear__cart-button")
        clearCartButton.classList.add("remove-button")
        clearCartButton.setAttribute("type", "submit")
        clearCartButton.innerHTML = `<i class="fa-solid fa-trash"></i>`
        clearCartButton.addEventListener('click', () => {
            localStorage.clear();
            window.location.reload()
            confirm("Votre panier a bien été supprimé.")
        })
        cartTotal.appendChild(clearCartButton)

        const formSection = document.createElement("section")
        formSection.setAttribute("id","form-section")
        formSection.innerHTML = userInformations;
        document.querySelector("main").appendChild(formSection)
    }
}