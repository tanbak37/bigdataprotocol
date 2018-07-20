const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cassandra = require('cassandra-driver');
const app = express()
const Uuid = require('cassandra-driver').types.Uuid;
const apiKey = 'd64ce8a57546a24a1452383f801df3e1';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

    var PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;

    const client = new cassandra.Client({ contactPoints: ['127.0.0.1'],
      // const client = new cassandra.Client({ contactPoints: ['206.189.90.219'],    
      // authProvider: new PlainTextAuthProvider('devops', 'KDSdevops$1234'),
     keyspace: 'kdstest' });

    //dpp --> key server
    // 206.189.90.219   -->  IP server




app.use(express.json());

app.post('/addmenu', function(request, response){
  console.log(request.body);      // your JSON
  //  response.send(
  //   { "RespCode": "200",
  //     "RespDesc": "SUCCESS" 
  //   }); 
    var jRespon = request.body
console.log(jRespon.menu)
console.log(jRespon.path)
const idRandom = Uuid.random();

  if(jRespon.menu==null||jRespon.path==null||jRespon.menu==''||jRespon.path==''){
     response.send(
    { "RespCode": "400",
      "status": "Mandatory Input is Null" 
    });   
     
     return request
} else{
     response.send(
    { "RespCode": "200",
      "status": "SUCCESS" 
    });   
}

   var query = 'INSERT INTO dppmenu (id, menu, path) VALUES (:id, :menu, :path)';
   var params = {id: idRandom, menu: jRespon.menu, path: jRespon.path};
   client.execute(query, params, { prepare: true });

});



































/*---------------->  API 1  <-------------------*/
app.get('/getsample', function (req, res) {

    let hasil = null
    let hasil2 = '[{"key":"Pilkada Jabar 2018","cagub":"RK-RU","tweets":18},{"key":"Pilkada Jabar 2018","cagub":"TH-AC","tweets":24},{"key":"Pilkada Jabar 2018","cagub":"S-AS","tweets":22},{"key":"Pilkada Jabar 2018","cagub":"DM-DM","tweets":15}]'
    
    // [{"wilayah":"Jawa Barat"},{"wilayah":"Sumatra Utara"},{"wilayah":"Kalimantan Barat"}]
    // [{"key":"Pilkada Jabar 2018","cagub":"RK-RU","tweets":18},{"key":"Pilkada Jabar 2018","cagub":"TH-AC","tweets":24},{"key":"Pilkada Jabar 2018","cagub":"S-AS","tweets":22},{"key":"Pilkada Jabar 2018","cagub":"DM-DM","tweets":15}]
    client.connect(function(err){
      console.log('status: cassandra connected');
      var xxx = client.execute('SELECT key from dpptweets;', function (err, result) {
        // var xxx = client.execute('SELECT location,key, count(tweetid) from dpptweets group by key, location;', function (err, result) {

            var user = result.rows;

            var output = [];  

            user.forEach(function(element) {

              var elestring =  JSON.stringify(element);
                output.push(elestring);
            });        

            hasil = "["+output.toString()+"]";
            // hasil2 = hasil.toString()

              console.log("data --> " + hasil2);

              // res.send(hasil2)
              res.end(hasil2)
              // res.render('index', {hasil2: hasil2, weather: null, error: null});
              
        })
    })

    
  
})


/*---------------->  API 2  <-------------------*/

app.get('/getdata', function (req, res) {

    let hasil = null


    client.connect(function(err){
      console.log('status: cassandra connected');

      var xxx = client.execute("select * from dpptweets", function (err, result) {
//var xxx = client.execute("select key, twitterid,username, tweetid,tweet, location, tweetdate, retweetcount,imageurl from dpptweets where key in ('jabar','kalbar','sumut');", function (err, result) {
        // var xxx = client.execute('SELECT location,key, count(tweetid) from dpptweets group by key, location;', function (err, result) {
          // select key, count(tweetid), location from dpptweets group by key, location;
            var user = result.rows;

            var output = [];  

            user.forEach(function(element) {

              var elestring =  JSON.stringify(element);
                output.push(elestring);
            });        

            hasil = "["+output.toString()+"]";
            // hasil2 = hasil.toString()

              // console.log("data --> " + hasil);

              // res.send(hasil2)
              res.end(hasil)
              // res.render('index', {hasil2: hasil2, weather: null, error: null});
              
        })


    })

    
  
})



/*--------------------> API 3 <--------------------------*/

app.get('/getlokal', function (req, res) {

    let hasil = null
    let hasil3 = '[{"wilayah":"Jawa Barat"},{"wilayah":"Sumatra Utara"},{"wilayah":"Kalimantan Barat"}]'
    res.end(hasil3)


   
})


/*--------------------> API 4 <--------------------------*/

app.get('/getmenu', function (req, res) {

let hasil = null


    client.connect(function(err){
      console.log('status: cassandra connected');
      var xxx = client.execute('select id,menu, path from dppmenu;', function (err, result) {
        // var xxx = client.execute('SELECT location,key, count(tweetid) from dpptweets group by key, location;', function (err, result) {
          // select key, count(tweetid), location from dpptweets group by key, location;
            var user = result.rows;

            var output = [];  

            user.forEach(function(element) {

              var elestring =  JSON.stringify(element);
                output.push(elestring);
            });        

            hasil = "["+output.toString()+"]";
            // hasil2 = hasil.toString()

              // console.log("data --> " + hasil2);

              // res.send(hasil2)
              res.end(hasil)
              // res.render('index', {hasil2: hasil2, weather: null, error: null});
              
        })
    })


   
})




