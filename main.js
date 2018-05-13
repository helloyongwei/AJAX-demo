button.addEventListener('click', function(e) {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
            //xhr.readyState为4表示请求完成(并不一定成功)
            let string = xhr.responseText;
            let object = JSON.parse(string)
            console.log(object)
            console.log("object: "+object)
            console.log("object.people.name: "+object.people.name)
            console.log(object.others['two'])
            console.log("object.others['two']: "+object.others['two'])
            console.log("object.others['two'].parents[0]: "+object.others['two'].parents[0])
        }
        
    }
    xhr.open('GET', '/xxx', true)
    xhr.send()
    
})