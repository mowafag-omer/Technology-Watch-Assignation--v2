# Technology-Watch-Assignation--v2
![](https://img.shields.io/badge/node.js-gray?logo=node.js)
![](https://img.shields.io/badge/ejs-gray?logo=ejs)
![](https://img.shields.io/badge/Bootstrap_vue-gray?logo=Bootstrap).


The aim of this project is to be able to create a list of students in one hand, and in the other hand be able to randomly assign a chosen Topic to a Student who wasn't assigned yet to a Technology Watch. A single page in which we can add both students and Technology Watch.
using nodeJS and EJS for render an ejs template which : 
- will render our two form; one for add a student and the other for add a technology-watch. 
- will display the students registered and technology-watch assigned to a student.
<br><br>

## contents
* [App](#app)
* [Server-side](#Server-side)
* [Client-side](#Client-side)
<br>
![Test Image 4](https://github.com/mowafag-omer/Technology-Watch-Assignation/blob/master/Capture.PNG)
<br><br>

## Server-side
- node.js modules and view rendering function
```js
const http = require('http')
const fs = require("fs")
const ejs = require("ejs")
const url = require('url')
const { parse } = require('querystring')

const data = JSON.parse(fs.readFileSync('twdata.json'))

const renderHTML = (content) => {
  const template = fs.readFileSync(__dirname + '/views/index.ejs', 'utf8')
  return tempRnd = ejs.render(template, {data: content})
}
```
- add student route; store data in ajson file
```js
http.createServer(function (req, res,) {
  const page = url.parse(req.url)
  res.writeHead(200, {'Content-Type': 'text/html'})
  
  if(page.pathname == '/student'){
    let sname
    req.on('data', i => sname = i.toString())
    req.on('end', () => {
      // sname = new URLSearchParams(page.query).get('student')
      sname = parse(sname).student
      data.name.push([sname, 0])
      fs.writeFileSync('twdata.json', JSON.stringify(data))
    }) 
    res.writeHead(301, {Location: '/'})
  }
```
- add a technology topic and randomly assign a chosen topic to a Student who wasn't assigned yet to a Technology Watch; store data in ajson file
```js
 if(page.pathname == '/tech'){
    let tname, random
    req.on('data', i => tname = i.toString())
    req.on('end', () => {
      tname = parse(tname).tech
      const arr = data.name.filter(i => i[1] == 0 && i[0])
      if(arr.length){
        random = arr[Math.floor(Math.random() * arr.length)]
        data.name.forEach(i => i == random && (i[1] = 1))
        data.tech.push([tname, random[0]])
        fs.writeFileSync('twdata.json', JSON.stringify(data))
      }
    }) 
    res.writeHead(301, {Location: '/'})
  }
```
