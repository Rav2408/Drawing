let invaders = new Array
let rockets = new Array
ship = new Ship(1,1,30)

function createInvaders(level) {
    for(let i=0;i<level;i++){
        if(settings.level == 5){
            invaders.push(new Boss(settings.bounds.right-1,
                random(settings.bounds.top, settings.bounds.bottom),settings.enemy.speed))
        }else{
            invaders.push(new Invader(settings.bounds.right-1,
                random(settings.bounds.top, settings.bounds.bottom),settings.enemy.speed))
        }
        
    }
}   

function drawInvaders() {
    for (let i = 0; i<invaders.length; i++){
        invaders[i].drawEntity()
    }
}

function moveInvaders(delta){

    for (let i = 0; i<invaders.length; i++){
        invaders[i].moveEntity('left', delta) 
        let now = Date.now()
        if(now - invaders[i].lastShot > settings.enemy.shotPeriod){
            if(random(1,3) == 3){
                invaders[i].shot()
                
            }
            invaders[i].lastShot = now
        }
        if(invaders[i].x < settings.bounds.left){
            invaders.splice(i,1)
        }
        
             
    }
}

function createRocket() {
    rockets.push(new Rocket(ship.x+ship.width+1, ship.y, 60, 'right','-','user'))
}

function drawRockets() {
    for (let i = 0; i<rockets.length; i++){
        rockets[i].drawEntity()
    }
}

function moveRockets(delta){
    for (let i = 0; i<rockets.length; i++){
        if(!rockets[i].moveEntity(rockets[i].direction, delta)){
            rockets.splice(i,1)
        }    
    }
}
function entityHit(victim, attackers) {
    for (let i = 0; i < attackers.length; i++) {
        if (victim.isHit(attackers[i]) && attackers[i].author != victim.author) {
            attackers.splice(i, 1)
            return true
        }
    }
    return false
}

function moveShip(ship,delta) {

    if (settings.pressedKeys[settings.keys.left]) {
        ship.x -= ship.velocity*delta
    }
    if (settings.pressedKeys[settings.keys.right]) {
        ship.x += ship.velocity*delta
    }
    if (settings.pressedKeys[settings.keys.up]) {
        ship.y -= ship.velocity*delta/2
    }
    if (settings.pressedKeys[settings.keys.down]) {
        ship.y += ship.velocity*delta/2
    }

    if (settings.pressedKeys[settings.keys.spaceBar]) {
        let now = Date.now()
        if(now - ship.lastShot > 200){
            createRocket()
            ship.lastShot = now
        }
    }

    //bounds
    if (ship.x < settings.bounds.left) {
        ship.x = settings.bounds.left
    }
    if (ship.x + ship.width > settings.bounds.right) {
        ship.x = settings.bounds.right - ship.width
    }
    if (ship.y < settings.bounds.top) {
        ship.y = settings.bounds.top
    }
    if (ship.y + ship.height >= settings.bounds.bottom) {
        ship.y = settings.bounds.bottom - ship.height
    }
}

function wasShipHit(){
    if(entityHit(ship,rockets)){
        settings.howManyTimesHit++
        updatePanel()
    }
}

function wasInvaderHit() {
    for(let i=0; i< invaders.length; i++){
        if(entityHit(invaders[i],rockets)){
            invaders.splice(i,1)
            settings.score++
            updatePanel()
        }
    }
}

function wasRocketHit() {
    for(let i=0; i< rockets.length; i++){
        if(entityHit(rockets[i],rockets)){
            rockets.splice(i,1)
        }
    }
}

function nextLevel(){
    if(settings.score % 10 == 1){
        settings.level++
        settings.score++
        settings.lives++
        if(settings.level==3 && settings.mode !== 'EASY'){
            settings.enemy.missles=3
        }
        updatePanel()
        createInvaders(settings.level)
    }else if(invaders.length === 0){
        createInvaders(settings.level)
        console.log('emptyGeneration')
    }else if(random(1,50) == 10){
        createInvaders(settings.level-invaders.length)
        console.log('randomGeneration')
    }
}

function render(){
    var content2 = content.join('\n');
    if (gameScreen.innerHTML !== content2) {
        gameScreen.innerHTML = content2
    }
}

function clear(){
    var i = 0,
    row = Array(settings.bounds.right+1).join(" ")
    
    content = [];
    for (i = 0; i < settings.bounds.bottom+1; i++) {
        content.push(row)
    }
}

function update(delta) {
    moveShip(ship,delta)
    wasRocketHit()
    wasShipHit()

    moveRockets(delta)
    wasInvaderHit()
    wasShipHit()

    moveInvaders(delta)
    wasInvaderHit()
    wasShipHit()

    clear()
    ship.drawEntity()
    drawRockets()
    drawInvaders()
    nextLevel()
    drawMiddle('Lives: ' + (parseInt(settings.lives) - settings.howManyTimesHit) + ' Score: ' + settings.score + 
    ' Level: ' + settings.level,-9)
}

function reset(){
    switch (settings.mode) {
        case 'EASY':
            settings.lives = 10
            settings.enemy.missleSpeed = 30
            settings.enemy.speed = 20
            settings.enemy.shotPeriod = 1000
            break;
        case 'MEDIUM':
            settings.lives = 5
            settings.enemy.missleSpeed = 40
            settings.enemy.speed = 30
            settings.enemy.shotPeriod = 600
            break;
        case 'HARD':
            settings.lives = 3
            settings.enemy.missleSpeed = 60
            settings.enemy.speed = 40
            settings.enemy.shotPeriod = 300
            break;
    }
    settings.howManyTimesHit = 0
    settings.level = 1
    settings.score = 0
    settings.enemy.missles = 1
    invaders=[]
    rockets=[]
    updatePanel()
}


function startGame(){
    
    let lastTimestamp = 0
    clear()
    reset()

    createInvaders(settings.level)

    window.requestAnimationFrame(step)

    function step(timestamp) {
        if(settings.lives - settings.howManyTimesHit <= 0){
            gameOver()
            return
        }
        delta = (timestamp - lastTimestamp) / 1000
        update(delta)
        render()

        lastTimestamp = timestamp
        window.requestAnimationFrame(step)
    }
}

clear()
start()

