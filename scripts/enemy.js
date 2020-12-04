class Enemy
{
    constructor(x, y, width, height, url, context, speed, fly){
        this.x = x + Math.random() * (500 - 0) + 0;
        this.y = y;
        this.width = width;
        this.height = height;
        this.url = url;
        this.img = new Image();
        this.img.src = url;
        this.context = context;
        this.speed = speed;
        this.frameX = 0;
        this.frameY = 0;
        this.fly = fly;
        this.blowingUp = false;
    }

    draw(){
        this.context.drawImage(this.img, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    changeSprite(){
        if(this.frameX < 1){
            this.frameX++;
        }else{
            this.frameX = 0;
        }
    }

    move(){
        this.x -= 5;
        if(this.x < -this.width || this.blowingUp == true){
            this.x = this.context.canvas.width + Math.random() * (600 - 10) + 0;
            if(this.fly == true){
                this.y = Math.random() * (350 - 10) + 10;
            }
        }
        this.blowingUp = false;
    }

    destroyed(){
        return new Effects(this.x + 50, this.y - 40, 128, 170.666, "explosion", 2, "explosion", '/img/explosion.png', this.context);
    }
}