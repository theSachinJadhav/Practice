var canvas = document.querySelector('canvas');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, 0.6)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.6)';
// c.fillRect(200, 200, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.6)';
// c.fillRect(100, 300, 100, 100);
// c.fillStyle = 'rgba(0, 0, 0, 0.6)';
// c.fillRect(200, 400, 100, 100);


// Line
// c.beginPath();
// c.moveTo(100, 300);
// c.lineTo(300, 100);
// c.lineTo(200, 400);
// c.strokeStyle = "red";
// c.stroke();

// arc
// for (var i = 0; i < 500; i++) {
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
// 	var r = Math.floor(Math.random() * 256);
// 	var g = Math.floor(Math.random() * 256);
// 	var b = Math.floor(Math.random() * 256);
// 	var rgb = 'rgba('+r+', '+g+', '+b+', '+0.9+')';
// 	c.beginPath();
// 	c.arc(x, y, 30, 0, Math.PI * 2, false);
// 	c.strokeStyle = rgb;
// 	c.stroke();	
// }


var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;
// var minRadius = 2;

var colorArray = [
	//kuler for colors
	'#1F9C8B',
	'#76BF72',
	'#FFDF4F',
	'#E8501F',
	'#F18125',
];


window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	console.log(mouse);	
})

window.addEventListener('resize',function(){

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

});


function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy; 
	this.radius =  radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
		this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
		this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		//interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
			if (this.radius < maxRadius){
			this.radius += 2;
			}
		}else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}


		this.draw();
	}
}



var circleArray = [];

 	for (var i = 0; i < 500; i++) {
	var radius = Math.random() * 3 + 1;
	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var dy = (Math.random() - 0.5);
	var dx = (Math.random() - 0.5);
	circleArray.push(new Circle(x, y, dx, dy, radius));
 	}



function animate() {
	requestAnimationFrame(animate);	
	c.clearRect(0, 0, innerWidth, innerHeight);
	
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
		
}
animate();