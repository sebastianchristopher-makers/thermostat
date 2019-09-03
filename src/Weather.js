class Weather {
  constructor() {
    this.weatherRating = Math.floor(Math.random() * 10);
  }
  isStormy() {
    return this.weatherRating >= 9;
  }
}
