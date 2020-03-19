const express = require("express");
const cors = require("cors");
const app = express();

require("./server/config/task.config")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

require("./server/routes/task.routes")(app);

app.listen(8000,() =>{
    console.log("Server is started on port 8000");
})
