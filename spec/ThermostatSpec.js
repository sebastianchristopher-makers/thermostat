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
    expect(() => {thermostat.down()}).toThrow('Thermostat is at its minimum temperature.');
  });
  it('power saving mode is on by default', function() {
    expect(thermostat.powerSavingMode).toBe(true);
  });
  it('if power saving mode is on, the maximum temperature is 25', function() {
    for(let i = 20; i < 25; i++) {
      thermostat.up();
    }
    expect(() => {thermostat.up()}).toThrow('Thermostat is at its maximum temperature.');
  });
  it('if power saving mode is off, the maximum temperature is 32', function() {
    thermostat.turnPowerSavingOff();
    for(let i = 20; i < 32; i++) {
      thermostat.up();
    }
    expect(() => {thermostat.up()}).toThrow('Thermostat is at its maximum temperature.');
  })
});
