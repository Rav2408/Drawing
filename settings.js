const gameScreen = document.getElementById('screen')
const panel = document.getElementById('panel')
const visitCounterHtml = document.getElementById('visitCounter')

settings = {
    bounds : {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    keys : {
        left: 'a', 
        right: 'd', 
        up: 'w', 
        down: 's',
        spaceBar: ' ' 
    },
    pressedKeys :{        
    },
    howManyTimesHit: 0,
    level: 1,
    mode: 'MEDIUM',
    lives: 3,
    score: 0,
    enemy:{
        missleSpeed: 40,
        speed: 30,
        shotPeriod: 1000,
        missles: 1
    }
}

function initBounds() {
    fontSizes = getDefaultFontSize()
    document.getElementById('screen').style.height = parseInt(window.screen.height/2) +'px'
    document.getElementById('screen').style.width = parseInt(window.screen.width*4/5-20) +'px'
    settings.bounds.right = parseInt(window.screen.width / fontSizes[0])
    settings.bounds.bottom = parseInt((window.screen.height/3) / fontSizes[1])    
}

function getDefaultFontSize(){
    pa= document.body
    var who= document.createElement('div')
   
    who.style.cssText='display:inline-block; padding:0; line-height:1; position:absolute; visibility:hidden; font-size:1em';
   
    who.appendChild(document.createTextNode('M'))
    pa.appendChild(who)
    var fs= [who.offsetWidth, who.offsetHeight]
    pa.removeChild(who)
    return fs
   }