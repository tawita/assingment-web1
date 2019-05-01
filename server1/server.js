const functions = require('firebase-functions');
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var firebase = require('firebase');

var cors = require('cors');

app.use(cors())

var config = {
    apiKey: "AIzaSyDcZ-vdEO2ADOSAFZSBDQrKKYb4njbBeac",
    authDomain: "react-database-ceb9d.firebaseapp.com",
    databaseURL: "https://react-database-ceb9d.firebaseio.com",
    projectId: "react-database-ceb9d",
    storageBucket: "react-database-ceb9d.appspot.com",
    messagingSenderId: "696516929403"
  };
  firebase.initializeApp(config);

exports.api = functions.https.onRequest(app)


router.route('/Tawita')
    .post(function (req, res) { 
        t_name = req.body.name;
        t_id = req.body.id;
        firebase.database().ref('Tawita/' + t_id).set({
            name: t_name,
            id: t_id
        });

        res.json({ message: 'Tawita created!' });
    });

router.route('/Tawita')
    .get(function (req, res) {
        var t_path = firebase.database().ref('Tawita/');
        t_path.on('value', function (snapshot) {
            res.send(snapshot.val())
        });

    });

router.route('/Tawita/:t_id')
    .get(function (req, res) {
        var id = req.params.t_id;
        var bear_once_path = firebase.database().ref('/Tawita/' + id)
        t_once_path.once('value', function (snapshot) {
            res.send(snapshot.val())
        });
    });

router.route('/Tawita/:t_id')
    .put(function (req, res) {
        var id = req.params.t_id;
        var t_once_path = firebase.database().ref('/Tawita/' + id)
        firebase.database().ref(t_once_path).update({
            name: req.body.name

        });
        res.json({ message: 'Tawita Updated!' });
    });

router.route('/Tawita/:t_id')
    .delete(function (req, res) {
        var id = req.params.t_id;
        var t_once_path = firebase.database().ref('/Tawita/' + id)
        firebase.database().ref(t_once_path).remove()
        res.json({ message: 'Tawita deleted!' });

        });


        app.use(bodyParser.json(), router);
        app.listen(8000);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
