const path = require('path');
const express= require('express');

// Mongoose intialization and Checking
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/Contact');
    console.log("Connected!!")
  }
//   all the input tags from contact.pug
// making of the schema
  const ContactSchema = new mongoose.Schema({
    name :String,
    phone :String,
    email :String,
    card :String,
    gender :String,
    idea :String,
    

  });
//   making the schema into model
  const ContactModel = mongoose.model('ContactCollection', ContactSchema);
const port=80;

const app=express();
app.use('/static',express.static('static'));
app.use(express.urlencoded());
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>
{
    const param={}
    res.status(200).render('home.pug',param);
});
app.get('/contact',(req,res)=>
{
    const param={}
    res.status(200).render('contact.pug',param);
});
app.post('/contact',(req,res)=>
{
    /**
     * myData is creating a new obj for every time form is being run
     * a catch is being throwed if not so
     * if saved then a "then" func is passed 
     */
    let myData = new ContactModel(req.body);
    myData.save().then(()=>{res.send("Saved into the Database")}).catch(()=>{res.status(400).send("Not saved into Databse!!")});
    // // res.status(200).render('contact.pug',param);

});
app.listen(port,()=>{console.log(`${port} success!!`)})

// npm install body-parser
//  cosnt bodyparser= require("body-parser")
// 	bodyparser is a middleware
// yeh dursa tarika hai karna ka