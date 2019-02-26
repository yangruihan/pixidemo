// Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

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

// load an image and run the `setup` function when it's done
loader
    .add('sprites/c.png')
    .load(setup);

function setup() {
    let c = new Sprite(resources['sprites/c.png'].texture);

    c.anchor.set(0.5, 0.5);

    c.x = 200;
    c.y = 150;
    c.position.set(100, 100);
    c.width = 64;
    c.height = 64;

    c.rotation = 0.5;

    app.stage.addChild(c);
}