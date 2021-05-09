var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//console.log(c);

//c.fillRect(100, 100, 100, 100);

// Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, 2 * Math.PI, false);
// c.strokeStyle = "blue";
// c.stroke();

// for( var i = 0; i < 100; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, 2 * Math.PI, false);
//   c.strokeStyle = "blue";
//   c.stroke();
// }

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = ['#012340', '#789EBF', '#F28E13', '#F27405', '#0D0D0D'];

window.addEventListener('mousemove', function(evt) {
    mouse.x = evt.x;
    mouse.y = evt.y;
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if( this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if( this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if(this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

var circlesArray = [];

function init() {
    circlesArray = [];

    for( var i = 0; i < 2000; i++) {
        var radius = Math.random() * 8 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5); // x velocity
        var dy = (Math.random() - 0.5); // y velocity
        
        circlesArray.push(new Circle(x, y, dx, dy, radius));
    }
    
}

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    for( var i = 0; i < circlesArray.length; i++) {
        circlesArray[i].update();
    }
    
}

animate();
init();