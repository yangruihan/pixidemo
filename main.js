// Create a  Pixi Application
let app = new PIXI.Application({
    width: 400, 
    height: 300,
    antialias: true,
    transparent: false,
    resolution: 1,
});

app.renderer.backgroundColor = 0xff0000;

// fullscreen set
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

console.log(app.renderer.view.width);
console.log(app.renderer.view.height);

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);