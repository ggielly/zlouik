/**
 * Fichier Display.js
 * ------------------
 *
 * Description :
 * Ce fichier contient toutes les fonctions nécessaires pour mettre à jour les éléments d'affichage
 * dans le HTML de l'application. Les fonctions sont regroupées sous un objet nommé `display`.
 *
 * Utilisation :
 * L'encapsulation des fonctions d'affichage dans l'objet `display` permet une organisation claire
 * et une facilité d'appel des fonctions. Pour appeler une fonction, on utilise la syntaxe :
 * `display.nom_fonction()` à partir de n'importe quel autre script dans le projet, notamment depuis
 * la fonction `init()` qui sert à initialiser l'application.
 *
 * Objectifs :
 * - Centraliser toutes les fonctions d'affichage pour simplifier la maintenance et l'évolution du code.
 * - Séparer clairement les responsabilités des fonctions d'affichage des autres logiques métier
 *   dans le projet, renforçant ainsi la structure modulaire du code.
 * - Fournir une interface unique (`display`) pour l'accès aux fonctionnalités d'affichage,
 *   augmentant la lisibilité et la réutilisabilité du code.
 *
 * Architecture :
 * Le fichier `display.js` agit comme une bibliothèque d'affichage, où chaque fonction membre de `display`
 * peut être visualisée comme un service d'affichage autonome. Ce modèle contribue à une meilleure
 * organisation du code et facilite les tests unitaires des fonctions d'affichage indépendamment des
 * autres parties du système.
 */
