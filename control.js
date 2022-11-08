
window.addEventListener('keydown', (event) => {
    keyDown(event.key)    
})

window.addEventListener('keyup', (event) => {
    keyUp(event.key)
})

keyDown = function(key){
    settings.pressedKeys[key] = true
}

keyUp = function(key){
    settings.pressedKeys[key] = false
}