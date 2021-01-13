function genDate(){
	var today = new Date();
  var hour = Number(today.getHours());
  var mer, new_hour = '';
  if(hour > 11){
  	if(hour != 12){ new_hour = hour - 12;}
    else { new_hour = hour; }
    mer = 'p.m.';
  }else { 
  	if(hour == 0){ new_hour = 12;}
    else{ new_hour = hour; }
  	mer = 'a.m.';  
  }
  var date_now = 'Exchange Rate was generated through <a href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" target="_blank"><i>European Central Bank last</i></a> '+(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+', at '+addZero(new_hour)+ ":" + addZero(today.getMinutes())+' '+mer;
  return date_now;
}
function addZero(num){
  return ('0' + num).slice(-2);
}
function solveIt(){
  var curr1 = document.getElementById('curr1').value;
  var curr2 = document.getElementById('curr2').value;
  var mon1 = document.getElementById('mon_value1').value;
  document.getElementById('code1').innerHTML = curr1;
  document.getElementById('code2').innerHTML = curr2;
  fetch('https://api.exchangeratesapi.io/latest?base=' + curr1).then(response => {
   return response.json();
}).then(rate => {
  var convert = rate['rates'][curr2];
  var mon2 = mon1 * Number(convert); 
  document.getElementById('mon_value2').innerHTML = mon2.toFixed(2);
  var curr_rate = '1 '+curr1+' = '+(Number(convert)).toFixed(2)+' '+curr2;
  document.getElementById('curr_rate').innerHTML = curr_rate;
  document.getElementById('today').innerHTML = genDate();
});
}   