var display = {
    /**
      * Récupère et retourne les résultats actuels filtrés selon les critères définis
      * par les contrôles de l'interface utilisateur.
      *
      * Cette fonction consulte le tableau global `data` qui doit contenir tous les trajets possibles
      * avec leurs détails (ville de départ, destination, kilométrage, péages, temps de trajet, etc.).
      * Elle applique un filtre basé sur la ville de départ sélectionnée dans le champ input correspondant
      * et limite le nombre de trajets retournés à la valeur spécifiée par le slider pour le nombre de matchs.
      *
      * Prérequis :
      * - Un élément input avec l'id "VilleDepart" doit exister dans le DOM, contenant la ville de départ souhaitée.
      * - Un élément input de type slider avec l'id "nbre_matchs_01" doit exister dans le DOM pour indiquer
      *   le nombre maximal de trajets à retourner.
      * - Le tableau `data` doit être initialisé et accessible dans le contexte de cette fonction, contenant
      *   les objets de trajet avec les propriétés nécessaires (VilleDepart, VilleDestination, Km, Peages, TempsTrajet).
      *
      * Sortie :
      * - Un tableau d'objets où chaque objet représente un trajet qui correspond aux critères de filtrage.
      *   Chaque objet contient des propriétés telles que VilleDepart, VilleDestination, Km, Peages, TempsTrajet.
      *
      * Exemple d'utilisation :
      * var currentResults = display.getCurrentResults();
      * console.log(currentResults); // Affiche les trajets filtrés selon les critères actuels.
      */
    getCurrentResults: function () {
        // Récupération de la ville de départ depuis l'input utilisateur
        var villeDepart = document.getElementById("VilleDepart").value;
        var nbreMaxMatchs = parseInt(document.getElementById("nbre_matchs_01").value);

        // Filtrer les données pour obtenir uniquement les trajets démarrant de la ville sélectionnée
        var departures = data.filter(trajet => trajet.VilleDepart === villeDepart);

        // Créer un tableau temporaire pour stocker les destinations
        var tempArray = [];

        // Collecter toutes les destinations correspondant aux villes de départ sélectionnées
        departures.forEach(trajet => {
            tempArray.push({ destination: trajet.VilleDestination, details: trajet });
        });

        // Mélanger aléatoirement la liste des destinations pour garantir un ordre différent à chaque appel
        this.shuffleArray(tempArray);

        // Construire les résultats finaux à partir des destinations mélangées
        var randomResults = [];
        for (let i = 0; i < Math.min(nbreMaxMatchs, tempArray.length); i++) {
            randomResults.push(tempArray[i].details);
        }

        return randomResults;
    },


    // Mise à jour de l'affichage du slider
    updateOutput: function (sliderId, outputId) {
        var value = document.getElementById(sliderId).value;
        document.getElementById(outputId).textContent = value;

        console.log("Function called");
        var value = document.getElementById(sliderId).value;
        console.log("Slider Value: " + value);
    },


    // On affiche le slider joli
    updateOutputPourcent: function (val) {
        document.getElementById('rangeOutput').value = val + ' %'; // Met à jour le contenu de l'output
        document.getElementById('rangeOutput').textContent = val + ' %'; // Ajoute aussi pour garantir l'affichage
    },


    // Mise à jour de l'affichage du tableau des résultats
    updateSelectedIndemnityValue: function () {
        // Récupérer la valeur sélectionnée du bouton radio
        var selectedRadio = document.querySelector('#indemniteChoisieDiv input[type="radio"]:checked');
        // Afficher la valeur sélectionnée dans la console
        if (selectedRadio) {
            //console.log('Valeur sélectionnée:', selectedRadio.value);
        } else {
            console.error('Aucun bouton radio n’est sélectionné.');
        }
    },


    setupRadioChangeListeners: function () {
        // Récupérer tous les boutons radio dans le div
        var radios = document.querySelectorAll('#indemniteChoisieDiv input[type="radio"]');
        // Ajouter un écouteur d'événements pour chaque bouton radio
        radios.forEach(function (radio) {
            radio.addEventListener('change', function () {
                //console.log('Nouvelle valeur sélectionnée:', radio.value);
            });
        });
    },


    /**
     * Creates and returns a DIV element containing a set of radio buttons for choosing an indemnity amount.
     * Each radio button represents a different indemnity option, allowing users to select from predefined values.
     *
     * The function programmatically creates a DIV to house the radio buttons, sets up individual radio input
     * elements for each indemnity option, and associates each with a label for better accessibility and usability.
     *
     * Returns:
     * - {HTMLElement} A DIV element containing the configured radio buttons and their labels.
     *
     * Example Usage:
     * - const indemniteDiv = createIndemniteChoisieDiv();
     * - document.body.appendChild(indemniteDiv); // This will append the created div to the body of the page.
     */
    createIndemniteChoisieDiv: function () {
        // Create the main container DIV for the indemnity choices
        const indemniteChoisieDiv = document.createElement('div');
        indemniteChoisieDiv.id = 'indemniteChoisieDiv';
        indemniteChoisieDiv.textContent = 'Montant des primes de préparation et d\'équipement (historique):';

        // Container for the radio buttons to ensure grouped layout and styling
        const radioContainer = document.createElement('div');

        // Array of options for indemnity amounts with their respective labels and a default checked option
        const indemniteOptions = [
            { value: 145, label: '145€' },
            { value: 130, label: '130€' },
            { value: 115, label: '115€', checked: true }, // Default selection
            { value: 100, label: '100€' },
        ];

        // Loop through each indemnity option to create and configure radio buttons
        indemniteOptions.forEach(option => {
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.id = `indemnite${option.value}`;
            radioInput.name = 'indemnite';
            radioInput.value = option.value;
            if (option.checked) {
                radioInput.checked = true;
            }

            const radioLabel = document.createElement('label');
            radioLabel.htmlFor = radioInput.id;
            radioLabel.textContent = option.label;

            radioContainer.appendChild(radioInput);
            radioContainer.appendChild(radioLabel);
        });

        // Append the container of radio buttons to the main div
        indemniteChoisieDiv.appendChild(radioContainer);

        return indemniteChoisieDiv;
    },



    /**
     * Populates a dropdown menu with cities of departure extracted from global 'data', 
     * along with the count of occurrences for each city. This function provides a visual 
     * representation in a form of a sorted dropdown menu where each option represents a 
     * city and the number of times it appears as a departure point in the dataset.
     *
     * Implementation Details:
     * - Retrieves the DOM element identified by the ID 'VilleDepart' to serve as the container for the dropdown.
     * - Counts each occurrence of departure cities in the global 'data' array using an object to store counts.
     * - Converts the counts object into an array of tuples, sorts them by the number of occurrences, and
     *   generates dropdown options from this sorted array.
     * - Inserts the generated options into the 'VilleDepart' dropdown, marking the first city as the default selected option.
     * - Provides error handling by checking the existence of the 'VilleDepart' DOM element and logging an error if not found.
     *
     * Usage:
     * - This function should be called during the initialization phase of the page or when the data set is updated to ensure
     *   the dropdown is always populated with the latest data.
     *
     * Example:
     * - menuVilles(); // Executes the function to populate the 'VilleDepart' dropdown.
     *
     * Note:
     * - Assumes 'data' is a globally accessible array containing objects with a 'VilleDepart' property.
     * - This function is dependent on a specific HTML structure, expecting a select element with the ID 'VilleDepart'.
     */
    menuVilles: function () {
        const selectContainer = document.getElementById("VilleDepart");
        if (selectContainer) {
            var villesDepartCount = {};

            data.forEach(function (trajet) {
                villesDepartCount[trajet.VilleDepart] = (villesDepartCount[trajet.VilleDepart] || 0) + 1;
            });

            var sortedVilles = Object.entries(villesDepartCount).sort(function (a, b) {
                return a[1] - b[1]; // Sort by count in ascending order
            });

            var options = sortedVilles.reduce((acc, item, index) => {
                const [ville, count] = item;
                const selected = index === 0 ? " selected" : "";
                return acc + `<option value="${ville}"${selected}>${ville} (${count})</option>\n`;
            }, "");

            selectContainer.innerHTML = options;
        } else {
            console.error("L'élément conteneur pour le menu des villes de départ n'existe pas dans le document.");
        }
    },



    /**
     * Generates and populates the dropdown menu for vehicle kilometric cost calculations (PRK) based on vehicle horsepower.
     * The function iterates over predefined categories of vehicle horsepower (chevaux), each associated with specific
     * formulas that calculate the kilometric cost depending on three different distance ranges. These formulas are
     * dynamically inserted as options into a dropdown menu in the HTML.
     *
     * The function categorizes formulas into:
     * - "moins de 5 000 km": Uses a simpler formula for short distances.
     * - "de 5001 à 20 000 km": Applies a base rate plus a fixed addition for medium distances.
     * - "plus de 20 000 km": Uses a higher base rate for long distances.
     *
     * Implementation Details:
     * - The dropdown menu is identified by the ID 'menuPRK' within the document.
     * - Each option in the dropdown is labeled with both the vehicle power category and the applicable distance range
     *   to provide clear context for each formula.
     * - The structure and labels are predefined but easily adjusted for different configurations or localizations.
     *
     * Assumptions:
     * - The document contains an element with the ID 'menuPRK'.
     * - Vehicle power categories and associated formulas are predefined and do not change dynamically.
     *
     * Usage:
     * - This function is typically called during the initial setup phase of a form or interface where users need to
     *   calculate travel costs based on vehicle type and distance traveled.
     *
     * Example:
     * - menuPRK(); // Populates the 'menuPRK' dropdown with appropriate PRK calculation options
     */
    menuPRK: function () {
        const categories = [
            { chevaux: "3 CV ou moins", formulas: ["0.456 * d", "(0.273 * d) + 915", "0.318 * d"] },
            { chevaux: "4 CV", formulas: ["0.523 * d", "(0.294 * d) + 1147", "0.352 * d"] },
            { chevaux: "5 CV", formulas: ["0.548 * d", "(0.308 * d) + 1200", "0.368 * d"] },
            { chevaux: "6 CV", formulas: ["0.574 * d", "(0.323 * d) + 1256", "0.386 * d"] },
            { chevaux: "7 CV ou plus", formulas: ["0.601 * d", "(0.340 * d) + 1301", "0.405 * d"] }
        ];

        const distanceLabels = [
            "moins de 5 000 km",
            "de 5001 à 20 000 km",
            "plus de 20 000 km"
        ];

        let options = categories.map(category =>
            category.formulas.map((formula, index) =>
                `<option value='${formula}'>${category.chevaux} => ${distanceLabels[index]}</option>`
            ).join("")
        ).join("\n");

        document.getElementById("menuPRK").innerHTML = options;
    },


    /**
     * Met à jour l'historique des trajets en fonction de la ville de départ sélectionnée.
     * Cette fonction récupère la valeur de la ville de départ depuis un élément select HTML d'ID "VilleDepart".
     * Elle filtre ensuite les données de trajet disponibles pour correspondre à la ville sélectionnée.
     * Si des trajets correspondants sont trouvés, la fonction procède à la génération d'un tableau
     * des résultats basé sur le PRK de la voiture sélectionné et affiche les données filtrées par saison.
     * En cas d'absence de résultats, un message de log est généré.
     *
     * Note: La fonction interrompt son exécution et log une erreur si l'élément select n'est pas présent dans le DOM.
     */
    updateHistoriqueVille: function () {
        // Récupération de la ville de départ sélectionnée
        var selectElement = document.getElementById("VilleDepart");
        if (!selectElement) {
            console.error("L'élément VilleDepart n'existe pas dans le document.");
            return; // Early exit if VilleDepart element does not exist
        }

        var VilleDepart = selectElement.value;

        // Filtrage des résultats pour la ville de départ sélectionnée
        var resultatsFiltres = data.filter(trajet => trajet.VilleDepart === VilleDepart);

        if (resultatsFiltres.length > 0) {
            // Génération des 3 tableaux des résultats pour chaque type de saison
            display.generateTableauDesignations(resultatsFiltres);
        } else {
            // Aucun résultat trouvé pour la ville de départ sélectionnée
            console.log("Aucun résultat trouvé pour la ville de départ sélectionnée:", VilleDepart);
        }
    },


    // fonction de mélange aléatoire d'un tableau Fisher-Yates
    shuffleArray: function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },


    // Fonction qui fait l'appel pour générer 3 tableaux des désignations dans le front-end
    // En entrant chaque ligne de chaque match
    // Ne renvoit rien
    generateTableauDesignations: function (resultats) {
        document.getElementById("saisonReguliereTableContainer01").innerHTML = display.tableauComparatif(resultats, "Saison régulière");
        document.getElementById("saisonReguliereTableContainer02").innerHTML = display.tableauComparatif(resultats, "Poule de relégation");
        document.getElementById("saisonReguliereTableContainer03").innerHTML = display.tableauComparatif(resultats, "Phase finale");
    },


    updateProfitPercentageMicro: function (pourcentage) {
        // Get the span by its ID
        // Mets à jour le %age du badge
        const percentageSpan = document.getElementById('profitIncreasePercentageMicro');

        // Update the text content of the span
        percentageSpan.textContent = pourcentage.toFixed(2) + '%';
    },

    updateProfitPercentageEurlIr: function (pourcentage) {
        // Get the span by its ID
        // Mets à jour le %age du badge
        const percentageSpan = document.getElementById('profitIncreasePercentageEurlIr');

        // Update the text content of the span
        percentageSpan.textContent = pourcentage.toFixed(2) + '%';
    },

    updateProfitPercentageEurlIs: function (pourcentage) {
        // Get the span by its ID
        // Mets à jour le %age du badge
        const percentageSpan = document.getElementById('profitIncreasePercentageEurlIs');

        // Update the text content of the span
        percentageSpan.textContent = pourcentage.toFixed(2) + '%';
    },


    updateProfitPercentageSasuIr: function (pourcentage) {
        // Get the span by its ID
        // Mets à jour le %age du badge
        const percentageSpan = document.getElementById('profitIncreasePercentageSasuIr');

        // Update the text content of the span
        percentageSpan.textContent = pourcentage.toFixed(2) + '%';
    },


    updateProfitPercentageSasuIs: function (pourcentage) {
        // Get the span by its ID
        // Mets à jour le %age du badge
        const percentageSpan = document.getElementById('profitIncreasePercentageSasuIs');

        // Update the text content of the span
        percentageSpan.textContent = pourcentage.toFixed(2) + '%';
    },

    updateProfitPercentageSasuIsAbattement: function (pourcentage) {
        // Get the span by its ID
        // Mets à jour le %age du badge
        const percentageSpan = document.getElementById('profitIncreasePercentageSasuIsAbattement');

        // Update the text content of the span
        percentageSpan.textContent = pourcentage.toFixed(2) + '%';
    },

    updateFrontendTotalIndeminite: function (totalBeneficeReel) {
        document.getElementById('frontTotalBeneficeReelDisplay').innerHTML = totalBeneficeReel;
    },


    // Fonction de mise à jour du badge en frontend ligne 1 badge 2 - total benefice apres PRK pour le defrayement par indemnités
    updateFrontendTotalBeneficeReel: function () {
        let dat_total00 = (Object.values(globalBeneficeReelValues).reduce((acc, value) => acc + value, 0)).toFixed();
        document.getElementById('frontTotalBeneficeReelDisplay').innerHTML = display.formateEuroBadge(dat_total00);
    },


    // Fonction de mise à jour du badge en frontend ligne 1 badge 3 - total benefice apres PRK pour le defrayement par prime (nouveau système)
    updateFrontendTotalBeneficePrimeReel: function () {
        let dat_total01 = (Object.values(globalBeneficeReelPrimeValues).reduce((acc, value) => acc + value, 0)).toFixed();
        document.getElementById('frontTotalBeneficeReelPrimeDisplay').innerHTML = display.formateEuroBadge(dat_total01);
    },


    // Fonction de mise à jour du badge en frontend ligne 2 badge 1 - issue du tableau 1 : travailleur indépendant
    updateFrontendTotalBeneficeTravailleurIndependant: function (totalBeneficeTravailleurIndependant) {
        document.getElementById('frontTotalBeneficeTravailleurIndependant').innerHTML = totalBeneficeTravailleurIndependant.toLocaleString('fr-FR');
    },

    updateFrontendBadge: function () {
        document.getElementById('frontNbreMatchs').innerHTML = parseInt(nbre_matchs_01) + parseInt(nbre_matchs_02) + parseInt(nbre_matchs_03);

        // Donnée du tableau 1
        var totalBeneficeTravailleurIndependant = parseFloat(resultat_net_01 + resultat_net_02 + resultat_net_03).toFixed(2); // Résultat net
        totalBeneficeTravailleurIndependant = display.formateEuroBadge(totalBeneficeTravailleurIndependant);
        display.updateFrontendTotalBeneficeTravailleurIndependant(totalBeneficeTravailleurIndependant);

    },


    formateEuroBadge: function (donneaformater) {
        var donneebadgeformatee = parseFloat(donneaformater).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " €";
        return donneebadgeformatee;
    },


    generateTableauComparatifHeader: function (nbMatchs, idtableau) {

        htmlTableau = `<h5 class="card-title">${nbMatchs} matchs.<span></span></h5>
        <table id="${idtableau}" class="table table-sm table-striped table-hover text-center">
        <thead>
            <tr>
                <th scope="col">Domicile</th>
                <th scope="col">Destination</th>
                <th scope="col">Distance<br>A/R Km</th>
                <th scope="col" class="rotate-45"><div><span>Péages</span></div></th>
                <th scope="col">Temps de trajet<br>A/R</th>
                <th scope="col">Grand<br>déplacement</th>
                <th scope="col">Indem. km</th>
                <th scope="col">PRK</th>
                <th scope="col">Repas</th>
                <th scope="col">Hôtel</th>
                <th scope="col">Indemnité</th>
                <th scope="col">Chiffre d'affaire<br> note de frais</th>
                <th scope="col">Bénéfices rééls <br> note de frais</th>
                <th scope="col">Chiffre d'affaire<br> primes</th>
                <th scope="col">Frais fixes moyens</th>
                <th scope="col">Bénéfice rééls<br> primes</th>
                <th scope="col">Bénéfices note de frais<br>sans PRK</th>
                <th scope="col">Bénéfices primes<br>sans PRK</th>
            </tr>
        </thead>
        <tbody>` ;

        return htmlTableau;
    },


    /**
    * Generates and returns an HTML table that displays comparative data for different match sessions.
    * This function calculates various costs and benefits for matches depending on their type and compiles them into a formatted HTML table.
    * It handles different season types, calculates expenses based on predefined rates for meals and hotels, and computes the total benefits including allowances.
    *
    * Parameters:
    * - resultats {Array} - An array of objects containing data about each match, such as distances and toll fees.
    * - typeSaison {String} - A string indicating the type of season which could be "Saison régulière", "Poule de relégation", or "Phase finale". This determines which set of matches and corresponding data are processed.
    *
    * Returns:
    * - {String} An HTML string representing a table filled with calculated data for matches. If no valid season type or matches are found, it returns a message indicating no data is available.
    *
    * Implementation Details:
    * - First, the function verifies if the season type provided is valid and determines the index to fetch relevant data.
    * - It retrieves the number of matches and the proportion that involves long distances to calculate costs accordingly.
    * - It loops through each match to compute total and individual costs for transportation, meals, accommodation, and bonuses.
    * - The costs are aggregated and displayed at the bottom of the table as totals.
    * - Additionally, the function prepares data for graphical representation which is handled elsewhere by `generateGraphsApex`.
    * - Debugging statements are included to log errors or warnings when expected data elements are missing.
    *
    * Usage:
    * - This function is typically called when a user selects a season type from the UI and requests a detailed breakdown of costs and benefits.
    *
    * Example:
    * - tableauComparatif(matchData, 'Saison régulière');
    */
    tableauComparatif: function (resultats, typeSaison) {
        var coutRepas = 17; // Coût fixé pour les repas
        var coutHotel = 87; // Coût fixé pour les hôtels
        var totalBeneficeReel = 0; // Fixe la boucle à zero pour éviter l'addition infinie

        var nbMatches = [
            parseInt(document.getElementById('nbre_matchs_01').value),
            parseInt(document.getElementById('nbre_matchs_02').value),
            parseInt(document.getElementById('nbre_matchs_03').value)
        ];

        // Récupération des grands déplacements
        var pourcentageGrandDeplacement = parseInt(document.getElementById('pourcentageGrandDeplacement').value);

        var index = ["Saison régulière", "Poule de relégation", "Phase finale"].indexOf(typeSaison);
        if (index === -1) {
            console.error("Invalid typeSaison value");
            console.log("type saison =>" + typeSaison);
            return ""; // Bye !
        }
        var prime = parseFloat(document.getElementById(`prime_montant_0${index + 1}`).value);
        var frais = parseFloat(document.getElementById(`frais_par_match0${index + 1}`).value);

        var formulePrk = document.getElementById("menuPRK").value;

        let colorTotalBeneficeReel = 0;
        let colorTotalPrimeBenefice = 0;
        let colorTotalBeneficeFraisSSPRK = 0
        let colorTotalBeneficePrimeSSPRK = 0;

        // Récupération de la valeur de l'indemnité choisie
        var valeurIndemnite = document.querySelector('#indemniteChoisieDiv input[type="radio"]:checked') ?
            parseInt(document.querySelector('#indemniteChoisieDiv input[type="radio"]:checked').value) : 115;

        var totalPRK = 0, totalKilometriques = 0, totalRepas = 0, totalHotels = 0, totalFrais = 0;
        var totalGrandDeplacement = 0, totalDistance = 0, totalPeages = 0, totalTempsTrajet = 0;
        var totalPrimes = 0, totalFraisHistorique = 0, totalPreparation = 0, totalPrimeBenefice = 0;
        var totalBeneficePrimeSSPRK = 0, totalBeneficeFraisSSPRK = 0;

        // Récupération du nombre de matchs à traiter
        var nbMatchs = nbMatches[index];

        let idtableau = "tableauComparatif0" + index;

        // On appelle la fonction qui va générer le header du tableau HTML
        htmlTableau = display.generateTableauComparatifHeader(nbMatchs, idtableau);

        // Itération sur les résultats pour les afficher dans le tableau
        var processedCount = 0;

        var graphData = []; // Tableau pour collecter les données pour le graphe


        // Vérification si le nombre de matchs est supérieur au nombre de résultats
        if (resultats.length === 0) {
            console.error("Aucun résultat disponible pour le traitement.");
            return `<h3>${typeSaison} : Aucun résultat disponible.</h3>`;
        }

        // Calcul du nombre de grands déplacements et de petits déplacements
        var nbGrandDeplacement = Math.round(nbMatches[index] * pourcentageGrandDeplacement);
        var matchTypes = new Array(nbMatches[index]).fill(0).map((_, idx) => idx < nbGrandDeplacement);

        //var nbMatchs = nbMatches[index];
        // Boucle sur les résultats pour les afficher dans le tableau
        // La boucle va durer 3x pour les 3 quantité de match dans la saison
        for (var i = 0; i < nbMatchs && processedCount < nbMatches[index]; i++) {

            var isLongDistance = matchTypes[i];
            var distance = isLongDistance ? 600 : 300; // Utilisation des types de match mélangés pour assigner les distances

            var trajet = resultats[i % resultats.length];
            // Vérification des données pour le calcul
            if (!trajet || !trajet.Km || !trajet.Peages) {
                console.error("Données incomplètes pour l'index", i);
                continue;
            }

            distance = parseFloat(trajet.Km * 2); // Surcharge de la variable 'distance' pour refléter les vraies distances
            var prk = eval(formulePrk.replace('d', distance.toString())); // Calcul du PRK, utilisation sécurisée de eval
            var grandDeplacement = distance > 500 ? 80 : 0;
            var repas = (distance > 500 ? 2 : 1) * coutRepas;
            var hotel = (distance > 500 ? coutHotel : 0);
            var indemnites = distance * 0.410;
            var peages = parseFloat(trajet.Peages * 2);
            var fraisHistorique = peages + grandDeplacement + indemnites + repas + hotel + valeurIndemnite;
            var beneficeReel = fraisHistorique - (prk + repas + peages + hotel);
            var primeBenefice = prime - frais - prk;
            
            var beneficePrimeSSPRK = prime - frais;
            var beneficeFraisSSPRK = fraisHistorique - (repas + peages + hotel);

            var TempsTrajetAllerRetour = (parseInt(trajet.TempsTrajet.split('h')[0]) * 60 + parseInt(trajet.TempsTrajet.split('h')[1])) * 2;

            // Peuplement des données pour le graphique
            // Peuplement du tableau temporaire qui va servir pour la génération du graphe
            // Il suffit de rajouter les données en paramêtre pour rajouter une ligne dans le graphe
            graphData.push({
                processedCount: processedCount,
                beneficeReel: beneficeReel.toFixed(0),
                primeBenefice: primeBenefice.toFixed(0),
                beneficePrimeSSPRK: beneficePrimeSSPRK.toFixed(0),
                beneficeFraisSSPRK: beneficeFraisSSPRK.toFixed(0)
            });

            // Mise en format du tableau HTML
            htmlTableau += `
            <tr>
                <th scope="row">${trajet.VilleDepart}</th>
                <td><span class="text-primary">${trajet.VilleDestination}</span></td>
                <td>${distance}</td>
                <td>${peages}</td>
                <td>${Math.floor(TempsTrajetAllerRetour / 60)}h${TempsTrajetAllerRetour % 60} min</td>
                <td>${grandDeplacement}</td>
                <td>${indemnites.toFixed()}</td>
                <td>${prk.toFixed(0)}</td>
                <td>${repas.toFixed()}</td>
                <td>${hotel.toFixed()}</td>
                <td>${valeurIndemnite}</td>
                <td>${fraisHistorique.toFixed(0)}</td>
                <td style="${beneficeReel < 0 ? "color:red;" : ""}">${beneficeReel.toFixed(0)}</td>
                <td>${prime.toFixed(0)}</td>
                <td>${frais.toFixed(0)}</td>
                <td style="${primeBenefice < 0 ? "color:red;" : ""}">${primeBenefice.toFixed(0)}</td>
                <td style="${beneficeFraisSSPRK < 0 ? "color:red;" : ""}">${beneficeFraisSSPRK.toFixed(0)}</td>
                <td style="${beneficePrimeSSPRK < 0 ? "color:red;" : ""}">${beneficePrimeSSPRK.toFixed(0)}</td>

            </tr>`;

            // Mise à jour des totaux
            totalDistance += distance;
            totalPeages += peages;
            totalTempsTrajet += TempsTrajetAllerRetour;
            totalKilometriques += indemnites;
            totalRepas += repas;
            totalHotels += hotel;
            totalGrandDeplacement += grandDeplacement;
            totalPrimes += prime;
            totalFrais += frais;
            totalFraisHistorique += fraisHistorique;
            totalPreparation += valeurIndemnite;
            totalBeneficeReel += beneficeReel;
            totalPrimeBenefice += primeBenefice;
            totalPRK += prk;
            totalBeneficePrimeSSPRK += +beneficePrimeSSPRK;
            totalBeneficeFraisSSPRK += +beneficeFraisSSPRK;

            processedCount++;


        }; // Fin de la boucle for


        // Calcul des taux horaires
        var totalHeuresTrajet = Math.floor(totalTempsTrajet / 60);

        var tauxHoraireIndemnite = totalBeneficeReel / totalHeuresTrajet;
        var tauxHorairePrime = totalPrimeBenefice / totalHeuresTrajet;
        var tauxHorairePrimeSSPRK = totalBeneficePrimeSSPRK / totalHeuresTrajet;
        var tauxHoraireFraisSSPRK = totalBeneficeFraisSSPRK / totalHeuresTrajet;

        // Si jamais le résultat est négatif, alors on le met en rouge
        colorTotalBeneficeReel = totalBeneficeReel < 0 ? "color:red;" : "";
        colorTotalPrimeBenefice = totalPrimeBenefice < 0 ? "color:red;" : "";
        colorTotalBeneficePrimeSSPRK = totalBeneficePrimeSSPRK < 0 ? "color:red;" : "";
        colorTotalBeneficeFraisSSPRK = totalBeneficeFraisSSPRK < 0 ? "color:red;" : "";
        
        // Footer du tableau
        htmlTableau += `</tbody>
        <tfoot>
            <tr class="totalRow">
                <td>TOTAUX</td>
                <td><span class="text-primary">${nbMatchs} matchs</span></td>
                <td>${totalDistance}</td>
                <td>${totalPeages.toFixed(0)}</td>
                <td>${Math.floor(totalTempsTrajet / 60)}h${totalTempsTrajet % 60}</td>
                <td>${totalGrandDeplacement.toFixed(0)}</td>
                <td>${totalKilometriques.toFixed(0)}</td>
                <td>${totalPRK.toFixed()}</td>
                <td>${totalRepas.toFixed(0)}</td>
                <td>${totalHotels.toFixed(0)}</td>
                <td>${totalPreparation.toFixed(0)}</td>
                <td>${totalFraisHistorique.toFixed(0)}</td>
                <td style ="${colorTotalBeneficeReel}">${totalBeneficeReel.toFixed(0)}</td>
                <td>${totalPrimes.toFixed(0)}</td>
                <td>${totalFrais.toFixed(0)}</td>
                <td style ="${colorTotalPrimeBenefice}">${totalPrimeBenefice.toFixed(0)}</td>
                <td style ="${colorTotalBeneficeFraisSSPRK}"><b>${totalBeneficeFraisSSPRK.toFixed(0)}</b></td>
                <td style ="${colorTotalBeneficePrimeSSPRK}"><b>${totalBeneficePrimeSSPRK.toFixed(0)}</b></td>
            </tr>
        </tfoot>
        </table>`;

        htmlTableau += `<table>
            <tr>
                <td colspan='1'>
                    <span class="text-primary">Taux horaire moyen basé sur l'indemnité avec PRK : <b>${tauxHoraireIndemnite.toFixed(2)} €/heure</b>. <br>
                    Taux horaire moyen basé sur l'indemnité sans PRK : <b>${tauxHoraireFraisSSPRK.toFixed(2)} €/heure</b>.</span>
                </td>
            </tr>

            <tr>
                <td colspan='8'>
                    <span class="text-primary">Taux horaire moyen basé sur la prime avec PRK : <b>${tauxHorairePrime.toFixed(2)} €/heure</b>.<br>
                    Taux horaire moyen basé sur la prime sans PRK : <b>${tauxHorairePrimeSSPRK.toFixed(2)} €/heure</b>.</span>
                </td>
            </tr>
        </table>`;

        // On additionne pour chaque saison les sous totaux des 3 tableaux
        globalBeneficeReelValues[typeSaison] = totalBeneficeFraisSSPRK; // Benefice de l'indemnite de match en prenant en compte le PRK
        globalBeneficeReelPrimeValues[typeSaison] = totalBeneficePrimeSSPRK;

        // On affiche le resultat des sous totaux
        display.updateFrontendTotalBeneficeReel();
        display.updateFrontendTotalBeneficePrimeReel();

        //let couleurGraphe1 = ['#1754f1', '#1eca6a', '#5f771d'];
        generateGraphsApex(graphData, index); // Data and index for the first chart

        return htmlTableau;

    }, // Fin de la fonction



    // Mise à jour du tableau historique avec le PRKVoiture sélectionné
    updateHistoriquePRK: function () {
        // Test si le menu déroulant pour le PRKVoiture existe dans le document
        if (document.getElementById("menuPRK")) {
            // Récupérer la valeur sélectionnée du PRKVoiture dans le menu déroulant
            var prkVoiture = document.getElementById("menuPRK").value;
            // Récupérer l'élément conteneur du tableau des résultats
            var tableauContainer = document.getElementById("saisonReguliereTableContainer01");

            if (tableauContainer) {
                // Mettre à jour le contenu du tableau des résultats avec les données et le PRKVoiture sélectionné
                //tableauContainer.innerHTML = display.tableauComparatif(resultats, typeSaison);
                display.updateFrontendBadge();

            } else {
                console.error("L'élément conteneur pour le tableau historique des résultats n'existe pas dans le document.");
            }
        }
    },


    // Tableau utile pour debug
    // N'a pas vocation à être affiché ensuite
    createTableauImpositionGenerale: function () {
        //
        htmlTableau += `<table id="impotGenerale" class="table table-sm table-striped table-dark table-hover">
        <thead>
        <tr>
          <th scope="col">C1 -</th>
          <th scope="col">C2 / Impots SASU IS</th>
          <th scope="col">C3 / Impots SASU IR</th>
          <th scope="col">C4 / Impots EURL IS</th>
          <th scope="col">C5 / Impots EURL IR</th>
          <th scope="col">C6 / Impots sans être au service du hockey</th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <td id="r2c1">R2C1</td>
                <td id="r2c2">R2C2</td>
                <td id="r2c3">R2C3</td>
                <td id="r2c4">R2C4</td>
                <td id="r2c5">R2C5</td>
                <td id="r2c6">R2C6</td>
            </tr>
            <tr>
                <td id="r3c1">R3C1</td>
                <td id="r3c2">R3C2</td>
                <td id="r3c3">R3C3</td>
                <td id="r3c4">R3C4</td>
                <td id="r3c5">R3C5</td>
                <td id="r3c6">R3C6</td>
            </tr>
            <tr>
                <td id="r4c1">R4C1</td>
                <td id="r4c2">R4C2</td>
                <td id="r4c3">R4C3</td>
                <td id="r4c4">R4C4</td>
                <td id="r4c5">R4C5</td>
                <td id="r4c6">R4C6</td>
            </tr>
            <tr>
                <td id="r5c1">Impots à payer</td>
                <td id="r5c2">R5C2</td>
                <td id="r5c3">R5C3</td>
                <td id="r5c4">R5C4</td>
                <td id="r5c5">R5C5</td>
                <td id="r5c6">R5C6</td>
            </tr>
        </tbody>
    </table>`;
        document.getElementById("divImpotTableauImpositionGenerale").innerHTML = htmlTableau;
    },


    // Tableau en noir - pour vérifier les calculs  et les formules
    // N'a pas vocation à être affiché une fois les calculs validés
    // TODO => est utilisé pour le calcul de fond, voir pour ne plus l'afficher mais garder les calculs
    updateTableauImpositionGenerale: function () {

        nbrepartfiscale = parseFloat(document.getElementById('idNombrePartFiscale').value);
        revenufiscal = parseFloat(document.getElementById('idRevenuFiscalReference').value);

        ///////////////////////////////////////////////////////////////////////////////////
        // Colonne impots SASU IS C2
        ///////////////////////////////////////////////////////////////////////////////////
        var r2c2 = parseFloat(sasu_is_cell15_4);
        document.getElementById("r2c2").innerHTML = r2c2;

        var r3c2 = parseFloat(((r2c2 + parseFloat(revenufiscal)) / nbrepartfiscale));
        document.getElementById("r3c2").innerHTML = r3c2.toFixed(0);

        var r4c2 = parseFloat(calculateTaxTest(r3c2));
        document.getElementById("r4c2").innerHTML = r4c2.toFixed(0);

        var r5c2 = parseFloat(r4c2 * nbrepartfiscale);
        document.getElementById("r5c2").innerHTML = r5c2.toFixed(0);



        ///////////////////////////////////////////////////////////////////////////////////
        // Colonne impots SASU IR C3
        ///////////////////////////////////////////////////////////////////////////////////
        var r2c3 = sasu_ir_cell14_4;
        document.getElementById("r2c3").innerHTML = r2c3.toFixed(0);

        var r3c3 = ((r2c3 + parseFloat(revenufiscal)) / nbrepartfiscale);
        document.getElementById("r3c3").innerHTML = r3c3.toFixed(0);

        var r4c3 = calculateTaxTest(r3c3);
        document.getElementById("r4c3").innerHTML = r4c3.toFixed(0);

        var r5c3 = r4c3 * nbrepartfiscale;
        document.getElementById("r5c3").innerHTML = r5c3.toFixed(0);


        ///////////////////////////////////////////////////////////////////////////////////
        // Colonne impots EURL IS C4 - OK FAIT ET VALIDE
        ///////////////////////////////////////////////////////////////////////////////////
        var r2c4 = tempResultatNetImpotsEurlIs;
        document.getElementById("r2c4").innerHTML = r2c4.toFixed(0);

        var r3c4 = ((r2c4 + parseFloat(revenufiscal)) / nbrepartfiscale);
        document.getElementById("r3c4").innerHTML = r3c4.toFixed(0);

        var r4c4 = calculateTaxTest(r3c4);
        document.getElementById("r4c4").innerHTML = r4c4.toFixed(0);

        var r5c4 = r4c4 * nbrepartfiscale;
        document.getElementById("r5c4").innerHTML = r5c4.toFixed(0);

        ///////////////////////////////////////////////////////////////////////////////////
        // Colonne impots EURL IR  C5 - OK FAIT ET VALIDE
        ///////////////////////////////////////////////////////////////////////////////////
        document.getElementById("r2c5").innerHTML = resultats_net_eurl.toFixed(0);
        document.getElementById("r3c5").innerHTML = revenuParPartEurlIr.toFixed(0);
        document.getElementById("r4c5").innerHTML = calculateTaxTest(revenuParPartEurlIr).toFixed(0);
        document.getElementById("r5c5").innerHTML = (calculateTaxTest(revenuParPartEurlIr) * nbrepartfiscale).toFixed(0);


        ///////////////////////////////////////////////////////////////////////////////////
        // Colonne impots sans le hockey - OK FAIT ET VALIDE
        ///////////////////////////////////////////////////////////////////////////////////
        document.getElementById("r2c6").innerHTML = "vide";

        var r3c6 = revenufiscal / nbrepartfiscale;
        document.getElementById("r3c6").innerHTML = r3c6.toFixed(0);

        var r4c6 = calculerImpotsRevenu(revenuFiscalReference);
        document.getElementById("r4c6").innerHTML = r4c6.toFixed(0);

        var r5c6 = (calculerImpotsRevenu(revenuFiscalReference) * nbrepartfiscale);
        document.getElementById("r5c6").innerHTML = r5c6.toFixed(0);

        ///////////////////////////////////////////////////////////////////////////////////
        // Affichage positionné ici pour des raisons de bug d'affichage et de calcul du tableau 2 BIS
        // Les variables globales restent à 0
        // A investiguer corriger par la suite
        ///////////////////////////////////////////////////////////////////////////////////
        impositionIntermediaireEurlIr = calculerMontantImpotIntermediaireEurlIr();
        document.getElementById("tns_ir_cell15_2").innerHTML = display.formateEuroBadge(impositionIntermediaireEurlIr);

        apresImpositionEurlIr = resultats_net_eurl - impositionIntermediaireEurlIr
        document.getElementById("tns_ir_cell15_4").innerHTML = display.formateEuroBadge(apresImpositionEurlIr); // Bénéfices après impots

        // On affiche le pourcentage dans le badge 1
        var pourcentageImpositionEurlIr = (parseFloat(apresImpositionEurlIr) / parseFloat(nbre_matchs_01 * prime_montant_01 + nbre_matchs_02 * prime_montant_02 + nbre_matchs_03 * prime_montant_03)) * 100;
        display.updateProfitPercentageEurlIr(pourcentageImpositionEurlIr);
        // Fin du contournement du tableau 2 BIS
        ///////////////////////////////////////////////////////////////////////////////////

        document.getElementById('frontTotalBeneficeEurlIr').innerHTML = display.formateEuroBadge(apresImpositionEurlIr);

        ///////////////////////////////////////////////////////////////////////////////////
        // Calcul à effectuer en fin de procédure pour avoir les bonnes données
        // Affichage ici  pour des raisons de bug d'affichage et de calcul du tableau 3
        impositionIntermediaireEurlIs = r5c4 - r5c6;
        document.getElementById("tns_is_cell16_2").innerHTML = display.formateEuroBadge(impositionIntermediaireEurlIs);

        var apresImpositionEurlIs = tempResultatNetImpotsEurlIs - impositionIntermediaireEurlIs;
        document.getElementById("tns_is_cell16_4").innerHTML = display.formateEuroBadge(apresImpositionEurlIs); // Bénéfices après impots


        // On affiche le pourcentage dans le badge sur le frontend
        var pourcentageImpositionEurlIs = (parseFloat(apresImpositionEurlIs) / parseFloat(nbre_matchs_01 * prime_montant_01 + nbre_matchs_02 * prime_montant_02 + nbre_matchs_03 * prime_montant_03)) * 100;

        display.updateProfitPercentageEurlIs(pourcentageImpositionEurlIs);
        document.getElementById('frontTotalBeneficeEurlIs').innerHTML = display.formateEuroBadge(apresImpositionEurlIs);
        // Fin du contournement pour le tableau 3
        ///////////////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////////////////////////////////
        // Calcul à effectuer en fin de procédure pour avoir les bonnes données
        // Affichage ici  pour des raisons de bug d'affichage et de calcul du tableau 4
        sasu_ir_cell15_2 = parseFloat(r5c3) - parseFloat(r5c6);
        document.getElementById("sasu_ir_cell15_2").innerHTML = display.formateEuroBadge(sasu_ir_cell15_2); // impots intermédiaires

        apresImpositionSasuIr = parseFloat(sasu_ir_cell14_4) - parseFloat(sasu_ir_cell15_2);
        document.getElementById("sasu_ir_cell15_4").innerHTML = display.formateEuroBadge(apresImpositionSasuIr); // Bénéfices après impots

        // On affiche le pourcentage dans le badge sur le frontend
        var pourcentageImpositionSasuIr = (parseFloat(apresImpositionSasuIr) / parseFloat(nbre_matchs_01 * prime_montant_01 + nbre_matchs_02 * prime_montant_02 + nbre_matchs_03 * prime_montant_03)) * 100;
        display.updateProfitPercentageSasuIr(pourcentageImpositionSasuIr);
        document.getElementById('frontTotalBeneficeSasuIr').innerHTML = display.formateEuroBadge(apresImpositionSasuIr);
        // Fin du contournement pour le tableau 4
        ///////////////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////////////////////////////////
        // Calcul à effectuer en fin de procédure pour avoir les bonnes données
        // Affichage ici  pour des raisons de bug d'affichage et de calcul du tableau 5
        var apresImpositionSasuIs = sasu_is_cell15_4 - (r5c2 - r5c6);
        document.getElementById("sasu_is_cell16_4").innerHTML = display.formateEuroBadge(apresImpositionSasuIs); // 30% abattement


        // BADGE SASU IS 
        // On affiche le pourcentage dans le badge sur le frontend
        var pourcentageImpositionSasuIs = (parseFloat(apresImpositionSasuIs) / parseFloat(nbre_matchs_01 * prime_montant_01 + nbre_matchs_02 * prime_montant_02 + nbre_matchs_03 * prime_montant_03)) * 100;

        display.updateProfitPercentageSasuIs(pourcentageImpositionSasuIs);

        document.getElementById('frontTotalBeneficeSasuIs').innerHTML = display.formateEuroBadge(apresImpositionSasuIs);

        var pourcentageImpositionSasuIsAbattement = (parseFloat(apresImpositionSasuIs) / parseFloat(nbre_matchs_01 * prime_montant_01 + nbre_matchs_02 * prime_montant_02 + nbre_matchs_03 * prime_montant_03)) * 100;
        display.updateProfitPercentageSasuIsAbattement(pourcentageImpositionSasuIsAbattement);

        // Fin du contournement pour le tableau 5
        ///////////////////////////////////////////////////////////////////////////////////


    },


    // Mise à jour de l'ensemble des tableaux prévisionnels de la fédération
    updateTableauImpositions: function () {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des résultats dans le tableau 1 - micro entreprise
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
        document.getElementById("cell12_4").innerHTML = (resultat_net_01 + resultat_net_02 + resultat_net_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des résultats sur la saison

        var pourcentageImpositionMicro = ((parseInt(resultat_net_01) + parseInt(resultat_net_02) + parseInt(resultat_net_03)) / (parseInt(brut_annuel_01) + parseInt(brut_annuel_02) + parseInt(brut_annuel_03))) * 100;

        // On affiche le pourcentage dans le badge 1
        display.updateProfitPercentageMicro(pourcentageImpositionMicro);


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des résultats dans le tableau 2 - Récap des impositions commmunes
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Colonne  13 : frais annexes
        //          14 : résultats nets
        //          15 : vide
        //          16 : après imposition
        //          
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.getElementById("tns_ir_cell2_1").innerHTML = nbre_matchs_01; // Nombre de matchs (match 1)
        document.getElementById("tns_ir_cell4_1").innerHTML = "0 %"; // % URSSAF
        document.getElementById("tns_ir_cell5_1").innerHTML = "0 €"; // Cotisations URSSAF par match (match 1)
        document.getElementById("tns_ir_cell6_1").innerHTML = prime_montant_01.toLocaleString('fr-FR') + " €"; // Net par match (match 1)
        document.getElementById("tns_ir_cell7_1").innerHTML = (nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_ir_cell8_1").innerHTML = "0 €"; // Cotisations annuelles
        document.getElementById("tns_ir_cell9_1").innerHTML = (nbre_matchs_01 * prime_montant_01).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("tns_ir_cell10_1").innerHTML = frais_par_match01.toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("tns_ir_cell11_1").innerHTML = frais_annuel_01 + " €"; // Frais annuels
        document.getElementById("tns_ir_cell12_1").innerHTML = resultat_intermediaire_01 + " €"; // Resultat intermédiaire

        document.getElementById("tns_ir_cell2_2").innerHTML = nbre_matchs_02; // Nombre de matchs (match 2)
        document.getElementById("tns_ir_cell4_2").innerHTML = "0 %"; // % URSSAF
        document.getElementById("tns_ir_cell5_2").innerHTML = "0 €"; // Cotisations URSSAF par match (match 2)
        document.getElementById("tns_ir_cell6_2").innerHTML = prime_montant_02.toLocaleString('fr-FR') + " €"; // Net par match (match 2)
        document.getElementById("tns_ir_cell7_2").innerHTML = (nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_ir_cell8_2").innerHTML = "0 €"; // Cotisations annuelles
        document.getElementById("tns_ir_cell9_2").innerHTML = (nbre_matchs_02 * prime_montant_02).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("tns_ir_cell10_2").innerHTML = frais_par_match02 + " €"; // Frais par match
        document.getElementById("tns_ir_cell11_2").innerHTML = frais_annuel_02.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("tns_ir_cell12_2").innerHTML = resultat_intermediaire_02.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire

        document.getElementById("tns_ir_cell2_3").innerHTML = nbre_matchs_03; // Nombre de matchs (match 3)
        document.getElementById("tns_ir_cell4_3").innerHTML = "0 %"; // % URSSAF
        document.getElementById("tns_ir_cell5_3").innerHTML = "0 €"; // Cotisations URSSAF par match (match 3)
        document.getElementById("tns_ir_cell6_3").innerHTML = prime_montant_03.toLocaleString('fr-FR') + " €"; // Net par match (match 3)
        document.getElementById("tns_ir_cell7_3").innerHTML = (nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Brut annuel
        document.getElementById("tns_ir_cell8_3").innerHTML = "0 €"; // Cotisations annuelles
        document.getElementById("tns_ir_cell9_3").innerHTML = (nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Net d'URSSAF annuel
        document.getElementById("tns_ir_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €"; // Frais par match
        document.getElementById("tns_ir_cell11_3").innerHTML = frais_annuel_03.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais
        document.getElementById("tns_ir_cell12_3").innerHTML = resultat_intermediaire_03.toLocaleString('fr-FR') + " €"; // Resultat intermédiaire

        // Ligne 4 => Sommes annuelles
        document.getElementById("tns_ir_cell2_4").innerHTML = totalmatch.toLocaleString('fr-FR'); // Nombre de matchs ANNUEL
        document.getElementById("tns_ir_cell7_4").innerHTML = (nbre_matchs_01 * prime_montant_01 + nbre_matchs_02 * prime_montant_02 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des bruts sur la saison
        document.getElementById("tns_ir_cell8_4").innerHTML = "0 €"; // Sommes annuelle des cotisations URSSAF
        document.getElementById("tns_ir_cell9_4").innerHTML = (nbre_matchs_01 * prime_montant_01 + nbre_matchs_02 * prime_montant_02 + nbre_matchs_03 * prime_montant_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des nets d'URSSAF
        document.getElementById("tns_ir_cell11_4").innerHTML = (frais_annuel_01 + frais_annuel_02 + frais_annuel_03).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais sur la saison

        document.getElementById("tns_ir_cell12_4").innerHTML = resultats_eurl_intermediaire.toLocaleString('fr-FR') + " €"; // 

        // Appel de la fonction pour la suite des calculs. 
        // Doit se faire à ce moment des opération pour avoir les données justes
        valeurImpotEurlIr = calculerImpotsRevenu(resultats_net_eurl);



        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des résultats dans le tableau 2 BIS - Imposition EURL IR
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Colonne  13 : frais annexes
        //          14 : résultats nets
        //          15 : vide
        //          16 : après imposition
        //          
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.getElementById("tns_ir_cell13_1").innerHTML = frais_banque + " €"; // Frais annexes  : compte bancaire
        document.getElementById("tns_ir_cell13_2").innerHTML = frais_comptable.toLocaleString('fr-FR') + " €"; // Frais annexes : comptable
        document.getElementById("tns_ir_cell13_3").innerHTML = urssaf + " €"; // Frais annexes : cotisation URSSAF
        document.getElementById("tns_ir_cell13_4").innerHTML = total_frais_annexe_eurl.toLocaleString('fr-FR') + " €"; // Sommes frais annexes

        document.getElementById("tns_ir_cell14_4").innerHTML = resultats_net_eurl + " €"; // Résultat net total


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des résultats dans le tableau 3 - EURL IS
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Colonne  13 : frais annexes
        //          14 : résultats nets
        //          15 : résultat net d'impots
        //          16 : après imposition
        //          
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Ligne 1
        document.getElementById("tns_is_cell13_1").innerHTML = frais_banque + " €"; // Frais annexes

        // Ligne 2
        document.getElementById("tns_is_cell13_2").innerHTML = frais_comptable + " €"; // Frais annexes
        document.getElementById("tns_is_cell15_2").innerHTML = (resultats_net_eurl * (15 / 100)).toLocaleString('fr-FR') + " €"; // Résultat net d'impot intermédiaire

        // Ligne 3
        document.getElementById("tns_is_cell13_3").innerHTML = urssaf.toLocaleString('fr-FR') + " €"; // Frais annexes

        // Ligne 4 => Sommes annuelles    
        document.getElementById("tns_is_cell13_4").innerHTML = total_frais_annexe_eurl.toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais annexes sur la saison
        document.getElementById("tns_is_cell14_4").innerHTML = resultats_net_eurl + " €"; // Résultat net

        tempResultatNetImpotsEurlIs = (resultats_net_eurl - (resultats_net_eurl * (15 / 100)));
        document.getElementById("tns_is_cell15_4").innerHTML = tempResultatNetImpotsEurlIs.toLocaleString('fr-FR') + " €"; // impots sur le revenu


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des résultats dans le tableau 4 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var resultat_intermediaire_total = resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03;
        document.getElementById("sasu_ir_cell13_1").innerHTML = frais_banque + " €"; // Frais annexes
        document.getElementById("sasu_ir_cell13_2").innerHTML = frais_comptable + " €"; // Frais annexes
        document.getElementById("sasu_ir_cell13_4").innerHTML = (frais_banque + frais_comptable).toLocaleString('fr-FR') + " €"; // Sommes annuelle des frais annexes sur la saison

        sasu_ir_cell14_4 = (resultat_intermediaire_total - frais_banque - frais_comptable);
        document.getElementById("sasu_ir_cell14_4").innerHTML = sasu_ir_cell14_4.toLocaleString('fr-FR') + " €"; // Résultat net

        var resultatApresIS = (resultat_intermediaire_total - frais_banque - frais_comptable) - (resultat_intermediaire_total - frais_banque - frais_comptable * 0.15);

        var sasu_ir_cell15_4 = (resultat_intermediaire_total - frais_banque - frais_comptable) - ((resultat_intermediaire_total - frais_banque - frais_comptable) * 0.15);
        document.getElementById("sasu_ir_cell15_4").innerHTML = display.formateEuroBadge(sasu_ir_cell15_4); // impots sur le revenu


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Affichage des résultats dans le tableau 5 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        document.getElementById("sasu_is_cell13_2").innerHTML = display.formateEuroBadge(frais_comptable); // Frais annexes
        document.getElementById("sasu_is_cell16_2").innerHTML = display.formateEuroBadge(montantFinal); // Impot sur les dividendes
        document.getElementById("sasu_is_cell13_1").innerHTML = display.formateEuroBadge(frais_banque); // Frais annexes

        var sasu_is_cell13_4 = frais_banque + frais_comptable;
        document.getElementById("sasu_is_cell13_4").innerHTML = display.formateEuroBadge(sasu_is_cell13_4); // Sommes annuelle des frais annexes sur la saison

        var sasu_is_cell14_4 = resultat_intermediaire_total - frais_banque - frais_comptable;
        document.getElementById("sasu_is_cell14_4").innerHTML = display.formateEuroBadge(sasu_is_cell14_4); // Sommes annuelle des résultats sur la saison

        var sasu_is_cell15_2 = ((resultat_intermediaire_total - frais_banque - frais_comptable) * 0.15);
        document.getElementById("sasu_is_cell15_2").innerHTML = display.formateEuroBadge(sasu_is_cell15_2); // Sommes annuelle des frais annexes sur la saison

        ResultatApresIS_temp = ((resultat_intermediaire_total - frais_banque - frais_comptable) - ((resultat_intermediaire_total - frais_banque - frais_comptable) * 0.15)).toFixed(2);

        
        sasu_is_cell15_4 = parseFloat(ResultatApresIS_temp);
        document.getElementById("sasu_is_cell15_4").innerHTML = display.formateEuroBadge(ResultatApresIS_temp); // impots sur le revenu en déclaration perso

        document.getElementById("sasu_is_cell16_1").innerHTML = "30% d'abattement forfaitaire";

        var sasu_is_cell16_2 = parseFloat(sasu_is_cell15_4) * 0.7;
        document.getElementById("sasu_is_cell16_2").innerHTML = display.formateEuroBadge(sasu_is_cell16_2); // Après imposition avec 30% abattement
        document.getElementById("sasu_is_cell16_3").innerHTML = "Imposition sur ta déclaration perso";

        // Badge SASU avec l'abattement forfaitaire
        document.getElementById('frontTotalBeneficeSasuIsAbattement').innerHTML = display.formateEuroBadge(sasu_is_cell16_2);





        // Mise à jour des tableaux prévisionnels de la fédération des paramètres modifiés par les sliders
        var resultats = display.getCurrentResults();
        var prkVoiture = document.getElementById("menuPRK").value;

    },



    // Mise à jour dans les tableaux des impots du montat des primes nouveau calcul
    updatePrimeMontant: function () {
        prime_montant_01 = document.getElementById("prime_montant_01").value;

        document.getElementById("cell3_1").innerHTML = prime_montant_01.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_ir_cell3_1").innerHTML = prime_montant_01.toLocaleString('fr-FR') + " €";


        prime_montant_02 = document.getElementById("prime_montant_02").value;
        document.getElementById("cell3_2").innerHTML = prime_montant_02.toLocaleString('fr-FR') + " €";
        document.getElementById("tns_ir_cell3_2").innerHTML = prime_montant_02.toLocaleString('fr-FR') + " €";


        prime_montant_03 = document.getElementById("prime_montant_03").value;
        document.getElementById("cell3_3").innerHTML = prime_montant_03 + " €";
        document.getElementById("tns_ir_cell3_3").innerHTML = prime_montant_03.toLocaleString('fr-FR') + " €";


        frais_par_match01 = document.getElementById("frais_par_match01").value;
        document.getElementById("cell10_1").innerHTML = frais_par_match01 + " €";
        document.getElementById("tns_ir_cell10_1").innerHTML = frais_par_match01 + " €";


        frais_par_match02 = document.getElementById("frais_par_match02").value;
        document.getElementById("cell10_2").innerHTML = frais_par_match02 + " €";
        document.getElementById("tns_ir_cell10_2").innerHTML = frais_par_match02.toLocaleString('fr-FR') + " €";


        frais_par_match03 = document.getElementById("frais_par_match03").value;
        document.getElementById("cell10_3").innerHTML = frais_par_match03 + " €";
        document.getElementById("tns_ir_cell10_3").innerHTML = frais_par_match03.toLocaleString('fr-FR') + " €";


        nbre_matchs_01 = document.getElementById("nbre_matchs_01").value;
        document.getElementById("cell2_1").innerHTML = nbre_matchs_01;
        document.getElementById("tns_ir_cell2_1").innerHTML = nbre_matchs_01;


        nbre_matchs_02 = document.getElementById("nbre_matchs_02").value;
        document.getElementById("cell2_2").innerHTML = nbre_matchs_02;
        document.getElementById("tns_ir_cell2_2").innerHTML = nbre_matchs_02;


        nbre_matchs_03 = document.getElementById("nbre_matchs_03").value;
        document.getElementById("cell2_3").innerHTML = nbre_matchs_03;
        document.getElementById("tns_ir_cell2_3").innerHTML = nbre_matchs_03;


        // Calcul des cotisations URSSAF
        cotisations_urssaf_par_match_01 = prime_montant_01 * (pourcentage_urssaf / 100);
        cotisations_urssaf_par_match_02 = prime_montant_02 * (pourcentage_urssaf / 100);
        cotisations_urssaf_par_match_03 = prime_montant_03 * (pourcentage_urssaf / 100);
    },


    // Mise à jour des valeurs affichées des sliders
    // comme on utilise des variables globales de data.js qui peuvent être lues par d'autres fonctions
    // on n'oublie pas de les mettre à jour avec les valeurs des inputs
    updateSliderValues: function () {
        prime_montant_01 = parseInt(document.getElementById("prime_montant_01").value);
        prime_montant_02 = parseInt(document.getElementById("prime_montant_02").value);
        prime_montant_03 = parseInt(document.getElementById("prime_montant_03").value);
        document.getElementById("valeur_prime_01").textContent = prime_montant_01;
        document.getElementById("valeur_prime_02").textContent = prime_montant_02;
        document.getElementById("valeur_prime_03").textContent = prime_montant_03;

        frais_par_match01 = parseInt(document.getElementById("frais_par_match01").value);
        frais_par_match02 = parseInt(document.getElementById("frais_par_match02").value);
        frais_par_match03 = parseInt(document.getElementById("frais_par_match03").value);
        document.getElementById("valeur_frais_01").textContent = frais_par_match01;
        document.getElementById("valeur_frais_02").textContent = frais_par_match02;
        document.getElementById("valeur_frais_03").textContent = frais_par_match03;

        nbre_matchs_01 = parseInt(document.getElementById("nbre_matchs_01").value);
        nbre_matchs_02 = parseInt(document.getElementById("nbre_matchs_02").value);
        nbre_matchs_03 = parseInt(document.getElementById("nbre_matchs_03").value);
        document.getElementById("valeur_match_01").textContent = nbre_matchs_01;
        document.getElementById("valeur_match_02").textContent = nbre_matchs_02;
        document.getElementById("valeur_match_03").textContent = nbre_matchs_03;

// >> ATTENTION ICI :
        // si ces 2 inputs modifient aussi des variables globales de data.js, alors il faudra les mettre à jour
        document.getElementById("valeurNombrePartFiscale").textContent = document.getElementById("idNombrePartFiscale").value;
        document.getElementById("valeurRevenuFiscalReference").textContent = document.getElementById("idRevenuFiscalReference").value;
    },


    // Actualise la page de façon globable
    // Rajouter ce qu'il y a a rafraichir ici
    updateGlobal: function () {
        display.updateHistoriquePRK();
        display.updateHistoriqueVille();
        display.updateTableauImpositions(); // Mise à jour des tableaux lorsque la prime change

        // Mise à jour du tableau de calcul debug
        display.updateTableauImpositionGenerale();

        display.updateFrontendBadge();
        //display.generateTableauDesignations();
       // display.tableauComparatif();

    }
}; // EOF display

