// Ce fichier contient les fonctions de mise à jour de l'affichage dans le html.

// On encapsule toutes les fonctions dans un unique objet "var display" pour ensuite
// pouvoir les appeler de la sorte : display.nom_fonction() depuis init()
// Ceci permet de savoir quelles fonctions ne servent que à l'affichage


// bibliothèque d'affichage display
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
            var first = true;
            villesDepartSet.forEach(function(villeDepart) {
                var sel = "";
                if (first) {
                    sel = " selected";
                    first = false;
                }
                options += "<option value='" + villeDepart + "'"+ sel + ">" + villeDepart + "</option>\n";
            });
            selectContainer.innerHTML = options;
        } else {
            console.error("L'élément conteneur pour le menu des villes de départ n'existe pas dans le document.");
        }
    },

    // génération du menu du PRK
    menuPRK: function() {
        var options = "";
        // Générer les options du menu déroulant pour les valeurs de PRK de 0.01 à 1.20 avec un pas de 0.01
        for (var i = 1; i <= 120; i++) {
            var prkOptionValue = (i / 100).toFixed(2); // Utilisation d'une variable différente pour éviter la réaffectation de prkValue
            options += "<option value='" + prkOptionValue + "'>" + prkOptionValue + "</option>\n";
        }
        // Ajout des options dans le select menuPRK
        document.getElementById("menuPRK").innerHTML = options;
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


    // Affichage des résultats du tableau historique en fonction de la ville de départ sélectionnée
    updateHistoriqueVille: function() {
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

                var prkVoiture = parseFloat(document.getElementById('menuPRK').value);
                var tableauHtml = display.tableauHistorique(resultats, prkVoiture);

                // Récupération de l'élément conteneur pour le tableau des résultats
                var tableauContainer = document.getElementById("tableauHistorique");

                // Affichage du tableau des résultats dans l'élément conteneur
                if (tableauContainer) {
                    tableauContainer.innerHTML = tableauHtml;
                } else {
                    console.error("L'élément conteneur pour le tableau historique n'existe pas dans le document.");
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

    // génère le tableau historique de résultats
    // renvoie un tableau html, ne pas appeler directement
    tableauHistorique: function(resultats, prkVoiture) {
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

        var indemniteChoisie = parseInt(document.getElementById('indemniteChoisieForm').indemnite.value);
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

    // Mise à jour du tableau historique avec le PRKVoiture sélectionné
    updateHistoriquePRK: function() {
        // Récupérer la valeur sélectionnée du PRKVoiture dans le menu déroulant
        var prkVoiture = document.getElementById("menuPRK").value;
        // Récupérer l'élément conteneur du tableau des résultats
        var tableauContainer = document.getElementById("tableauHistorique");
        if (tableauContainer) {
            // Mettre à jour le contenu du tableau des résultats avec les données et le PRKVoiture sélectionné
            tableauContainer.innerHTML = display.tableauHistorique(data, prkVoiture);
        } else {
            console.error("L'élément conteneur pour le tableau historique des résultats n'existe pas dans le document.");
        }
    },

    // Mise à jour de l'ensemble des tableaux prévisionnels de la fédération
    updateTableauxFederation: function() {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des résultats dans le tableau 1 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.getElementById("cell2_1").innerHTML = nbre_matchs_01; // Nombre de matchs (match 1)
        document.getElementById("cell4_1").innerHTML = pourcentage_urssaf + " %"; // % URSSAF
        document.getElementById("cell5_1").innerHTML = cotisations_urssaf_par_match_01.toLocaleString('fr-FR') + " €"; // Cotisations URSSAF par match (match 1)
        document.getElementById("cell6_1").innerHTML = net_match_01.toLocaleString('fr-FR') + " €"; // Net par match (match 1)
        document.getElementById("cell7_1").innerHTML = brut_annuel_01.toLocaleString('fr-FR') + " €"; // Brut annuel 
        document.getElementById("cell8_1").innerHTML = cotisations_annuelles_01.toLocaleString('fr-FR') + " €"; // Cotisations annuelles
        document.getElementById("cell9_1").innerHTML = net_urssaf_annuel_01.toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("cell10_1").innerHTML = frais_par_match01.toLocaleString('fr-FR') + " €"; // Nos frais par match
        document.getElementById("cell11_1").innerHTML = frais_annuel_01.toLocaleString('fr-FR') + " €"; // Nos frais de l'ensemble des matchs annuels
        document.getElementById("cell12_1").innerHTML = resultat_net_01.toLocaleString('fr-FR') + " €"; // Caillasse annuelle
        
        // Ligne 2
        document.getElementById("cell2_2").innerHTML = nbre_matchs_02; // Nombre de matchs (match 2)
        document.getElementById("cell4_2").innerHTML = pourcentage_urssaf + " %"; // % URSSAF
        document.getElementById("cell5_2").innerHTML = cotisations_urssaf_par_match_02 + " €"; // Cotisations URSSAF par match (match 2)
        document.getElementById("cell6_2").innerHTML = net_match_02.toLocaleString('fr-FR') + " €"; // Net par match (match 2)
        document.getElementById("cell7_2").innerHTML = brut_annuel_02.toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("cell8_2").innerHTML = cotisations_annuelles_02.toLocaleString('fr-FR') + " €"; // Cotisations annuelles
        document.getElementById("cell9_2").innerHTML = net_urssaf_annuel_02.toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("cell10_2").innerHTML = frais_par_match02.toLocaleString('fr-FR') + " €"; // Nos frais par match
        document.getElementById("cell11_2").innerHTML = frais_annuel_02.toLocaleString('fr-FR') + " €"; // Nos frais de l'ensemble des matchs annuels
        document.getElementById("cell12_2").innerHTML = resultat_net_02.toLocaleString('fr-FR') + " €"; // Caillasse annuelle
    
        // Ligne 3
        document.getElementById("cell2_3").innerHTML = nbre_matchs_03; // Nombre de matchs (match 3)
        document.getElementById("cell4_3").innerHTML = pourcentage_urssaf + " %"; // % URSSAF
        document.getElementById("cell5_3").innerHTML = cotisations_urssaf_par_match_03 + " €"; // Cotisations URSSAF par match (match 3)
        document.getElementById("cell6_3").innerHTML = net_match_03 + " €"; // Net par match (match 3)
        document.getElementById("cell7_3").innerHTML = brut_annuel_03.toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("cell8_3").innerHTML = cotisations_annuelles_03.toLocaleString('fr-FR') + " €"; // Cotisations annuelles
        document.getElementById("cell9_3").innerHTML = net_urssaf_annuel_03.toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €"; // Nos frais par match
        document.getElementById("cell11_3").innerHTML = frais_annuel_03.toLocaleString('fr-FR') + " €"; // Nos frais de l'ensemble des matchs annuels
        document.getElementById("cell12_3").innerHTML = resultat_net_03.toLocaleString('fr-FR') + " €"; // Caillasse annuelle
    
        // Ligne 4 => Sommes annuelles
        const totalmatch = parseInt(nbre_matchs_01) + parseInt(nbre_matchs_02) + parseInt(nbre_matchs_03);
        document.getElementById("cell2_4").innerHTML = totalmatch.toLocaleString('fr-FR'); // Nombre de matchs ANNUEL
    
        document.getElementById("cell7_4").innerHTML = (brut_annuel_01 + brut_annuel_02 + brut_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des bruts sur la saison
        document.getElementById("cell8_4").innerHTML = (cotisations_annuelles_01 + cotisations_annuelles_02 + cotisations_annuelles_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des cotisations sur la saison
        document.getElementById("cell9_4").innerHTML = (net_urssaf_annuel_01 + net_urssaf_annuel_02 + net_urssaf_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des nets sur la saison
        document.getElementById("cell11_4").innerHTML = (frais_annuel_01 + frais_annuel_02 + frais_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais sur la saison
        document.getElementById("cell12_4").innerHTML = (resultat_net_01 + resultat_net_02 + resultat_net_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des resultats sur la saison
        
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des resultats dans le tableau 2 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.getElementById("tns_ir_cell2_1").innerHTML = nbre_matchs_01; // Nombre de matchs (match 1)
        document.getElementById("tns_ir_cell4_1").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("tns_ir_cell5_1").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 1)
        document.getElementById("tns_ir_cell6_1").innerHTML = (urssaf_zero + prime_montant_01).toLocaleString('fr-FR') + " €"; // Net par match (match 1)
        document.getElementById("tns_ir_cell7_1").innerHTML = (nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_ir_cell8_1").innerHTML = urssaf_zero * nbre_matchs_01 + " €"; // Cotisations annuelles
        document.getElementById("tns_ir_cell9_1").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') +" €"; // Net d'URSSAF annuel
        document.getElementById("tns_ir_cell10_1").innerHTML = frais_par_match01.toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("tns_ir_cell11_1").innerHTML = frais_annuel_01.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("tns_ir_cell12_1").innerHTML = resultat_intermediaire_01 + " €"; // Resultat intermédiaire
    
        document.getElementById("tns_ir_cell13_1").innerHTML = frais_banque + " €"; // Frais annexes
    
        // colone 15 ligne 1 - cotisations sociales
        document.getElementById("tns_ir_cell15_1").innerHTML = CotisationsSociales.toLocaleString('fr-FR') + " €"; // Cotisations sociales
    
        document.getElementById("tns_ir_cell2_2").innerHTML = nbre_matchs_02; // Nombre de matchs (match 2)
        document.getElementById("tns_ir_cell4_2").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("tns_ir_cell5_2").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 2)
        document.getElementById("tns_ir_cell6_2").innerHTML = urssaf_zero + prime_montant_02 + " €"; // Net par match (match 2)
        document.getElementById("tns_ir_cell7_2").innerHTML = (nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_ir_cell8_2").innerHTML = urssaf_zero * nbre_matchs_02 + " €"; // Cotisations annuelles
        document.getElementById("tns_ir_cell9_2").innerHTML = (urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') +" €"; // Net d'URSSAF annuel
        document.getElementById("tns_ir_cell10_2").innerHTML = frais_par_match02 + " €"; // Frais par match
        document.getElementById("tns_ir_cell11_2").innerHTML = frais_annuel_02.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("tns_ir_cell12_2").innerHTML = resultat_intermediaire_02.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("tns_ir_cell13_2").innerHTML = frais_comptable.toLocaleString('fr-FR') + " €"; // Frais annexes
        document.getElementById("tns_ir_cell15_2").innerHTML = Salaires.toLocaleString('fr-FR') + " €"; // Salaires
        document.getElementById("tns_ir_cell2_3").innerHTML = nbre_matchs_03; // Nombre de matchs (match 3)
        document.getElementById("tns_ir_cell4_3").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("tns_ir_cell5_3").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 3)
        document.getElementById("tns_ir_cell6_3").innerHTML = urssaf_zero + prime_montant_03 + " €"; // Net par match (match 3)
        document.getElementById("tns_ir_cell7_3").innerHTML = (nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_ir_cell8_3").innerHTML = urssaf_zero * nbre_matchs_03 + " €"; // Cotisations annuelles
        document.getElementById("tns_ir_cell9_3").innerHTML = (urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') +" €"; // Net d'URSSAF annuel
        document.getElementById("tns_ir_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("tns_ir_cell11_3").innerHTML = frais_annuel_03.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("tns_ir_cell12_3").innerHTML = resultat_intermediaire_03.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("tns_ir_cell13_3").innerHTML = frais_urssaf.toLocaleString('fr-FR') + " €"; // Frais URSSAF
        // IR colone 15 ligne 3
        document.getElementById("tns_ir_cell15_3").innerHTML = (impotsSurLeRevenu.toFixed(2)).toLocaleString('fr-FR') + " €"; // impots sur le revenu
        // Ligne 4 => Sommes annuelles
        document.getElementById("tns_ir_cell2_4").innerHTML = totalmatch.toLocaleString('fr-FR'); // Nombre de matchs ANNUEL
        document.getElementById("tns_ir_cell7_4").innerHTML = (nbre_matchs_01 * prime_montant_01 + nbre_matchs_02 * prime_montant_02 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des bruts sur la saison
        document.getElementById("tns_ir_cell8_4").innerHTML = (urssaf_zero * nbre_matchs_01 + urssaf_zero * nbre_matchs_02 + urssaf_zero * nbre_matchs_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des cotisations URSSAF
        document.getElementById("tns_ir_cell9_4").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01 + urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02 + urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des nets d'URSSAF
        document.getElementById("tns_ir_cell11_4").innerHTML = (frais_annuel_01 + frais_annuel_02 + frais_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais sur la saison
        document.getElementById("tns_ir_cell12_4").innerHTML = (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des resultats sur la saison
        document.getElementById("tns_ir_cell13_4").innerHTML = (frais_banque + frais_comptable + frais_urssaf).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais annexes sur la saison
        document.getElementById("tns_ir_cell14_4").innerHTML = (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03 - frais_banque - frais_comptable - frais_urssaf).toLocaleString('fr-FR') + " €"; // Résultat net
        document.getElementById("tns_ir_cell15_4").innerHTML = (AC16 - impotsSurLeRevenu).toLocaleString('fr-FR') + " €"; // impots sur le revenu
        document.getElementById("tns_ir_cell16_4").innerHTML = AC16.toLocaleString('fr-FR'); // impots sur le revenu
    
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des resultats dans le tableau 3 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.getElementById("tns_is_cell2_1").innerHTML = nbre_matchs_01; // Nombre de matchs (match 1)
        document.getElementById("tns_is_cell4_1").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("tns_is_cell5_1").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 1)
        document.getElementById("tns_is_cell6_1").innerHTML = urssaf_zero + prime_montant_01 + " €"; // Net par match (match 1)
        document.getElementById("tns_is_cell7_1").innerHTML = (nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_is_cell8_1").innerHTML = (urssaf_zero * nbre_matchs_01).toLocaleString('fr-FR') + " €"; // Cotisations annuelles
        document.getElementById("tns_is_cell9_1").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') +" €"; // Net d'URSSAF annuel
        document.getElementById("tns_is_cell10_1").innerHTML = (frais_par_match01).toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("tns_is_cell11_1").innerHTML = (frais_annuel_01).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("tns_is_cell12_1").innerHTML = (resultat_intermediaire_01).toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("tns_is_cell13_1").innerHTML = frais_banque + " €"; // Frais annexes
    
        // Ligne 2
        document.getElementById("tns_is_cell2_2").innerHTML = nbre_matchs_02; // Nombre de matchs (match 2)
        document.getElementById("tns_is_cell4_2").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("tns_is_cell5_2").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 2)
        document.getElementById("tns_is_cell6_2").innerHTML = (urssaf_zero + prime_montant_02).toLocaleString('fr-FR') + " €"; // Net par match (match 2)
        document.getElementById("tns_is_cell7_2").innerHTML = (nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_is_cell8_2").innerHTML = urssaf_zero * nbre_matchs_02 + " €"; // Cotisations annuelles
        document.getElementById("tns_is_cell9_2").innerHTML = (urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') +" €"; // Net d'URSSAF annuel
        document.getElementById("tns_is_cell10_2").innerHTML = frais_par_match02 + " €"; // Frais par match
        document.getElementById("tns_is_cell11_2").innerHTML = (frais_annuel_02).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("tns_is_cell12_2").innerHTML = resultat_intermediaire_02.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("tns_is_cell13_2").innerHTML = frais_comptable + " €"; // Frais annexes
    
        document.getElementById("tns_is_cell15_2").innerHTML = (resultat_net_is_TNS * (15 / 100)).toLocaleString('fr-FR') + " €"; // Salaires
        document.getElementById("tns_is_cell16_2").innerHTML = montantFinal.toLocaleString('fr-FR') + " €"; // Impot sur les dividendes
    
        // Ligne 3
        document.getElementById("tns_is_cell2_3").innerHTML = nbre_matchs_03; // Nombre de matchs (match 3)
        document.getElementById("tns_is_cell4_3").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("tns_is_cell5_3").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 3)
        document.getElementById("tns_is_cell6_3").innerHTML = (urssaf_zero + prime_montant_03).toLocaleString('fr-FR') + " €"; // Net par match (match 3)
        document.getElementById("tns_is_cell7_3").innerHTML = (nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_is_cell8_3").innerHTML = urssaf_zero * nbre_matchs_03 + " €"; // Cotisations annuelles
        document.getElementById("tns_is_cell9_3").innerHTML = (urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') +" €"; // Net d'URSSAF annuel
    
        document.getElementById("tns_is_cell10_3").innerHTML = frais_par_match03 + " €"; // Frais par match
        document.getElementById("tns_is_cell11_3").innerHTML = (frais_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
    
        document.getElementById("tns_is_cell12_3").innerHTML = resultat_intermediaire_03.toLocaleString('fr-FR')  + " €"; // Resultat intermédiaire
        document.getElementById("tns_is_cell13_3").innerHTML = frais_urssaf.toLocaleString('fr-FR') + " €"; // Frais annexes
    
    
        // Ligne 4 => Sommes annuelles
        document.getElementById("tns_is_cell2_4").innerHTML = totalmatch; // Nombre de matchs ANNUEL
        document.getElementById("tns_is_cell7_4").innerHTML = (brut_annuel_01 + brut_annuel_02 + brut_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des bruts sur la saison
        document.getElementById("tns_is_cell8_4").innerHTML = (urssaf_zero * nbre_matchs_01 + urssaf_zero * nbre_matchs_02 + urssaf_zero * nbre_matchs_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des cotisations URSSAF
        document.getElementById("tns_is_cell9_4").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01 + urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02 + urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des nets d'URSSAF
        document.getElementById("tns_is_cell11_4").innerHTML = (frais_annuel_01 + frais_annuel_02 + frais_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais sur la saison
        document.getElementById("tns_is_cell12_4").innerHTML = (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des resultats sur la saison
        document.getElementById("tns_is_cell13_4").innerHTML = (frais_banque + frais_comptable + frais_urssaf).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais annexes sur la saison
        document.getElementById("tns_is_cell14_4").innerHTML = resultat_net_is_TNS.toLocaleString('fr-FR') + " €"; // Résultat net
        // Résultat net - AC22
        //console.log("AC24 : " + AC24);
        document.getElementById("tns_is_cell15_4").innerHTML = AC24.toLocaleString('fr-FR') + " €"; // impots sur le revenu
    
        document.getElementById("tns_is_cell16_4").innerHTML = (AC24 * (1 - ((30/100)))).toLocaleString('fr-FR') + " €"; // impots sur le revenu
    
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des resultats dans le tableau 4 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.getElementById("sasu_ir_cell2_1").innerHTML = nbre_matchs_01; // Nombre de matchs (match 1)
        document.getElementById("sasu_ir_cell4_1").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("sasu_ir_cell5_1").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 1)
        document.getElementById("sasu_ir_cell6_1").innerHTML = (urssaf_zero + prime_montant_01).toLocaleString('fr-FR') + " €"; // Net par match (match 1)
        document.getElementById("sasu_ir_cell7_1").innerHTML = (nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("sasu_ir_cell8_1").innerHTML = (urssaf_zero * nbre_matchs_01).toLocaleString('fr-FR') + " €"; // Cotisations annuelles
        document.getElementById("sasu_ir_cell9_1").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') +" €"; // Net d'URSSAF annuel
        document.getElementById("sasu_ir_cell10_1").innerHTML = frais_par_match01.toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("sasu_ir_cell11_1").innerHTML = frais_annuel_01.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_ir_cell12_1").innerHTML = resultat_intermediaire_01.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("sasu_ir_cell13_1").innerHTML = (frais_banque + frais_comptable + frais_urssaf).toLocaleString('fr-FR') + " €"; // Frais annexes
    
        // Ligne 2
        document.getElementById("sasu_ir_cell2_2").innerHTML = nbre_matchs_02; // Nombre de matchs (match 2)
        document.getElementById("sasu_ir_cell4_2").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("sasu_ir_cell5_2").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 2)
        document.getElementById("sasu_ir_cell6_2").innerHTML = (urssaf_zero + prime_montant_02).toLocaleString('fr-FR') + " €"; // Net par match (match 2)
        document.getElementById("sasu_ir_cell7_2").innerHTML = (nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("sasu_ir_cell8_2").innerHTML = urssaf_zero * nbre_matchs_02.toLocaleString('fr-FR') + " €"; // Cotisations annuelles
        document.getElementById("sasu_ir_cell9_2").innerHTML = (urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') +" €"; // Net d'URSSAF annuel
        document.getElementById("sasu_ir_cell10_2").innerHTML = (frais_par_match02).toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("sasu_ir_cell11_2").innerHTML = frais_annuel_02.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_ir_cell12_2").innerHTML = resultat_intermediaire_02.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
    
        // Ligne 3
        document.getElementById("sasu_ir_cell2_3").innerHTML = nbre_matchs_03; // Nombre de matchs (match 3)
        document.getElementById("sasu_ir_cell4_3").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("sasu_ir_cell5_3").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 3)
        document.getElementById("sasu_ir_cell6_3").innerHTML = (urssaf_zero + prime_montant_03).toLocaleString('fr-FR') + " €"; // Net par match (match 3)
        document.getElementById("sasu_ir_cell7_3").innerHTML = (nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("sasu_ir_cell8_3").innerHTML = urssaf_zero * nbre_matchs_03 + " €"; // Cotisations annuelles
        document.getElementById("sasu_ir_cell9_3").innerHTML = (urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') +" €"; // Net d'URSSAF annuel
        document.getElementById("sasu_ir_cell10_3").innerHTML = (frais_par_match03).toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("sasu_ir_cell11_3").innerHTML = frais_annuel_03.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_ir_cell12_3").innerHTML = resultat_intermediaire_03.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
    
        // Ligne 4
        document.getElementById("sasu_ir_cell2_4").innerHTML = totalmatch; // Nombre de matchs ANNUEL
        document.getElementById("sasu_ir_cell7_4").innerHTML = (brut_annuel_01 + brut_annuel_02 + brut_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des bruts sur la saison
        document.getElementById("sasu_ir_cell8_4").innerHTML = (urssaf_zero * nbre_matchs_01 + urssaf_zero * nbre_matchs_02 + urssaf_zero * nbre_matchs_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des cotisations URSSAF
        document.getElementById("sasu_ir_cell9_4").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01 + urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02 + urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des nets d'URSSAF
        document.getElementById("sasu_ir_cell11_4").innerHTML = (frais_annuel_01 + frais_annuel_02 + frais_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_ir_cell12_4").innerHTML = (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des resultats sur la saison
    
        const resultat_intermediaire_total = resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03;
        document.getElementById("sasu_ir_cell13_1").innerHTML = frais_banque + " €"; // Frais annexes
        document.getElementById("sasu_ir_cell13_2").innerHTML = frais_comptable + " €"; // Frais annexes
        document.getElementById("sasu_ir_cell13_4").innerHTML = (frais_banque + frais_comptable).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais annexes sur la saison
    
        document.getElementById("sasu_ir_cell14_4").innerHTML = (resultat_intermediaire_total - frais_banque - frais_comptable).toLocaleString('fr-FR') + " €"; // Résultat net
        document.getElementById("sasu_ir_cell15_2").innerHTML = ((resultat_intermediaire_total - frais_banque - frais_comptable)* 0.15).toLocaleString('fr-FR') + " €"; // impots sur le revenu
    
        const resultatApresIS = (resultat_intermediaire_total - frais_banque - frais_comptable) - (resultat_intermediaire_total - frais_banque - frais_comptable * 0.15);
        
        document.getElementById("sasu_ir_cell15_4").innerHTML =  ((resultat_intermediaire_total - frais_banque - frais_comptable) - ((resultat_intermediaire_total - frais_banque - frais_comptable)* 0.15)).toLocaleString('fr-FR') + " €"; // impots sur le revenu
        document.getElementById("sasu_ir_cell16_2").innerHTML = (((resultat_intermediaire_total - frais_banque - frais_comptable) - ((resultat_intermediaire_total - frais_banque - frais_comptable)* 0.15)) * 0.30).toLocaleString('fr-FR') + " €"; // impots sur le revenu
        document.getElementById("sasu_ir_cell16_4").innerHTML = (((resultat_intermediaire_total - frais_banque - frais_comptable) - ((resultat_intermediaire_total - frais_banque - frais_comptable)* 0.15)) - 
                        ((resultat_intermediaire_total - frais_banque - frais_comptable) - ((resultat_intermediaire_total - frais_banque - frais_comptable)* 0.15)) * 0.30).toLocaleString('fr-FR') + " €"; // impots sur le revenu
    
    
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des resultats dans le tableau 5 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.getElementById("sasu_is_cell2_1").innerHTML = nbre_matchs_01; // Nombre de matchs (match 1)
        document.getElementById("sasu_is_cell4_1").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("sasu_is_cell5_1").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 1)
        document.getElementById("sasu_is_cell6_1").innerHTML = urssaf_zero + prime_montant_01 + " €"; // Net par match (match 1)
        document.getElementById("sasu_is_cell7_1").innerHTML = (nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("sasu_is_cell8_1").innerHTML = urssaf_zero * nbre_matchs_01 + " €"; // Cotisations annuelles
        document.getElementById("sasu_is_cell9_1").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') +" €"; // Net d'URSSAF annuel
        document.getElementById("sasu_is_cell10_1").innerHTML = (frais_par_match01).toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("sasu_is_cell11_1").innerHTML = frais_annuel_01.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_is_cell12_1").innerHTML = resultat_net_01.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("sasu_is_cell13_1").innerHTML = frais_banque + frais_comptable + frais_urssaf.toLocaleString('fr-FR') + " €"; // Frais annexes
    
        document.getElementById("sasu_is_cell2_2").innerHTML = nbre_matchs_02; // Nombre de matchs (match 2)
        document.getElementById("sasu_is_cell4_2").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("sasu_is_cell5_2").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 2)
        document.getElementById("sasu_is_cell6_2").innerHTML = (urssaf_zero + prime_montant_02).toLocaleString('fr-FR') + " €"; // Net par match (match 2)
        document.getElementById("sasu_is_cell7_2").innerHTML = (nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("sasu_is_cell8_2").innerHTML = urssaf_zero * nbre_matchs_02 + " €"; // Cotisations annuelles
        document.getElementById("sasu_is_cell9_2").innerHTML = (urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') +" €"; // Net d'URSSAF annuel
        document.getElementById("sasu_is_cell10_2").innerHTML = frais_par_match02.toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("sasu_is_cell11_2").innerHTML = frais_annuel_02.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_is_cell13_2").innerHTML = frais_comptable.toLocaleString('fr-FR') + " €"; // Frais annexes
        document.getElementById("sasu_is_cell16_2").innerHTML = montantFinal.toFixed(2).toLocaleString('fr-FR') + " €"; // Impot sur les dividendes
    
        document.getElementById("sasu_is_cell2_3").innerHTML = nbre_matchs_03; // Nombre de matchs (match 3)
        document.getElementById("sasu_is_cell4_3").innerHTML = urssaf_zero + " %"; // % URSSAF
        document.getElementById("sasu_is_cell5_3").innerHTML = urssaf_zero + "€"; // Cotisations URSSAF par match (match 3)
        document.getElementById("sasu_is_cell6_3").innerHTML = urssaf_zero + prime_montant_03 + " €"; // Net par match (match 3)
        document.getElementById("sasu_is_cell7_3").innerHTML = (nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("sasu_is_cell8_3").innerHTML = urssaf_zero * nbre_matchs_03 + " €"; // Cotisations annuelles
        document.getElementById("sasu_is_cell9_3").innerHTML = (urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') +" €"; // Net d'URSSAF annuel
        document.getElementById("sasu_is_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("sasu_is_cell11_3").innerHTML = frais_annuel_03.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("sasu_is_cell12_3").innerHTML = resultat_intermediaire_03.toLocaleString('fr-FR').toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
    
        document.getElementById("sasu_is_cell12_2").innerHTML = resultat_intermediaire_02.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire
        document.getElementById("sasu_is_cell13_3").innerHTML = frais_urssaf.toLocaleString('fr-FR') + " €"; // Frais annexes
        document.getElementById("sasu_is_cell12_4").innerHTML = (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des resultats sur la saison
    
        //console.log(frais_banque);
        document.getElementById("sasu_is_cell13_1").innerHTML = frais_banque.toLocaleString('fr-FR') + " €"; // Frais annexes
        document.getElementById("sasu_is_cell13_2").innerHTML = frais_comptable.toLocaleString('fr-FR') + " €"; // Frais annexes
        document.getElementById("sasu_is_cell13_4").innerHTML = (frais_banque + frais_comptable).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais annexes sur la saison
    
        // Ligne 4 => Sommes annuelles
        document.getElementById("sasu_is_cell2_4").innerHTML = totalmatch; // Nombre de matchs ANNUEL
        document.getElementById("sasu_is_cell7_4").innerHTML = (brut_annuel_01 + brut_annuel_02 + brut_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des bruts sur la saison
        document.getElementById("sasu_is_cell8_4").innerHTML = (urssaf_zero * nbre_matchs_01 + urssaf_zero * nbre_matchs_02 + urssaf_zero * nbre_matchs_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des cotisations URSSAF
        document.getElementById("sasu_is_cell9_4").innerHTML = (urssaf_zero * nbre_matchs_01 + nbre_matchs_01 * prime_montant_01 + urssaf_zero * nbre_matchs_02 + nbre_matchs_02 * prime_montant_02 + urssaf_zero * nbre_matchs_03 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des nets d'URSSAF
        document.getElementById("sasu_is_cell11_4").innerHTML = (frais_annuel_01 + frais_annuel_02 + frais_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais sur la saison
        document.getElementById("sasu_is_cell14_4").innerHTML = (resultat_intermediaire_total - frais_banque - frais_comptable).toLocaleString('fr-FR') + " €"; // Sommes annuelle des resultats sur la saison
        document.getElementById("sasu_is_cell15_2").innerHTML = ((resultat_intermediaire_total - frais_banque - frais_comptable)* 0.15).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais annexes sur la saison
    
        const ResultatApresIS_temp = ((resultat_intermediaire_total - frais_banque - frais_comptable) - ((resultat_intermediaire_total - frais_banque - frais_comptable)* 0.15)).toFixed(2);
        document.getElementById("sasu_is_cell15_4").innerHTML = ResultatApresIS_temp.toLocaleString('fr-FR') + " €"; // impots sur le revenu
        
        const MontantRevenuImposable = (ResultatApresIS_temp * 0.60) - (0.068 * ResultatApresIS_temp);
        document.getElementById("sasu_is_cell16_1").innerHTML = "Montant revenus imposable : " + MontantRevenuImposable.toLocaleString('fr-FR') + " €"; // impots sur le revenu
        document.getElementById("sasu_is_cell16_2").innerHTML = "Prélèvements sociaux : " + (ResultatApresIS_temp * CSG_CR).toLocaleString('fr-FR') + " €"; // Prélèvement sociaux
        
        // Utilisation de la fonction pour calculer la taxe
        const resultatPrelevementSociaux = calculerPrelevementSociaux(MontantRevenuImposable, tranches, taux);
        document.getElementById("sasu_is_cell16_3").innerHTML =  "Prélèvement sur barême fiscal : " + resultatPrelevementSociaux.toLocaleString('fr-FR') + " €"; // Prélevement sur bareme fiscal ligne 3 - BUG !!
        document.getElementById("sasu_is_cell16_4").innerHTML =  (ResultatApresIS_temp - (ResultatApresIS_temp * CSG_CR) - resultatPrelevementSociaux).toLocaleString('fr-FR') + " €"; // Total
    },

    // Mise à jour dans les tableaux prévisionnels de la fédération des paramètres modifiés par les sliders
    updatePrimeMontant: function() {
        prime_montant_01 = document.getElementById("prime_montant_01").value;
        document.getElementById("cell3_1").innerHTML = prime_montant_01.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_ir_cell3_1").innerHTML = prime_montant_01.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_is_cell3_1").innerHTML = prime_montant_01.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_ir_cell3_1").innerHTML = prime_montant_01.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_is_cell3_1").innerHTML = prime_montant_01.toLocaleString('fr-FR') + " €";
    
        prime_montant_02 = document.getElementById("prime_montant_02").value;
        document.getElementById("cell3_2").innerHTML = prime_montant_02.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_ir_cell3_2").innerHTML = prime_montant_02.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_is_cell3_2").innerHTML = prime_montant_02.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_ir_cell3_2").innerHTML = prime_montant_02.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_is_cell3_2").innerHTML = prime_montant_02.toLocaleString('fr-FR') + " €";
    
        prime_montant_03 = document.getElementById("prime_montant_03").value;
        document.getElementById("cell3_3").innerHTML = prime_montant_03 + " €";
        document.getElementById("tns_ir_cell3_3").innerHTML = prime_montant_03.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_is_cell3_3").innerHTML = prime_montant_03.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_ir_cell3_3").innerHTML = prime_montant_03.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_is_cell3_3").innerHTML = prime_montant_03.toLocaleString('fr-FR') + " €";
    
        frais_par_match01 = document.getElementById("frais_par_match01").value;
        document.getElementById("cell10_1").innerHTML = frais_par_match01 + " €";
        document.getElementById("tns_ir_cell10_1").innerHTML = frais_par_match01 + " €";
        document.getElementById("tns_is_cell10_1").innerHTML = frais_par_match01 + " €";
        document.getElementById("sasu_ir_cell10_1").innerHTML = frais_par_match01 + " €";
        document.getElementById("sasu_is_cell10_1").innerHTML = frais_par_match01 + " €";
    
        frais_par_match02 = document.getElementById("frais_par_match02").value;
        document.getElementById("cell10_2").innerHTML = frais_par_match02 + " €";
        document.getElementById("tns_ir_cell10_2").innerHTML = frais_par_match02.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_is_cell10_2").innerHTML = frais_par_match02.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_ir_cell10_2").innerHTML = frais_par_match02.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_is_cell10_2").innerHTML = frais_par_match02.toLocaleString('fr-FR') + " €";
    
        frais_par_match03 = document.getElementById("frais_par_match03").value;
        document.getElementById("cell10_3").innerHTML = frais_par_match03 + " €";
        document.getElementById("tns_ir_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_is_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_ir_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €";
        document.getElementById("sasu_is_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €";
    
        nbre_matchs_01 = document.getElementById("nbre_matchs_01").value;
        document.getElementById("cell2_1").innerHTML = nbre_matchs_01;
        document.getElementById("tns_ir_cell2_1").innerHTML = nbre_matchs_01;
        document.getElementById("tns_is_cell2_1").innerHTML = nbre_matchs_01;
        document.getElementById("sasu_ir_cell2_1").innerHTML = nbre_matchs_01;
        document.getElementById("sasu_is_cell2_1").innerHTML = nbre_matchs_01;
    
        nbre_matchs_02 = document.getElementById("nbre_matchs_02").value;
        document.getElementById("cell2_2").innerHTML = nbre_matchs_02;
        document.getElementById("tns_ir_cell2_2").innerHTML = nbre_matchs_02;
        document.getElementById("tns_is_cell2_2").innerHTML = nbre_matchs_02;
        document.getElementById("sasu_ir_cell2_2").innerHTML = nbre_matchs_02;
        document.getElementById("sasu_is_cell2_2").innerHTML = nbre_matchs_02;
    
        nbre_matchs_03 = document.getElementById("nbre_matchs_03").value;
        document.getElementById("cell2_3").innerHTML = nbre_matchs_03;
        document.getElementById("tns_ir_cell2_3").innerHTML = nbre_matchs_03;
        document.getElementById("tns_is_cell2_3").innerHTML = nbre_matchs_03;
        document.getElementById("sasu_ir_cell2_3").innerHTML = nbre_matchs_03;
        document.getElementById("sasu_is_cell2_3").innerHTML = nbre_matchs_03;
    
        // Calcul des cotisations URSSAF
        cotisations_urssaf_par_match_01 = prime_montant_01 * (pourcentage_urssaf / 100);
        cotisations_urssaf_par_match_02 = prime_montant_02 * (pourcentage_urssaf / 100);
        cotisations_urssaf_par_match_03 = prime_montant_03 * (pourcentage_urssaf / 100);
    
        // Mise à jour du tableau d'en tête
        var prime1 = document.getElementById("prime_montant_01").value;
        var prime2 = document.getElementById("prime_montant_02").value;
        var prime3 = document.getElementById("prime_montant_03").value;
    
        var frais1 = document.getElementById("frais_par_match01").value;
        var frais2 = document.getElementById("frais_par_match02").value;
        var frais3 = document.getElementById("frais_par_match03").value;
    
        var nombre1 = document.getElementById("nbre_matchs_01").value;
        var nombre2 = document.getElementById("nbre_matchs_02").value;
        var nombre3 = document.getElementById("nbre_matchs_03").value;
    
        // Mettre à jour les éléments output avec les valeurs correspondantes
        document.getElementById("valeur_prime_01").textContent = prime1;
        document.getElementById("valeur_prime_02").textContent = prime2;
        document.getElementById("valeur_prime_03").textContent = prime3;
    
        document.getElementById("valeur_frais_01").textContent = frais1;
        document.getElementById("valeur_frais_02").textContent = frais2;
        document.getElementById("valeur_frais_03").textContent = frais3;
    
        document.getElementById("valeur_match_01").textContent = nombre1;
        document.getElementById("valeur_match_02").textContent = nombre2;
        document.getElementById("valeur_match_03").textContent = nombre3;
    },
};










