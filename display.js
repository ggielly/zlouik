// Ce fichier contient les fonctions de mise à jour de l'affichage dans le html
// on encapsule toutes les fonctions dans un unique objet "display" pour ensuite
// pouvoir les appeler de la sorte : display.nom_fonction()


var display = {

    // génération du menu des villes de départ
    menuVilles: function() {
        // Récupération de l'élément conteneur pour le menu déroulant des villes de départ
        const selectContainer = document.getElementById("villeDepart");
        // Insertion du menu déroulant des villes de départ dans l'élément conteneur
        if (selectContainer) {
            var villesDepartSet = new Set();
        
            // Ajout des villes de départ à l'ensemble
            data.forEach(function(trajet) {
                villesDepartSet.add(trajet.VilleDepart);
            });
            
            // Création du menu déroulant des villes de départ
            var options = "";
            // Itération sur l'ensemble des villes de départ uniques
            villesDepartSet.forEach(function(villeDepart) {
                options += "<option value='" + villeDepart + "'>" + villeDepart + "</option>\n";
            });

            selectContainer.innerHTML = options;
        } else {
            console.error("L'élément conteneur pour le menu des villes de départ n'existe pas dans le document.");
        }
    },

    // génération du menu du PRK
    menuPRK: function() {
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
    },


    // génération du menu des saisons
    menuSaisons: function() {
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
    },


    // Affichage des résultats en fonction de la ville de départ sélectionnée
    resultatsVille: function() {
        // Récupération de la ville de départ sélectionnée
        var selectElement = document.getElementById("villeDepart");
        if (selectElement) {
            var villeDepart = selectElement.value;

            // Filtrage des résultats pour la ville de départ sélectionnée
            var resultats = data.filter(function(trajet) {
                return trajet.VilleDepart === villeDepart;
            });

            // Génération du tableau des résultats si des résultats ont été trouvés
            var tableauHtml = "";
            if (resultats.length > 0) {
                tableauHtml = display.tableauResultats(resultats);

                // Récupération de l'élément conteneur pour le tableau des résultats
                var tableauContainer = document.getElementById("tableauResultats");

                // Affichage du tableau des résultats dans l'élément conteneur
                if (tableauContainer) {
                    tableauContainer.innerHTML = tableauHtml;
                } else {
                    console.error("L'élément conteneur pour le tableau des résultats n'existe pas dans le document.");
                }
            } else {
                // Aucun résultat trouvé pour la ville de départ sélectionnée
                console.log("Aucun résultat trouvé pour la ville de départ sélectionnée :", villeDepart);
            }
        }
        else {
            console.error("L'élément villeDepart n'existe pas dans le document.");
        }
    },


    tableauResultats: function(resultats, prkVoiture) {
        var totalPRK = 0;
        var totalIndemnitesKilometriques = 0;
        var totalRepas = 0;
        var totalHotels = 0;
        var totalGrandDeplacement = 0;
        var totalDistance = 0;
        var totalPeages = 0;
        var totalTempsTrajetMinutes = 0; // Utiliser une variable distincte pour le total des minutes de trajet

        // Récupération du pourcentage de grands déplacements autorisés
        var pourcentageGrandDeplacement = document.getElementById("pourcentageGrandDeplacement").value;

        // Séparation des résultats en deux catégories
        var grandsDeplacements = resultats.filter(trajet => parseFloat(trajet.Km) > 250);
        var petitsDeplacements = resultats.filter(trajet => parseFloat(trajet.Km) <= 250);

        // Calcul du nombre maximum de grands déplacements autorisés
        var maxGrandsDeplacementsAutorises = Math.round(grandsDeplacements.length * pourcentageGrandDeplacement / 100);

        // Ajustement de la liste des grands déplacements en fonction du pourcentage autorisé
        grandsDeplacements = grandsDeplacements.slice(0, maxGrandsDeplacementsAutorises);

        // Fusion des listes ajustées pour la génération du tableau
        var resultatsAjustes = grandsDeplacements.concat(petitsDeplacements);
        var nombreLignes = resultatsAjustes.length; // Utilisons la longueur de `resultatsAjustes` pour prendre en compte la contrainte de %age

        var indemniteChoisie = prime_montant_01; // Valeur de l'indemnité choisie
        var tableauHtml = "<table border='1'>";
        tableauHtml += "<tr><th>Domicile / Départ</th><th>Patinoire de destination</th><th>Distances</th><th>Péages routiers</th><th>Temps de trajet</th><th>Grand déplacement semaine 🚣</th><th>Indemnités kilométriques</th><th>Repas 🍟</th><th>Hôtel 🏰</th><th>Prime de match</th><th>Indemnités kilométriques - PRK</th></tr>";

        for (var i = 0; i < nombreLignes; i++) {
            var trajet = resultatsAjustes[i];       // Utilisation de `resultatsAjustes` pour prendre en compte la contrainte de %age
            var prk = trajet.Km > 0 ? trajet.Km * parseFloat(prkVoiture) : 0;

            var grandDeplacementSemaine = trajet.Km > 500 ? 80 : 0;
            var nombreRepas = trajet.Km > 500 ? 2 : 1;
            var prixHotel = trajet.Km > 500 ? 87 : 0;

            var indemniteKilometrique = (trajet.Km * 0.410).toFixed(2);
    
            tableauHtml += `<tr><td>${trajet.VilleDepart}</td><td>${trajet.VilleDestination}</td><td>${trajet.Km} Km</td><td>${trajet.Peages} €</td><td>${trajet.TempsTrajet}</td><td>${grandDeplacementSemaine}</td><td>${indemniteKilometrique} €</td><td>${nombreRepas * 17} €</td><td>${prixHotel} €</td><td>${indemniteChoisie} €</td><td>${parseFloat(prk).toFixed(2)} €</td></tr>`;
    
            totalIndemnitesKilometriques += parseFloat(indemniteKilometrique);
            totalRepas += nombreRepas * 17;
            totalHotels += prixHotel;
            totalGrandDeplacement += grandDeplacementSemaine;
            totalDistance += parseFloat(trajet.Km);
            totalPeages += parseFloat(trajet.Peages);
            totalPRK += parseFloat(prk);
    
            var [tempsTrajetHeures, tempsTrajetMinutes] = trajet.TempsTrajet.split("h").map(num => parseInt(num, 10));
            totalTempsTrajetMinutes += tempsTrajetHeures * 60 + tempsTrajetMinutes;
        }
    
        var totalHeuresTrajet = Math.floor(totalTempsTrajetMinutes / 60);
        var totalMinutesTrajet = totalTempsTrajetMinutes % 60;
    
        tableauHtml += `<tr><th colspan='1'>TOTAUX</th><td>${nombreLignes} matchs</td><td>${totalDistance} Km</td><td>${totalPeages.toFixed(2)} €</td><td>${totalHeuresTrajet}h${totalMinutesTrajet}</td><td>${totalGrandDeplacement.toFixed(2)} €</td><td>${totalIndemnitesKilometriques.toFixed(2)} €</td><td>${totalRepas.toFixed(2)} €</td><td>${totalHotels.toFixed(2)} €</td><td>${totalPRK.toFixed(2)} €</td></tr>`;
        tableauHtml += "</table>";
    
        var tauxHoraireEurosParHeure = ((totalIndemnitesKilometriques + totalPRK) / totalTempsTrajetMinutes) * 60;
        tableauHtml += `<div>Taux horaire: ${tauxHoraireEurosParHeure.toFixed(2)} €/heure</div>`;
    
        return tableauHtml;
    },  
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

