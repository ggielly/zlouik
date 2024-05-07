///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Représentation graphique


function generateGraphsApex(graphData, index, datColor) {
    if (!Array.isArray(graphData) || graphData.length === 0) {
        console.error("Invalid or empty array provided. A non-empty array is expected:", graphData);
        return;
    }

    // Preparing data for the chart
    let apexChartData = {
        series: [
            { name: "Notes de frais avec PRK", data: [] },
            { name: "Primes avec PRK", data: [] },
            { name: "Notes de frais sans PRK", data: [] },
            { name: "Primes sans PRK", data: [] }

        ],
        xaxisCategories: []
    };

    graphData.forEach(item => {
        let xValue = item.processedCount + 2; // Adjust x to start from 1
        apexChartData.series[0].data.push({ x: item.processedCount, y: parseFloat(item.beneficeReel) });
        apexChartData.series[1].data.push({ x: item.processedCount, y: parseFloat(item.primeBenefice) });
        apexChartData.series[2].data.push({ x: item.processedCount, y: parseFloat(item.beneficeFraisSSPRK) });
        apexChartData.series[3].data.push({ x: item.processedCount, y: parseFloat(item.beneficePrimeSSPRK) });

        apexChartData.xaxisCategories.push(`Match ${xValue}`);
    });

    // Assigning container ID based on provided index
    let containerId = `chartContainer${index}`;
    let chartContainer = document.getElementById(containerId);

    if (!chartContainer) {
        console.error("Chart container not found:", containerId);
        return;
    }

    // Configuration for the ApexCharts
    let options = {
        chart: { type: 'area', height: 350 },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: { width: 300 },
                legend: { position: 'bottom' }
            }
        }],
        series: apexChartData.series,
        xaxis: {
            categories: apexChartData.xaxisCategories,
            type: 'category'
        },
        stroke: { 
            curve: 'smooth', width: 2
        },
        tooltip: {
            x: {
                formatter: (value, { dataPointIndex }) => `Match ${dataPointIndex + 1}`
            },
            y: {
                formatter: function (value, { seriesIndex, dataPointIndex, w }) {
                    let ndfValue = parseFloat(w.config.series[0].data[dataPointIndex].y);
                    let primesValue = parseFloat(w.config.series[1].data[dataPointIndex].y);
                    let difference = Math.abs(ndfValue - primesValue);
                    return isNaN(difference) ? 'Données indisponibles' : `Difference: ${difference.toFixed(2)}`;
                }
            }
        },
        markers: { size: 4 },
        //colors: ['#4154f1', '#2eca6a', '#ff771d'],
        colors: datColor || ['#4154f1', '#2eca6a', '#ff771d', '#ff8855'],  // Use passed colors or default if not provided
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.4,
                stops: [0, 90, 100]
            }
        },
        dataLabels: { enabled: false }
    };

    // Initialize the chart
    let chart = new ApexCharts(chartContainer, options);
    chart.render();
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
    }
}); 
