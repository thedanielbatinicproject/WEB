const {readFile} = require("fs")

const getText = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, "utf-8", (err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
}

const start = async() => {
    try {
        const first = await getText("./vjezba/vjezba.txt")
        console.log(first);
    }  catch (err) {
        console.log(err)
    }
}

start()

const {writeFileSync} = require("fs")

for(let i = 0; i<300000; i++) {
    writeFileSync("./vjezba/vjezba.txt", `hello world ${i}\n`, {flag:"a"})
}

// getText("./vjezba/vjezba.txt")
//     .then((result)=>console.log(result))
//     .catch(err => console.log(err))




