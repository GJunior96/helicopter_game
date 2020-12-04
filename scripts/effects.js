class Effects
{
    constructor(x, y, width, height, moment, duration, type, url, context){
        this.initialX = x;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moment = moment;
        this.duration = duration;
        this.type = type;
        this.url = url;
        this.img = new Image();
        this.img.src = url;
        this.frameX = 0;
        this.frameY = 0;
        this.context = context;
        if(this.type == 'shot'){
            this.frameY = 2;
            this.frameWidth = width;
            this.frameHeight = height;
            this.hit = false;
        }
        if(this.type == 'explosion'){
            this.frameY = 5;
            this.frameWidth = width + 20;
            this.frameHeight = height + 20;
        }
    }

    draw(){
        this.context.drawImage(this.img, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.frameWidth, this.frameHeight);
        
    }

    move(){
        if(this.type == 'shot'){
            this.x += 20;
        }
    }

    changeSprite(){
        if(this.type == 'shot'){
            if(this.frameX < 2){
                this.frameX++;
            }else{ this.frameX = 0 };
        }
        if(this.type == 'explosion'){
            if(this.frameX < 7){
                this.frameX++
            } else { this.frameX = 0 };
            if(this.frameX == 0){
                this.frameY++
            }
        }
    }
}