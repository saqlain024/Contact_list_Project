const express = require('express');
const path = require('path');
const port = 8000;
// const bodyparser = require('body-parser');     

const db = require('./config/mongoose');

const Contact = require('./models/contact');



const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views' ));

app.use(express.urlencoded({extended:false}));             
// app.use(bodyparser.urlencoded({extend:false}));

app.use(express.static('assets'));


// //middleware1
// app.use(function(req, res, next) {
//     req.myName = "Arpan";
//     // console.log('middleware 1 is called');
//     next();
// });

// //middleware2
// app.use(function(req, res, next) {
//     console.log('My Name from MW2', req.myName);
//     // console.log('middleware 2 is called');
//     next();
// });

var contactList = [
    {
        name: 'Saqlain',
        phone: '1234567890'
    },
    {
        name: 'Tony Stark',
        phone: '5678468345'
    },
    {
        name: 'Rudransh tiwari',
        phone: '5684562345'
    },
]


app.get('/',  function(req, res) {
    // console.log('from the get route controller', req.myName);

    Contact.find( {}, function(err, contacts) {       // for specific -> use this {name:'Rudransh'} instead of {}

        if(err) {
            console.log('error in fetching contacts from ');
            return;
        }

        return res.render('home', {
            title : 'Contact List',
            contact_List : contacts   // note naming convention
    
        });

    });


});


app.get('/practise', function(req, res) {
    return res.render('practise', {
        title : "Let us play with ejs"
    });
});


app.post('/create-contact', function(req, res) { //controller
    // contactList.push({
    //         name : req.body.name,
    //         phone: req.body.phone
    // });
 
    // contactList.push(req.body); //another way of writing above part

    Contact.create({
        name : req.body.name,
        phone : req.body.phone,
    }, function(err, newContact){
        if(err) {
            console.log('error in creating a contact !');
            return;
        }

        console.log('*******', newContact);
        return res.redirect('back');


    });

    // return res.redirect('/');
    // return res.redirect('back');   //shortcut to go to redirect to samepage
});


//for deleting the contact
app.get('/delete-contact/', function(req, res){
    // console.log(req.query);
    //get the query from the url
    //let phone = req.query.phone;

    // get the id from query in the ul
    let id = req.query.id;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if (contactIndex != -1) {
    //     contactList.splice(contactIndex,1);
    // }
    

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete( id, function (err) {
        if(err) {
            console.log('error in deleting the object from database');
            return;
        }

        return res.redirect('back');


    })
        
});


// app.get('/',  function(req, res) {
//     console.log(__dirname);   // now this will  tell us from which folder server (index.js) is started..

//     // res.send('<h1>Cool, it is running! or is it?</h1>');
    
//     return res.render('home');
// });


app.listen(port, function (err) {
    if(err) {
        console.log('Error in running the server', err);
        // return;
    }
    console.log('Yup! My Express Server is runnning on port', port);
});