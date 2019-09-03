class Thermostat {
  constructor() {
    this.temperature = 20;
    this.powerSavingMode = true;
  }
  up() {
    this.temperature ++;
  }
  down() {
    if(this.temperature > 10) {
      this.temperature--;
    } else {
      throw 'Thermostat is at its minimum temperature.';
    }
  }
}
