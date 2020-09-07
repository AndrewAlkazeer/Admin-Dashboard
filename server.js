const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
// const env = require('dotenv').config();
const env = require('dotenv/config');
const port = process.env.PORT || 5000;
const Mongo = require('mongodb').MongoClient;
const firebase =  require('firebase');
const assert = require('assert');
const bodyParser = require('body-parser');
const client = new Mongo(process.env.URI, { useUnifiedTopology: true }, { useNewUrlParser: true });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var resultArray = [];
var likesArray = [];
var messagesArray = [];
var fbArrVal = [];
var fbArr;
var totalCount = 0;
var totalCountArr = [];
var totalVisitorsByCountryInOrder = [];
// var switcher2 = false;
// FireBase Database
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBeulmMCPP6d4-Yq2bhIrCJbCLdKFp3Wz8",
    authDomain: "my-awesome-project-fc911.firebaseapp.com",
    databaseURL: "https://my-awesome-project-fc911.firebaseio.com",
    projectId: "my-awesome-project-fc911",
    storageBucket: "my-awesome-project-fc911.appspot.com",
    messagingSenderId: "384958204663",
    appId: "1:384958204663:web:0fc3e27aa47cc85593a1f2"
  };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   var db = firebase.database();

var switcher = false;
app.get('/totalvisitors', (req, res)=>{
  res.json({"total Visitors": totalCount});
}) 

// -----------------------------------------------------------------------

/*
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-awesome-project-fc911.firebaseio.com"
});
*/

// changed path to public but it should be back to build

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'app/build')))
// Anything that doesn't match the above, send back index.html

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname + '/app/build/index.html'))
  console.log('HOME ROUTE IN SERVER.JS');
})


// Open FireBase Connection

var userRef = db.ref("vistorByCountry/").on('value', function(items){
     
  fbArrVal.push(items.val());
  fbArr = Object.keys(fbArrVal[0]);
 // console.log(fbArr.length);
    // console.log(fbArrVal);
    
    for(var i = 0; i < fbArr.length; i++){
      var tempfbVal = fbArr[i];
      var countRef = db.ref(`vistorByCountry/${tempfbVal}`).on('value', function(items){
      totalCountArr.push(items.val());
     //  console.log(totalCountArr);
      });
    }
  //  console.log(totalCountArr);
    for(var j = 0; j < totalCountArr.length; j++){
      
      totalCount+= totalCountArr[j].Count;
    }
  });

  // -----------------------------------------------------------------------

// Open Connection with MongoDB to retrieve the Likes and Messages

client.connect(err =>{
  if(err) throw err;
  
  const db = client.db("registeredUser");
  var cursor = db.collection('userinfos').find();
  var cursor2 = db.collection('loveusers').find();
  var cursor3 = db.collection('contactusers').find();

  cursor.forEach(function(doc){
    resultArray.push(doc);
  }, function(){
   // client.close();
  })
  cursor2.forEach(function(doc){
    likesArray.push(doc);
   // console.log(likesArray);
  }, function(){
   // client.close();
  })
  cursor3.forEach(function(doc){
    messagesArray.push(doc);
   // console.log(likesArray);
  }, function(){
    client.close();
  })
});
/*
app.get('/visitors', (res, req)=>{

  var database = firebase.database();
     var ref = database.ref('vistorByCountry/');
     ref.once('value', gotData, errData);
       
       function gotData(data) {
         
         var firebaseDB = data.val();
       //  console.log(firebaseDB);

         if (firebaseDB === null) {
           ref.push(info);
        //   this.setState({ vistorByCountry: info });
        
           // If Null Result from firebase Databse      
         } else{

           var keys = Object.keys(firebaseDB);
           console.log(keys);

          }
        }
        function errData(err) {
        //  console.log('Error!');
        //  console.log(err);
        }
})
*/

app.post('/login', (req, res)=>{
var userFound = false;

  var user = req.body.User;
  var pass = req.body.Password;
  for(var i = 0; i < resultArray.length; i++){
    if(user == resultArray[i].Username && pass == resultArray[i].Password && !userFound){
     // console.log('User Found Successfully!, ' + 'Welcome to you Mr. ' + resultArray[i].Username);
     userFound = true;
     userName = resultArray[i].Username;
    }
  }
if(userFound){
// return res.send(`Welcome to you Mr. ${userName}, you will be redirected momentarily!`);
res.redirect('/home');
} else if(!userFound){
  res.send('User is Not Found!');
}
});
/*
app.get('/home', (res, req)=>{
  res.redirect('/home');
});
*/

app.get('/totallikes', (req, res)=>{

  res.json({"total Likes": likesArray.length});
 /*
  client.connect(err =>{
    if(err) throw err;
    
    const db = client.db("registeredUser");
    var cursor = db.collection('loveusers').find();
    
    cursor.forEach(function(doc){
      likesArray.push(doc);
     // console.log(doc);
      
    }, function(){
      client.close();
    })
  
  });
 res.json({"total Likes": likesArray.length});
 console.log(likesArray.length);
 */
})

app.get('/totalmessages', (req, res)=>{
  res.json({"total Messages": messagesArray.length});
})
var switcher2 = false;
app.get('/visitorsbycountry', (req, res)=>{
  if(switcher2 == false){
    switcher2 = true;
   var CountInOrder = totalCountArr.map(i =>{
     i.isCounted = false;
     return i.Count;
   }).sort((a, b)=>{return b-a;});
   var totalInfoInOrder = CountInOrder.map(i =>{
     totalCountArr.map(ii =>{
       if(i == ii.Count && ii.isCounted == false){
         ii.isCounted = true;
         totalVisitorsByCountryInOrder.push(ii);
       }
     })
   })
   res.json(totalVisitorsByCountryInOrder);
  } else{
    res.json(totalVisitorsByCountryInOrder);
  }
})
var reversed = false;
app.get('/messagesinfo', (req, res)=>{
  if(!reversed){
    reversed = true;
  res.json({messages: messagesArray.reverse()});
  }
  else if(reversed){
    res.json({messages: messagesArray});
  }
})

app.listen(port, ()=>{
    console.log(`Connected on port: ${port}`);
})