// Ce fichier contient le programme principal et la logique des calculs de la simulation de prévisionnel

// fonction de calcul de données générales sur le prévisionnel fédé
// les résultats sont stockés dans les variables globales déclarées dans data.js
// Cette fonction appelle display.updateTableauImposition() pour afficher les résultats des calculs

var updateCalculs = function () {
    // Colonne 5 => Calcul des cotisations URSSAF
    cotisations_urssaf_par_match_01 =
        prime_montant_01 * (pourcentage_urssaf / 100);
    cotisations_urssaf_par_match_02 =
        prime_montant_02 * (pourcentage_urssaf / 100);
    cotisations_urssaf_par_match_03 =
        prime_montant_03 * (pourcentage_urssaf / 100);

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
    resultat_intermediaire_01 =
        prime_montant_01 * nbre_matchs_01 - frais_annuel_01;
    resultat_intermediaire_02 =
        prime_montant_02 * nbre_matchs_02 - frais_annuel_02;
    resultat_intermediaire_03 =
        prime_montant_03 * nbre_matchs_03 - frais_annuel_03;

    resultats_eurl_intermediaire = resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03;

    total_frais_annexe_eurl = (frais_banque + frais_comptable + (resultats_eurl_intermediaire * 0.45));

    resultats_net_eurl = resultats_eurl_intermediaire - total_frais_annexe_eurl;

    console.log(resultats_net_eurl);

    urssaf = resultats_eurl_intermediaire * 0.45;

    Salaires =
        resultat_intermediaire_01 +
        resultat_intermediaire_02 +
        resultat_intermediaire_03 -
        frais_banque -
        frais_comptable -
        frais_urssaf -
        (
            ((tauxcotisation_eurl / 1.35) *
                (resultat_intermediaire_01 +
                    resultat_intermediaire_02 +
                    resultat_intermediaire_03 -
                    frais_banque -
                    frais_comptable -
                    frais_urssaf)) /
            100
        ).toFixed(2); // Cotisations sociales

    resultat_net_is_TNS =
        resultat_intermediaire_01 +
        resultat_intermediaire_02 +
        resultat_intermediaire_03 -
        frais_banque -
        frais_comptable -
        frais_urssaf;
    AC24 = resultat_net_is_TNS - resultat_net_is_TNS * (15 / 100);

    AC16 = Salaires * 0.9 + ((Salaires * 2.9) / 100) * 1.3;
    impotsSurLeRevenu = calculer_IR_EURL(
        AC16,
        tranche01_bas,
        tranche02_bas,
        tranche03_bas,
        tranche04_bas,
        tranche01_haut,
        tranche02_haut,
        tranche03_haut,
        tranche01_pourcent,
        tranche02_pourcent,
        tranche03_pourcent,
        tranche04_pourcent,
    );

    montantFinal = calculerMontant_impotdividende(AC24, seuils, pourcentages);




    CotisationsSociales = (
        ((tauxcotisation_eurl / 1.35) *
            (resultat_intermediaire_01 +
                resultat_intermediaire_02 +
                resultat_intermediaire_03 -
                frais_banque -
                frais_comptable -
                frais_urssaf)) /
        100
    ).toFixed(2); // Cotisations sociales


};


/**
 * Calcule l'impôt progressif basé sur le revenu combiné et le revenu fiscal de référence,
 * ajusté selon le nombre de parts fiscales. La fonction calcule le montant imposable
 * en ajoutant le résultat net d'une EURL (Entreprise Unipersonnelle à Responsabilité Limitée)
 * et le revenu fiscal de référence, puis en divisant par le nombre de parts fiscales pour déterminer le revenu par part.
 * Elle applique ensuite un taux d'imposition progressif basé sur des tranches de revenus prédéfinies.
 *
 * @param {string | number} resultats_net_eurl - Le résultat net (revenu) de l'EURL, pouvant être une chaîne de caractères ou un nombre.
 *
 * La fonction récupère les éléments suivants dans le DOM :
 * - revenuFiscal : Le revenu fiscal de référence récupéré depuis un élément input avec l'ID 'idRevenuFiscalReference'.
 * - partsFiscales : Le nombre de parts fiscales récupéré depuis un élément input avec l'ID 'idNombrePartFiscale'.
 *
 * L'impôt est calculé selon les tranches suivantes (selon le code fiscal actuel) :
 * - De 0       à   11 294 €    : 0%
 * - De 11 295  à   28 797 €    : 11%
 * - De 28 798  à   82 341 €    : 30%
 * - De 82 342  à   177 106 €   : 41%
 * - Au-delà de     177 107 €   : 45%
 *
 * Le calcul prévoit la gestion des cas où le résultat net plus le revenu fiscal de référence,
 * divisé par le nombre de parts fiscales, dépasse la dernière tranche.
 *
 * @returns {number} Le montant de l'impôt calculé, ajusté selon les tranches.
 */

// 1er calcul => Resultat net + revenu imposable / nombre de part

