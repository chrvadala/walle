"use strict";

var Vertex = function (paper, x, y) {

  this.paper = paper;
  this.x = x;
  this.y = y;

  this.attachedElements = new Set();

  this.events = new Events();

  let circle = this.circle = paper.circle(x, y, 4).addClass('vertex');

};

Vertex.prototype.setId = function(id){
  this.id = id;
  this.circle.attr({id: this.id});
};

Vertex.prototype.move = function (x, y) {
  this.x = x;
  this.y = y;
  this.circle.attr({cx: x, cy: y});
  this.events.dispatchEvent("move", x, y);
};

Vertex.prototype.selected = function (isSelected) {
  if(isSelected)
    this.circle.addClass('selected');
  else
    this.circle.removeClass('selected');
};

Vertex.prototype.hovered = function (isHovered) {
  if(isHovered)
    this.circle.addClass('hover');
  else
    this.circle.removeClass('hover');
};

Vertex.prototype.redraw = function () {
  let attr = this.circle.attr();
  this.circle.remove();

  let circle = this.paper.circle();
  circle.attr(attr);
  this.circle = circle;
};

Vertex.prototype.remove = function () {
  this.circle.remove();
};

Vertex.prototype.toJson = function () {
  return {
    type: "vertex",
    x: this.x,
    y: this.y
  };
};

Vertex.prototype.merge = function(vertex){
  //add vertex listener to this
};

Vertex.prototype.drag = function(onStart, onMove, onEnd){
  this.circle.drag(onMove, onStart, onEnd);
};

Vertex.prototype.undrag = function(){
  this.circle.undrag();
};

Vertex.prototype.onMove = function(handler){
  this.events.addEventListener('move', handler);
};

Vertex.prototype.offMove = function(handler){
  this.events.removeEventListener('move', handler);
};

Vertex.prototype.distanceFromPoint = function(x, y){
  return Utils.twoPointsDistance(this.x, this.y, x, y);
};

Vertex.isVertex = function(vertex){
  return (vertex instanceof Vertex);
};

Vertex.prototype.addAttachedElement = function(element){
  this.attachedElements.add(element);
};

Vertex.prototype.removeAttachedElement = function(element){
  this.attachedElements.delete(element);
};
