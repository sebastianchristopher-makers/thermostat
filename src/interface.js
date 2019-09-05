$(document).ready(function(){
  // persistence handlers
  function setSessionTemperature(temperature){
    $.post('/sessions', { temperature: temperature } );
  }
  function setSessionCity(city){
    $.post('/sessions', { city: city } );
  }
  function setSessionPowerSavingMode(powerSavingMode){
    $.post('/sessions', { powerSavingMode: powerSavingMode } );
  }

  // api handlers
  function getTemp(city) {
    let appID = '3ef30ee42752f76b1aaba43f31fbb4fb'
    let url = 'http://api.openweathermap.org/data/2.5/'
    let units = 'metric'
    $.get(url + 'weather?q=' + city + '&APPID=' + appID + '&units=' + units)
      .done(function(response) {
        $('#city').text(response.name + ', ' + response.sys.country);
        $('#city-temp').text(response.main.temp);
        setSessionCity(response.name);
      })
      .fail(function(xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText + "\nThe city (" + city + ") you entered was not found."
        alert('Error - ' + errorMessage);
      })
  }

  function getMap(city) {
    $.getJSON('/sessions',function(data) {
      let mapKey = data.mapsKey;
      $("#map").attr("src", 'https://www.google.com/maps/embed/v1/search?q=' + city + '&key=' + mapKey);
    })
  }

  // css handlers
  function powerSavingModeText() {
    if(thermostat.powerSavingMode === true) {
      return 'on';
    } else {
      return 'off';
    }
  }

  function powerSavingCSS() {
    $('.usage').text('Current energy usage: ' + thermostat.energyUsage());
    if(thermostat.energyUsage() === 'low') {
      $('.usage').css('background', 'green');
      $('.usage').css('color', 'black');
    }
    if(thermostat.energyUsage() === 'medium') {
      $('.usage').css('background', 'black');
      $('.usage').css('color', 'white');
    }
    if(thermostat.energyUsage() === 'high') {
      $('.usage').css('background', 'red');
      $('.usage').css('color', 'black');
    }
  }

  // button handlers
  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#user-city').val();
    getTemp(city);
    getMap(city);
  })

  $('#up').click(function(){
    try{
      thermostat.up();
      setSessionTemperature(thermostat.getCurrentTemperature());
      powerSavingCSS();
      $('#temperature').text(thermostat.getCurrentTemperature());
    }
    catch(err){
      alert(err.toString());
    }
 });

  $('#down').click(function(){
    try{
      thermostat.down();
      setSessionTemperature(thermostat.getCurrentTemperature());
      powerSavingCSS();
      $('#temperature').text(thermostat.getCurrentTemperature());
    }
    catch(err){
      alert(err.toString());
    }
 });

  $('#reset').click(function(){
    thermostat.reset();
    setSessionTemperature(thermostat.getCurrentTemperature());
    powerSavingCSS();
    $('#temperature').text(thermostat.getCurrentTemperature());
 });

  $('#switch-power-saving-mode').click(function(){
    thermostat.switchPowerSavingMode();
    setSessionPowerSavingMode(thermostat.powerSavingMode);
    $('#power-saving-status').text(powerSavingModeText());
    powerSavingCSS();
    $('#temperature').text(thermostat.getCurrentTemperature());
 });

 // run on load
 let thermostat = new Thermostat();

 $.getJSON('/sessions', function (response){
   let sessionTemperature = parseInt(response.temperature) || thermostat.getCurrentTemperature();
   if(sessionTemperature !== null){
     thermostat.setCurrentTemperature(sessionTemperature);
   }
   let sessionPowerSavingMode = response.powerSavingMode;
   if(sessionPowerSavingMode !== null){
     thermostat.powerSavingMode = (sessionPowerSavingMode == 'true');
   }
   $('#temperature').text(thermostat.getCurrentTemperature());
   $('#power-saving-status').text(powerSavingModeText());
   powerSavingCSS();
 })

 $.getJSON('/sessions',function(response){
   let city = response.city
   if(city === null){
     getTemp(geoplugin_city());
     getMap(geoplugin_city());
   } else {
     getTemp(city);
     getMap(city);
   }
 })
});
