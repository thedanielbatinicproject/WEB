var http = require("http")
var fs = require("fs")

const server = http.createServer((req, res) => {
    const text = fs.readFileSync("./vjezba.txt","utf-8")
    // if(req.url == "/") res.end(text)
    // if (req.url == "/about") res.end("about page")
    // else res.end("<h1>YOU HAVE NO ACCESS HOW DARE YOU!</h1>")
    const fileStream = fs.createReadStream("./vjezba.txt", "utf-8")
    fileStream.on("open", () => {
        fileStream.pipe(res)
    })
    fileStream.on("error", (err)=>{
        console.log("Error occured!!")
        console.log(err);
        res.end(err)
    })
})

server.listen(2000, ()=>{console.log("Server listening on port 2000...");
})