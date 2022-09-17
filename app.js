const express = require('express');
const app = express();
const port = 3001;
const routers = require('./routers');
const cors = require('cors');
const WebController = require('./controllers/webController');
const path = require('path')
var morgan = require('morgan')

app.use(morgan('combined'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('uploads'))
app.use( express.static(path.join(__dirname, 'uploads')))

app.use('/', routers);
// app.post('/register-user', WebController.addUser);
app.get('/', (req, res) => {
	res.send('Tes 4567891011');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
