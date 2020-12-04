class Background
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
    }

    draw(){
        this.context.drawImage(this.img, this.x, this.y);
    }

    move(){
        this.x -= 3;
        if(this.x < -2200){
            this.x = 2195;
        }
    };

}