let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let ObjectId = mongodb.ObjectID;

let connectDB = new Promise((resolve,reject)=>{    
    let dbURL = "mongodb+srv://leosarad100:LetmeIn%23100@cluster0-kqdo1.gcp.mongodb.net/todo?retryWrites=true&w=majority";
    let localURL = "mongodb://127.0.0.1:27017";
    let dbName = "todo";
    MongoClient.connect( localURL, {useNewUrlParser:true,useUnifiedTopology:true}, (error,client)=>{
        if(error){
            return console.log("DB Connection Fail");
        }
        let db = client.db(dbName);
        resolve(db);
    })
})

let readAll = ()=>{
    return new Promise((resolve,reject)=>{
        connectDB.then((db)=>{
            db.collection('notes').find().toArray((error,tasks)=>{
                resolve(tasks);
            })
        });
    })
}

let add = (note)=>{
    return new Promise((resolve,result)=>{
        let item = {
            "title" : note,
            "description" : "Add note here..."
        }
        connectDB.then((db)=>{
            db.collection('notes').insertOne(item,(error,result)=>{
                if (error) {
                    return console.log('Unable to insert note')
                }
                resolve(result.ops);
            })
        });
    })
}

let readOne = (id)=>{
    return new Promise((resolve,reject)=>{
        console.log("Read object: "+ id);
    })
}


let edit = (note)=>{
    return new Promise((resolve,reject)=>{
        connectDB.then((db)=>{
            db.collection('notes').updateOne({
                _id: new ObjectId(note.id)
               }, {
                $set: {
                title: note.title,
                description: note.description
                }
               }).then((result) => {
                resolve(result)
               }).catch((error) => {
                reject(error)
               })
               
        })
    })
}

let remove = (id)=>{
    return new Promise((resolve,reject)=>{
        connectDB.then((db)=>{
            let _id = new ObjectId(id);
            db.collection('notes').deleteOne({"_id": _id}).then(result=>{
                resolve(result);
            }).catch(error=>{
                console.log('Unable to Delete Note')
            })
        });
    })
}


module.exports = {
    readAll,
    readOne,
    add,
    edit,
    remove
}