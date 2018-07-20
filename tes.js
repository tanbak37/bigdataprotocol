const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cassandra = require('cassandra-driver');
const app = express()

const apiKey = 'd64ce8a57546a24a1452383f801df3e1';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

    var PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;

    const client = new cassandra.Client({ contactPoints: ['127.0.0.1'],
      // authProvider: new PlainTextAuthProvider('devops', 'KDSdevops$1234'),
     keyspace: 'kds' });

/*---------------->  API 1  <-------------------*/

// app.get('/kampret', function (req, res) {

//     let hasil = null
//     let hasil2 = '[{"key":"Pilkada Jabar 2018","cagub":"RK-RU","tweets":18},{"key":"Pilkada Jabar 2018","cagub":"TH-AC","tweets":24},{"key":"Pilkada Jabar 2018","cagub":"S-AS","tweets":22},{"key":"Pilkada Jabar 2018","cagub":"DM-DM","tweets":15}]'
//     // 206.189.90.219

//     client.connect(function(err){
//       console.log('status: cassandra connected');
//       var xxx = client.execute('SELECT twitterid,location,username,key,retweetcount from dpptweets;', function (err, result) {
//         // var xxx = client.execute('SELECT location,key, count(tweetid) from dpptweets group by key, location;', function (err, result) {

//             var user = result.rows;

//             var output = [];  

//             user.forEach(function(element) {

//               var elestring =  JSON.stringify(element);
//                 output.push(elestring);
//             });        

//             hasil = "["+output.toString()+"]";
//             // hasil2 = hasil.toString()

//               console.log("data --> " + hasil2);

//               // res.send(hasil2)
//               res.end(hasil2)
//               // res.render('index', {hasil2: hasil2, weather: null, error: null});
              
//         })
//     })

    
  
// })

/*---------------->  API 2  <-------------------*/

app.get('/tai', function (req, res) {

    let hasil = null
    // let hasil2 = '[{"key":"Pilkada Jabar 2018","cagub":"RK-RU","tweets":"178"},{"key":"Pilkada Jabar 2018","cagub":"TH-AC","tweets":"254"},{"key":"Pilkada Jabar 2018","cagub":"S-AS","tweets":"222"},{"key":"Pilkada Jabar 2018","cagub":"DM-DM","tweets":"215"}]'
    // 206.189.90.219

    client.connect(function(err){
      console.log('status: cassandra connected');
      var xxx = client.execute('SELECT twitterid,location,username,key,retweetcount from dpptweets;', function (err, result) {
        // var xxx = client.execute('SELECT location,key, count(tweetid) from dpptweets group by key, location;', function (err, result) {

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



/*--------------------> API 3 <--------------------------*/

// app.get('/sue', function (req, res) {

//     var PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
//     const client = new cassandra.Client({ contactPoints: ['206.189.90.219'],authProvider: new PlainTextAuthProvider('devops', 'KDSdevops$1234'), keyspace: 'dpp' });

//     let hasil = null
//     // let hasil2 = '[{"key":"Pilkada Jabar 2018","cagub":"RK-RU","tweets":"178"},{"key":"Pilkada Jabar 2018","cagub":"TH-AC","tweets":"254"},{"key":"Pilkada Jabar 2018","cagub":"S-AS","tweets":"222"},{"key":"Pilkada Jabar 2018","cagub":"DM-DM","tweets":"215"}]'
//     // 206.189.90.219

//     client.connect(function(err){
//       console.log('status: cassandra connected');
//       var xxx = client.execute('SELECT twitterid,location,username,key,retweetcount from dpptweets;', function (err, result) {
//         // var xxx = client.execute('SELECT location,key, count(tweetid) from dpptweets group by key, location;', function (err, result) {

//             var user = result.rows;

//             var output = [];  

//             user.forEach(function(element) {

//               var elestring =  JSON.stringify(element);
//                 output.push(elestring);
//             });        

//             hasil = "["+output.toString()+"]";
//             // hasil2 = hasil.toString()

//               // console.log("data --> " + hasil2);

//               // res.send(hasil2)
//               res.end(hasil)
//               // res.render('index', {hasil2: hasil2, weather: null, error: null});
              
//         })
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






app.listen(9991, function () {
  console.log('Example app listening on port 9991!')
})
