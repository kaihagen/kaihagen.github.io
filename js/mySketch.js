var spawn = []; // Array to hold Cells

function setup() {
    createCanvas(windowWidth, windowHeight).parent('intro'); // Set canvas size and attach to the intro section
    // Spawning cells
    for (var i = 0; i < 20; i++) {
        spawn[i] = new Cells();
    }
}

function draw() {
    background(255, 255, 255); // Clear background
    // Show each cell
    for (var i = 0; i < spawn.length; i++) {
        spawn[i].show();
    }
}

var speed = 0.0002; // speed
var angle = 0; // int angle
var radius = 20; // int radius
var offset = 0; // int offset
var x; // initialize x pos
var y; // initialize y pos

class Cells {
    constructor() {
        this.m = random(0, 200); // m point in bezier
        this.n = random(0, 200); // n point in bezier
        this.l = random(-50, 50); // random x locations for spawning
        this.k = random(-50, 50); // random y locations for spawning
        this.gap = random(10, 100); // gap additive
        this.radius = random(50, 150); // random radius
        this.rotate = 0.00005; // random rotate speed
        this.sproutX = random(0, width);
        this.sproutY = random(0, height);
        this.speed = 0.000000009; // random sketch rotate speed
        
        // Generate a random pastel color
        this.color = this.generatePastelColor();
    }

    generatePastelColor() {
        // Generate pastel colors
        let r = random(210, 255);
        let g = random(210, 255);
        let b = random(210, 255);
        return color(r, g, b, 98);
    }

    show() {
        angle += this.speed; // rotates the sketch
        x = cos(angle) * radius; // set x pos as circle
        y = sin(angle) * radius; // set y pos as circle

        translate(this.l, this.k); // centre the function

        push();
        translate(width / 2 + 300, height / 2); // move it so it rotates around point
        rotate(angle + this.gap); // rotates the object

        // object
        for (var i = 0; i < TWO_PI; i += TWO_PI / 15) {
            push();
            var x2 = this.m + this.gap + cos(i + offset * 2) * this.radius; // set x2 points + movement
            var y2 = this.n + this.gap + sin(i + offset * 4) * this.radius; // set y2 points + movement
            fill(this.color); // Use the stored pastel color
            stroke(0); // object prop
            strokeWeight(0.5); // object prop
            bezier(x2 + mouseX / 16, y2 + mouseY / 16, this.m + this.gap, this.n + this.gap, this.m + 40, this.n, x2 + mouseX / 16, y2 + mouseY / 16); // object
            pop();
        }
        pop();

        offset = offset + this.rotate; // whole rotation
    }
}
