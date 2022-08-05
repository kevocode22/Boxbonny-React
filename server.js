require('dotenv').config();
require('./config/database');
const Router = require('./routes/routes');
const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const passport = require('passport');

const PORT = process.env.PORT || 4000
const path = require('path')

app.set('port', PORT)

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(passport.initialize());
app.use('/api', Router);


app.use(express.static(path.join(__dirname,'client/build')))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

// if(process.env.NODE_ENV === 'production'){
// }

app.get('/', (req, res) => {
    res.send('EL SERVIDOR ESTÁ FUNCIONANDO!')
})
app.listen(PORT, () => {
    console.log('Server Ready in port ' + app.get('port'))
});