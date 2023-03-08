let myData = new ContactModel(req.body);
    nyData.save().then(()=>{res.send("Saved into the Database")}).catch(()=>{res.status(400).send("Not saved into Databse!!")});