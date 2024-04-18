///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Représentation graphique


var currentChart = null;
function generateGraphs(resultats) {
    // Préparer les datasets pour chaque type de point nécessaire
    var datasets = [
        { label: "Note de frais historique - Chiffre d'affaire", data: [], borderColor: 'rgb(255, 99, 132)', fill: false },
        { label: "Note de frais historique - bénéfices réels", data: [], borderColor: 'rgb(54, 162, 235)', fill: false },
        { label: "Prime", data: [], borderColor: 'rgb(75, 192, 192)', fill: false },
        { label: "PRIMES - bénéfices réels", data: [], borderColor: 'rgb(153, 102, 255)', fill: false }
    ];

    resultats.forEach((res, index) => {
        // Supposer res est un objet contenant toutes les données nécessaires
        datasets[0].data.push({ x: index + 1, y: res.fraisHistoriqueChiffre });
        datasets[1].data.push({ x: index + 1, y: res.fraisHistoriqueBenefices });
        datasets[2].data.push({ x: index + 1, y: res.prime });
        datasets[3].data.push({ x: index + 1, y: res.primeBenefices });
    });

    // Configuration des graphiques
    var ctx = document.getElementById('datGraf').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: datasets
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });
}


function graph() {
    const tbody = document.getElementById('dataBody');

    for (let i = 0; i < saison.length; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${saison[i]}</td>
            <td>${HeadLMamicaux[i]}</td>
            <td>${HeadLMSR[i]}</td>
            <td>${HeadLMPO[i]}</td>
            <td>${HeadD1amicaux[i]}</td>
            <td>${HeadD1SR[i]}</td>
            <td>${HeadD1PO[i]}</td>
            <td>${JDLamicaux[i]}</td>
            <td>${JDLLMSR[i]}</td>
            <td>${JDLLMPO[i]}</td>
            <td>${JDLamicauxD1[i]}</td>
            <td>${JDLD1SR[i]}</td>
            <td>${JDLD1PO[i]}</td>
            <td>${GrandDeplacement[i]}</td>
            <td>${Hotel[i]}</td>
            <td>${Km[i]}</td>
            <td>${Repas[i]}</td>
            <td>${TauxInflation[i]}</td>
            <td>${Gazole[i]}</td>
            <td>${VariationKmArray[i]}</td>
        `;
        tbody.appendChild(tr);
    }
}

/*
    // Création d'un contexte de dessin sur le canvas
   // const ctx = document.getElementById('myChart').getContext('2d');

    // Création du graphe
    const myChart = new Chart(ctx, {
    type: 'line',

    data: {
        labels: saison,
        datasets: [{
            label: 'HeadL Mamicaux',
            data: HeadLMamicaux,
            borderColor: 'red',
            fill: false
        }, {
            label: 'Head LM SR',
            data: HeadLMSR,
            borderColor: 'blue',
            fill: false
        }, {
            label: 'Head LM PO',
            data: HeadLMPO,
            borderColor: 'green',
            fill: false
        }, {
            label: 'Head D1 amicaux',
            data: HeadD1amicaux,
            borderColor: 'orange',
            fill: false
        }, {
            label: 'Head D1 SR',
            data: HeadD1SR,
            borderColor: 'purple',
            fill: false
        }, {
            label: 'Head D1 PO',
            data: HeadD1PO,
            borderColor: 'brown',
            fill: false
        }, {
            label: 'JDL amicaux',
            data: JDLamicaux,
            borderColor: 'black',
            fill: false
        }, {
            label: 'JDL LM SR',
            data: JDLLMSR,
            borderColor: 'cyan',
            fill: false
        }, {
            label: 'JDL LM PO',
            data: JDLLMPO,
            borderColor: 'magenta',
            fill: false
        }, {
            label: 'JDL D1 amicaux',
            data: JDLamicauxD1,
            borderColor: 'yellow',
            fill: false
        }, {
            label: 'JDL D1 SR',
            data: JDLD1SR,
            borderColor: 'lime',
            fill: false
        }, {
            label: 'JDL D1 PO',
            data: JDLD1PO,
            borderColor: 'olive',
            fill: false
        }, {
            label: 'Grand Déplacement',
            data: GrandDeplacement,
            borderColor: 'navy',
            fill: false
        }, {
            label: 'Hôtel',
            data: Hotel,
            borderColor: 'teal',
            fill: false
        }, {
            label: 'Km',
            data: Km,
            borderColor: 'maroon',
            fill: false
        }, {
            label: 'Repas',
            data: Repas,
            borderColor: 'pink',
            fill: false
        }, {
            label: 'Taux d\'inflation',
            data: TauxInflation,
            borderColor: 'silver',
            fill: false
        }, {
            label: 'Gazole',
            data: Gazole,
            borderColor: 'gold',
            fill: false
        }, {
            label: 'Variation Km',
            data: VariationKmArray,
            borderColor: 'indigo',
            fill: false
        }]
    }//,
    //options: {
    // responsive: true,
        //scales: {
        // yAxes: [{
            //  ticks: {
                //  beginAtZero: true
            // }
        //  }]
    // }
    // }
    }); */
  