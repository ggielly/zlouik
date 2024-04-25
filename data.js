// Ce fichier contient toutes les variables globales, les constantes et autres données

// Déclaration des variables globales

var totalBeneficeReel = 0;
var resultats_filtres = 0;
var resultat_intermediaire_total = 0;
var ResultatApresIS_temp = 0;
var resultatPrelevementSociaux = 0;
var data = 0;

var globalBeneficeReelValues = {
    "Saison régulière": 0,
    "Poule de relégation": 0,
    "Phase finale": 0
};

var globalBeneficeReelPrimeValues = {
    "Saison régulière": 0,
    "Poule de relégation": 0,
    "Phase finale": 0
};

var htmlTableau;

var frais_banque = 240;


var globalMatchData = []; // Pour le graphique

var indemniteChoisie = 0; // DEBUG
var totalIndemniteChoisie = 0; // DEBUG
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
var nbre_matchs_total = 0;
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

var Salaires = "";
var resultat_net_is_TNS = 0;
var AC24 = 0;
var AC16 = 0;
var impotsSurLeRevenu = 0;
var montantFinal = 0;
var CotisationsSociales = "";


/// IMPOSITIONS
// Définition des tranches d'imposition et des taux correspondants
//const tranches = [28797, 82341, 177106, Infinity];
const tranches = [11292, 28798, 82342, 177107];
const taux = [0.11, 0.3, 0.41, 0.45];

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

const seuils = [tranche01_bas, tranche02_bas, tranche03_bas, tranche04_bas];
const pourcentages = [tranche01_pourcent, tranche02_pourcent, tranche03_pourcent, tranche04_pourcent];

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

const typeSaison = ["Saison régulière", "Poule de relégation", "Phase finale"];
const totalmatch = parseInt(nbre_matchs_01) + parseInt(nbre_matchs_02) + parseInt(nbre_matchs_03);

const HeadLMamicaux = [120, 126, 126, 130, 130, 135, 135, 135, 115, 115, 115, 125, 130, 130, 130, 130];
const HeadLMSR = [120, 126, 126, 130, 130, 135, 135, 135, 140, 140, 140, 140, 145, 145, 145, 145];
const HeadLMPO = [220, 231, 185, 185, 185, 190, 190, 190, 140, 140, 140, 140, 145, 145, 145, 145];
const HeadD1amicaux = [95, 100, 100, 105, 105, 110, 110, 110, 100, 100, 100, 100, 105, 105, 105, 105];
const HeadD1SR = [95, 100, 100, 105, 105, 110, 110, 110, 115, 115, 115, 115, 120, 120, 120, 120];
const HeadD1PO = [120, 126, 126, 130, 130, 135, 135, 135, 115, 115, 115, 115, 120, 120, 120, 120];
const JDLamicaux = [85, 90, 90, 95, 95, 100, 100, 100, 90, 90, 90, 95, 100, 100, 100, 100];
const JDLLMSR = [85, 90, 90, 95, 95, 100, 100, 100, 110, 110, 110, 110, 115, 115, 115, 115];
const JDLLMPO = [95, 100, 120, 120, 120, 125, 125, 125, 110, 110, 110, 110, 115, 115, 115, 115];
const JDLamicauxD1 = [70, 74, 74, 80, 80, 85, 85, 85, 70, 70, 70, 85, 90, 90, 90, 90];
const JDLD1SR = [70, 74, 74, 95, 80, 85, 85, 85, 100, 100, 100, 100, 105, 105, 105, 105];
const JDLD1PO = [85, 90, 90, 95, 95, 100, 100, 100, 100, 100, 100, 100, 105, 105, 105, 105];
const GrandDeplacement = [70, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80];
const Hotel = [46.6, 59.6, 61.2, 62.2, 62.2, 64.1, 64.7, 65.3, 65.8, 73.9, 74.9, 75.6, 76.1, 77.2, 77.2,];
const Km = [0.315, 0.343, 0.359, 0.359, 0.359, 0.362, 0.364, 0.364, 0.364, 0.364, 0.364, 0.368, 0.368, 0.405, 0.405];
const Repas = [15.2, 16.6, 17.1, 17.4, 17.4, 17.9, 18.1, 18.3, 18.4, 18.6, 18.8, 19, 19.1, 19.4, 19.4];
const TauxInflation = [1.7, 1.5, 2.1, 2.0, 0.9, 0.5, 0.0, 0.2, 1.0, 1.8, 1.1, 0.5, 1.6, 5.5, 4.9];
const Gazole = [1.093, 1.285, 1.401, 1.380, 1.333, 1.216, 1.097, 1.200, 1.363, 1.453, 1.346, 1.343, 1.769, 1.769];
const VariationKmArray = [0, 8.9, 4.7, 0, 0, 0.8, 0.6, 0, 0, 0, 0, 0, 1.1, 0, 10.1];

