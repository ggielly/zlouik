// Déclaration des variables globales
var frais_banque = 240;
var frais_comptable = 400;
var frais_urssaf = 1500;
var repas = 15;
var hotel = 80;
var baremeKm = 0.415;
var nbre_matchs_01 = 0;
var nbre_matchs_02 = 0;
var nbre_matchs_03 = 0;
var prime_montant_01 = 550;
var prime_montant_02 = 700;
var prime_montant_03 = 800;
var pourcentage_urssaf = 25;
var cotisations_urssaf_par_match_01 = 0;
var cotisations_urssaf_par_match_02 = 0;
var cotisations_urssaf_par_match_03 = 0;
var net_match_01 = 0;
var net_match_02 = 0;
var net_match_03 = 0;
var brut_annuel_01 = 0;
var brut_annuel_02 = 0;
var brut_annuel_03 = 0;
var cotisations_annuelles_01 = 0;
var cotisations_annuelles_02 = 0;
var cotisations_annuelles_03 = 0;
var net_urssaf_annuel_01 = 0;
var net_urssaf_annuel_02 = 0;
var net_urssaf_annuel_03 = 0;
var frais_par_match01 = 130;
var frais_par_match02 = 260;
var frais_par_match03 = 260;
var frais_annuel_01 = 0;
var frais_annuel_02 = 0;
var frais_annuel_03 = 0;
var resultat_net_01 = 0;
var resultat_net_02 = 0;
var resultat_net_03 = 0;
var resultat_intermediaire_01 = 0;
var resultat_intermediaire_02 = 0;
var resultat_intermediaire_03 = 0;
/// IMPOSITIONS
// Tranches d'imposition
var tranche01_bas = 11295 /* Valeur de tranche01_bas */;
var tranche01_haut = 28797 /* Valeur de tranche01_haut */;
var tranche02_bas = 28798  /* Valeur de tranche02_bas */;
var tranche02_haut = 82341 /* Valeur de tranche02_haut */;
var tranche03_bas = 82342 /* Valeur de tranche03_bas */;
var tranche04_bas = 177107 /* Valeur de tranche04_bas */;
var tranche03_haut = 177106  /* Valeur de tranche03_haut : */;

var tranche01_pourcent = 0.11 /* Valeur de tranche01_pourcent */;
var tranche02_pourcent = 0.30 /* Valeur de tranche02_pourcent */;
var tranche03_pourcent = 0.41 /* Valeur de tranche03_pourcent */;
var tranche04_pourcent = 0.45 /* Valeur de tranche04_pourcent */;

// Taux reduit de l'impot sur les societe en EURL
var tauxreduit_is_eurl = 15;

// Taux de cotisation en EURL
var tauxcotisation_eurl = 35;

// Taux de cotisation en IS SASU
var tauxcotisation_is_sasu = 15
var CSG_CR = 0.172 // Valeur de la CSG

var taux_CSG_CRSD_IR_forfaitaire = 0.15;
var urssaf_zero = 0;
var resultat_net_is_TNS = 0;

var AC24 = (resultat_net_is_TNS - (resultat_net_is_TNS * (15 / 100)));

