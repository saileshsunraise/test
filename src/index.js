
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
// const formData = require('express-form-data');
const fileUpload = require('express-fileupload');
const events = require('./events');


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'events'
});
connection.connect();
const port = process.env.PORT || 8080;


const app = express()
  .use(cors())
  // .use(formData.parse())
  .use(fileUpload({
    safeFileNames : true,
    preserveExtension : true,
    parseNested : true
  }))
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

