//Fonction pour vérifier si le produit que l'utilisateur veut mettre dans le panier existe en recherchant par rapport à l'option
const checkIfProductExist = (productToCheck) =>
{   

    // Si localstorage a rien false
    if(localStorage.length === 0)
        return false;

        //Sinon tu fais un TABLEAU d'OBJECT pour pouvoir chercher plus facilement
    const localStorageContent = Array.from(JSON.parse(localStorage.getItem('product')));
    

    //Tu vérifies par rapport à l'option qui est unique
    if(localStorageContent.find(el => el.option === productToCheck.option) !== undefined)
        return true;

    else return false;
}