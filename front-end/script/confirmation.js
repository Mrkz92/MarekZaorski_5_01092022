const confirmOrderId = Math.random().toString(20).substr(2, 16);

const confirmOrderSection = document.querySelector("#confirm-order__section")
confirmOrderSection.innerHTML = `
    <div>
        <p id="message__order-recap" class="message message__order-recap">Votre commande <b>${confirmOrderId}</b> d'un montant total de <b>${cartTotalPrice}€</b> a été confirmée.</p>
        <p id="message__thanks" class="message message__thanks">Tout l'équipe d'Orinoco vous remercie pour votre confiance et nous éspérons vous revoir très bientôt sur notre plateforme.</p>
    </div>`;
