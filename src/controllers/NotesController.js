let notes = require("../db/notes.js");
let msg = "";
let app = {
    title: "Todo App"
}

let index = (req,res)=>{
    notes.readAll("msg").then((tasks)=>{
        res.render("home",{
            "app":app,
            "notes":tasks,
            "msg":msg,
        });
        msg="";
    })
}

let add = (req,res)=>{
    let note = req.query.note;
    notes.add(note).then((res)=>{
        console.log("Note Added:",res);
        msg = "Note Added";
        return true
    })
    res.redirect('/');
}

let edit = (req,res)=>{
    let note = req.body;
    notes.edit(note).then((response)=>{
        res.send(response);
        return true
    })
}

let remove = (req,res)=>{
    let id = req.query.id;
    notes.remove(id).then((res)=>{
        console.log("Note Removed:",res);
        msg = "Note Removed";
        return true
    })
    res.redirect('/');
}

module.exports = {
    add,
    index,
    edit,
    remove
}