// Définition des années de la saison
const saison = [2005, 2006, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

// Valeur par défaut du PRKVoiture
const prkVoiture = 0.01;

// Tableau pour stocker les résultats
var resultats = [];



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Tableau des données
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var data = [
    { VilleDepart: "Paris", VilleDestination: "Nice", Km: "933", Peages: "89.1", TempsTrajet: "9h12" },
    { VilleDepart: "Paris", VilleDestination: "Gap", Km: "671", Peages: "53.8", TempsTrajet: "7h19" },
    { VilleDepart: "Paris", VilleDestination: "Chamonix", Km: "581", Peages: "58", TempsTrajet: "5h34" },
    { VilleDepart: "Paris", VilleDestination: "Bordeaux", Km: "583", Peages: "60.2", TempsTrajet: "5h36" },
    { VilleDepart: "Paris", VilleDestination: "Amiens", Km: "134", Peages: "10.1", TempsTrajet: "1h42" },
    { VilleDepart: "Paris", VilleDestination: "Rouen", Km: "133", Peages: "18", TempsTrajet: "1h38" },
    { VilleDepart: "Paris", VilleDestination: "Anglet", Km: "771", Peages: "73.1", TempsTrajet: "7h16" },
    { VilleDepart: "Paris", VilleDestination: "Marseille", Km: "773", Peages: "68.1", TempsTrajet: "7h29" },
    { VilleDepart: "Paris", VilleDestination: "Briançon", Km: "724", Peages: "122", TempsTrajet: "7h31" },
    { VilleDepart: "Paris", VilleDestination: "Grenoble", Km: "571", Peages: "53.8", TempsTrajet: "5h30" },
    { VilleDepart: "Grenoble", VilleDestination: "Nice", Km: "316", Peages: "6.8", TempsTrajet: "5h29" },
    { VilleDepart: "Grenoble", VilleDestination: "Gap", Km: "105", Peages: "0", TempsTrajet: "2h01" },
    { VilleDepart: "Grenoble", VilleDestination: "Chamonix", Km: "146", Peages: "10.2", TempsTrajet: "2h06" },
    { VilleDepart: "Grenoble", VilleDestination: "Bordeaux", Km: "630", Peages: "64", TempsTrajet: "6h49" },
    { VilleDepart: "Grenoble", VilleDestination: "Amiens", Km: "707", Peages: "66.3", TempsTrajet: "7h05" },
    { VilleDepart: "Grenoble", VilleDestination: "Rouen", Km: "699", Peages: "76.8", TempsTrajet: "6h37" },
    { VilleDepart: "Grenoble", VilleDestination: "Anglet", Km: "836", Peages: "84", TempsTrajet: "7h41" },
    { VilleDepart: "Grenoble", VilleDestination: "Marseille", Km: "306", Peages: "31", TempsTrajet: "2h59" },
    { VilleDepart: "Grenoble", VilleDestination: "Briançon", Km: "188", Peages: "72", TempsTrajet: "2h21" },
    { VilleDepart: "Briançon", VilleDestination: "Nice", Km: "302", Peages: "5.2", TempsTrajet: "5h06" },
    { VilleDepart: "Briançon", VilleDestination: "Gap", Km: "85", Peages: "0", TempsTrajet: "1h27" },
    { VilleDepart: "Briançon", VilleDestination: "Chamonix", Km: "212", Peages: "12", TempsTrajet: "3h16" },
    { VilleDepart: "Briançon", VilleDestination: "Bordeaux", Km: "785", Peages: "78.1", TempsTrajet: "8h51" },
    { VilleDepart: "Briançon", VilleDestination: "Amiens", Km: "862", Peages: "80.4", TempsTrajet: "9h07" },
    { VilleDepart: "Briançon", VilleDestination: "Rouen", Km: "853", Peages: "90.9", TempsTrajet: "8h39" },
    { VilleDepart: "Briançon", VilleDestination: "Anglet", Km: "912", Peages: "78", TempsTrajet: "9h14" },
    { VilleDepart: "Briançon", VilleDestination: "Marseille", Km: "260", Peages: "14.7", TempsTrajet: "3h19" },
    { VilleDepart: "Marseille", VilleDestination: "Nice", Km: "191", Peages: "20.6", TempsTrajet: "2h31" },
    { VilleDepart: "Marseille", VilleDestination: "Gap", Km: "180", Peages: "14.7", TempsTrajet: "2h02" },
    { VilleDepart: "Marseille", VilleDestination: "Chamonix", Km: "452", Peages: "41.2", TempsTrajet: "5h02" },
    { VilleDepart: "Marseille", VilleDestination: "Bordeaux", Km: "646", Peages: "61.3", TempsTrajet: "6h17" },
    { VilleDepart: "Marseille", VilleDestination: "Amiens", Km: "907", Peages: "78.2", TempsTrajet: "9h07" },
    { VilleDepart: "Marseille", VilleDestination: "Rouen", Km: "898", Peages: "88.7", TempsTrajet: "8h39" },
    { VilleDepart: "Marseille", VilleDestination: "Anglet", Km: "699", Peages: "63.3", TempsTrajet: "6h45" },
    { VilleDepart: "Marseille", VilleDestination: "Lyon", Km: "315", Peages: "30", TempsTrajet: "3h00" },
    { VilleDepart: "Anglet", VilleDestination: "Nice", Km: "859", Peages: "84.3", TempsTrajet: "8h29" },
    { VilleDepart: "Anglet", VilleDestination: "Gap", Km: "832", Peages: "78", TempsTrajet: "8h01" },
    { VilleDepart: "Anglet", VilleDestination: "Chamonix", Km: "943", Peages: "92.1", TempsTrajet: "9h28" },
    { VilleDepart: "Anglet", VilleDestination: "Bordeaux", Km: "187", Peages: "12.9", TempsTrajet: "1h55" },
    { VilleDepart: "Anglet", VilleDestination: "Amiens", Km: "907", Peages: "83.2", TempsTrajet: "8h44" },
    { VilleDepart: "Anglet", VilleDestination: "Rouen", Km: "842", Peages: "94.6", TempsTrajet: "7h43" },
    { VilleDepart: "Rouen", VilleDestination: "Nice", Km: "1057", Peages: "104.8", TempsTrajet: "10h27" },
    { VilleDepart: "Rouen", VilleDestination: "Gap", Km: "794", Peages: "69.5", TempsTrajet: "8h34" },
    { VilleDepart: "Rouen", VilleDestination: "Chamonix", Km: "738", Peages: "76.1", TempsTrajet: "7h10" },
    { VilleDepart: "Rouen", VilleDestination: "Bordeaux", Km: "655", Peages: "81.7", TempsTrajet: "6h08" },
    { VilleDepart: "Rouen", VilleDestination: "Amiens", Km: "120", Peages: "5.1", TempsTrajet: "1h16" },
    { VilleDepart: "Amiens", VilleDestination: "Nice", Km: "1070", Peages: "99.2", TempsTrajet: "10h51" },
    { VilleDepart: "Amiens", VilleDestination: "Gap", Km: "808", Peages: "63.9", TempsTrajet: "8h58" },
    { VilleDepart: "Amiens", VilleDestination: "Chamonix", Km: "751", Peages: "70.5", TempsTrajet: "7h34" },
    { VilleDepart: "Amiens", VilleDestination: "Bordeaux", Km: "715", Peages: "65.3", TempsTrajet: "7h04" },
    { VilleDepart: "Bordeaux", VilleDestination: "Nice", Km: "804", Peages: "82.3", TempsTrajet: "8h05" },
    { VilleDepart: "Bordeaux", VilleDestination: "Marseille", Km: "646", Peages: "61.3", TempsTrajet: "6h17" },
    { VilleDepart: "Bordeaux", VilleDestination: "Gap", Km: "776", Peages: "76", TempsTrajet: "7h36" },
    { VilleDepart: "Bordeaux", VilleDestination: "Chamonix", Km: "756", Peages: "79.2", TempsTrajet: "7h49" },
    { VilleDepart: "Chamonix", VilleDestination: "Nice", Km: "458", Peages: "112.7", TempsTrajet: "4h58" },
    { VilleDepart: "Chamonix", VilleDestination: "Gap", Km: "252", Peages: "10.2", TempsTrajet: "4h04" },
    { VilleDepart: "Chamonix", VilleDestination: "Grenoble", Km: "148", Peages: "10.2", TempsTrajet: "2h11" },
    { VilleDepart: "Chamonix", VilleDestination: "Rouen", Km: "748", Peages: "67.8", TempsTrajet: "7h11" },
    { VilleDepart: "Dunkerque", VilleDestination: "Nice", Km: "1232", Peages: "116.5", TempsTrajet: "11h41" },
    { VilleDepart: "Dunkerque", VilleDestination: "Gap", Km: "970", Peages: "81.2", TempsTrajet: "9h48" },
    { VilleDepart: "Dunkerque", VilleDestination: "Chamonix", Km: "835", Peages: "62.7", TempsTrajet: "8h47" },
    { VilleDepart: "Dunkerque", VilleDestination: "Bordeaux", Km: "871", Peages: "79", TempsTrajet: "8h26" },
    { VilleDepart: "Dunkerque", VilleDestination: "Amiens", Km: "197", Peages: "13.4", TempsTrajet: "1h57" },
    { VilleDepart: "Dunkerque", VilleDestination: "Rouen", Km: "250", Peages: "9.2", TempsTrajet: "2h29" },
    { VilleDepart: "Dunkerque", VilleDestination: "Anglet", Km: "1059", Peages: "91.9", TempsTrajet: "10h06" },
    { VilleDepart: "Dunkerque", VilleDestination: "Marseille", Km: "1072", Peages: "95.5", TempsTrajet: "9h58" },
    { VilleDepart: "Dunkerque", VilleDestination: "Briançon", Km: "990", Peages: "137.2", TempsTrajet: "10h09" },
    { VilleDepart: "Dunkerque", VilleDestination: "Grenoble", Km: "870", Peages: "81.2", TempsTrajet: "7h59" },
    { VilleDepart: "Dunkerque", VilleDestination: "Paris", Km: "293", Peages: "18.8", TempsTrajet: "3h04" },
    { VilleDepart: "Lyon", VilleDestination: "Nice", Km: "474", Peages: "48.7", TempsTrajet: "4h23" },
    { VilleDepart: "Lyon", VilleDestination: "Gap", Km: "206", Peages: "13.4", TempsTrajet: "3h05" },
    { VilleDepart: "Lyon", VilleDestination: "Chamonix", Km: "224", Peages: "25.5", TempsTrajet: "2h23" },
    { VilleDepart: "Lyon", VilleDestination: "Bordeaux", Km: "526", Peages: "50.6", TempsTrajet: "5h42" },
    { VilleDepart: "Lyon", VilleDestination: "Amiens", Km: "596", Peages: "50.5", TempsTrajet: "6h11" },
    { VilleDepart: "Lyon", VilleDestination: "Rouen", Km: "588", Peages: "61", TempsTrajet: "5h43" },
    { VilleDepart: "Lyon", VilleDestination: "Anglet", Km: "713", Peages: "63.5", TempsTrajet: "7h22" },
    { VilleDepart: "Lyon", VilleDestination: "Marseille", Km: "314", Peages: "27.7", TempsTrajet: "3h09" },
    { VilleDepart: "Lyon", VilleDestination: "Briançon", Km: "259", Peages: "81.6", TempsTrajet: "3h17" },
    { VilleDepart: "Lyon", VilleDestination: "Grenoble", Km: "106", Peages: "13.4", TempsTrajet: "1h16" },
    { VilleDepart: "Lyon", VilleDestination: "Paris", Km: "462", Peages: "40.4", TempsTrajet: "4h29" },
    { VilleDepart: "Lyon", VilleDestination: "Toulouse", Km: "537", Peages: "45", TempsTrajet: "5h15" },
    { VilleDepart: "Lyon", VilleDestination: "Dunkerque", Km: "760", Peages: "67.8", TempsTrajet: "7h04" },
    { VilleDepart: "Lyon", VilleDestination: "Lille", Km: "689", Peages: "67.8", TempsTrajet: "6h19" },
    { VilleDepart: "Lille", VilleDestination: "Nice", Km: "1161", Peages: "116.5", TempsTrajet: "10h57" },
    { VilleDepart: "Lille", VilleDestination: "Gap", Km: "899", Peages: "81.2", TempsTrajet: "9h04" },
    { VilleDepart: "Lille", VilleDestination: "Chamonix", Km: "764", Peages: "62.7", TempsTrajet: "8h03" },
    { VilleDepart: "Lille", VilleDestination: "Bordeaux", Km: "801", Peages: "79", TempsTrajet: "7h42" },
    { VilleDepart: "Lille", VilleDestination: "Amiens", Km: "118", Peages: "3.6", TempsTrajet: "1h39" },
    { VilleDepart: "Lille", VilleDestination: "Rouen", Km: "254", Peages: "16.6", TempsTrajet: "2h30" },
    { VilleDepart: "Lille", VilleDestination: "Anglet", Km: "989", Peages: "91.9", TempsTrajet: "9h22" },
    { VilleDepart: "Lille", VilleDestination: "Marseille", Km: "1001", Peages: "95.5", TempsTrajet: "9h14" },
    { VilleDepart: "Lille", VilleDestination: "Briançon", Km: "920", Peages: "137.2", TempsTrajet: "9h25" },
    { VilleDepart: "Lille", VilleDestination: "Grenoble", Km: "799", Peages: "81.2", TempsTrajet: "7h15" },
    { VilleDepart: "Lille", VilleDestination: "Paris", Km: "222", Peages: "18.8", TempsTrajet: "2h20" },
    { VilleDepart: "Lille", VilleDestination: "Dunkerque", Km: "73", Peages: "0", TempsTrajet: "0h55" },
    { VilleDepart: "Angers", VilleDestination: "Nice", Km: "1065", Peages: "106.2", TempsTrajet: "10h13" },
    { VilleDepart: "Angers", VilleDestination: "Gap", Km: "799", Peages: "76.4", TempsTrajet: "8h30" },
    { VilleDepart: "Angers", VilleDestination: "Chamonix", Km: "728", Peages: "56.9", TempsTrajet: "7h25" },
    { VilleDepart: "Angers", VilleDestination: "Bordeaux", Km: "340", Peages: "22.4", TempsTrajet: "3h58" },
    { VilleDepart: "Angers", VilleDestination: "Amiens", Km: "414", Peages: "54", TempsTrajet: "4h04" },
    { VilleDepart: "Angers", VilleDestination: "Rouen", Km: "298", Peages: "48.9", TempsTrajet: "2h50" },
    { VilleDepart: "Angers", VilleDestination: "Anglet", Km: "528", Peages: "35.3", TempsTrajet: "5h38" },
    { VilleDepart: "Angers", VilleDestination: "Marseille", Km: "905", Peages: "85.2", TempsTrajet: "8h30" },
    { VilleDepart: "Angers", VilleDestination: "Briançon", Km: "852", Peages: "144.6", TempsTrajet: "8h41" },
    { VilleDepart: "Angers", VilleDestination: "Grenoble", Km: "699", Peages: "76.4", TempsTrajet: "6h41" },
    { VilleDepart: "Angers", VilleDestination: "Paris", Km: "294", Peages: "32.9", TempsTrajet: "2h55" },
    { VilleDepart: "Angers", VilleDestination: "Dunkerque", Km: "548", Peages: "58.1", TempsTrajet: "5h19" },
    { VilleDepart: "Angers", VilleDestination: "Lille", Km: "512", Peages: "51.7", TempsTrajet: "5h02" },
    { VilleDepart: "Angers", VilleDestination: "Lyon", Km: "597", Peages: "63", TempsTrajet: "5h33" },
    { VilleDepart: "Angers", VilleDestination: "Nice", Km: "939", Peages: "89.1", TempsTrajet: "9h30" },
    { VilleDepart: "Strasbourg", VilleDestination: "Nice", Km: "787", Peages: "35.5", TempsTrajet: "8h13" },
    { VilleDepart: "Strasbourg", VilleDestination: "Gap", Km: "634", Peages: "21.1", TempsTrajet: "7h23" },
    { VilleDepart: "Strasbourg", VilleDestination: "Chamonix", Km: "405", Peages: "0", TempsTrajet: "4h38" },
    { VilleDepart: "Strasbourg", VilleDestination: "Bordeaux", Km: "949", Peages: "67.8", TempsTrajet: "9h31" },
    { VilleDepart: "Strasbourg", VilleDestination: "Amiens", Km: "520", Peages: "47.5", TempsTrajet: "4h56" },
    { VilleDepart: "Strasbourg", VilleDestination: "Rouen", Km: "634", Peages: "54.1", TempsTrajet: "5h59" },
    { VilleDepart: "Strasbourg", VilleDestination: "Anglet", Km: "1137", Peages: "80.7", TempsTrajet: "11h11" },
    { VilleDepart: "Strasbourg", VilleDestination: "Marseille", Km: "803", Peages: "62.8", TempsTrajet: "7h41" },
    { VilleDepart: "Strasbourg", VilleDestination: "Briançon", Km: "632", Peages: "83", TempsTrajet: "6h57" },
    { VilleDepart: "Strasbourg", VilleDestination: "Grenoble", Km: "530", Peages: "21.1", TempsTrajet: "5h29" },
    { VilleDepart: "Strasbourg", VilleDestination: "Paris", Km: "488", Peages: "43.7", TempsTrajet: "4h45" },
    { VilleDepart: "Strasbourg", VilleDestination: "Dunkerque", Km: "595", Peages: "15", TempsTrajet: "5h57" },
    { VilleDepart: "Strasbourg", VilleDestination: "Lille", Km: "523", Peages: "15", TempsTrajet: "5h14" },
    { VilleDepart: "Strasbourg", VilleDestination: "Lyon", Km: "485", Peages: "33.5", TempsTrajet: "4h47" },
    { VilleDepart: "Strasbourg", VilleDestination: "Angers", Km: "775", Peages: "76.6", TempsTrajet: "7h23" },
    { VilleDepart: "Nantes", VilleDestination: "Nice", Km: "1116", Peages: "110.7", TempsTrajet: "11h14" },
    { VilleDepart: "Nantes", VilleDestination: "Gap", Km: "886", Peages: "86.7", TempsTrajet: "9h27" },
    { VilleDepart: "Nantes", VilleDestination: "Chamonix", Km: "814", Peages: "67.2", TempsTrajet: "8h21" },
    { VilleDepart: "Nantes", VilleDestination: "Bordeaux", Km: "316", Peages: "28.4", TempsTrajet: "3h30" },
    { VilleDepart: "Nantes", VilleDestination: "Amiens", Km: "501", Peages: "64.3", TempsTrajet: "5h" },
    { VilleDepart: "Nantes", VilleDestination: "Rouen", Km: "385", Peages: "59.2", TempsTrajet: "3h46" },
    { VilleDepart: "Nantes", VilleDestination: "Anglet", Km: "504", Peages: "41.3", TempsTrajet: "5h10" },
    { VilleDepart: "Nantes", VilleDestination: "Marseille", Km: "955", Peages: "89.7", TempsTrajet: "9h31" },
    { VilleDepart: "Nantes", VilleDestination: "Briançon", Km: "939", Peages: "154.9", TempsTrajet: "9h37" },
    { VilleDepart: "Nantes", VilleDestination: "Grenoble", Km: "786", Peages: "86.7", TempsTrajet: "7h38" },
    { VilleDepart: "Nantes", VilleDestination: "Paris", Km: "381", Peages: "43.2", TempsTrajet: "3h52" },
    { VilleDepart: "Nantes", VilleDestination: "Dunkerque", Km: "635", Peages: "68.4", TempsTrajet: "6h15" },
    { VilleDepart: "Nantes", VilleDestination: "Lille", Km: "599", Peages: "62", TempsTrajet: "5h58" },
    { VilleDepart: "Nantes", VilleDestination: "Lyon", Km: "684", Peages: "73.3", TempsTrajet: "6h29" },
    { VilleDepart: "Nantes", VilleDestination: "Angers", Km: "87", Peages: "10.3", TempsTrajet: "1h00" },
    { VilleDepart: "Nantes", VilleDestination: "Strasbourg", Km: "861", Peages: "86.6", TempsTrajet: "8h17" },
    { VilleDepart: "Brest", VilleDestination: "Nice", Km: "1430", Peages: "106.2", TempsTrajet: "14h11" },
    { VilleDepart: "Brest", VilleDestination: "Gap", Km: "1164", Peages: "76.4", TempsTrajet: "12h28" },
    { VilleDepart: "Brest", VilleDestination: "Chamonix", Km: "1093", Peages: "56.9", TempsTrajet: "11h22" },
    { VilleDepart: "Brest", VilleDestination: "Bordeaux", Km: "610", Peages: "28.4", TempsTrajet: "6h42" },
    { VilleDepart: "Brest", VilleDestination: "Amiens", Km: "617", Peages: "24.8", TempsTrajet: "6h23" },
    { VilleDepart: "Brest", VilleDestination: "Rouen", Km: "500", Peages: "10.2", TempsTrajet: "5h13" },
    { VilleDepart: "Brest", VilleDestination: "Anglet", Km: "798", Peages: "41.3", TempsTrajet: "8h23" },
    { VilleDepart: "Brest", VilleDestination: "Marseille", Km: "1270", Peages: "85.2", TempsTrajet: "12h27" },
    { VilleDepart: "Brest", VilleDestination: "Briançon", Km: "1217", Peages: "144.6", TempsTrajet: "12h38" },
    { VilleDepart: "Brest", VilleDestination: "Grenoble", Km: "1064", Peages: "76.4", TempsTrajet: "10h39" },
    { VilleDepart: "Brest", VilleDestination: "Paris", Km: "591", Peages: "32.3", TempsTrajet: "6h06" },
    { VilleDepart: "Brest", VilleDestination: "Dunkerque", Km: "751", Peages: "28.9", TempsTrajet: "7h39" },
    { VilleDepart: "Brest", VilleDestination: "Lille", Km: "754", Peages: "36.3", TempsTrajet: "7h37" },
    { VilleDepart: "Brest", VilleDestination: "Lyon", Km: "962", Peages: "63", TempsTrajet: "9h30" },
    { VilleDepart: "Brest", VilleDestination: "Angers", Km: "369", Peages: "0", TempsTrajet: "4h03" },
    { VilleDepart: "Brest", VilleDestination: "Strasbourg", Km: "1071", Peages: "76", TempsTrajet: "10h32" },
    { VilleDepart: "Brest", VilleDestination: "Nantes", Km: "296", Peages: "0", TempsTrajet: "3h23" },
    { VilleDepart: "Toulouse", VilleDestination: "Nice", Km: "566", Peages: "59.4", TempsTrajet: "5h50" },
    { VilleDepart: "Toulouse", VilleDestination: "Gap", Km: "538", Peages: "53.1", TempsTrajet: "5h22" },
    { VilleDepart: "Toulouse", VilleDestination: "Chamonix", Km: "679", Peages: "69.3", TempsTrajet: "7h08" },
    { VilleDepart: "Toulouse", VilleDestination: "Bordeaux", Km: "245", Peages: "21.6", TempsTrajet: "2h29" },
    { VilleDepart: "Toulouse", VilleDestination: "Amiens", Km: "813", Peages: "50.2", TempsTrajet: "8h09" },
    { VilleDepart: "Toulouse", VilleDestination: "Rouen", Km: "757", Peages: "34.9", TempsTrajet: "7h46" },
    { VilleDepart: "Toulouse", VilleDestination: "Anglet", Km: "301", Peages: "24.9", TempsTrajet: "2h56" },
    { VilleDepart: "Toulouse", VilleDestination: "Marseille", Km: "405", Peages: "38.4", TempsTrajet: "4h07" },
    { VilleDepart: "Toulouse", VilleDestination: "Briançon", Km: "618", Peages: "53.1", TempsTrajet: "6h37" },
    { VilleDepart: "Toulouse", VilleDestination: "Grenoble", Km: "533", Peages: "59.1", TempsTrajet: "5h02" },
    { VilleDepart: "Toulouse", VilleDestination: "Paris", Km: "677", Peages: "40.1", TempsTrajet: "6h36" },
    { VilleDepart: "Toulouse", VilleDestination: "Dunkerque", Km: "966", Peages: "58.9", TempsTrajet: "9h28" },
    { VilleDepart: "Toulouse", VilleDestination: "Lille", Km: "895", Peages: "58.9", TempsTrajet: "8h42" },
    { VilleDepart: "Toulouse", VilleDestination: "Lyon", Km: "540", Peages: "57", TempsTrajet: "5h13" },
    { VilleDepart: "Toulouse", VilleDestination: "Angers", Km: "582", Peages: "44", TempsTrajet: "6h04" },
    { VilleDepart: "Toulouse", VilleDestination: "Strasbourg", Km: "971", Peages: "69.5", TempsTrajet: "9h27" },
    { VilleDepart: "Toulouse", VilleDestination: "Nantes", Km: "555", Peages: "50", TempsTrajet: "5h38" },
    { VilleDepart: "Toulouse", VilleDestination: "Brest", Km: "848", Peages: "50", TempsTrajet: "8h50" },
    { VilleDepart: "Toulouse", VilleDestination: "Rennes", Km: "666", Peages: "50", TempsTrajet: "6h52" },
    { VilleDepart: "Toulouse", VilleDestination: "Epinal", Km: "861", Peages: "64.6", TempsTrajet: "8h30" },
    { VilleDepart: "Epinal", VilleDestination: "Nice", Km: "790", Peages: "35.5", TempsTrajet: "8h54" },
    { VilleDepart: "Epinal", VilleDestination: "Gap", Km: "563", Peages: "37.7", TempsTrajet: "6h47" },
    { VilleDepart: "Epinal", VilleDestination: "Chamonix", Km: "359", Peages: "0", TempsTrajet: "5h08" },
    { VilleDepart: "Epinal", VilleDestination: "Bordeaux", Km: "841", Peages: "62.9", TempsTrajet: "8h33" },
    { VilleDepart: "Epinal", VilleDestination: "Amiens", Km: "447", Peages: "18.9", TempsTrajet: "4h41" },
    { VilleDepart: "Epinal", VilleDestination: "Rouen", Km: "519", Peages: "46.5", TempsTrajet: "5h16" },
    { VilleDepart: "Epinal", VilleDestination: "Anglet", Km: "1028", Peages: "75.8", TempsTrajet: "10h13" },
    { VilleDepart: "Epinal", VilleDestination: "Marseille", Km: "694", Peages: "58.6", TempsTrajet: "6h43" },
    { VilleDepart: "Epinal", VilleDestination: "Briançon", Km: "543", Peages: "83", TempsTrajet: "7h02" },
    { VilleDepart: "Epinal", VilleDestination: "Grenoble", Km: "463", Peages: "37.7", TempsTrajet: "4h58" },
    { VilleDepart: "Epinal", VilleDestination: "Paris", Km: "386", Peages: "25.9", TempsTrajet: "4h01" },
    { VilleDepart: "Epinal", VilleDestination: "Dunkerque", Km: "548", Peages: "22.3", TempsTrajet: "5h42" },
    { VilleDepart: "Epinal", VilleDestination: "Lille", Km: "477", Peages: "22.3", TempsTrajet: "4h56" },
    { VilleDepart: "Epinal", VilleDestination: "Lyon", Km: "385", Peages: "30.9", TempsTrajet: "3h45" },
    { VilleDepart: "Epinal", VilleDestination: "Angers", Km: "646", Peages: "58.8", TempsTrajet: "6h06" },
    { VilleDepart: "Epinal", VilleDestination: "Strasbourg", Km: "133", Peages: "0", TempsTrajet: "2h21" },
    { VilleDepart: "Epinal", VilleDestination: "Nantes", Km: "732", Peages: "69.1", TempsTrajet: "7h02" },
    { VilleDepart: "Epinal", VilleDestination: "Brest", Km: "942", Peages: "58.2", TempsTrajet: "9h15" },
    { VilleDepart: "Epinal", VilleDestination: "Rennes", Km: "700", Peages: "58.2", TempsTrajet: "6h45" },
    { VilleDepart: "Rennes", VilleDestination: "Nice", Km: "1188", Peages: "106.2", TempsTrajet: "11h39" },
    { VilleDepart: "Rennes", VilleDestination: "Gap", Km: "922", Peages: "76.4", TempsTrajet: "9h56" },
    { VilleDepart: "Rennes", VilleDestination: "Chamonix", Km: "851", Peages: "56.9", TempsTrajet: "8h51" },
    { VilleDepart: "Rennes", VilleDestination: "Bordeaux", Km: "426", Peages: "28.4", TempsTrajet: "4h45" },
    { VilleDepart: "Rennes", VilleDestination: "Amiens", Km: "426", Peages: "24.8", TempsTrajet: "4h16" },
    { VilleDepart: "Rennes", VilleDestination: "Rouen", Km: "309", Peages: "10.2", TempsTrajet: "3h06" },
    { VilleDepart: "Rennes", VilleDestination: "Anglet", Km: "614", Peages: "41.3", TempsTrajet: "6h25" },
    { VilleDepart: "Rennes", VilleDestination: "Marseille", Km: "1028", Peages: "85.2", TempsTrajet: "9h56" },
    { VilleDepart: "Rennes", VilleDestination: "Briançon", Km: "975", Peages: "144.6", TempsTrajet: "10h06" },
    { VilleDepart: "Rennes", VilleDestination: "Grenoble", Km: "822", Peages: "76.4", TempsTrajet: "8h07" },
    { VilleDepart: "Rennes", VilleDestination: "Paris", Km: "348", Peages: "32.3", TempsTrajet: "3h35" },
    { VilleDepart: "Rennes", VilleDestination: "Dunkerque", Km: "560", Peages: "28.9", TempsTrajet: "5h31" },
    { VilleDepart: "Rennes", VilleDestination: "Lille", Km: "563", Peages: "36.3", TempsTrajet: "5h30" },
    { VilleDepart: "Rennes", VilleDestination: "Lyon", Km: "720", Peages: "63", TempsTrajet: "6h58" },
    { VilleDepart: "Rennes", VilleDestination: "Angers", Km: "127", Peages: "0", TempsTrajet: "1h31" },
    { VilleDepart: "Rennes", VilleDestination: "Strasbourg", Km: "828", Peages: "76", TempsTrajet: "8h" },
    { VilleDepart: "Rennes", VilleDestination: "Nantes", Km: "106", Peages: "0", TempsTrajet: "1h21" },
    { VilleDepart: "Rennes", VilleDestination: "Brest", Km: "242", Peages: "0", TempsTrajet: "2h43" },
    { VilleDepart: "Montpellier", VilleDestination: "Nice", Km: "327", Peages: "33.1", TempsTrajet: "3h34" },
    { VilleDepart: "Montpellier", VilleDestination: "Gap", Km: "304", Peages: "26.8", TempsTrajet: "3h06" },
    { VilleDepart: "Montpellier", VilleDestination: "Chamonix", Km: "440", Peages: "43.2", TempsTrajet: "4h23" },
    { VilleDepart: "Montpellier", VilleDestination: "Bordeaux", Km: "483", Peages: "49.9", TempsTrajet: "4h39" },
    { VilleDepart: "Montpellier", VilleDestination: "Amiens", Km: "884", Peages: "63.3", TempsTrajet: "9h02" },
    { VilleDepart: "Montpellier", VilleDestination: "Rouen", Km: "828", Peages: "49.2", TempsTrajet: "8h39" },
    { VilleDepart: "Montpellier", VilleDestination: "Anglet", Km: "537", Peages: "51.9", TempsTrajet: "5h07" },
    { VilleDepart: "Montpellier", VilleDestination: "Marseille", Km: "166", Peages: "12.1", TempsTrajet: "1h51" },
    { VilleDepart: "Montpellier", VilleDestination: "Briançon", Km: "379", Peages: "26.8", TempsTrajet: "4h22" },
    { VilleDepart: "Montpellier", VilleDestination: "Grenoble", Km: "293", Peages: "33", TempsTrajet: "2h47" },
    { VilleDepart: "Montpellier", VilleDestination: "Paris", Km: "761", Peages: "72.1", TempsTrajet: "7h16" },
    { VilleDepart: "Montpellier", VilleDestination: "Dunkerque", Km: "1059", Peages: "99.5", TempsTrajet: "9h51" },
    { VilleDepart: "Montpellier", VilleDestination: "Lille", Km: "988", Peages: "99.5", TempsTrajet: "9h05" },
    { VilleDepart: "Montpellier", VilleDestination: "Lyon", Km: "301", Peages: "31.7", TempsTrajet: "2h58" },
    { VilleDepart: "Montpellier", VilleDestination: "Angers", Km: "774", Peages: "57.6", TempsTrajet: "7h31" },
    { VilleDepart: "Montpellier", VilleDestination: "Strasbourg", Km: "793", Peages: "66.8", TempsTrajet: "7h28" },
    { VilleDepart: "Montpellier", VilleDestination: "Nantes", Km: "793", Peages: "78.3", TempsTrajet: "7h48" },
    { VilleDepart: "Montpellier", VilleDestination: "Brest", Km: "1087", Peages: "78.3", TempsTrajet: "11h00" },
    { VilleDepart: "Montpellier", VilleDestination: "Epinal", Km: "681", Peages: "62.6", TempsTrajet: "6h33" },
    { VilleDepart: "Montpellier", VilleDestination: "Rennes", Km: "897", Peages: "57.6", TempsTrajet: "8h57" },
];

