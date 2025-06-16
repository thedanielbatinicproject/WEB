const persons = require("./2-modul")

// console.log(persons.daniel + "   " + JSON.stringify(persons.Person));

const os = require("os")
// console.log(os.userInfo());
// console.log("system uptime is " + os.uptime()/60 + "minutes")

const path = require("path")
// console.log(path.sep);
// console.log(path.basename("1-test.js"))
// console.log(path.resolve(__dirname))

const {readFileSync, writeFileSync} = require("fs")

const text = readFileSync("./content/text.txt", "utf8")
// console.log(text)

writeFileSync(path.resolve(__dirname)+path.sep+"vjezba.txt", "hello \n", {flag: "a"})

const {readFile, writeFile} = require("fs")

readFile("./content/text.txt","utf-8" , (error, data) => {
    if(error) return;
    console.log(data);
    
})