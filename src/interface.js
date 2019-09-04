$(document).ready(function(){

  function getTemp(city) {
    let appID = '3ef30ee42752f76b1aaba43f31fbb4fb'
    let url = 'http://api.openweathermap.org/data/2.5/'
    let units = 'metric'
    $.get(url + 'weather?q=' + city + '&APPID=' + appID + '&units=' + units)
      .done(function(response) {
        $('#city').text(response.name + ', ' + response.sys.country);
        $('#city-temp').text(response.main.temp);
      })
      .fail(function(xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText + "\nThe city (" + city + ") you entered was not found."
        alert('Error - ' + errorMessage);
      })
  }

  function getMap(city) {
    $.getJSON('APIkeys.json',function(data){
      let mapKey = data[0].mapsKey;
      $("#map").attr("src", 'https://www.google.com/maps/embed/v1/search?q=' + city + '&key=' + mapKey);
    });
  }

  getTemp(geoplugin_city());
  getMap(geoplugin_city());

  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#user-city').val();
    getTemp(city);
    getMap(city);
  })

  let thermostat = new Thermostat();
  $('#power-saving-status').text(powerSavingModeText());
  $('#temperature').text(thermostat.temperature);

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

  $('#up').click(function(){
    try{
      thermostat.up();
    }
    catch(err){
      alert(err.toString());
    }
    powerSavingCSS();
    $('#temperature').text(thermostat.temperature);
 });

  $('#down').click(function(){
    try{
      thermostat.down();
    }
    catch(err){
      alert(err.toString());
    }
    powerSavingCSS();
    $('#temperature').text(thermostat.temperature);
 });

  $('#reset').click(function(){
    thermostat.reset();
    powerSavingCSS();
    $('#temperature').text(thermostat.temperature);
 });

  $('#switch-power-saving-mode').click(function(){
    thermostat.switchPowerSavingMode();
    $('#power-saving-status').text(powerSavingModeText());
    $('#temperature').text(thermostat.temperature);
 });
});
