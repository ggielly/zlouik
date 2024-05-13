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
var calculerImpotsRevenu = function (resultats_net_eurl) {
    // 1er calcul => Resultat net + revenu imposable / nombre de part
    // Ensure the variables are parsed as numbers and handle undefined or null values
    var resultatNet = parseFloat(resultats_net_eurl);

    var revenuFiscal = parseFloat(document.getElementById('idRevenuFiscalReference').value);
    var partsFiscales = parseFloat(document.getElementById('idNombrePartFiscale').value);

    if (!partsFiscales) { // Prevent division by zero
        console.error("Nombre de parts fiscales cannot be zero or undefined.");
        return; // Exit the function if parts fiscales is zero or undefined
    }

    revenuParPartEurlIr = (resultatNet + revenuFiscal) / partsFiscales;

    const brackets = [
        { upper: 11294, rate: 0.00 },
        { upper: 28797, rate: 0.11 },
        { upper: 82341, rate: 0.30 },
        { upper: 177106, rate: 0.41 },
        { upper: Infinity, rate: 0.45 }
    ];

    let tax = 0;
    let previousUpper = 0;

    for (let i = 0; i < brackets.length; i++) {
        if (revenuParPartEurlIr <= brackets[i].upper) {
            tax += (revenuParPartEurlIr - previousUpper) * brackets[i].rate;
            break;
        } else {
            tax += (brackets[i].upper - previousUpper) * brackets[i].rate;
            previousUpper = brackets[i].upper;
        }
    }
    return tax;

};

/**
 * Calculates the income tax based on a set of predefined tax brackets and rates.
 * This function uses a progressive tax calculation method where each segment of income
 * that falls into a higher tax bracket is taxed at a higher rate. The function is structured
 * to handle incomes that span multiple tax brackets, applying different tax rates to each
 * segment of the income as defined by the bracket thresholds.
 *
 * @param {number} revenu - The total income for which the tax is to be calculated. Must be a non-negative number.
 *
 * @returns {number} The total tax calculated based on the given income. The tax is calculated by applying
 * the tax rate of each bracket to the portion of the income that falls within that bracket's range.
 *
 * Example:
 * - For an income of 30,000, the function would calculate:
 *   - Tax for income between 11,294 and 28,797 at 11%,
 *   - Plus tax for income from 28,798 to 30,000 at 30%.
 *
 * Note:
 * - The tax brackets and rates are hardcoded into the function:
 *   - Brackets: [11,294, 28,797, 82,341, 177,106]
 *   - Rates: [0%, 11%, 30%, 41%, 45%]
 * - This function assumes that the input is valid and does not perform error checking on the `revenu` parameter.
 */
var calculateTaxTest = function (revenu) {
    const brackets = [11294, 28797, 82341, 177106];  // These should be replaced with your actual bracket limits
    const rates = [0, 0.11, 0.30, 0.41, 0.45];       // These rates correspond to the brackets

    let tax = 0;

    if (revenu <= brackets[0]) {
        tax = 0;
    } else if (revenu <= brackets[1]) {
        tax = (revenu - brackets[0]) * rates[1];
    } else if (revenu <= brackets[2]) {
        tax = (brackets[1] - brackets[0]) * rates[1] + (revenu - brackets[1]) * rates[2];
    } else if (revenu <= brackets[3]) {
        tax = (brackets[1] - brackets[0]) * rates[1] +
            (brackets[2] - brackets[1]) * rates[2] +
            (revenu - brackets[2]) * rates[3];
    } else {
        tax = (brackets[1] - brackets[0]) * rates[1] +
            (brackets[2] - brackets[1]) * rates[2] +
            (brackets[3] - brackets[2]) * rates[3] +
            (revenu - brackets[3]) * rates[4];
    }

    return tax;
};




function calculerMontantImpotIntermediaireEurlIr() {
    const taxFromFirstCalculation = parseFloat(document.getElementById("r5c5").innerHTML.replace(/,/g, ''));
    const taxFromSecondCalculation = parseFloat(document.getElementById("r5c6").innerHTML.replace(/,/g, ''));

    const firstValue = isNaN(taxFromFirstCalculation) ? 0 : taxFromFirstCalculation;
    const secondValue = isNaN(taxFromSecondCalculation) ? 0 : taxFromSecondCalculation;

    return firstValue - secondValue;
}


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



/**
 * Fetches possible destinations for a given departure city from the global `data` array.
 * Filters the `data` array to find all destination objects where the departure city matches
 * the specified `VilleDepart`.
 *
 * @param {string} VilleDepart - The departure city to filter destinations by.
 * @returns {Array} An array of destination objects that match the given departure city.
 *
 * Note:
 * - Returns an empty array if no matching destinations are found.
 */
var fetchDestinationData = function (VilleDepart) {
    return data.filter(trajet => trajet.VilleDepart === VilleDepart);
};


/**
 * Selects a random destination from an array of destinations.
 * Chooses a random index in the given array and returns the destination at that index.
 *
 * @param {Array} destinations - An array of destination objects.
 * @returns {Object|null} A randomly selected destination object or null if the array is empty.
 *
 * Note:
 * - Returns null if the input array is empty to indicate no destination could be selected.
 */
