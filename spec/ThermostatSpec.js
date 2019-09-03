describe('Thermostat', function() {
  beforeEach(function() {
    thermostat = new Thermostat()
  })
  it('starts at 20 degrees', function() {
    expect(thermostat.temperature).toEqual(20);
  });
  it('you can increase the temperature', function() {
    thermostat.up()
    expect(thermostat.temperature).toEqual(21);
  })
  it('you can decrease the temperature', function() {
    thermostat.down()
    expect(thermostat.temperature).toEqual(19);
  })
});
