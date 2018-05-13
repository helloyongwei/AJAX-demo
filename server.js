var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号!例如: node server.js 8888')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method



  console.log('含查询字符串的路径\n' + pathWithQuery)

  if(path === '/'){
    let page = fs.readFileSync('./index.html', 'utf8')  //读取index.html
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(page)    //将index.html返回给浏览器
    response.end()
  } else if (path === '/main.js') {
      /*
      注意else if中的./main.js表示的是路径, 它是index.html中script标签的src属性
      而我们通过readFileSync读取的main.js是和index.js同一目录下的文件
      */
      /*
      浏览先发送请求, 浏览器接收到服务器返回的index.html并解析, 
      看到script标签则再次向服务器发送请求, 告诉我服务器我要scr属性指向的文件. 服务器在后台处理
      */
    let js = fs.readFileSync('./main.js', 'utf8') //读取main.js文件
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(js)    //将main.js返回给浏览器
    response.end()
  }else if (path === '/xxx') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
        {
            "people": {
                "name": "helloyong",    
                "age": 20,              
                "sex": "man",
                "isGay": false         
            },
            "others": {
                "one": {
                    "name": "bugyong",
                    "age": 21,
                    "sex": "woman",
                    "children": null
                },
                "two": {
                    "name": "stackyong",
                    "age": 22,
                    "parents": ["father", "mother"] 
                }
            }
        }
    `)    
    response.end()
  }else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    // let callback = query.callback
    response.write('我访问失败了')
    response.end()
  }


})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请在浏览器打开 http://localhost:' + port)

