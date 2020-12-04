class Engine
{
    constructor(update, render, time_step){
        this.update = update;
        this.render = render;
        this.time_step = time_step;
        this.running = false;
        this.updated = false;
        this.accumulated_time = 0;
        this.animation_frame_request = undefined;
        this.time = undefined;
    }
    run(time_stamp){
        this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
        this.accumulated_time += time_stamp - this.time;
        this.time = time_stamp;

        if(this.accumulated_time >= 60){
            this.accumulated_time = this.time_step;
        }

        while(this.accumulated_time >= this.time_step){
            this.accumulated_time -= this.time_step;
            this.update(time_stamp);
            this.updated = true;
        }

        if(this.updated){
            this.updated = false;
            this.render(time_stamp);
        }
    }
    handleRun = (time_step) => { this.run(time_step); };
    
    start(){
        this.running = true;
        this.accumulated_time = this.time_step;
        this.time = window.performance.now();
        this.animation_frame_request = window.requestAnimationFrame(this.render);
    }
    stop(){
        this.running = false;
        window.cancelAnimationFrame(this.animation_frame_request);
    }
}