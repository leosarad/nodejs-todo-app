console.log("App Started");

let express = require("express");
let routes = require("./src/routes/route.js");
let hbs = require("hbs");

let app = express();

// App Variables
app.variables = {
    port : process.env.port || 3000,
    publicDirectoryPath : __dirname+"/public",
    title : "Todo App",
}

// Set HBS as View Engine
app.set("view engine","hbs");

// Set Path for Satic Files
app.use(express.static(app.variables.publicDirectoryPath));
app.use(express.json());

// Start Routing
routes(app)

// Listen on port 3000
app.listen(process.env.port || 3000,()=>{
    console.log("Listening To Port 3000");
})