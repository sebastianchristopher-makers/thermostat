describe('Weather', function() {
  let weather;

  it('returns true if it is stormzy', function() {
    spyOn(Math, 'random').and.returnValue(10);
    weather = new Weather();
    expect(weather.isStormy()).toBe(true);
  });

  it('returns false if it is not stormzy', function() {
    spyOn(Math, 'random').and.returnValue(0.1);
    weather = new Weather();
    expect(weather.isStormy()).toBe(false);
  });

});
