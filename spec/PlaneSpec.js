describe('Plane', function() {
  let plane;

  beforeEach(function() {
    plane = new Plane();
  });

  it('can fly', function() {
    expect(plane.isFlying()).toBe(true);
  });

  it('can be not flying/it can land', function() {
    plane.land();
    expect(plane.isFlying()).toBe(false);
  });

  it('can take off', function() {
    plane.land();
    plane.takeOff();
    expect(plane.isFlying()).toBe(true);
  });

  it('if it is flying and lands, it is no longer flying', function() {
    expect(plane.isFlying()).toBe(true);
    plane.land();
    expect(plane.isFlying()).toBe(false);
  });

  it('if it is not flying and takes off, it is now flying', function() {
    plane.land();
    expect(plane.isFlying()).toBe(false);
    plane.takeOff();
    expect(plane.isFlying()).toBe(true);
  });

});
