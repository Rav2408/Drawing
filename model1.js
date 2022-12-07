class Entity{
    constructor(x, y, velocity){
        this.x = x
        this.y = y
        this.velocity = velocity
        this.width = 1
        this.height = 1
        this.string = '?'
    }

    moveEntity(direction, delta){
        switch (direction) {
            case 'left':
                this.x -= this.velocity*delta
                break
            case 'right':
                this.x += this.velocity*delta
                break
            case 'left-up':
                this.x -= this.velocity*delta
                this.y -= this.velocity*delta/10
                break
            case 'left-down':
                this.x -= this.velocity*delta
                this.y += this.velocity*delta/10
                break
            default:
                break
        }
        if(this.x < settings.bounds.left || this.x > settings.bounds.right
            || this.y > settings.bounds.bottom || this.y < settings.bounds.top){
                return false
            }
        return true
    }

    drawEntity(){
        draw(this.x, this.y, this.string)
    }

    isHit(entity) {
        if(entity.x <= this.x + this.width && entity.x >= this.x
            && entity.y <= this.y + this.height && entity.y + entity.height >= this.y){
            return true
        }

        return false
    }
}

class Invader extends Entity{
    constructor(x, y, velocity){
        super(x,y,velocity)
        this.string = '|=|'
    }
    width=2
    lastShot = 0
    author = 'enemy'
    shot(){
        
        rockets.push(new Rocket(this.x-this.width-1, this.y, settings.enemy.missleSpeed, 'left','*','enemy'))
        this.lastShot = Date.now() 
        if(settings.enemy.missles == 1)
            return
        rockets.push(new Rocket(this.x-this.width-1, this.y, settings.enemy.missleSpeed, 'left-up','*','enemy'))
        rockets.push(new Rocket(this.x-this.width-1, this.y+1, settings.enemy.missleSpeed, 'left-down','*','enemy'))
        
    }

}


class Boss extends Invader{
    constructor(x, y, velocity){
        super(x,y,velocity)
    }
    shot(){
        rockets.push(new Rocket(this.x-this.width-1, this.y, settings.enemy.missleSpeed, 'left','*','enemy'))
        rockets.push(new Rocket(this.x-this.width-1, this.y, settings.enemy.missleSpeed, 'left-up','*','enemy'))
        rockets.push(new Rocket(this.x-this.width-1, this.y+1, settings.enemy.missleSpeed, 'left-down','*','enemy'))
        this.lastShot = Date.now() 
    }
    drawEntity(){
        draw(this.x, this.y, ' /')
        draw(this.x, this.y+1, '<')
        draw(this.x, this.y+2, ' \\')
    }
    height=3
}

class Ship extends Entity{
    constructor(x, y, velocity){
        super(x,y,velocity)
        this.string = '<=}'
        this.width = 3
    }
    author = 'user'
    lastShot = 0
}

class Rocket extends Entity{
    constructor(x, y, velocity, direction,string='-',author){
        super(x,y,velocity)
        this.string = string
        this.direction = direction 
        this.width = 1
        this.height = 1
        this.author = author
    }
}