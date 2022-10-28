//Fonction pour vérifier si le produit que l'utilisateur veut mettre dans le panier existe en recherchant par rapport à l'option
const checkIfProductExist = (productToCheck) => {
    // Si localstorage a rien false
    if(localStorage.length === 0)
    return false;
    
    //Sinon tu fais un TABLEAU d'OBJECT pour pouvoir chercher plus facilement
    else {
        const localStorageContent = Array.from(JSON.parse(localStorage.getItem('product')));
        //Tu vérifies par rapport à l'option qui est unique
        if(localStorageContent.find(el => el.option === productToCheck.option) !== undefined) {
            return true;
            
        } else {return false}
    }
}

localStorageContent = JSON.parse(localStorage.getItem('product'));
console.log(localStorageContent)

// Calcul de la quantité et du prix total du panier
let  sumCartQuantity = [];
let  sumCartPrice = []; 

for(p = 0; p < localStorageContent.length; p++) {
    let productQuantity = localStorageContent[p].quantity;
    sumCartQuantity.push(productQuantity);
    let productTotalPrice = (localStorageContent[p].price)*(localStorageContent[p].quantity);
    sumCartPrice.push(productTotalPrice);
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const cartTotalQuantity = sumCartQuantity.reduce(reducer);
const cartTotalPrice = sumCartPrice.reduce(reducer);

// Ajout d'une span pour afficher la quantité du panier sur la navbar
if (localStorageContent) {
    const spanCartQuantity = document.querySelector("#span__cart-quantity")
    spanCartQuantity.setAttribute("id", "cart-counter")
    spanCartQuantity.innerText = cartTotalQuantity;
};