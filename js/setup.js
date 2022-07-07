
var game = new SIGame();
var starfield = new Starfield();
var maxGameWidth = 1024;
var minGameHeight = 600;

var start = function () {
  const gameContainerId = 'gameContainer';
  const starfieldId = 'starfield';
  const gameCanvasId = 'gameCanvas';

  const setupGameArea = () => {
    document.body.className += 'game';

    const starfield = document.createElement('div');
    starfield.id = starfieldId;
    
    const gameCanvas = document.createElement('canvas');
    gameCanvas.className += gameCanvasId;
    gameCanvas.id = gameCanvasId;
    gameCanvas.setAttribute('tabindex','0');

    const gameContainer = document.createElement('div');
    gameContainer.id = gameContainerId;
    gameContainer.appendChild(gameCanvas);
    
    document.body.appendChild(starfield);
    document.body.appendChild(gameContainer);
  }

  const launchGame = function() {
    const container = document.getElementById(starfieldId);
    starfield.initialise(container);
    starfield.start();

    const canvas = document.getElementById(gameCanvasId);
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || 
    document.body.clientWidth;
    
    const canvasWidth =
      screenWidth > maxGameWidth
        ? maxGameWidth
        : screenWidth;


    canvasHeight = canvasWidth * 0.75;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight < minGameHeight ? minGameHeight : canvasHeight;

    game.initialise(canvas);

    game.start();

    window.addEventListener("keydown", function keydown(e) {
        var keycode = e.which || window.event.keycode;
        if(keycode == 37 || keycode == 39 || keycode == 32) {
            e.preventDefault();
        }
        game.keyDown(keycode);

    });
    
    window.addEventListener("keyup", function keydown(e) {
        var keycode = e.which || window.event.keycode;
        game.keyUp(keycode);
    });

    window.addEventListener("touchstart", function (e) {
      game.touchstart(e);
    }, false);

    window.addEventListener('touchend', function(e){
      game.touchend(e);
    }, false);

    window.addEventListener('touchmove', function(e){
      game.touchmove(e);
    }, false);
  }

  const newGame = () => {
    setupGameArea();
    launchGame();
  }

  newGame();
}

start();
