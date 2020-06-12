let NotesController = require("../controllers/NotesController.js");

let appData = {
    "title" : "Todo App"
}
module.exports = (app)=>{

    app.get("/", NotesController.index)

    app.get("/add", NotesController.add)

    app.post("/edit", NotesController.edit)

    app.get("/remove", NotesController.remove)

    app.get("/about",(req,res)=>{
        res.render("about",{"app":appData});
    })

    app.get("*",(req,res)=>{
        console.log("Request Fail: "+req.method+" "+req.url);
        res.render("404",{"app":appData})
    })

}