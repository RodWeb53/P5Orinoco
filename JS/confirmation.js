//-----Récupération des données pour faire la page de confirmation -----\\
//Récupération du N° de commande
let orderId = localStorage.getItem('reponseOrder');
console.log(orderId);

//récupération du montant total de la commande
const prixSauver = localStorage.getItem('montantTotal');
console.log(prixSauver);

//récupération des données dans le local storage
let enregistrementTeddy = JSON.parse(localStorage.getItem('nouvelArticle'));
console.log(enregistrementTeddy);


//------------ Paragraphe d'entête ----------------\\
//récupération d'id html pour placer les données de l'entête de confirma tion de cde
const teteConfirmation = document.getElementById('tete-confirmation');

//paragraphe pour confirmer le N° de commande
const paraTeteConf1 = document.createElement('p');
teteConfirmation.appendChild(paraTeteConf1);
paraTeteConf1.textContent = "Bonjour,";

const paraTeteConf2 = document.createElement('p');
teteConfirmation.appendChild(paraTeteConf2);
paraTeteConf2.textContent = "Nous avons le plaisir de vous confirmer l'enregistrement de votre commande référence :";

const paraTeteConf3 = document.createElement('p');
teteConfirmation.appendChild(paraTeteConf3);
paraTeteConf3.textContent = orderId;




//------ Section pour le détail de la commande -----\\
//récupération d'id html pour placer les données
const panierListe = document.getElementById('panier-confirmation');

//Création d'une div row
const divRowPanierListe = document.createElement('div');
panierListe.appendChild(divRowPanierListe);
divRowPanierListe.className = 'row';

//création div col dans la div row pour le descriptif du teddy
const divColDetailConf = document.createElement('div');
divRowPanierListe.appendChild(divColDetailConf);
divColDetailConf.className = 'col-sm-12 text-center detail-cde';

const detailConf = document.createElement('p');
divColDetailConf.appendChild(detailConf);
detailConf.textContent = "Détail de votre commande :"; 


let i = 0;
      for (enregistrement of enregistrementTeddy) {
      
        //création div col dans la div row pour le descriptif du teddy
        const divColPanierListeDescrip = document.createElement('div');
        divRowPanierListe.appendChild(divColPanierListeDescrip);
        divColPanierListeDescrip.className = 'col-sm-5 text-center';

        //création du descriptif du teddy pour la ligne du panier
        const colPanierListeDescrip = document.createElement('p');
        divColPanierListeDescrip.appendChild(colPanierListeDescrip);
        colPanierListeDescrip.textContent = enregistrement.teddyNom + " avec l'option de couleur " + enregistrement.teddyCouleur ;

        //création div col dans la div row pour la qté 
        const divColPanierListeQte = document.createElement('div');
        divRowPanierListe.appendChild(divColPanierListeQte);
        divColPanierListeQte.className = 'col-sm-2 text-center';

        //création de la qté du teddy pour la ligne du panier
        const colPanierListeQte = document.createElement('p');
        divColPanierListeQte.appendChild(colPanierListeQte);
        colPanierListeQte.textContent = "Qté " + enregistrement.teddyQuantite;

        //création div col dans la div row pour le tarif
        const divColPanierListeTarif = document.createElement('div');
        divRowPanierListe.appendChild(divColPanierListeTarif);
        divColPanierListeTarif.className = 'col-sm-2 text-center produitpanier';
        


        //création du tarif du teddy pour la ligne du panier
        const colPanierListeTarif = document.createElement('p');
        divColPanierListeTarif.appendChild(colPanierListeTarif);
        colPanierListeTarif.textContent = "Tarif " + enregistrement.teddyPrix + " €";

        //création div col dans la div row pour le tarif
        const divColPanierListeBouton = document.createElement('div');
        divRowPanierListe.appendChild(divColPanierListeBouton);
        divColPanierListeBouton.className = 'col-sm-3 text-center';
      };

//------------ Paragraphe montant de la commande ----------------\\
//récupération d'id html pour placer le montant total de la commande
const merciConfirmation = document.getElementById('merci-confirmation');

//paragraphe pour mettre le montant de la commande
const paramerciConf1 = document.createElement('h2');
merciConfirmation.appendChild(paramerciConf1);
paramerciConf1.textContent = "Le montant total de la commande est de " + prixSauver + "€"; 


//suppression des données du local storage
//localStorage.removeItem("nouvelArticle");
localStorage.clear();