const HeadLMamicaux = [120,126,126,130,130,135,135,135,115,115,115,125,130,130,130,130];
const HeadLMSR = [120,126,126,130,130,135,135,135,140,140,140,140,145,145,145,145];
const HeadLMPO = [220,231,185,185,185,190,190,190,140,140,140,140,145,145,145,145];
const HeadD1amicaux = [95,100,100,105,105,110,110,110,100,100,100,100,105,105,105,105];
const HeadD1SR = [95,100,100,105,105,110,110,110,115,115,115,115,120,120,120,120];
const HeadD1PO = [120,126,126,130,130,135,135,135,115,115,115,115,120,120,120,120];
const JDLamicaux = [85,90,90,95,95,100,100,100,90,90,90,95,100,100,100,100];
const JDLLMSR = [85,90,90,95,95,100,100,100,110,110,110,110,115,115,115,115];
const JDLLMPO = [95,100,120,120,120,125,125,125,110,110,110,110,115,115,115,115];
const JDLamicauxD1 = [70,74,74,80,80,85,85,85,70,70,70,85,90,90,90,90];
const JDLD1SR = [70,74,74,95,80,85,85,85,100,100,100,100,105,105,105,105];
const JDLD1PO = [85,90,90,95,95,100,100,100,100,100,100,100,105,105,105,105];
const GrandDeplacement = [70,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80];
const Hotel = [46.6,59.6,61.2,62.2,62.2,64.1,64.7,65.3,65.8,73.9,74.9,75.6,76.1,77.2,77.2,];
const Km = [0.315,0.343,0.359,0.359,0.359,0.362,0.364,0.364,0.364,0.364,0.364,0.368,0.368,0.405,0.405];
const Repas = [15.2,16.6,17.1,17.4,17.4,17.9,18.1,18.3,18.4,18.6,18.8,19,19.1,19.4,19.4];
const TauxInflation = [1.7,1.5,2.1,2.0,0.9,0.5,0.0,0.2,1.0,1.8,1.1,0.5,1.6,5.5,4.9];
const Gazole = [1.093,1.285,1.401,1.380,1.333,1.216,1.097,1.200,1.363,1.453,1.346,1.343,1.769,1.769];
const VariationKmArray = [0,8.9,4.7,0,0,0.8,0.6,0,0,0,0,0,1.1,0,10.1];

// Définition des années de la saison
const saison = [2005, 2006, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

// Valeur par défaut du PRKVoiture
const prkVoiture = 0.01;

// Tableau pour stocker les résultats
const resultats = [];

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

    // Fonction de mise à jour des montants de primes dans le tableau
    updateTableaux();
}


