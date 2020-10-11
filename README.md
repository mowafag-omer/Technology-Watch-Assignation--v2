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
* [Server](#Server)
<br>
![Test Image 4](https://github.com/mowafag-omer/Technology-Watch-Assignation/blob/master/Capture.PNG)
<br><br>

## Server
- Show students and Assassinated Technologies lists once the page has loaded
```js
window.onload = () => {
  students = JSON.parse(localStorage.getItem('student')) 
  techs = JSON.parse(localStorage.getItem('tech')) 
  
  students.forEach((i) => studentsName.push(i))
  techs.forEach((i) => technologie.push(i) )

  list[0].innerHTML = studentsName.map(i => "<li>" + i + "</li>").join('') 
  list[1].innerHTML = technologie.map(i => `<li> ${i[0]} - ${i[1]}</li>`).join('') 
}
```
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
- randomly assign a chosen Topic to a Student who wasn't assigned yet to a Technology Watch
```js
form[1].addEventListener('submit', (event) => {
  event.preventDefault()
  random = [Math.floor(Math.random() * studentsName.length)]
  technologie.push([techInput.value, studentsName[random]])
  localStorage.setItem("tech", JSON.stringify(technologie))
  list[1].innerHTML += "<li>" + techInput.value + ' - ' + studentsName[random] + "</li>"
  form[1].reset()
})

```
