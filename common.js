function displayValues() {
    var hostelName = document.getElementById('hn').value;
    var additionalInfo = document.getElementById('additionalInfo').value;
    var imageFile = document.getElementById('img').files[0]; // Get the selected image file

    if (!hostelName) {
        alert("Please enter the Hostel Name."); 
        return; 
    }

    var tableData = [hostelName, additionalInfo, imageFile];
    createTableRow(tableData);
}

function createTableRow(data) {
    var tableBody = document.getElementById('displayTable');
    var newRow = tableBody.insertRow();
    newRow.className = "display-value";

    for (var i = 0; i < data.length; i++) {
        if (i === data.length - 1) { // Last element which is the image file
            insertImageCell(newRow, data[i]);
        } else {
            insertCell(newRow, data[i]);
        }
    }

    // Add date and time cells
    var currentDate = new Date();
    var formattedDate = currentDate.toLocaleDateString();
    var formattedTime = currentDate.toLocaleTimeString();
    insertCell(newRow, formattedDate);
    insertCell(newRow, formattedTime);
}

function insertImageCell(row, imageFile) {
    var cell = row.insertCell();
    var image = document.createElement('img');
    image.src = URL.createObjectURL(imageFile);
    image.height = 100; // Adjust height as needed
    cell.appendChild(image);
}

function insertCell(row, value) {
    var cell = row.insertCell();
    cell.innerHTML = value;
}
