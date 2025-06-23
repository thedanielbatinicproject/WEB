const express = require("express")
const app = express()
const path = require("path")



app.use(express.static("./public"))

// app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname,"public","index.html"));
// })



app.listen(5000, () => console.log("Server listening on port 5000"))