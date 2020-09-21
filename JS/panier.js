//récupération des données dans le local storage
let enregistrementTeddy = JSON.parse(localStorage.getItem('nouvelArticle'));

//----------------------------------------------------------------------\\
//création de la partie liste des produits

//récupération d'id html pour placer les données
const panierListe = document.getElementById('panier-list');

//Création d'une div row
const divRowPanierListe = document.createElement('div');
panierListe.appendChild(divRowPanierListe);
divRowPanierListe.className = 'row';

//verification si le panier contient des éléments
if (enregistrementTeddy == null || enregistrementTeddy.length === 0) {
  //---- si le panier est vide ----\\

  //création div col dans la div row
  const divColPanierListe = document.createElement('div');
  divRowPanierListe.appendChild(divColPanierListe);
  divColPanierListe.className = 'col-sm-12 text-center';
  //création du message pour le panier vide
  const panierVide = document.createElement('h2');
  divColPanierListe.appendChild(panierVide);
  panierVide.className =  "text-danger"
  panierVide.textContent = "votre panier est vide";
  } else {
      //-----S'il y a des éléments dans le panier création de la liste du panier -----\\
      //création de la variable pour faire le compteur
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

        //création div col dans la div row pour le bouton supprimer
        const divColPanierListeBouton = document.createElement('div');
        divRowPanierListe.appendChild(divColPanierListeBouton);
        divColPanierListeBouton.className = 'col-sm-3 text-center';

        //Création du bouton supprimer le produit sur une ligne
        const boutonSupprimerLigne = document.createElement('button');
        divColPanierListeBouton.appendChild(boutonSupprimerLigne);
        boutonSupprimerLigne.className = "btn btn-danger supprimer-ligne";
        boutonSupprimerLigne.id = i++;
        boutonSupprimerLigne.textContent = "Supprimer";
      };
      //boucle selectionner et supprimer la ligne de produit associé au bouton supprimer via la classe supprimer-ligne
      let supprimerLigne = document.getElementsByClassName('supprimer-ligne');
      for (let i = 0 ; i < supprimerLigne.length; i++) {
        supprimerLigne[i].addEventListener('click' , function (event) {
          event.preventDefault();
          //récupération de l'id de la ligne sélectionnée
          
          let id = this.closest(".supprimer-ligne").id;
          //alert('suppression id ' + supprimer-ligne.id)

          //suppression de la ligne
          enregistrementTeddy.splice(id, 1);
          
          //enregistrement des lignes dans le localstorage suite à la suppression
          localStorage.setItem('nouvelArticle', JSON.stringify(enregistrementTeddy));
          JSON.parse(localStorage.getItem('nouvelArticle'));
          //Message d'avertissement à l'utilisateur
          alert('Votre ligne a été supprimé du panier !')

          //retour sur la page d'acceuil
          window.location.href = "panier.html";
        });
      };
    // --------Calcul du montant total de la commande --------\\
    //création d'un array pour stocker les prix de chaque ligne
    let montantLigne = []
    for (enregistrement of enregistrementTeddy) {
      let ligne = enregistrement.teddyPrix;
      montantLigne.push(ligne);
    };
    //fonction pour le calcul de valeur dans un array
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const montantTotal = montantLigne.reduce(reducer, 0);
    //-----Insertion de la ligne de montant dans la page ---\\
    //création div col dans la div row pour le tarif montant Total
    const divColPanierTarifTotal = document.createElement('div');
    divRowPanierListe.appendChild(divColPanierTarifTotal);
    divColPanierTarifTotal.className = 'col-sm-12 text-center';

    //création du tarif du teddy pour la ligne du panier
    const panierTarifTotal = document.createElement('h3');
    divColPanierTarifTotal.appendChild(panierTarifTotal);
    panierTarifTotal.textContent = "Le montant total de la commande est de " + montantTotal + " €";
    panierTarifTotal.className = "montant-total"

    //-----Ajout du bouton pour mettre le panier à la poubelle ----\\
    
    //Création d'une div row
    const divRowSupprime = document.createElement('div');
    panierListe.appendChild(divRowSupprime);
    divRowSupprime.className = 'row';
    
    //création div col dans la div row pour le bouton vider le panier
    const divColSupprime = document.createElement('div');
    divRowSupprime.appendChild(divColSupprime);
    divColSupprime.className = 'col-sm-12 text-center';
    
    //Création du bouton supprimer le produit sur une ligne
    const boutonSupprimerTotal = document.createElement('button');
    divColSupprime.appendChild(boutonSupprimerTotal);
    boutonSupprimerTotal.className = "btn btn-danger supprimer-total";
    boutonSupprimerTotal.textContent = "Vider le panier";
    
    //Fonction pour supprimer les lignes du panier via la classe supprimer-total du bouton
    boutonSupprimerTotal.addEventListener("click" , function (retour) {
      retour.preventDefault();
      localStorage.removeItem('nouvelArticle');
      //Message d'avertissement à l'utilisateur
      alert('Votre panier a été vidé !')
      //retour sur la page d'acceuil
      window.location.href = "panier.html";
    });
    //variable pour déclancher la vérification des données du formulaire
    let validPanier = document.getElementById('valid-panier');
    //Variable pour récupérer les données de prenom, nom, adresse, ville, email
    let prenom = document.getElementById('prenom');
    let nom = document.getElementById('nom');
    let adresse = document.getElementById('adresse');
    let ville = document.getElementById('ville');
    let email = document.getElementById('email');
    //variable pour effectuer les tests de caractère sur les champs du formulaire
    let testNomVilleValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    let adresseValid = /^[A-Z-a-z-0-9\s]{5,80}$/;
    let emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    validPanier.addEventListener('click', validation);
    
    function validation(event){
        //vérification si le champ nom contient des caractères interdits
        if (testNomVilleValid.test(nom.value) == false){
            event.preventDefault();
            alert("votre nom n'est pas conforme")
            //vérification si le champ prénom contient des caractères interdits
        } else if (testNomVilleValid.test(prenom.value) == false){
            event.preventDefault();
            alert("votre prénom n'est pas conforme")
            //vérification si le champ adresse contient des caractères interdits
        } else if (adresseValid.test(adresse.value) == false){
            event.preventDefault();
            alert("votre adresse n'est pas conforme")
            //vérification si le champ ville contient des caractères interdits
        } else if (testNomVilleValid.test(ville.value) == false){
            event.preventDefault();
            alert("votre ville n'est pas conforme")
        } else if (emailValid.test(email.value) == false){
            event.preventDefault();
            alert("votre adresse mail n'est pas conforme")
            //envoie du montant total de la commande de le localstorage
      } else {event.preventDefault();
            localStorage.setItem('montantTotal', montantTotal);
            const prixSauver = localStorage.getItem('montantTotal');
            //---création d'un array pour mettre le contact et les produits----\\
            //création du contact
            let contact = {
              firstName: nom.value,
              lastName: prenom.value,
              address: adresse.value,
              city: ville.value,
              email: email.value,
            }
            //création du array pour les teddy en passant leur id
            let products = [];
            for (enregistrement of enregistrementTeddy) {
              let productsId = enregistrement.teddyId;
              products.push((productsId));
            }
            //fusion de contact et produit
            let fusion = {
              contact,
              products,
            }
            //------fonction pour envoie des données au serveur -----\\
            const envoie = async function (donnees) {
              try {
                let reponse = await fetch ('http://localhost:3000/api/teddies/order', {
                  method: 'POST',
                  body: JSON.stringify(donnees),
                  headers: {
                    'Content-type': 'application/json'
                  }
                });
                if (reponse.ok){
                  let donnees = await reponse.json();
                  localStorage.setItem("reponseOrder", donnees.orderId);
                  window.location = 'confirmation.html';
                } else {
                  event.preventDefault();
                  console.error('reponse du serveur : ', reponse.status);
                  alert ("L'erreur rencontrée est : " + reponse.status);
                }
              } catch (error){
                alert ("erreur : " + error);
              }
            };
            envoie(fusion);
        }
      };
  };
