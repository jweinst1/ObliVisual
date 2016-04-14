//sample js file for oblivion drawing language
var canvasobj = function(name) {
    this.canvas = document.getElementById(name);
    this.context = this.canvas.getContext("2d");
    canvasobj.prototype.drawline = function() {
        this.context.lineWidth = 5;
        this.context.beginPath();
        this.context.strokeStyle = "#FF0000";
        for(var pos = 0;pos<200;pos+=5) this.context.lineTo(pos,pos);
        this.context.stroke();
    }
};
var drawingpad = new canvasobj("mycanvas");
drawingpad.drawline();