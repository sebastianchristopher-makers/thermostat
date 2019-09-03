describe('Thermostat', function() {
  beforeEach(function() {
    thermostat = new Thermostat()
  })
  it('starts at 20 degrees', function() {
    expect(thermostat.temperature).toEqual(20);
  });
  it('you can increase the temperature', function() {
    thermostat.up();
    expect(thermostat.temperature).toEqual(21);
  })
  it('you can decrease the temperature', function() {
    thermostat.down();
    expect(thermostat.temperature).toEqual(19);
  })
  it('the minimum temperature is 10', function() {
    for(let i = 20; i > 10; i--) {
      thermostat.down();
    }
    // expect(thermostat.temperature).toEqual(10);
    expect(() => {thermostat.down()}).toThrow('Thermostat is at its minimum temperature.');
  })
});
