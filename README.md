# Thermostat

Working from [this repo](https://github.com/makersacademy/course/tree/master/thermostat)

```
* Thermostat starts at 20 degrees ✅
* You can increase the temperature with an up function ✅
* You can decrease the temperature with a down function ✅
* The minimum temperature is 10 degrees ✅
* Power saving mode is on by default ✅
* If power saving mode is on, the maximum temperature is 25 degrees ✅
* If power saving mode is off, the maximum temperature is 32 degrees ✅
* You can reset the temperature to 20 with a reset function ✅
* You can ask about the thermostat's current energy usage: < 18 is low-usage, < 25 is medium-usage, anything else is high-usage. (In the challenges where we add an interface, low-usage will be indicated with green, medium-usage indicated with black, high-usage indicated with red.) ✅
```
## To use:
I have put the googlemaps API key in the APIkeys.json file - this requires running from nodeJS http-server. To use, install:
```
npm install -g http-server
```
run:
```
http-server -c-1
```
visit:
```
http://localhost:8080/index.html
```
Alternatively, hardcode the key in function getMap() (in Interface.js).

## TODO:
* Add css styling to improve user experience
* Add persistence (sessions) ✅
* Add persistence for power saving mode ✅
* Clean up and refactor
* Handle cities with ambiguous countries (e.g. Manchester) (weather API)
* Weather API and Maps API handle these differently - needs to be the same