var calculerImpotsEurlIr = function (resultats_net_eurl) {

    // Ensure the variables are parsed as numbers and handle undefined or null values
    var resultatNet = parseFloat(resultats_net_eurl);

    var revenuFiscal = parseFloat(document.getElementById('idRevenuFiscalReference').value);
    var partsFiscales = parseFloat(document.getElementById('idNombrePartFiscale').value);

    if (!partsFiscales) { // Prevent division by zero
        console.error("Nombre de parts fiscales cannot be zero or undefined.");
        return; // Exit the function if parts fiscales is zero or undefined
    }

    let dattemp = (resultatNet + revenuFiscal) / partsFiscales;

    const brackets = [
        { upper: 11294, rate: 0.00 },
        { upper: 28797, rate: 0.11 },
        { upper: 82341, rate: 0.30 },
        { upper: 177106, rate: 0.41 },
        { upper: Infinity, rate: 0.45 }
    ];

    let tax = 0;

    // Calculate tax for each bracket
    for (let i = 0; i < brackets.length; i++) {
        if (dattemp > brackets[i].upper) {
            // Calculate full bracket tax for all but last bracket
            if (i > 0) {
                tax += (brackets[i].upper - (brackets[i - 1].upper + 1)) * brackets[i].rate;
            }
        } else {
            // Calculate partial bracket tax for the last applicable bracket
            if (i > 0) {
                tax += (dattemp - (brackets[i - 1].upper + 1)) * brackets[i].rate;
            }
            break;
        }
    }

    return tax;

};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Définition de la fonction pour calculer le prélèvement sociaux
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var calculerPrelevementSociaux = function (
    MontantRevenuImposable,
    tranches,
    taux,
) {
    let taxeTotale = 0; // Initialisation du montant total de la taxe à payer
    // Parcours des tranches d'imposition
    for (let i = 0; i < tranches.length; i++) {
        if (MontantRevenuImposable < tranches[i]) {
            // Vérification si le résultat après impôts est inférieur à la limite de la tranche
            break; // Sortie de la boucle si la limite de la tranche dépasse le résultat après impôts
        }

        // Calcul du montant dans la tranche actuelle
        const montantDansTranche =
            i === 0
                ? Math.min(MontantRevenuImposable, tranches[i])
                : Math.min(MontantRevenuImposable, tranches[i]) - tranches[i - 1];

        // Ajout du montant de la taxe pour la tranche actuelle au montant total de la taxe à payer
        taxeTotale += montantDansTranche * taux[i];
    }
    return taxeTotale; // Retourne le montant total de la taxe à payer
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Définition des tranches d'imposition et des taux correspondants
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var calculerMontant_impotdividende = function (AC24, seuils, pourcentages) {
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
    return (
        montant +
        (calculCommun - seuils[seuils.length - 1]) * pourcentages[seuils.length - 1]
    );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Définition des tranches d'imposition et des taux correspondants
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var calculer_IR_EURL = function (
    AC16,
    tranche01_bas,
    tranche02_bas,
    tranche03_bas,
    tranche04_bas,
    tranche01_haut,
    tranche02_haut,
    tranche03_haut,
    tranche01_pourcent,
    tranche02_pourcent,
    tranche03_pourcent,
    tranche04_pourcent,
) {
    if (AC16 < tranche01_haut) {
        // const tempdebug = (AC16 - tranche01_bas) * tranche01_pourcent;

        return (AC16 - tranche01_bas) * tranche01_pourcent;
    } else if (AC16 < tranche02_haut) {
        return (
            tranche01_pourcent * (tranche01_haut - tranche01_bas) +
            (AC16 - tranche02_bas) * tranche02_pourcent
        );
    } else if (AC16 < tranche03_haut) {
        return (
            (tranche01_haut - tranche01_bas) * tranche01_pourcent +
            (tranche02_haut - tranche02_bas) * tranche02_pourcent +
            (AC16 - tranche03_bas) * tranche03_pourcent
        );
    } else {
        return (
            (AC16 - tranche04_bas) * tranche04_pourcent +
            (tranche03_haut - tranche03_bas) * tranche03_pourcent +
            (tranche02_haut - tranche02_bas) * tranche02_pourcent +
            (tranche01_haut - tranche01_bas) * tranche01_pourcent
        );
    }
};

// remplissage du array resultats avec les villes de destination calculées
var calculDestinations = function () {
    // Nombre total d'itérations à effectuer
    let nombreIterations = nbre_matchs_01 + nbre_matchs_02 + nbre_matchs_03;

    // Récupération de l'élément selectVilleDepart
    var selectElement = document.getElementById("VilleDepart");

    // Vérification si l'élément selectVilleDepart existe
    if (selectElement) {
        var VilleDepart = selectElement.value;
        // Calcul des itérations
        for (let i = 0; i < nombreIterations; i++) {
            // Choix aléatoire d'une ville de destination parmi celles disponibles pour la ville de départ sélectionnée
            var VilleDestinationsPossibles = data.filter(function (trajet) {
                return trajet.VilleDepart === VilleDepart;
            });

            // Vérification si des villes de destination sont disponibles
            if (VilleDestinationsPossibles.length === 0) {
                console.warn(
                    "Aucune ville de destination trouvée pour la ville de départ :",
                    VilleDepart,
                );
                continue; // Passer à l'itération suivante si aucune ville de destination n'est disponible
            }

            var indexVilleDestination = Math.floor(
                Math.random() * VilleDestinationsPossibles.length,
            );
            var VilleDestination = VilleDestinationsPossibles[indexVilleDestination];

            // Ajout du trajet aux résultats
            resultats.push(VilleDestination);
        }
    } else {
        console.error("L'élément VilleDepart n'existe pas dans le document.");
    }
};

// enregistre toutes les fonctions à appeler selon les évènements UI
var gereEvents = function () {
    var elementsIds = [
        "prime_montant_01",
        "prime_montant_02",
        "prime_montant_03",
        "frais_par_match01",
        "frais_par_match02",
        "frais_par_match03",
        "nbre_matchs_01",
        "nbre_matchs_02",
        "nbre_matchs_03",
        "idTauxMarginalImpot",
        "idNombrePartFiscale",
        "idRevenuFiscalReference"
    ];

    elementsIds.forEach(function (id) {
        var element = document.getElementById(id);
        if (element) {
            element.addEventListener("input", function () {
                display.updateSliderValues();
                display.updateTableauImpositions(); // Appel à la fonction de mise à jour des tableaux
                display.updateHistorique();
            });
            element.addEventListener("change", function () {
                updateCalculs();
            });
        } else {
            console.error("Element not found: ", id);
        }
    });

    // Sliders Primes / Frais / Nb Match
    document
        .getElementById("prime_montant_01")
        .addEventListener("input", display.updateSliderValues);
    document
        .getElementById("prime_montant_02")
        .addEventListener("input", display.updateSliderValues);
    document
        .getElementById("prime_montant_03")
        .addEventListener("input", display.updateSliderValues);
    document
        .getElementById("prime_montant_01")
        .addEventListener("change", updateCalculs);
    document
        .getElementById("prime_montant_02")
        .addEventListener("change", updateCalculs);
    document
        .getElementById("prime_montant_03")
        .addEventListener("change", updateCalculs);

    document
        .getElementById("frais_par_match01")
        .addEventListener("input", display.updateSliderValues);
    document
        .getElementById("frais_par_match02")
        .addEventListener("input", display.updateSliderValues);
    document
        .getElementById("frais_par_match03")
        .addEventListener("input", display.updateSliderValues);
    document
        .getElementById("frais_par_match01")
        .addEventListener("change", updateCalculs);
    document
        .getElementById("frais_par_match02")
        .addEventListener("change", updateCalculs);
    document
        .getElementById("frais_par_match03")
        .addEventListener("change", updateCalculs);

    document
        .getElementById("idTauxMarginalImpot")
        .addEventListener("change", updateCalculs);
    document
        .getElementById("idNombrePartFiscale")
        .addEventListener("change", updateCalculs);

    document
        .getElementById("idTauxMarginalImpot")
        .addEventListener("input", display.updateSliderValues);
    document
        .getElementById("idNombrePartFiscale")
        .addEventListener("input", display.updateSliderValues);


    document
        .getElementById("idRevenuFiscalReference")
        .addEventListener("change", updateCalculs);
    document
        .getElementById("idRevenuFiscalReference")
        .addEventListener("input", display.updateSliderValues);



    document
        .getElementById("nbre_matchs_01")
        .addEventListener("input", display.updateSliderValues);
    document
        .getElementById("nbre_matchs_02")
        .addEventListener("input", display.updateSliderValues);
    document
        .getElementById("nbre_matchs_03")
        .addEventListener("input", display.updateSliderValues);
    document
        .getElementById("nbre_matchs_01")
        .addEventListener("change", updateCalculs);
    document
        .getElementById("nbre_matchs_02")
        .addEventListener("change", updateCalculs);
    document
        .getElementById("nbre_matchs_03")
        .addEventListener("change", updateCalculs);

    document
        .getElementById("indemniteChoisieDiv")
        .addEventListener("change", function () {
            display.updateHistorique();
        });

    document
        .getElementById("VilleDepart")
        .addEventListener("input", display.updateHistorique);
    document
        .getElementById("menuPRK")
        .addEventListener("input", display.updateHistorique);

    // Nombre de matchs au total
    nbre_matchs_total = nbre_matchs_01 + nbre_matchs_02 + nbre_matchs_03;
};

//Initialisation :
// ajout des menus calculés dynamiquement
// appel des fonctions de calcul initial de certaines données basées sur  primes / frais / nb match
var initialize = function () {
    display.setupRadioChangeListeners();
    display.createIndemniteChoisieDiv();

    // Il faut construire le tableau HTML avant de pouvoir faire les appels aux cellules ID
    display.createTableauImpotsMicroEntreprise();
    display.createTableauImpotsEurlIr();
    display.createTableauImpositionGenerale();

    display.menuVilles();
    display.menuPRK();
    display.updateSliderValues();
    calculDestinations();

    display.updatePrimeMontant();
    updateCalculs();
    display.updateSelectedIndemnityValue();
    display.updateHistoriqueVille();
    display.updateFrontendBadge();
};

var init = function () {
    w3.includeHTML();
    initialize();
    gereEvents();

    graph();
};
