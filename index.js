const { Channel } = require('diagnostics_channel');
const express = require('express')
const event = require('events')
const eventEmitter = new event.EventEmitter();
const Pusher = require('pusher')
const mongoose = require('mongoose');
const testing = require('./Dbusers')
const mongodb = require("mongodb")
// const url = "mongodb://0.0.0.0:27017"
const url = "mongodb+srv://manivasagam:atshu.mani@cluster0.lbv27mw.mongodb.net/event?retryWrites=true&w=majority"
const client =new mongodb.MongoClient(url);

const app = express();

const pusher = new Pusher({
    appId: "1541079",
    key: "b873187ea1936a3ba23f",
    secret: "7b0aeb5376989002ac04",
    cluster: "ap2",
    useTLS: true
  });
  


app.use(express.json());



mongoose.connect(url);

const mdb= mongoose.connection



mdb.once('open',()=>{
    console.log('hello');
    const col = mdb.collection("testing");
    console.log("connected to collection")
    const changeStream = col.watch();
    console.log("watching");
    changeStream.on('change',(change)=>{
        console.log(change)
    })

})


// const eventL =async()=>{ 
// try {
    
//     const connection =await client.connect()
//     const db = connection.db('event')
//     console.log("connected to db")
//     const changeStream =await db.collection('testing').watch();
//     // // changeStream = connection.watch();
//     console.log("watching");
//    changeStream.on('change',function(change){
//         console.log('change');
//     })  
// } catch (error) {
//     console.log(error);
// } 

// }
// eventL();

app.get("/",async(req,res)=>{
    try {
       
        const connection =await client.connect()
        const db = connection.db('event')
        // eventEmitter.on('connection',clg)
        await db.collection("testing").find().toArray();
        // eventEmitter.emit('connection')
        res.send({message:"added"})
        await connection.close()
        
            } catch (error) {
                console.log(error);
            }
})




app.post('/b',async(req,res)=>{
    try {
       
        const connection =await client.connect()
        const db = connection.db('event')
        // eventEmitter.on('connection',clg)
        await db.collection("testing").insertOne(req.body)
        // eventEmitter.emit('connection')
        res.send({message:"added"})
        await connection.close()
        
            } catch (error) {
                console.log(error);
            }
})

// app.post('/new', async(req,res)=>{
// const test = req.body
//     testing.create(test,(err,data)=>{
//         if(err){
//             console.log(err)
//         }else{
//             return res.status(201).send(data)
//         }
//     })
// //     

// }
// )


// console.log("connected");
app.listen(5000);

