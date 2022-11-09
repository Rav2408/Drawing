function waitForUser(params) {
    function step(timestamp) {
        if(settings.pressedKeys['Enter']){
            chooseLevel()
            
        }
        if (settings.pressedKeys['1']) {
            settings.mode = 'EASY'
            startGame()
            return
        }
        if (settings.pressedKeys['2']) {
            settings.mode = 'MEDIUM'
            startGame()
            return
        }
        if (settings.pressedKeys['3']) {
            settings.mode = 'HARD'
            startGame()
            return
        }
        
        window.requestAnimationFrame(step)
    }
    step()
}

function start() {
    visitCounter()
    initBounds()
    clear()
    drawMiddle('<\\> Space Wars <\\>')
    drawMiddle('<div>           Press Enter to start...</div>', 7)
    render()
    waitForUser()

}

function chooseLevel(){
    clear()
    let leftColumn=-1
    let middleColumn=-1
    drawMiddle('<\\> Space Wars <\\>',middleColumn-3)

    drawLeft('Move:',leftColumn-2)
    drawLeft('^',leftColumn+0)
    drawLeft('w',leftColumn+1)
    drawLeft('< a s d >',leftColumn+2)
    drawLeft('⌄',leftColumn+3)

    drawLeft('      ________',leftColumn+3)
    drawLeft('Shot: [spacebar]',leftColumn+4)
    drawLeft('      '+overLine(8),leftColumn+5) 

    drawMiddle('Choose Mode',middleColumn+3)
    drawMiddle('Easy: 1    Medium: 2    Hard: 3',middleColumn+5)
    drawMiddle('<div>           Press 1,2, or 3 to start...</div>', 7)
    render()
}



function gameOver(){
    clear()
    drawMiddle('<\\> GAME OVER <\\>')
    drawMiddle('<div>           Press Enter to play again...</div>', 7)
    render()
    waitForUser()
}

function updatePanel(){
    drawMiddle('Lives: ' + (settings.lives - settings.howManyTimesHit) + ' Score: ' + settings.score + 
    ' Level: ' + settings.level,-8)
}