// Actualise les valeurs choisies par les sliders dans les tableaux html : prime, frais, nb matchs
var updatePrimeMontant = function() {
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

    // Mettre à jour les éléments output avec les valeurs correspondantes
    updateCalculs();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fonction de mise à jour des montants de primes dans le tableau
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var updateTableaux = function() {

    const Salaires = (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03 - frais_banque - frais_comptable - frais_urssaf) - 
                        (((tauxcotisation_eurl / 1.35) * (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03 
                            - frais_banque - frais_comptable - frais_urssaf)) / 100).toFixed(2); // Cotisations sociales

    resultat_net_is_TNS = resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03 - frais_banque - frais_comptable - frais_urssaf;
    AC24 = (resultat_net_is_TNS - (resultat_net_is_TNS * (15 / 100)));

    const AC16 = Salaires * 0.9 + Salaires * 2.9 / 100 * 1.3;
    const impotsSurLeRevenu = calculer_IR_EURL(AC16, tranche01_bas, tranche02_bas, tranche03_bas, tranche04_bas, tranche01_haut, tranche02_haut, tranche03_haut, tranche01_pourcent, tranche02_pourcent, tranche03_pourcent, tranche04_pourcent);
        
    const seuils = [tranche01_bas, tranche02_bas, tranche03_bas, tranche04_bas];
    const pourcentages = [tranche01_pourcent, tranche02_pourcent, tranche03_pourcent, tranche04_pourcent];
    const montantFinal = calculerMontant_impotdividende(AC24, seuils, pourcentages);
        
    const CotisationsSociales = (((tauxcotisation_eurl / 1.35) * (resultat_intermediaire_01 + resultat_intermediaire_02 + resultat_intermediaire_03 - frais_banque - frais_comptable - frais_urssaf)) / 100).toFixed(2); // Cotisations sociales
    // Définition des tranches d'imposition et des taux correspondants
    //const tranches = [28797, 82341, 177106, Infinity];

    const tranches = [11292, 28798, 82342, 177107];
    const taux = [0.11, 0.3, 0.41, 0.45];

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




// Fonction pour afficher les résultats en fonction de la ville de départ sélectionnée
var afficherResultats = function() {
    // Récupération de la ville de départ sélectionnée
    var selectElement = document.getElementById("selectVilleDepart");
    if (selectElement) {
    var villeDepart = selectElement.value;

    // Filtrage des résultats pour la ville de départ sélectionnée
    var resultats = data.filter(function(trajet) {
        return trajet.VilleDepart === villeDepart;
    });

    // Génération du tableau des résultats si des résultats ont été trouvés
    var tableauHtml = "";
    if (resultats.length > 0) {
        tableauHtml = genererTableauResultats(resultats);

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
    } else {
    console.error("L'élément selectVilleDepart n'existe pas dans le document.");
    }
};


//
var genererTableauResultats = function(resultats, prkVoiture) {
    var totalPRK = 0;
    var totalIndemnitesKilometriques = 0;
    var totalRepas = 0;
    var totalHotels = 0;
    var totalGrandDeplacement = 0;
    var totalDistance = 0;
    var totalPeages = 0;
    var totalTempsTrajetMinutes = 0; // Utiliser une variable distincte pour le total des minutes de trajet
    var nombreLignes = resultats.length; // Nombre de lignes du tableau

    var indemniteChoisie = prime_montant_01; // Valeur de l'indemnité choisie
    var tableauHtml = "<table border='1'>";
    tableauHtml += "<tr><th>Domicile / Départ</th><th>Patinoire de destination</th><th>Distances</th><th>Péages routiers</th><th>Temps de trajet</th><th>Grand déplacement semaine 🚣</th><th>Indemnités kilométriques</th><th>Repas 🍟</th><th>Hôtel 🏰</th><th>Prime de match</th><th>Indemnités kilométriques - PRK</th></tr>";

    for (var i = 0; i < nombreLignes; i++) {
    var trajet = resultats[i];
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
    totalPRK += prk;

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
};


// Fonction pour mettre à jour le tableau des résultats avec le PRKVoiture sélectionné
var updatePRK = function() {
    // Récupérer la valeur sélectionnée du PRKVoiture dans le menu déroulant
    var prkVoiture = document.getElementById("PRKVoiture").value;
    // Récupérer l'élément conteneur du tableau des résultats
    var tableauContainer = document.getElementById("tableauResultats");
    if (tableauContainer) {
    // Mettre à jour le contenu du tableau des résultats avec les données et le PRKVoiture sélectionné
    tableauContainer.innerHTML = genererTableauResultats(data, prkVoiture);
    } else {
    console.error("L'élément conteneur pour le tableau des résultats n'existe pas dans le document.");
    }
};


// enregistre toutes les fonctions à appeler selon les évènements UI
var gereEvents = function() {
    // Sliders Primes / Frais / Nb Match
    document.getElementById("prime_montant_01").addEventListener("input", updatePrimeMontant);
    document.getElementById("prime_montant_02").addEventListener("input", updatePrimeMontant);
    document.getElementById("prime_montant_03").addEventListener("input", updatePrimeMontant);

    document.getElementById("frais_par_match01").addEventListener("input", updatePrimeMontant);
    document.getElementById("frais_par_match02").addEventListener("input", updatePrimeMontant);
    document.getElementById("frais_par_match03").addEventListener("input", updatePrimeMontant);

    document.getElementById("nbre_matchs_01").addEventListener("input", updatePrimeMontant);
    document.getElementById("nbre_matchs_02").addEventListener("input", updatePrimeMontant);
    document.getElementById("nbre_matchs_03").addEventListener("input", updatePrimeMontant);

    // Événement lorsqu'une saison est sélectionnée
    const selectSaison = document.getElementById("selectSaison");
    selectSaison.addEventListener("change", function() {
        const selectedSaison = selectSaison.value;
        console.log("La saison sélectionnée est :", selectedSaison);
    });
};


//Initialisation :
// ajout des menus calculés dynamiquement
// appel des fonctions de calcul initial de certaines données basées sur  primes / frais / nb match
var initialize = function() {
    // ajout menu villes de départ
    menuVilles();
    // ajout menu saisons
    menuSaisons();
    // ajout menu PRK
    menuPRK();
    // calcul des destinations possibles
    calculDestinations();

    // Calcul des valeurs initiales
    updatePrimeMontant(); // appel direct de la fonction pour calculer au moins une fois les données avant toute capture d'évènement UI 
    // Appel initial de la fonction updatePRK pour afficher les résultats initiaux
    updatePRK();
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