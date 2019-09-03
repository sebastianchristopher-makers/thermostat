const DEFAULTCAPACITY = 10

class Airport {
  constructor(capacity = DEFAULTCAPACITY) {
    this.capacity = capacity;
    this.planes = [];
  }
  instructPlaneToLand(plane, weather) {
    if(plane.isFlying() === false) {
      throw 'This plane is not in flight!';
    }
    if(this.planes.length === this.capacity){
      throw 'Cannot land - airport is full!';
    }
    if(weather.isStormy()) {
      throw 'Cannot land - severe weather warning!';
    }
    plane.land();
    this.planes.push(plane);
  }
  instructPlaneToTakeOff(plane, weather) {
    if(!this.planes.includes(plane)) {
      throw 'This plane is not in your airport!';
    }
    if(weather.isStormy()){
      throw 'Cannot take off - severe weather warning!';
    }
    plane.takeOff();
    this.planes.splice(this.planes.indexOf(plane),1);
  }
  inAirport(plane) {
    this.planes.includes(plane);
  }
}
