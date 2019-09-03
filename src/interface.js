$(document).ready(function(){
  let thermostat = new Thermostat();

  function powerSavingText() {
    if(thermostat.powerSavingMode === true) {
      return 'on';
    } else {
      return 'off';
    }
  }

  function powerSavingText() {
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
    thermostat.up();
    powerSavingText();
    $('#temperature').text(thermostat.temperature);
 });

  $('#down').click(function(){
    thermostat.down();
    powerSavingText();
    $('#temperature').text(thermostat.temperature);
 });

  $('#reset').click(function(){
    powerSavingText();
    thermostat.reset();
    $('#temperature').text(thermostat.temperature);
 });

  $('#power-saving-on').click(function(){
    thermostat.turnPowerSavingOn();
    $('#power-saving-status').text(powerSavingText());
 });

  $('#power-saving-off').click(function(){
    thermostat.turnPowerSavingOff();
    $('#power-saving-status').text(powerSavingText());
 });
});
