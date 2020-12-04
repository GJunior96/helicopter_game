class Controller
{

    active = false;
    state = false;

    up = false;
    down = false;
    pause = false;
    shoot = false;
    

    trigger(state){
        console.log("here")
        if(state !== this.state){
            this.active = this.state = state;
        }
    }

    
}