/*--------------------> API 5 <--------------------------*/

app.get('/getdatacount', function (req, res) {

let hasil = null


    client.connect(function(err){
      console.log('status: cassandra connected');
      var xxx = client.execute('SELECT key, count(tweetid) as tweetcount FROM dpptweets group BY key;', function (err, result) {
        // var xxx = client.execute('SELECT location,key, count(tweetid) from dpptweets group by key, location;', function (err, result) {
          // select key, count(tweetid), location from dpptweets group by key, location;
            var user = result.rows;

            var output = [];  

            user.forEach(function(element) {

              var elestring =  JSON.stringify(element);
                output.push(elestring);
            });        

            hasil = "["+output.toString()+"]";
            // hasil2 = hasil.toString()

              // console.log("data --> " + hasil2);

              // res.send(hasil2)
              res.end(hasil)
              // res.render('index', {hasil2: hasil2, weather: null, error: null});
              
        })
    })


   
})


/*--------------------> API 5 <--------------------------*/

app.get('/getdatabytweetdate', function (req, res) {

let hasil = null


    client.connect(function(err){
      console.log('status: cassandra connected');
      var xxx = client.execute('SELECT key,tweetdate, count(tweetid) as tweetcount FROM dpptweets group BY key, tweetdate;', function (err, result) {
        // var xxx = client.execute('SELECT key,tweetdate, count(tweetid) as tweetcount FROM dpptweets group BY key, tweetdate;', function (err, result) {
          // select key, count(tweetid), location from dpptweets group by key, location;
            var user = result.rows;

            var output = [];  

            user.forEach(function(element) {

              var elestring =  JSON.stringify(element);
                output.push(elestring);
            });        

            hasil = "["+output.toString()+"]";
            // hasil2 = hasil.toString()

              // console.log("data --> " + hasil2);

              // res.send(hasil2)
              res.end(hasil)
              // res.render('index', {hasil2: hasil2, weather: null, error: null});
              
        })
    })


   
})




/*--------------------> API 4 <--------------------------*/

app.get('/getpilkada', function (req, res) {

let hasil = null


    client.connect(function(err){
      console.log('status: cassandra connected');
      var xxx = client.execute('select paslon, count(tweetid),tweetdate, provinsi from dpptac group by paslon;', function (err, result) {
        // var xxx = client.execute('SELECT location,key, count(tweetid) from dpptweets group by key, location;', function (err, result) {
          // select key, count(tweetid), location from dpptweets group by key, location;
            var user = result.rows;

            var output = [];  

            user.forEach(function(element) {

              var elestring =  JSON.stringify(element);
                output.push(elestring);
            });        

            hasil = "["+output.toString()+"]";
            // hasil2 = hasil.toString()

              // console.log("data --> " + hasil2);

              // res.send(hasil2)
              res.end(hasil)
              // res.render('index', {hasil2: hasil2, weather: null, error: null});
              
        })
    })


   
})











// app.get('/postla', function (req, res) {

//   client.connect(function(err){
//       console.log('status: cassandra connected');
//       const query = 'INSERT INTO dppmenu (no, menu, email, path) VALUES (?, ?, ?)';
//       const params = ['10', 'asu', 'asu.html'];
//       client.execute(query, params, { prepare: true }, function (err) {
//       assert.ifError(err);
//   //Inserted in the cluster
//       });
//     })

// })



















// app.post('/', function (req, res) {
//   let city = req.body.city;
//   let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

//   request(url, function (err, response, body) {
//     if(err){
//       res.render('index', {hasil: null ,weather: null, error: 'Error, please try again'});
//     } else {
      
//       let weather = JSON.parse(body)
//       if(weather.main == undefined){
//         res.render('index', {weather: null, error: 'Error, please try again'});
//       } else {
//         let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//         res.render('index', {weather: weatherText, error: null});
//       }
//     }
//   });
// })




// var PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
// const client = new cassandra.Client({ contactPoints: ['206.189.90.219'],authProvider: new PlainTextAuthProvider('devops', 'KDSdevops$1234'), keyspace: 'dpp' });




// client.connect(function(err){
//   console.log('status: cassandra connected');
//   var xxx = client.execute('SELECT twitterid,location,username,key,retweetcount from dpptweets;', function (err, result) {
//         var user = result.rows;

//         // console.log("hasil-->", user);

//         var output = [];
//         let hasil = null;
        
//         user.forEach(function(element) {

//           var elestring =  JSON.stringify(element);
//             output.push(elestring);
//         });        

//         hasil = "["+output.toString()+"]";
        
//         console.log("data --> " + hasil);


//     });
// })






app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


/* CREATE TABLE kdstest.dpptweets (
    key text,
    location text,
    tweetid bigint,
    country text,
    countryid text,
    locationtype text,
    retweetcount int,
    tweet text,
    tweetdate timestamp,
    twitterid bigint,
    username text,

       PRIMARY KEY (key, tweetdate, tweet)) 
WITH CLUSTERING ORDER BY (tweetdate DESC);*/

/*CREATE TABLE cyclist_category (
   category text, 
   points int, 
   id UUID, 
   lastname text, 
   PRIMARY KEY (category, points)) 
WITH CLUSTERING ORDER BY (points DESC);*/

/*CREATE TABLE dppmenu (
  no int,  
   menu text, 
   path text, 
   PRIMARY KEY (no)) */