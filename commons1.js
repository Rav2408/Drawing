function random(a,b){
    return Math.floor(Math.random() * b)+ a
}


function draw(x, y, string) {
    let intX = parseInt(x), intY = parseInt(y)

    if (intX < settings.bounds.left || intX > settings.bounds.right ||
        intY < settings.bounds.top || intY > settings.bounds.bottom) {
            console.log('Out of bounds for x:'+x+' y:'+y+' string:'+string)
        return
    }

    content[intY] = content[intY].substr(0, intX) + string + content[intY].substr(intX + string.length)
}

function drawMiddle(string, fromYaxsis = 0) {
    const length = string.length
    let x = 0
    let y = Math.floor(settings.bounds.bottom/2) + fromYaxsis

    if (length < settings.bounds.right) {
        x = parseInt((settings.bounds.right / 2) - (length / 2))
    }

    return draw(x, y, string)
}

function drawLeft(string, fromYaxsis = 0) {
    const length = string.length
    let x = 0
    let y = Math.floor(settings.bounds.bottom/2) + fromYaxsis

    if (length < settings.bounds.right) {
        x = parseInt((settings.bounds.right / 5) - (length / 2))
    }

    return draw(x, y, string)
}

function overLine(x){
    let tab=[]
    for(let i=0;i<x;i++){
        tab.push(String.fromCodePoint(0x0000203E))
    }
    return tab.join('')
}

function visitCounter() {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "https://api.countapi.xyz/hit/rav2408.github.ioSpaceWarsASCII/prod")
    xhr.responseType = "json"
    xhr.onload = function() {
        visitCounterHtml.innerHTML=`This website has been visited ${this.response.value} times!`
    }
    xhr.send()
}