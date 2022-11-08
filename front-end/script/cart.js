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

fillCart();
function fillCart() {

    if (cart === null) {
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

        for(p = 0; p < cart.length; p++) {

            let focusProduct = cart[p];
            console.log(focusProduct.name + " " + focusProduct.option + " " + focusProduct.quantity);

            const cartNotEmpty = document.createElement("tr")
            cartNotEmpty.classList.add("table__product")
            cartNotEmpty.innerHTML = `
                <td class="table__product--name">${cart[p].name}</td>
                <td class="table__product--option">${cart[p].option}</td>
                <td class="table__product--price">${cart[p].price + ",00€"}</td>
                <td class="table__product--quantity">
                    ${"x" + cart[p].quantity}
                    <span class="change-quantity">
                        <button class="product-button product-button__minus change-quantity__button">
                            <i class="fa-solid fa-square-minus"></i>
                        </button>
                        <button class="product-button product-button__plus change-quantity__button">
                            <i class="fa-solid fa-square-plus product-button__plus change-quantity__button"></i>
                        </button>
                    </span>
                </td>
                <td class="table__product--total-price">${(cart[p].price)*(cart[p].quantity) + ",00€"}</td>
                <td class="">
                    <button class="product-button product-button__remove">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
                `;
            const cartBody = document.querySelector("#cart-table__body")
            cartBody.appendChild(cartNotEmpty);

            // const productButtonMinus = document.querySelectorAll(".product-button__minus")
            // productButtonMinus.addEventListener('click', () => {
            //     focusProduct.quantity = focusProduct.quantity-1;
            //     // window.location.reload()
            //     console.log(focusProduct.name + " " + focusProduct.option + " " + focusProduct.quantity);
            // });

            // const productButtonPlus = document.querySelectorAll(".product-button__plus")
            // productButtonPlus.addEventListener('click', () => {
            //     focusProduct.quantity = focusProduct.quantity+1;
            //     // window.location.reload()
            //     console.log(focusProduct.name + " " + focusProduct.option + " " + focusProduct.quantity);
            // });

            const productButtonRemove = () => {
                document.querySelectorAll(".product-button__remove")
                productButtonRemove.addEventListener("click", removeFromCart => {
                    window.location.reload();
                });
            }

            // const productButtonMinus = document.querySelectorAll("product-button__minus")
            // productButtonMinus.addEventListener("click", )
            // const productButtonPlus = document.querySelectorAll("product-button__plus");
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
        clearCartButton.classList.add("product-button", "remove-button")
        clearCartButton.innerHTML = `<i class="fa-solid fa-trash"></i>`
        clearCartButton.addEventListener('click', () => {
            localStorage.clear();
            window.location.reload()
            confirm("Votre panier a bien été supprimé.")
        });
        cartTotal.appendChild(clearCartButton);

        const formSection = document.createElement("section")
        formSection.setAttribute("id","form-section")
        formSection.innerHTML = userInformations;
        document.querySelector("main").appendChild(formSection)
    };
};