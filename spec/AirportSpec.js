describe('Airport', function() {
  let airport;
  let plane;
  let weather;

  beforeEach(function() {
    airport = new Airport();
    plane = jasmine.createSpyObj('plane', ['isFlying','land','takeOff']);
    plane.land.and.callFake(function() {});
    plane.isFlying.and.callFake(function() {
      return true;
    });
    weather = jasmine.createSpyObj('weather', ['isStormy']);
  });

  describe('airport capcity', function() {
    beforeEach(function() {
      weather.isStormy.and.callFake(function() {
        return false;
      });
    });
    it('airport has a default capacity', function() {
      for(let i = 1; i <= airport.capacity; i++) {
        airport.instructPlaneToLand(plane, weather);
      }
      expect(() => {airport.instructPlaneToLand(plane, weather)}).toThrow('Cannot land - airport is full!');
    });
    it('has a variable capacity', function() {
      biggerAirport = new Airport(25);
      for(let i = 1; i <= 25; i++) {
        biggerAirport.instructPlaneToLand(plane, weather);
      }
      expect(() => {biggerAirport.instructPlaneToLand(plane, weather)}).toThrow('Cannot land - airport is full!');
    });
  });
  describe('when weather is stormy', function() {
    it('can prevent landing when stormy', function() {
      weather.isStormy.and.callFake(function() {
        return true;
      });
      expect(() => {airport.instructPlaneToLand(plane, weather)}).toThrow('Cannot land - severe weather warning!');
      expect(airport.planes).not.toContain(plane);
    });
    it('can prevent planes from taking off when stormy', function() {
      weather.isStormy.and.callFake(function() {
        return false;
      });
      airport.instructPlaneToLand(plane, weather);
      weather.isStormy.and.callFake(function() {
        return true;
      });
      expect(() => {airport.instructPlaneToTakeOff(plane, weather)}).toThrow('Cannot take off - severe weather warning!');
      expect(airport.planes).toContain(plane);
    })
  });
  describe('when weather is not stormy', function() {
    beforeEach(function() {
      weather.isStormy.and.callFake(function() {
        return false;
      });
    });
    describe('when plane is flying', function() {
      it('can instruct planes to land', function() {
        airport.instructPlaneToLand(plane, weather);
        expect(airport.planes).toContain(plane);
      });
      it('can prevent landing when full', function() {
        let fullAirport = new Airport(0);
        expect(() => {fullAirport.instructPlaneToLand(plane, weather)}).toThrow('Cannot land - airport is full!');
      });
      it('can confirm a plane is or isn\'t in the airport', function() {
        expect(airport.inAirport(plane)).not.toBe(true);
        airport.instructPlaneToLand(plane, weather);
        expect(airport.inAirport(plane)).not.toBe(false);
      });
      it('a plane that\'s flying can\'t take off', function() {
        expect(() => {airport.instructPlaneToTakeOff(plane, weather)}).toThrow('This plane is not in your airport!');
      });
      it('a plane lands when it enters the airport', function() {
        airport.instructPlaneToLand(plane, weather);
        expect(plane.land).toHaveBeenCalled();
      });
    });
    describe('when plane is not flying', function() {
      beforeEach(function() {
        airport.instructPlaneToLand(plane, weather);
        plane.takeOff.and.callFake(function() {});
      });
      it('can instruct planes to take off', function() {
        expect(airport.planes).toContain(plane);
        airport.instructPlaneToTakeOff(plane, weather);
        expect(airport.planes).not.toContain(plane);
      });
      it('a plane can\'t land if it\'s already at an airport', function() {
        airport2 = new Airport();
        plane.isFlying.and.callFake(function() {
          return false;
        });
        expect(airport.planes).toContain(plane);
        expect(() => {airport2.instructPlaneToLand(plane, weather)}).toThrow('This plane is not in flight!');
        expect(airport2.planes).not.toContain(plane);
      });
      it('a plane can\'t land if it\'s not flying', function() {
        plane.isFlying.and.callFake(function() {
          return false;
        });
        expect(() => {airport.instructPlaneToLand(plane, weather)}).toThrow('This plane is not in flight!');
      });
      it('a plane can only take off from an airport it is in', function() {
        airport2 = new Airport();
        expect(() => {airport2.instructPlaneToTakeOff(plane, weather)}).toThrow('This plane is not in your airport!');
        expect(airport.planes).toContain(plane);
      });
      it('a plane takes off when it leaves the airport', function() {
        airport.instructPlaneToTakeOff(plane, weather);
        expect(plane.takeOff).toHaveBeenCalled();
      });
    });
  });
});
