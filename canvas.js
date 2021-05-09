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

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.strokeStyle = "blue";
        c.stroke();
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

        this.draw();
    }
}

var circlesArray = [];

for( var i = 0; i < 100; i++) {
    var radius = 30;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5); // x velocity
    var dy = (Math.random() - 0.5); // y velocity
    
    circlesArray.push(new Circle(x, y, dx, dy, radius));
}

//console.log(circlesArray);

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    for( var i = 0; i < circlesArray.length; i++) {
        circlesArray[i].update();
    }
    
}

animate();