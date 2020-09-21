//création d'une fonction async pour la récupération des données et création du contenu de la page d'acceuil
const getTeddies = async function() {
  try{
    //création d'une variable pour récupérer la réponse de l'envoie fetch
    let reponse = await fetch('http://localhost:3000/api/teddies/');
    //création d'une condition if si la réponse est ok
    if (reponse.status === 200){
      let teddies = await reponse.json();
      
      //création d'une boucle pour récupérer les données de fetch et créer la page index.html
      for (let teddy of teddies){
        // récupération de la div avec id teddies de la page index.html pour la mettre dans une constante
        const divTeddies = document.getElementById('teddies');

        //Création d'une div row dans la div teddies
        const divRowTeddies = document.createElement('div');
        divTeddies.appendChild(divRowTeddies);
        divRowTeddies.className = 'row';

        //création div col dans la div row
        const divColTeddies = document.createElement('div');
        divRowTeddies.appendChild(divColTeddies);
        divColTeddies.className = 'col-sm-12 text-center acceuil-ours';

        //création du h3 pour le titre du teddy
        const h3RefTeddies = document.createElement('h3');
        divColTeddies.appendChild(h3RefTeddies);
        h3RefTeddies.textContent = teddy.name;

        //création du tarif pour le teddy
        const prixTeddies = document.createElement('p');
        divColTeddies.appendChild(prixTeddies);
        prixTeddies.textContent = teddy.price / 100 + " €";

        //création de l'image du teddy
        const imgTeddies = document.createElement('img');
        divColTeddies.appendChild(imgTeddies);
        imgTeddies.setAttribute('src', teddy.imageUrl);
        imgTeddies.setAttribute('alt', "Ours en peluche qui s'appelle " + teddy.name);
        imgTeddies.setAttribute('title', "Ours qui s'appelle " + teddy.name);
        imgTeddies.setAttribute('width', "100%");

        //création du lien pour aller vers la page produit
        const ligneProduit = document.createElement('a');
        ligneProduit.textContent = "Cliquez pour personnaliser " + teddy.name;
        divColTeddies.appendChild(ligneProduit);
        ligneProduit.href = "produit.html?id=" + teddy._id;
        ligneProduit.setAttribute('title', "Venez découvrir" + teddy.name);
        
        

      }
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


