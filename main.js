// Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

// Create a  Pixi Application
let app = new PIXI.Application({
    width: 400, 
    height: 300,
    antialias: true,
    transparent: false,
    resolution: 1,
});

// fullscreen set
// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "block";
// app.renderer.autoResize = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);

console.log(app.renderer.view.width);
console.log(app.renderer.view.height);

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let state = play;

// load an image and run the `setup` function when it's done
loader
    .add('sprites/c.png')
    .load(setup);

let player;

function setup() {
    initPlayer();

    app.ticker.add(deltaTime => gameLoop(deltaTime));
}

function initPlayer() {
    player = new Sprite(resources['sprites/c.png'].texture);

    player.anchor.set(0.5, 0.5);

    player.x = 200;
    player.y = 150;
    player.position.set(100, 100);
    player.width = 64;
    player.height = 64;

    // player.rotation = 0.5;

    app.stage.addChild(player);

    player.vx = 0;
    player.vy = 0;

    let left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");

    left.press = () => {
        player.vx = -1;
    };

    left.release = () => {
        if (right.isDown)
            player.vx = 1;
        else
            player.vx = 0;
    };

    right.press = () => {
        player.vx = 1;
    };

    right.release = () => {
        if (left.isDown)
            player.vx = -1;
        else
            player.vx = 0;
    };

    up.press = () => {
        player.vy = -1;
    };

    up.release = () => {
        if (down.isDown)
            player.vy = 1;
        else
            player.vy = 0;
    };

    down.press = () => {
        player.vy = 1;
    };

    down.release = () => {
        if (up.isDown)
            player.vy = -1;
        else
            player.vy = 0;
    };
}

function gameLoop(deltaTime) {
    state(deltaTime);
}

function play(deltaTime) {
    player.x += deltaTime * player.vx;
    player.y += deltaTime * player.vy;
}

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = event => {
        if (event.key == key.value) {
            if (key.isUp && key.press)
                key.press();
            
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    key.upHandler = event => {
        if (event.key == key.value) {
            if (key.isDown && key.release)
                key.release();

            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
        "keydown",
        downListener,
        false);
    window.addEventListener(
        "keyup",
        upListener,
        false);

    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}