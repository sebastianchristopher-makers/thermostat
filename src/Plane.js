class Plane {
  constructor() {
    this.flying = true;
  }
  isFlying() {
    return this.flying;
  }
  land() {
    this.flying = false;
  }
  takeOff() {
    this.flying = true;
  }
}
