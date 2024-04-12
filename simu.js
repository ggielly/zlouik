// Ce fichier contient le programme principal et la logique des calculs



// fonction de calcul de données générales sur le prévisionnel fédé
// les résultats sont stockés dans les variables globales déclarées dans data.js
// Cette fonction appelle display.updateTableauxFederation() pour afficher les résultats des calculs
var updateCalculs = function() { 
    // Colonne 5 => Calcul des cotisations URSSAF
    cotisations_urssaf_par_match_01 = prime_montant_01 * (pourcentage_urssaf / 100);
    cotisations_urssaf_par_match_02 = prime_montant_02 * (pourcentage_urssaf / 100);
    cotisations_urssaf_par_match_03 = prime_montant_03 * (pourcentage_urssaf / 100);

    // Colonne 6 => Total par match - calcul du net par match
    net_match_01 = prime_montant_01 - cotisations_urssaf_par_match_01;
    net_match_02 = prime_montant_02 - cotisations_urssaf_par_match_02;
    net_match_03 = prime_montant_03 - cotisations_urssaf_par_match_03;

    // Colonne 7 => Brut annuel
    brut_annuel_01 = nbre_matchs_01 * prime_montant_01;
    brut_annuel_02 = nbre_matchs_02 * prime_montant_02;
    brut_annuel_03 = nbre_matchs_03 * prime_montant_03;

    // Colonne 8 => Cotisations annuelles
    cotisations_annuelles_01 = nbre_matchs_01 * cotisations_urssaf_par_match_01;
    cotisations_annuelles_02 = nbre_matchs_02 * cotisations_urssaf_par_match_02;
    cotisations_annuelles_03 = nbre_matchs_03 * cotisations_urssaf_par_match_03;

    // Colonne 9 => Net d'URSSAF annuel
    net_urssaf_annuel_01 = net_match_01 * nbre_matchs_01;
    net_urssaf_annuel_02 = net_match_02 * nbre_matchs_02;
    net_urssaf_annuel_03 = net_match_03 * nbre_matchs_03;

    // Colonne 10 => Calcul arbitraire : 30e de repas + 40e de Peages + 100e de carburants

    // Colone 11 => Total des frais annuel sur l'ensemble des matchs
    frais_annuel_01 = frais_par_match01 * nbre_matchs_01;
    frais_annuel_02 = frais_par_match02 * nbre_matchs_02;
    frais_annuel_03 = frais_par_match03 * nbre_matchs_03;

    // Colonne 12 => Resultat net - ARJAN
    resultat_net_01 = net_urssaf_annuel_01 - frais_annuel_01;
    resultat_net_02 = net_urssaf_annuel_02 - frais_annuel_02;
    resultat_net_03 = net_urssaf_annuel_03 - frais_annuel_03;

    // Colonne 12 -> Resultat intermediaire
    resultat_intermediaire_01 = prime_montant_01 * nbre_matchs_01 - frais_annuel_01;
    resultat_intermediaire_02 = prime_montant_02 * nbre_matchs_02 - frais_annuel_02;
    resultat_intermediaire_03 = prime_montant_03 * nbre_matchs_03 - frais_annuel_03;

    Salaires = (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03 - frais_banque - frais_comptable - frais_urssaf) - 
                        (((tauxcotisation_eurl / 1.35) * (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03 
                            - frais_banque - frais_comptable - frais_urssaf)) / 100).toFixed(2); // Cotisations sociales

    resultat_net_is_TNS = resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03 - frais_banque - frais_comptable - frais_urssaf;
    AC24 = (resultat_net_is_TNS - (resultat_net_is_TNS * (15 / 100)));

    AC16 = Salaires * 0.9 + Salaires * 2.9 / 100 * 1.3;
    impotsSurLeRevenu = calculer_IR_EURL(AC16, tranche01_bas, tranche02_bas, tranche03_bas, tranche04_bas, tranche01_haut, tranche02_haut, tranche03_haut, tranche01_pourcent, tranche02_pourcent, tranche03_pourcent, tranche04_pourcent);

    montantFinal = calculerMontant_impotdividende(AC24, seuils, pourcentages);
        
    CotisationsSociales = (((tauxcotisation_eurl / 1.35) * (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03 - frais_banque - frais_comptable - frais_urssaf)) / 100).toFixed(2); // Cotisations sociales

    display.updateTableauxFederation();
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Définition de la fonction pour calculer le prélèvement sociaux
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var calculerPrelevementSociaux = function(MontantRevenuImposable, tranches, taux) {

    let taxeTotale = 0; // Initialisation du montant total de la taxe à payer  
    // Parcours des tranches d'imposition
    for (let i = 0; i < tranches.length; i++) {
        if (MontantRevenuImposable < tranches[i]) { // Vérification si le résultat après impôts est inférieur à la limite de la tranche
            break; // Sortie de la boucle si la limite de la tranche dépasse le résultat après impôts
        }
        
        // Calcul du montant dans la tranche actuelle
        const montantDansTranche = i === 0 ? Math.min(MontantRevenuImposable, tranches[i]) : Math.min(MontantRevenuImposable, tranches[i]) - tranches[i - 1];
        
        // Ajout du montant de la taxe pour la tranche actuelle au montant total de la taxe à payer
        taxeTotale += montantDansTranche * taux[i];
    }
    return taxeTotale; // Retourne le montant total de la taxe à payer
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Définition des tranches d'imposition et des taux correspondants
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var calculerMontant_impotdividende = function(AC24, seuils, pourcentages) {
    const partiePrincipale = AC24 * 0.172; // CSG_CR
    const calculCommun = AC24 * 0.6 - 0.068 * AC24;

    for (let i = 0; i < seuils.length; i++) {
        if (calculCommun < seuils[i]) {
            return partiePrincipale;
        } else if (calculCommun < seuils[i + 1]) {
            let montant = 0;
            for (let j = 0; j <= i; j++) {
                montant += (seuils[j + 1] - seuils[j]) * pourcentages[j];
            }
            montant += (calculCommun - seuils[i]) * pourcentages[i];
            return montant;
        }
    }

    // Si aucune des conditions précédentes n'est remplie, calculer pour la dernière tranche
    let montant = 0;
    for (let i = 0; i < pourcentages.length; i++) {
        montant += (seuils[i + 1] - seuils[i]) * pourcentages[i];
    }
    return montant + (calculCommun - seuils[seuils.length - 1]) * pourcentages[seuils.length - 1];
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Définition des tranches d'imposition et des taux correspondants
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var calculer_IR_EURL = function(AC16, tranche01_bas, tranche02_bas, tranche03_bas, tranche04_bas, tranche01_haut, tranche02_haut, tranche03_haut, tranche01_pourcent, tranche02_pourcent, tranche03_pourcent, tranche04_pourcent) {

    if (AC16 < tranche01_haut) {
        
        const tempdebug = (AC16 - tranche01_bas) * tranche01_pourcent;
        
        return (AC16 - tranche01_bas) * tranche01_pourcent;
    } else if (AC16 < tranche02_haut) {
        
        return tranche01_pourcent * (tranche01_haut - tranche01_bas) + (AC16 - tranche02_bas) * tranche02_pourcent;
    } else if (AC16 < tranche03_haut) {
        
        return (tranche01_haut - tranche01_bas) * tranche01_pourcent + (tranche02_haut - tranche02_bas) * tranche02_pourcent + (AC16 - tranche03_bas) * tranche03_pourcent;
    } else {
        
        return (AC16 - tranche04_bas) * tranche04_pourcent + (tranche03_haut - tranche03_bas) * tranche03_pourcent + (tranche02_haut - tranche02_bas) * tranche02_pourcent + (tranche01_haut - tranche01_bas) * tranche01_pourcent;
    }
};




// remplissage du array resultats avec les villes de destination calculées
var calculDestinations = function() {
    // Nombre total d'itérations à effectuer
    var nombreIterations = nbre_matchs_01 + nbre_matchs_02 + nbre_matchs_03; 

    // Récupération de l'élément selectVilleDepart
    var selectElement = document.getElementById("villeDepart");

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
        console.error("L'élément villeDepart n'existe pas dans le document.");
    }
};

// enregistre toutes les fonctions à appeler selon les évènements UI
var gereEvents = function() {
    // Sliders Primes / Frais / Nb Match
    document.getElementById("prime_montant_01").addEventListener("input", display.updateSliderValues);
    document.getElementById("prime_montant_02").addEventListener("input", display.updateSliderValues);
    document.getElementById("prime_montant_03").addEventListener("input", display.updateSliderValues);
    document.getElementById("prime_montant_01").addEventListener("change", updateCalculs);
    document.getElementById("prime_montant_02").addEventListener("change", updateCalculs);
    document.getElementById("prime_montant_03").addEventListener("change", updateCalculs);

    document.getElementById("frais_par_match01").addEventListener("input", display.updateSliderValues);
    document.getElementById("frais_par_match02").addEventListener("input", display.updateSliderValues);
    document.getElementById("frais_par_match03").addEventListener("input", display.updateSliderValues);
    document.getElementById("frais_par_match01").addEventListener("change", updateCalculs);
    document.getElementById("frais_par_match02").addEventListener("change", updateCalculs);
    document.getElementById("frais_par_match03").addEventListener("change", updateCalculs);

    document.getElementById("nbre_matchs_01").addEventListener("input", display.updateSliderValues);
    document.getElementById("nbre_matchs_02").addEventListener("input", display.updateSliderValues);
    document.getElementById("nbre_matchs_03").addEventListener("input", display.updateSliderValues);
    document.getElementById("nbre_matchs_01").addEventListener("change", updateCalculs);
    document.getElementById("nbre_matchs_02").addEventListener("change", updateCalculs);
    document.getElementById("nbre_matchs_03").addEventListener("change", updateCalculs);

    document.getElementById("indemniteChoisieForm").addEventListener("change", display.updateHistorique);
    document.getElementById("villeDepart").addEventListener("input", display.updateHistorique);
    document.getElementById("menuPRK").addEventListener("input", display.updateHistorique);
};


//Initialisation :
// ajout des menus calculés dynamiquement
// appel des fonctions de calcul initial de certaines données basées sur  primes / frais / nb match
var initialize = function() {

     // ajout du menu déroulant pour le choix de l'indemnité
    // affichage des sliders et des valeurs initiales
    display.updateSliderValues();
    display.createIndemniteChoisieDiv();
    display.updatePrimeMontant();
    // ajout menu villes de départ
    display.menuVilles();
    // ajout menu PRK
    display.menuPRK();
    // calcul des destinations possibles
    calculDestinations();

    // Calcul des valeurs initiales
    updateCalculs(); // appel direct de la fonction pour calculer au moins une fois les données avant toute capture d'évènement UI 
    // Appel initial de la fonction updateHistoriqueVille() pour afficher les résultats initiaux
    display.updateHistoriqueVille();
};



// Programme principal
var init = function() {
    // iniatilisation des menus et des données
    initialize();
    // prise en charge des évènements UI
    gereEvents();
    // lance la représentation graphique avec charts.js
    graph();
};