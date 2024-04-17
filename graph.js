///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Représentation graphique


function updateD3Chart() {
    const svgWidth = 800, svgHeight = 400;
    //console.log(globalMatchData);
    const svg = d3.select('body').selectAll('svg').data([globalMatchData]).join('svg').attr('width', svgWidth).attr('height', svgHeight);

    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(globalMatchData.map(d => d.Phase));

    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(globalMatchData, d => d['Indemnité de préparation'] + d['Note de frais historique'] + d['Prime'] + d['Bénéfice net'])]);

    const color = d3.scaleOrdinal()
        .domain(['Indemnité de préparation', 'Note de frais historique', 'Prime', 'Bénéfice net'])
        .range(['#FF9999', '#66CCFF', '#99FF99', '#C2C2F0']);

    const chart = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    chart.selectAll('.axis').remove(); // Nettoyer les axes avant de les redessiner
    chart.append('g').attr('class', 'x axis').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
    chart.append('g').attr('class', 'y axis').call(d3.axisLeft(y));

    const stack = d3.stack().keys(['Indemnité de préparation', 'Note de frais historique', 'Prime', 'Bénéfice net']);
    const layers = stack(globalMatchData);

    const layer = chart.selectAll('.layer').data(layers).join('g').attr('class', 'layer').style('fill', d => color(d.key));
    layer.selectAll('rect').data(d => d).join('rect').attr('x', d => x(d.data.Phase)).attr('y', d => y(d[1])).attr('height', d => y(d[0]) - y(d[1])).attr('width', x.bandwidth());
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
  