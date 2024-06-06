// Function to initialize the CSV file import process
function initCSVImport() {
    document.getElementById('csvFileInput').addEventListener('change', importCSV, false);
}

// Function to handle the CSV file import
function importCSV(event) {
    const input = event.target;
    if ('files' in input && input.files.length > 0) {
        const file = input.files[0];
        placeFileContent(file);
    }
}

// Function to read the content of the file and store it in the global array
function placeFileContent(file) {
    readFileContent(file).then(content => {
        csvData = parseCSV(content);
        console.log(csvData); // You can use the data here for further processing ;)
        displayFirst20Lines(csvData);
        processCSVData();
    }).catch(error => console.error(error));
}

// Function to read the content of the file
function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
    });
}

// Function to parse the CSV content into an array of objects
function parseCSV(content) {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(';').map(header => header.trim());
    const data = lines.slice(1).map(line => {
        const values = line.split(';').map(value => value.trim());
        const row = {};
        headers.forEach((header, index) => {
            row[header] = values[index];
        });
        return row;
    });
    return data;
}

// Function to display the first 20 lines of the parsed CSV data
function displayFirst20Lines(data) {
    const container = document.getElementById('csvTableContainer');
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    // Create table headers
    Object.keys(data[0]).forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create table rows for the first 20 lines
    data.slice(0, 20).forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    // Clear any existing content and append the new table
    container.innerHTML = '';
    container.appendChild(table);
}

// Helper function to calculate the sum of numeric values in each row
function calculateRowSum(row) {
    return Object.values(row).reduce((sum, value) => {
        // Convert the value to a number if possible, otherwise treat it as 0
        const num = parseFloat(value);
        return sum + (isNaN(num) ? 0 : num);
    }, 0);
}

// Function to group the CSV data by multiple columns and create new arrays for each unique name
function groupByColumns(data, columns) {
    const groupedData = {};

    data.forEach(row => {
        columns.forEach(column => {
            const key = row[column];
            if (key) {
                if (!groupedData[key]) {
                    groupedData[key] = [];
                }
                groupedData[key].push(row);
            }
        });
    });

    return groupedData;
}

// Function to display the grouped data with the sum of each line
function displayGroupedData(groupedData) {
    const container = document.getElementById('groupedDataContainer');
    container.innerHTML = ''; // Clear any existing content

    // Iterate through each group and create a table
    Object.keys(groupedData).forEach(key => {
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        
        // Create table header
        Object.keys(groupedData[key][0]).forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        let sum = 0;

        // Create table rows and calculate the sum for each row
        groupedData[key].forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);

                // Add to sum if the value is a number
                const num = parseFloat(value);
                if (!isNaN(num)) {
                    
                }
            });
            sum ++;
            table.appendChild(tr);
        });

        // Create a title for each group with the sum included
        const title = document.createElement('h2');
        title.textContent = `${key} (${sum} matchs)`;

        // Append the title and table to the container
        container.appendChild(title);
        container.appendChild(table);
    });
}

// Function to process CSV data and display grouped tables for specified columns
function processCSVData() {
    const columns = [
        "Arbitre principal", 
        "Juge de ligne", 
        "Arbitre", 
        "Superviseur", 
        "Arbitre principal 2", 
        "Juge de ligne 2", 
        "Arbitre 2"
    ];

    const groupedData = groupByColumns(csvData, columns);

    displayGroupedData(groupedData);
}

// Initialize the CSV import process
initCSVImport();