var getRandomDestination = function (destinations) {
    if (!destinations.length) return null;
    const index = Math.floor(Math.random() * destinations.length);
    return destinations[index];
};


/**
 * Calculates and stores random destinations based on the selected departure city.
 * This function retrieves the selected city from the DOM, fetches potential destinations based
 * on this city from the global `data` array, and selects random destinations according to the
 * total number of matches specified by global match count variables.
 * It then pushes these destinations into the global `resultats` array.
 *
 * Prerequisites:
 * - The `data` array must be populated with destination objects that include a `VilleDepart` property.
 * - Global match variables (`nbre_matchs_01`, `nbre_matchs_02`, `nbre_matchs_03`) must be set.
 *
 * Side Effects:
 * - Updates the global `resultats` array with selected destination objects.
 * - Logs warnings to the console if no valid destination or `VilleDepart` element is found.
 *
 * Error Handling:
 * - Exits early and logs an error if the `VilleDepart` element is not found in the DOM.
 * - Logs a warning if no destinations are available for the selected departure city.
 */
var calculDestinations = function () {
    var selectElement = document.getElementById("VilleDepart");
    if (!selectElement) {
        console.error("L'élément VilleDepart n'existe pas dans le document.");
        return;
    }

    var VilleDepart = selectElement.value;
    var destinations = fetchDestinationData(VilleDepart);

    if (!destinations.length) {
        console.warn("Aucune ville de destination trouvée pour la ville de départ :", VilleDepart);
        return;
    }

    let nombreIterations = nbre_matchs_01 + nbre_matchs_02 + nbre_matchs_03;
    for (let i = 0; i < nombreIterations; i++) {
        var VilleDestination = getRandomDestination(destinations);
        if (VilleDestination) resultats.push(VilleDestination);
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
        "idNombrePartFiscale",
        "idRevenuFiscalReference"
    ];

    elementsIds.forEach(function (id) {
        var element = document.getElementById(id);
        if (element) {
            element.addEventListener("input", function () {
                display.updateSliderValues();
                display.updateTableauImpositions(); // Appel à la fonction de mise à jour des tableaux
                display.updateGlobal();
                display.updateTableauImpositionGenerale(); // Appel à la fonction de mise à jour du tableau récapitulatif impots


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
        .getElementById("idNombrePartFiscale")
        .addEventListener("change", updateCalculs);

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
            display.updateGlobal();
        });

    document
        .getElementById("VilleDepart")
        .addEventListener("input", display.updateGlobal);
    document
        .getElementById("menuPRK")
        .addEventListener("input", display.updateGlobal);

    // Nombre de matchs au total
    nbre_matchs_total = nbre_matchs_01 + nbre_matchs_02 + nbre_matchs_03;
};


/**
 * Initializes the application's user interface components upon startup.
 * This function orchestrates the setup of various UI components and ensures
 * that the necessary DOM elements are created and initialized in the correct order.
 * It sets up event listeners for form controls, builds dynamic HTML tables,
 * populates dropdown menus, updates default slider values, and performs initial
 * data processing tasks.
 *
 * Functions called within `initialize`:
 * - `setupRadioChangeListeners`: Attaches event listeners to radio buttons for handling changes.
 * - `createIndemniteChoisieDiv`: Constructs the HTML structure for displaying chosen indemnity options.
 * - `createTableauImpositionGenerale`: Generates a general tax table and inserts it into the DOM.
 * - `menuVilles`: Populates the dropdown menu with city options based on available data.
 * - `menuPRK`: Fills the dropdown for selecting the vehicular cost per kilometer.
 * - `updateSliderValues`: Sets initial values for all sliders based on predefined defaults or user settings.
 * - `calculDestinations`: Calculates possible destinations based on current city selections and other criteria.
 * - `updatePrimeMontant`: Refreshes the display of bonus amounts as sliders are adjusted.
 * - `updateCalculs`: Performs initial calculations for displayed values and summaries.
 * - `updateSelectedIndemnityValue`: Updates the UI to reflect the currently selected indemnity rate.
 * - `updateHistoriqueVille`: Updates historical data visualizations based on the selected city.
 * - `updateFrontendBadge`: Refreshes badges and other indicators on the frontend to show new data or statuses.
 *
 * Note:
 * This function must be called after the DOM is fully loaded to ensure all elements
 * are available for manipulation and event binding. Typically, this is done at the end
 * of the HTML document or inside a DOMContentLoaded event listener.
 */
var initialize = function () {
    display.setupRadioChangeListeners();
    display.createIndemniteChoisieDiv();

    // Il faut construire le tableau HTML avant de pouvoir faire les appels aux cellules ID
    display.createTableauImpositionGenerale();

    display.menuVilles();
    display.menuPRK();

    display.updateSliderValues();
    calculDestinations();

    display.updatePrimeMontant();

    updateCalculs();
    display.updateGlobal();

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
