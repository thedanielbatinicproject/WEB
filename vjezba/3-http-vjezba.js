const http = require("http")

const server = http.createServer((req, res) => {
    res.write("niggerius")
    res.end()
})

server.listen(2000)