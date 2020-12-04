(() => {

    // Canvas size
    const world_width = 800;
    const world_height = 600;

    var display = document.getElementById('canvas').getContext('2d');
    let engine = new Engine(update, render, 1000/25);

    // Setting the background
    let background = [2];
    background[0] = new Background(0, 0, world_width, world_height, '/img/background.jpg', display);
    background[1] = new Background(2200, 0, world_width, world_height, '/img/background.jpg', display);

    // Setting controller
    let controller = new Controller();

    // Setting player
    let player = new Player(0, 300, 256, 67, '/img/player.png', display);
    let shot = [];
    let explosion = [];

    // Setting buddy
    let buddy = new Buddy(0, world_height - 140, 75, 96.428, '/img/soldier.png', display);

    //Setting the enemies
    let enemies = [2];
    enemies[0] = new Enemy(world_width, 350, 256, 67, '/img/enemy_helicopter.png', display, 5, true);
    
    enemies[1] = new Enemy(world_width, world_height - 150, 165, 70, '/img/enemy_truck.png', display, 5, false);

    

    // All that happens in the game
    function update(){

        if(controller.up){player.moveUp();};
        if(controller.down){player.moveDown();};
        if(controller.shoot){player.isFiring = true;};

        background[0].move();
        background[1].move();

        buddy.changeSprite();
        if(buddy.state == "running" || buddy.endFrame == true){
            buddy.move();
        }

        enemies[0].changeSprite();
        enemies[0].move();
        enemies[1].move();

        for(let i = 0; i <= explosion.length; i++){
            if(explosion[i] != undefined){
                if(explosion[i].frameY < 6 && explosion[i].frameX < 8){
                    explosion[i].changeSprite();
                }else{ explosion[i] = undefined; };
            }
        }

        for(let i = 0; i <= shot.length; i++){
            if(shot[i] != undefined){
                if(shot[i].x < world_width && shot[i].hit == false){
                    shot[i].changeSprite();
                    shot[i].move();
                }else{ shot[i] = undefined; };
            }
        }
        collision();
        hit();
        ranOver();
    }

    // All that appears on the screen
    function render(){
        

        display.fillStyle = '#303840';
        display.fillRect(0, 0, world_width, world_height);

        // Background
        background[0].draw();
        background[1].draw();
        
        // Player
        player.draw();

        // Buddy
        buddy.draw();

        // Enemies
        enemies[0].draw();
        enemies[1].draw();

        if(explosion[0] == undefined && player.blowingUp == true){
            explosion.push(player.destroyed());
            player.blowingUp = false;

            for(let i = 0; i < enemies.length; i++){
                if(enemies[i].blowingUp == true){
                    enemies[i].blowingUp= false
                }
            }
        }

        for(let i = 0; i < enemies.length; i++){
            if(explosion[0] == undefined && enemies[i].blowingUp == true){
                explosion.push(enemies[i].destroyed());
            }
        }

        for(let i = 0; i < explosion.length; i++){
            if(explosion[i] != undefined){
                explosion[i].draw();
            } else {
                explosion.splice(i, 1)
            }
        }

        //sadasdasdaddsadsda

        if(shot[0] == undefined && controller.shoot){
            shot.push(player.shoot());
        } 
        // else if(shot[0] != undefined  && controller.shoot){
            
        //     // setTimeout(function(){shot.push(player.shoot())}, 1000);
        //     // shot.push(player.shoot());
        //     // player.isFiring = false;
        // } 
        if(shot[0] != undefined && controller.shoot){
            if(shot[shot.length - 1].x > shot[shot.length - 1].initialX + 250){
                shot.push(player.shoot());
            }
        }
        
        //sdasdadasdasdasda

        for(let i = 0; i < shot.length; i++){
            if(shot[i] != undefined){
                shot[i].draw();
            } else {
                shot.splice(i, 1)
            }
        }
    }

    display.canvas.width = world_width;
    display.canvas.height = world_height;

    // Collisions
    function collision(){
        for(let i = 0; i < enemies.length; i++){
            if(player.x + 80 < enemies[i].x + enemies[i].width &&
                player.x + player.width > enemies[i].x + 80 &&
                player.y < enemies[i].y + enemies[i].height &&
                player.y + player.height > enemies[i].y){
                enemies[i].blowingUp = true;
                if(explosion[i] == undefined){
                    player.blowingUp = true;
                    enemies[i].blowingUp = true;
                }
            }
        }
    }

    function hit(){
        for(let i = 0; i < enemies.length; i++){
            for(let j = 0; j < shot.length; j++){
                if(shot[j] != undefined){
                    if(shot[j].x + 80 < enemies[i].x + enemies[i].width &&
                        shot[j].x + shot[j].width > enemies[i].x + 80 &&
                        shot[j].y < enemies[i].y + enemies[i].height &&
                        shot[j].y + shot[j].height > enemies[i].y){
                        enemies[i].blowingUp = true;
                        shot[j].hit = true;
                    }
                }
            }  
        }
    }

    function ranOver(){
        for(let i = 0; i < enemies.length; i++){
            if(buddy.state == 'running'){
                if(buddy.x < enemies[i].x + enemies[i].width &&
                    buddy.x + buddy.width > enemies[i].x &&
                    buddy.y < enemies[i].y + enemies[i].height &&
                    buddy.y + buddy.height > enemies[i].y){
                        buddy.state = "die";
                        buddy.frameX = 0;
                        buddy.frameY = 5;
                }
            }
        }
    }


    // Start the game
    engine.run();
    engine.start();

    function keyDownUp(event){
        var state = event.type == 'keydown';
        teste = state;
        switch(event.key){
            case "ArrowUp", "w": if(state != controller.up && engine.running){
                controller.up = state;
                controller.active = state;
            };
            break;

            case "ArrowDown", "s": if(state != controller.down && engine.running){
                controller.down = state;
                controller.active = state;
            };
            break;

            case "Space", "e": if(state != controller.shoot && engine.running){
                controller.shoot = state;
                controller.active = state;
            };
            break;

            case "p": if(state != controller.pause){
                controller.pause = state;
                controller.active = state;
            };
        }
        if(controller.pause == true && controller.active){
            controller.active = false;
            if(engine.running){
                engine.stop();
            }else{ engine.run(); engine.start(); }
        }
    }
    window.addEventListener('keyup', keyDownUp);
    window.addEventListener('keydown', keyDownUp);
})();


