var currentpage=1;
var pagelimit =5;
var total = 0;
var totalpage=0;
$(document).one('pageshow', '#update_one', function(){  
	assignValues();
	$(document).off('click', '#find_update1').on('click', '#find_update1', function() { 
		$.ajax({url: 'http://staging.eimpressive.com/slimrestapi-dev/searchlpa_part.php',
			data:$('#lpa_update_form').serialize(),
			type: 'post',                   
			async: 'true',
			crossDomain: true,
			dataType: 'json',
			beforeSend: function() {
			},
			complete: function() {
			},
			success: function (result) {
				console.log('searchlpa'+result);
				if(result[0]){
					var list="";
					for(a=0;a<result[1].length;a++){
						obj = result[1][a];
						var partstr = "'"+obj.part_id+"'";
						list+='<li><a href="#" class="list" onclick="searchlpa('+partstr+')" >'+result[1][a].part_id+'</li>';
					}
					$('#part_ui_list').css({'display':''});
					$('#h3_up').css({'display':''});
					$('#part_ui_list').html(list).listview("refresh");

					$.mobile.loading().hide();
				}else {
					$('#h3_up').css({'display':'none'});
					$('#part_ui_list').css({'display':'none'});
					$('#part_ui_list').html('').listview("refresh");
					$( "#popupsearch" ).popup("open");
				}
				return false;
			},
			error: function (request,error) {
				console.log(request);
				console.log(error);           
				alert('Network error has occurred please try again!');
			}
		});
return false;
});

$(document).off('click', '#update_one_profile').on('click','#update_one_profile', function(e1){
	$.mobile.changePage("profile.html", { transition: "none", changeHash: true, reverse: false });
	return false;
});

$(document).off('click', '#update_one_logo').on('click', '#update_one_logo', function(e) { 
	$.mobile.changePage("two.html", { transition: "none", changeHash: true, reverse: false }); 												        	    return true;
});

$(document).off('click', '#update_one_create').on('click', '#update_one_create', function(e) { 
	$.mobile.changePage("three.html", { transition: "none", changeHash: true, reverse: false }); 												            return true;
});

$(document).off('click', '#update_one_signout').on('click', '#update_one_signout', function() {
	sessionStorage.clear(); 
	$.mobile.changePage("index.html", { transition: "none", changeHash: true, reverse: false }); 
	return false;
});

});
function searchlpa(part){
	$.ajax({url: 'http://staging.eimpressive.com/slimrestapi-dev/searchlpa.php?find_part='+part,
		data:$('#lpa_update_form').serialize(),
		type: 'post',                   
		async: 'true',
		crossDomain: true,
		dataType: 'json',
		beforeSend: function() {
		},
		complete: function() {
		},
		success: function (result) {
			console.log('searchlpa' +result);
			if(result[0]){
				$("#popupsearchmade").popup("open");
				sessionStorage.setItem("update_category_data",JSON.stringify(result[1]));
				sessionStorage.setItem("update_activity_data",JSON.stringify(result[2]));
				$.mobile.loading().hide();
				$.mobile.changePage("update_lpa.html",{ transition: "none", changeHash: true, reverse: false }); 
			}else {
				alert('No Data Found for the search record');	
			}

			return false;
		},
		error: function (request,error) {    
			console.log(request);
			console.log(error);  
			$("#Network").popup("open");         
			alert('Network error has occurred please try again!');
		}
	});
}
function assignValues(){
	$region = $('#region'),
	$plant = $('#find_plant'),
	$country = $('#country')
	userobject = 	JSON.parse(sessionStorage.getItem("user_data"));	
	plant_array = 	JSON.parse(sessionStorage.getItem("plant_data"));	
	$('#update_one_employee_name').text(userobject.firstname);
	$('#update_one_employee_id').text(userobject.username);
	var cont='<span class="mo" >'+userobject.firstname+'</span> <span class="mo" id="employeeid">   Id :'+userobject.firstname+'</span>';			

	plant_array.forEach(function(currentResult) {
		var currregion = currentResult.region;
		var appendFlag = false;
		$('#region option').each(function () {
			if (this.text == currregion) appendFlag = true;
		});
		if (appendFlag == false)  $region.append($('<option>', {
			value: currentResult.region, text: currentResult.region }));

	});
	$('#region').val(userobject.region).attr('selected', true);
	$('#region').selectmenu("refresh", true);

	var currentRegion = $("#region option:selected" ).val();
	var newCountryList = plant_array.filter(function(currentResult) {
		return currentResult.region === currentRegion;
	});

	newCountryList.forEach(function(currentCountry) {
		var currcountry = currentCountry.country;
		var appendFlag = false;

		$('#country option').each(function () {
			if (this.text == currcountry) appendFlag = true;
		});
		if (appendFlag == false) $country.append($('<option>', {
			value: currentCountry.country, text: currentCountry.country }));
	});
	$('#country').val(userobject.country).attr('selected', true);
	$('#country').selectmenu("refresh", true);

	var currentCountry = $("#country option:selected" ).val();
	var newPlantList = plant_array.filter(function(currentResult) {
		return currentResult.country === currentCountry;
	});
	newPlantList.forEach(function(currentPlant) {
		var currplant = currentPlant.plant_name;

		var appendFlag = false;
		$('#plant option').each(function () {
			if (this.text == currplant) appendFlag = true;
		});
		if (appendFlag == false) $plant.append($('<option>', {
			value: currentPlant.plant_id, text: currentPlant.plant_name }));
	});
	$('#find_plant').val(userobject.plant_line).attr('selected', true);
	$('#find_plant').selectmenu("refresh", true);
	$('#region').on('change', function() {
		var currentRegion = $(this).val();
		$country.empty();
		$plant.empty();
		$country.trigger("chosen:updated");
		$plant.trigger("chosen:updated");
		var newOption = $('<option>-Select Country-</option>');
		$country.append(newOption);
		$('#country-button span').empty();
		$('#country-button span').append('-Select Country-');
		var newPlant = $('<option>-Select Plant-</option>');
		$plant.append(newPlant);
		$('#find_plant-button span').empty();
		$('#find_plant-button span').append('-Select Plant-');
		var newCountryList = plant_array.filter(function(currentResult) {
			return currentResult.region === currentRegion;
		});

		newCountryList.forEach(function(currentCountry) {
			var currcountry = currentCountry.country;
			var appendFlag = false;
			$('#country option').each(function () {
				if (this.text == currcountry) appendFlag = true;
			});
			if (appendFlag == false) $country.append($('<option>', {
				value: currentCountry.country, text: currentCountry.country }));
		});
	});
$('#country').on('change', function() {
	var currentCountry = $(this).val();
	$plant.empty();
	var newOption = $('<option>-Select Plant-</option>');
	$('#find_plant-button span').empty();
	$('#find_plant-button span').append('-Select Plant-');
	$plant.append(newOption);
	var newPlantList = plant_array.filter(function(currentResult) {
		return currentResult.country === currentCountry;
	});
	newPlantList.forEach(function(currentPlant) {
		var currplant = currentPlant.plant_name;
		var appendFlag = false;
		$('#plant option').each(function () {
			if (this.text == currplant) appendFlag = true;
		});
		if (appendFlag == false) $plant.append($('<option>', {
			value: currentPlant.plant_id, text: currentPlant.plant_name }));
	});
});

$('#demo').on( "tap", function() {
			var picker = $( "input[type='text']", this );
			picker.mobipick();
			picker.on( "change", function() {
					var date = $( this ).val();
					// formatted date					
					var dateObject = $( this ).mobipick( "option", "date" );
			});
		});

}
