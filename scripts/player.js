class Player
{
    constructor(x, y, width, height, url, context){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.url = url;
        this.img = new Image();
        this.img.src = url;
        this.context = context;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 15;
        this.shot;
        this.isFiring = false;
        this.blowingUp = false;
    }

    draw(){
        this.context.drawImage(this.img, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
        if(this.frameX < 1){
            this.frameX++;
        }else{
            this.frameX = 0;
        }
    }

    moveUp(){
        if(this.y > 10){
            this.y -= this.speed;
        }
    }

    moveDown(){
        if(this.y < 450){
            this.y += this.speed;
        }
    }

    shoot(){
        return new Effects(this.x + 150, this.y, 75, 75, "shot",2, "shot", '/img/shot.png', this.context);
    }

    destroyed(){
        return new Effects(this.x + 50, this.y - 40, 128, 170.666, "explosion", 2, "explosion", '/img/explosion.png', this.context);
    }
}