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

  if(page.pathname == '/refresh'){
    data.name.forEach(i => i[1] = 0)
    fs.writeFileSync('twdata.json', JSON.stringify(data))
    res.writeHead(301, {Location: '/'})
  }

  res.end(renderHTML(data))
}).listen(8080)