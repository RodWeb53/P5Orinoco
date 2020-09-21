//initialisation de constante pour rechercher l'ID dans l'url 
const adresseChoix = window.location.search;
const adresseRecu = new URLSearchParams (adresseChoix);
const id = adresseRecu.get ('id');


//création de la fonction général pour la page produit
const getTeddies = async function() {
  try{
    //création d'une variable pour récupérer la réponse de l'envoie fetch qui récupère l'id de l'url
    let reponse = await fetch('http://localhost:3000/api/teddies/' + id);
    //création d'une condition if si la réponse est ok
    if (reponse.status === 200){
      let teddies = await reponse.json();
      
      
      // récupération de la div avec id page-produit pour mettre le titre H1
      const divH1PageProduit = document.getElementById('page-produit');
      //création du h1 pour le titre du teddy
      const h1PageProduit = document.createElement('h1');
      divH1PageProduit.appendChild(h1PageProduit);
      h1PageProduit.textContent = 'Produit "' + teddies.name + '"';

      //--------------------------------------------------------------------\\

      // récupération de la div avec id produit-personaliser pour mettre la personnalisation du produit
      const divPageProduit = document.getElementById('produit-personaliser');

      //Création d'une div row dans la div produit-personnaliser
      const divRowProduit = document.createElement('div');
      divPageProduit.appendChild(divRowProduit);
      divRowProduit.className = 'row';

      //création div col dans la div row
      const divColProduit = document.createElement('div');
      divRowProduit.appendChild(divColProduit);
      divColProduit.className = 'col-sm-12 acceuil-ours';

      //création du descriptif pour l'ours sélectionné
      const titreDescriptifOurs = document.createElement('h2');
      divColProduit.appendChild(titreDescriptifOurs);
      titreDescriptifOurs.textContent = "Descriptif :";

      //création du descriptif pour l'ours sélectionné
      const descriptifOurs = document.createElement('p');
      divColProduit.appendChild(descriptifOurs);
      descriptifOurs.textContent = teddies.description;

      //création de l'image avec l'id de l'URL
      const imgProduit = document.createElement('img');
      divColProduit.appendChild(imgProduit);
      imgProduit.setAttribute('src', teddies.imageUrl);
      imgProduit.setAttribute('alt', "Ours en peluche qui s'appelle " + teddies.name);
      imgProduit.setAttribute('title', "Ours qui s'appelle " + teddies.name);
      imgProduit.setAttribute('width', "100%");

      //--------------------------------------------------------------------\\
      //création de la div liste de choix pour la personnalisation de Teddy
      //Création d'une div row
      const divRowChoix = document.createElement('div');
      divPageProduit.appendChild(divRowChoix);
      divRowChoix.className = 'row';

      //création div col dans la div row
      const divColChoix1 = document.createElement('div');
      divRowChoix.appendChild(divColChoix1);
      divColChoix1.className = 'col-sm-2';

      //création div col dans la div row pour mettre le label
      const divColChoix2 = document.createElement('div');
      divRowChoix.appendChild(divColChoix2);
      divColChoix2.className = 'col-sm-3 text-center';

      //création du label
      const divLabelChoix = document.createElement('label');
      divColChoix2.appendChild(divLabelChoix);
      divLabelChoix.textContent = 'Choisissez votre couleur';

      //création div col dans la div row pour mettre la liste déroulante
      const divColChoix3 = document.createElement('div');
      divRowChoix.appendChild(divColChoix3);
      divColChoix3.className = 'col-sm-3';

      //Création de la liste déroulante par la balise select
      const choixCouleur = document.createElement('select');
      divColChoix3.appendChild(choixCouleur);
      choixCouleur.className = 'form-control';
      choixCouleur.setAttribute('name', "couleur de " + teddies.name);
      choixCouleur.setAttribute('id', "choixCouleur-1");

      //création div col dans la div row pour afficher le tarif
      const divColTarif = document.createElement('div');
      divRowChoix.appendChild(divColTarif);
      divColTarif.className = 'col-sm-3 text-center';

      //création d'un paragraphe pour mettre le tarif
      const colTarif = document.createElement('div');
      divColTarif.appendChild(colTarif);
      colTarif.textContent = "Tarif : " + teddies.price / 100 + " €";

      //constante pour récupérer les couleurs de la base
      const couleur = teddies.colors;

      //création des options avec une boucle for
      for (i = 0; i < couleur.length; i++){
        const couleurOption = document.createElement('option');
        choixCouleur.appendChild(couleurOption);
        couleurOption.textContent = couleur [i];
        couleurOption.setAttribute("value", couleur[i]);
      }
      //------------------------------------------------------------------\\
      //Création du bouton ajouter au panier plus enregistrement dans le local storage
      //Création d'une div row
      const divRowValider = document.createElement('div');
      divPageProduit.appendChild(divRowValider);
      divRowValider.className = 'row';

      //création div col dans la div row
      const divColValider = document.createElement('div');
      divRowValider.appendChild(divColValider);
      divColValider.className = 'col-sm-12 text-center';


      //création du bouton ajouter au panier
      let ajoutPanier = document.createElement('button');
      divColValider.appendChild(ajoutPanier);
      ajoutPanier.className = "btn btn-primary produit-valider";
      ajoutPanier.type = 'submit';
      ajoutPanier.name = 'ajouter';
      ajoutPanier.id = 'ajouter';
      ajoutPanier.textContent = "Ajouter à votre panier";

      //ajout de la fonction pour l'écoute du click sur le bouton
      ajoutPanier.addEventListener('click', function (retour) {
        retour.preventDefault();

        //Ajout de la variable choixTeddy avec les données pour le local Storage
        let choixTeddy = {
          teddyNom: teddies.name,
          teddyId: teddies._id,
          teddyCouleur: choixCouleur.value,
          teddyPrix: teddies.price / 100,
          teddyQuantite: 1,
        };
        
        //enregistrement des données dans le local storage
        let enregistrementTeddy = JSON.parse(localStorage.getItem('nouvelArticle'));
        if (enregistrementTeddy){
          enregistrementTeddy.push(choixTeddy);
          localStorage.setItem('nouvelArticle', JSON.stringify(enregistrementTeddy));
          
          //envoi d'un message pour informer que le produit est dans le panier et poser une question
          if (window.confirm(teddies.name + " a été ajouté à votre panier. pour aller sur votre panier cliquez sur OK sinon cliquez sur Annuler pour revenir à la page d'accueil ?")) {
            window.location.href = "panier.html";
          }else {
            window.location.href = "index.html";
          }

        }else {
          enregistrementTeddy = [];
          enregistrementTeddy.push(choixTeddy);
          localStorage.setItem('nouvelArticle', JSON.stringify(enregistrementTeddy));
          
          if (window.confirm(teddies.name + "a été ajouté à votre panier. pour aller sur votre panier cliquez sur OK sinon cliquez sur Annuler pour revenir à la page d'accueil ?")) {
            window.location.href = "panier.html";
          }else {
            window.location.href = "index.html";
          }
        }
      });

      //création d'une conditon else si la réponse est ko
    } else {
      console.error('Le serveur retourne : ', reponse.status);
      alert("Une erreur est survenue : " + reponse.status);
    }
  } catch (error) {
    alert("l'erreur suivante est survenu : " + error);
  }

}
//lancement de la fonction
getTeddies();

