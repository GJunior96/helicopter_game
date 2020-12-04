class Buddy
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
        this.speed = 3;
        this.frameX = 0;
        this.frameY = 0;
        this.state = "running"
        this.endFrame = false;
        this.back;
    }

    draw(){
        this.context.drawImage(this.img, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width - 30, this.height - 30);
    }

    changeSprite(){
        if(this.state == "running"){
            this.frameY = 2;
            if(this.frameX < 5){
                this.frameX++;
            }else{
                this.frameX = 0;
            }
        }
        if(this.state == "die"){
            if(this.frameX == 4 && this.frameY == 6){
                this.endFrame = true;
                this.back = Date.now();
            }
            if(this.frameX < 4){
                this.frameX++;
            } else { this.frameX = 0 }
            if(this.frameX == 0){
                this.frameY++;
            }
        }
    }

    move(){
        this.x += 2;
        if(this.x > this.context.canvas.width || this.endFrame == true){
            if(Date.now() > this.back + 1000){
                this.x = 0;
                this.endFrame = false;
                this.state = 'running';
                this.frameX = 0;
            }     
        }
    }
}