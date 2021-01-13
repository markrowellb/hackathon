function genDate(){ //Generate date and time today
	var today = new Date();
	var hour = Number(today.getHours()); //get hour in military format to be converted to 12-hour format 
	var mer, new_hour = '';
	if(hour > 11){ //get hours that will be affected by the 24-hour format
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
  return ('0' + num).slice(-2); //function that add zero when for formal time formatting
}
function solveIt(){ //function to convert the input currency to desired output currency
  var curr1 = document.getElementById('curr1').value;
  var curr2 = document.getElementById('curr2').value;
  var mon1 = document.getElementById('mon_value1').value;
  mon1 = checkNum(mon1); //call this function to avoid non-numeral inputs
  document.getElementById('code1').innerHTML = curr1;
  document.getElementById('code2').innerHTML = curr2;
  fetch('https://api.exchangeratesapi.io/latest?base=' + curr1).then(response => { //syntax for api data fetching
   return response.json();
}).then(rate => {
  var convert = rate['rates'][curr2]; //get data from the api object 
  var mon2 = mon1 * Number(convert); 
  document.getElementById('mon_value2').innerHTML = mon2.toFixed(2);
  var curr_rate = '1 '+curr1+' = '+(Number(convert)).toFixed(2)+' '+curr2+'<br><span class="see_table" onclick="show_table('+"'"+curr1+"'"+')">See complete rate</span>';
  document.getElementById('curr_rate').innerHTML = curr_rate;
  document.getElementById('today').innerHTML = genDate(); //call this function to generate the current date and time
});
}   
function checkNum(x){ //function to check if the input has non-numerical character
	var bool_num = isNaN(Number(x));
	var test = document.getElementById('test');
	if(bool_num === true){ //not a number
  		var new_x = '';
      if(x.length > 1){ new_x = x.slice(0, -1); }
      new_x = new_x.replace(/[^\d.-]/g, ''); //ensure no non-numerical is added
      document.getElementById('mon_value1').value = new_x; //force the input to be a number to avoid error in calculation
      return new_x;
	}else{ return x; }
}
function show_table(currency){ //function to show the data from the api, 
	 var Ctable = ['CAD','HKD','ISK','PHP','DKK','HUF','CZK','GBP','RON','SEK','IDR','INR','BRL','RUB','HRK','JPY','THB','CHF','EUR','MYR','BGN','TRY','CNY','NOK','NZD','ZAR','USD','MXN','SGD','AUD','ILS','KRW','PLN']; //currency codes available in the api table
	 document.getElementById('baseCurr').innerHTML = '1 '+currency;
   fetch('https://api.exchangeratesapi.io/latest?base=' + currency).then(response => { //'currency' will be used as the base for api
   return response.json();
}).then(rate => {
	var CODE;
	for(var i=0; i<33; i++){
		CODE = Ctable[i]; //initialize the object
		document.getElementById('rate1').innerHTML += rate['rates'][CODE]+'<br>'; //display the rates on the HTML table
		document.getElementById('ratecode').innerHTML += CODE+'<br>';
	}
   
});
	 $("#rate_table").modal({escapeClose: false,clickClose: false, showClose: false}); //open modal
}
