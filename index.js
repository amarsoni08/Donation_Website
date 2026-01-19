import express from "express";

const app=express();

import mongoose from "mongoose";

import bodyParser from "body-parser";

app.use(bodyParser.json());

app.set("view engine","ejs");

import path from "path";

mongoose.connect("MONGODB URL",{
    dbName:"humanityhub",
}).then(()=>console.log("database connected")).catch((e)=>console.log(e));

const contactSchema= new mongoose.Schema({
    name: String,
    email: String,
    message :String, 
})

const contact=mongoose.model("contact",contactSchema);

const donateSchema= new mongoose.Schema({
    donation_name: String,
    amount:Number,
    name:String,
    email:String,
    message:String, 
})
const donate=mongoose.model("donate",donateSchema);



app.use(express.static(path.join(path.resolve(),"./public")));
app.use(express.urlencoded({extended:true}));

app.get("/humanityhub",(req,res)=>{
    res.render('index');
});
app.get("/humanityhub/donatenow",(req,res)=>{
    res.render('donate');
});
app.get("/humanityhub/contact",(req,res)=>{
    res.render('contact')
})

app.get("/humanityhub/aboutus",(req,res)=>{
    res.render('aboutus')
})

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    try {
        const newUser = await contact.create({
            name,
            email,
            message
        });

        res.redirect('/send');  // Redirect to another page after saving

    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).send('Error saving data');
    }
});

app.post('/donate', async (req, res) => {
    const { donation_name,amount,name, email, message } = req.body;
    
    try {
        const newUser = await donate.create({
            donation_name,
            amount,
            name,
            email,
            message
        });

        // res.redirect('/Successfully');  // Redirect to another page after saving
        res.render('successfully',{donation_name:donation_name,name:name,amount:amount});

    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).send('Error saving data');
    }
});


// app.get("/Successfully",(req,res)=>{
//     res.render('successfully')
// })


app.get("/send",(req,res)=>{
   res.render('send');
});

app.listen(5000,()=>{
    console.log("Server is running");
});
