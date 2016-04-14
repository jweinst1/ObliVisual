/**
 * Created by Josh on 4/14/16.
 */
var canvasobj = function(name) {
    this.canvas = document.getElementById(name);
    this.context = this.canvas.getContext("2d");
};