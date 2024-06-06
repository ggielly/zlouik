// Global array to store the parsed data
let csvData = [];

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
        console.log(csvData); // You can use the data here for further processing
        displayFirst20Lines(csvData);
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

    // Create table rows for the first n lines
    data.slice(0, 50).forEach((row, rowIndex) => {
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

// Initialize the CSV import process
initCSVImport();
