// Ce fichier contient les fonctions d'initialisation, celles qui sont appelées pour afficher dynamiquement certains menus 
// avant toute interaction utilisateur


// retourne l'élément <select> html contenant les villes de départ
var creerMenuVillesDepart = function() {
    // Création d'un ensemble pour stocker les villes de départ uniques
    var villesDepartSet = new Set();
    
    // Ajout des villes de départ à l'ensemble
    data.forEach(function(trajet) {
        villesDepartSet.add(trajet.VilleDepart);
    });
    
    // Création du menu déroulant des villes de départ
    var selectHtml = "<select id='selectVilleDepart' onchange='afficherResultats()'>";
    // Itération sur l'ensemble des villes de départ uniques
    villesDepartSet.forEach(function(villeDepart) {
        selectHtml += "<option value='" + villeDepart + "'>" + villeDepart + "</option>";
    });
    selectHtml += "</select>";
    return selectHtml;
};


// génération du menu des villes de départ
var menuVilles = function() {
    // Récupération de l'élément conteneur pour le menu déroulant des villes de départ
    const selectContainer = document.getElementById("menuVillesDepart");
    // Insertion du menu déroulant des villes de départ dans l'élément conteneur
    if (selectContainer) {
        selectContainer.innerHTML = creerMenuVillesDepart();
    } else {
        console.error("L'élément conteneur pour le menu des villes de départ n'existe pas dans le document.");
    }
};

// génération du menu du PRK
var menuPRK = function() {
    // Code HTML pour le menu déroulant PRKVoiture
    var selectPRK = "<label for='PRKVoiture'>Sélection du Prix de Revient Kilométrique (PRK) du véhicule : </label>";
    selectPRK += "<select id='PRKVoiture' onchange='updatePRK()'>";
    // Générer les options du menu déroulant pour les valeurs de PRK de 0.01 à 1.20 avec un pas de 0.01
    for (var i = 1; i <= 120; i++) {
        var prkOptionValue = (i / 100).toFixed(2); // Utilisation d'une variable différente pour éviter la réaffectation de prkValue
        selectPRK += "<option value='" + prkOptionValue + "'>" + prkOptionValue + "</option>";
    }
    selectPRK += "</select>";
    // Ajout du menu déroulant PRKVoiture à la page HTML
    document.getElementById("menuPRK").innerHTML = selectPRK;
};

// génération du menu des saisons
var menuSaisons = function() {
    // Récupération de l'élément select pour les saisons
    const selectSaison = document.getElementById("selectSaison");
    // Vérification si l'élément selectSaison existe
    if (selectSaison) {
        // Création des options du menu déroulant pour les saisons
        saison.forEach(function(annee) {
            const option = document.createElement("option");
            option.text = annee;
            option.value = annee;
            selectSaison.add(option);
        });
    } else {
        console.error("L'élément selectSaison n'existe pas dans le document.");
    }
};

// remplissage du array resultats avec les villes de destination calculées
var calculDestinations = function() {
    // Nombre total d'itérations à effectuer
    var nombreIterations = nbre_matchs_01 + nbre_matchs_02 + nbre_matchs_03; 

    // Récupération de l'élément selectVilleDepart
    var selectElement = document.getElementById("selectVilleDepart");

    // Vérification si l'élément selectVilleDepart existe
    if (selectElement) {
        var villeDepart = selectElement.value;
        // Calcul des itérations
        for (let i = 0; i < nombreIterations; i++) {
            // Choix aléatoire d'une ville de destination parmi celles disponibles pour la ville de départ sélectionnée
            var VilleDestinationsPossibles = data.filter(function(trajet) {
                return trajet.VilleDepart === villeDepart;
            });

            // Vérification si des villes de destination sont disponibles
            if (VilleDestinationsPossibles.length === 0) {
                console.warn("Aucune ville de destination trouvée pour la ville de départ :", villeDepart);
                continue; // Passer à l'itération suivante si aucune ville de destination n'est disponible
            }

            var indexVilleDestination = Math.floor(Math.random() * VilleDestinationsPossibles.length);
            var VilleDestination = VilleDestinationsPossibles[indexVilleDestination];

            // Ajout du trajet aux résultats
            resultats.push(VilleDestination);
        }
    } else {
        console.error("L'élément selectVilleDepart n'existe pas dans le document.");
    }
};