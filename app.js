var mysql      = require('mysql');
var http = require('http')
var url = require('url')



// ===================== mySQL connection =======================================

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '',
  database : 'lifeexpectancy',
});


connection.connect();



// ===================== Listen for response from index.html =======================================

var myServer = http.createServer(function(request, response){


    //parse data
    var urlData = url.parse(request.url,true).query;

    //parse some more
    var race = urlData.race
    var gender = urlData.gender
    var year = urlData.year


    //get data SQL data
    connection.query("SELECT LifeExpectancy FROM lifeTable WHERE race=? AND sex=? AND year=?", [race, gender, year], function(err, rows, fields) {

        //send it to index.html
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.write(JSON.stringify(rows[rows.length - 1].LifeExpectancy));
        response.end();

    });



})//create server

myServer.listen(8080);
