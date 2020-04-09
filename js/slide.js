export default class Slide {
  constructor(slide, wrapper){
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.distancia = { finalPosition: 0, startX: 0,movement: 0 }
  }

  moveSlide(distanciaX) {
    this.distancia.movePosition = distanciaX;
    this.slide.style.transform = `translate3d(${distanciaX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.distancia.movement = (this.distancia.startX - clientX) * 1.6;
    return this.distancia.finalPosition - this.distancia.movement;
  }

  onStart(event) {
    event.preventDefault();
    this.distancia.startX = event.clientX;
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.wrapper.removeEventListener('mousemove', this.onMove);
    this.distancia.finalPosition = this.distancia.movePosition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);

  }

  binEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.binEvents();
    this.addSlideEvents();
    return this;
  }
}