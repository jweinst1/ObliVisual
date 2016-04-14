/**
 * Created by Josh on 4/14/16.
 */
var canvasobj = function(name) {
    this.canvas = document.getElementById(name);
    this.context = this.canvas.getContext("2d");
};

document = "test.html";

var canvas = document.createElement('canvas');
canvas.id = "mycanvas";
canvas.width  = 300;
canvas.height = 300;
canvas.style.zIndex   = 8;
canvas.style.position = "absolute";
canvas.style.border   = "1px solid";
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");
ctx.lineWidth = 5;
ctx.beginPath();
ctx.strokeStyle = "#FF0000";
for(var pos = 0;pos<200;pos+=5) ctx.lineTo(pos,pos);
ctx.stroke();