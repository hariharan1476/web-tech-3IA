function displayValues() {
    var hostelName = document.getElementById('hn').value;
    var floorNo = document.getElementById('fn').value;
    var roomNo = document.getElementById('rn').value;

    if (!hostelName || !floorNo || !roomNo) {
        alert("Please fill out all required fields."); 
        return; 
    }

    var name = document.getElementById('name').value;
    var contact = document.getElementById('phn').value;
    var regNo = document.getElementById('regn').value;
    var additionalInfo = document.getElementById('additionalInfo').value;
    
    var imageFile = document.getElementById('img').files[0]; 

    var tableData = [hostelName, floorNo, roomNo, name, contact, regNo, additionalInfo, imageFile];
    createTableRow(tableData);
    saveTableData(); 
}

function createTableRow(data) {
    var tableBody = document.getElementById('displayTable');
    var newRow = tableBody.insertRow();
    newRow.className = "display-value";
    for (var i = 0; i < data.length; i++) {
        if (i === data.length - 1) { 
            insertImageCell(newRow, data[i]);
        } else {
            insertCell(newRow, data[i]);
        }
    }

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
    image.height = 100; 
    cell.appendChild(image);
}

function insertCell(row, value) {
    var cell = row.insertCell();
    cell.innerHTML = value;
}


