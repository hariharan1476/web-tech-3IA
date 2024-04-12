const http = require('http');
const fs = require('fs');
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/hostel'; // Update with your MongoDB URI

// Define Mongoose schema
const roomSchema = new mongoose.Schema({
    hn: String,
    fn: String,
    rn: String,
    name: String,
    phn: String,
    regn: String,
    additionalInfo: String
});

// Define Mongoose model
const Room = mongoose.model('room', roomSchema);

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const server = http.createServer(async function (req, res) {
    if (req.url === '/room1' && req.method === 'GET') {
        // Read and serve room.htm
        fs.readFile('room.htm', function(err, data) {
            if (err) {
                console.error('Error reading room.htm:', err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else if (req.url === '/room1' && req.method === 'POST') {
        let rawData = '';
        req.on('data', function (data) {
            rawData += data;
        });
        req.on('end', async function () {
            const inputdata = new URLSearchParams(rawData);

            try {
                const roomData = {
                    hn: inputdata.get('hn'),
                    fn: inputdata.get('fn'),
                    rn: inputdata.get('rn'),
                    name: inputdata.get('name'),
                    phn: inputdata.get('phn'),
                    regn: inputdata.get('regn'),
                    additionalInfo: inputdata.get('additionalInfo')
                };

                // Create a new document using Mongoose model and save it
                await Room.create(roomData);
                console.log('Data inserted into MongoDB successfully.');

                // Redirect to the success page after data insertion
                res.writeHead(302, {'Location': '/succes.html'});
                res.end();

            } catch (error) {
                console.error('Error inserting data into MongoDB:', error);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
            }
        });
    } else if (req.url === '/succes.html' && req.method === 'GET') {
        try {
            // Fetch data from MongoDB
            const rooms = await Room.find({});
            
            // Read and serve succes.html with data
            fs.readFile('succes.html', 'utf8', function(err, data) {
                if (err) {
                    console.error('Error reading succes.html:', err);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                    return;
                }

                // Replace placeholder in the HTML template with data from MongoDB
                const tableRows = rooms.map(room=> `<tr>
                    <td>${room.hn}</td>
                    <td>${room.fn}</td>
                    <td>${room.rn}</td>
                    <td>${room.name}</td>
                    <td>${room.phn}</td>
                    <td>${room.regn}</td>
                    <td>${room.additionalInfo}</td>
                </tr>`).join('');

                // Replace the placeholder in the HTML template with the table rows
                const html = data.replace('<tbody id="displayTable"></tbody>', tableRows);

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(html);
                res.end();
            });
        } catch (error) {
            console.error('Error fetching data from MongoDB:', error);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
        }
    } else {
        // Handle invalid requests
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(5000, function () {
    console.log('Server is listening at port 5000');
});
