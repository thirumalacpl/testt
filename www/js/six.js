$(document).on('pagecreate', '#page_five', function(){  
	assignValues();

	$(document).off('click', '#next5').on('click', '#next5', function() { 
		var allvalues =  readvalues();
		$.ajax({url: 'http://192.168.1.51/slimrestapi-dev/updatelpa.php',
			data:$('#lpaform').serialize(),
			type: 'post',                   
			async: 'true',
			crossDomain: true,
			beforeSend: function() {
			},
			complete: function() {
			},
			success: function (result) {
				console.log(result);
				alert('Data submitted succesfully');
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
});

function assignValues(){
	response1 = 	sessionStorage.getItem("user_data");	
	plant_array = 	JSON.parse(sessionStorage.getItem("plant_data"));	
	category_array = 	JSON.parse(sessionStorage.getItem("category_data"));	
	activity_array = 	JSON.parse(sessionStorage.getItem("activity_data"));	
var c=0;
for(a=0;a<category_array.length;a++){
	category_obj = category_array[a];
	activity_arr = activity_array[a];
	var cat = '<hr class="hr"><p class="cen" id="category">'+category_obj.category+'</p>';
	$('#pagination').append(cat);
	for(b=0;b<activity_arr.length;b++){

		activityobj = activity_arr[b];
		var act = '<hr><p class="cen" id="activity">'+activityobj.activity+'</p>';
		var div_val = '<div class="ui-grid-b" id="checkbox"><div class="ui-block-a flo"><label class="flo">Yes:</label><input type="checkbox" id="result_yes'+c+'" name="result_yes'+c+'"  value="yes"></div><div class="ui-block-b"><label class="flo">No:</label><input type="checkbox" id="result_no'+c+'" name="result_no'+c+'" value="no"><br></div><div class="ui-block-c flo"><label class="flo">N/A:</label ><input type="checkbox" id="result_na'+c+'" name="result_na'+c+'" value="na"><br></div></div><label id="find">Findings</label><input type="text"   id="findings'+c+'" name="findings'+c+'"/><br><label id="resp" for="responsibility'+c+'" class="select">Responsibility</label><select name="responsibility'+c+'" id="responsibility'+c+'"><option value="supervisor">Supervisor</option><option value="Manager">Manager</option><option value="GM">GM</option></select><br><label>Date</label><input type="date"   id="datepicker'+c+'" name="datepicker'+c+'"/><hr class="hr">';
		c++;
		$('#pagination').append(act+div_val);
		$('#pagination').enhanceWithin();
	}

}

}
function readvalues(){
	activity_array = 	JSON.parse(sessionStorage.getItem("activity_data"));
	category_array = 	JSON.parse(sessionStorage.getItem("category_data"));	
	var act_val="";
	for(a=0;a<category_array.length;a++){
		activity_arr = activity_array[a];
		for(b=0;b<activity_arr.length;b++){
			activityobj = activity_arr[b];
			act_val+=activityobj.activity_id+"#";
		}
	}
	userdata = JSON.parse(sessionStorage.getItem("user_data"));
	$("#activityval").val(act_val);
	$("#plant_id").val(JSON.parse(sessionStorage.getItem("plant_name")));
	$("#part_id").val(JSON.parse(sessionStorage.getItem("partno")));
	$("#shift").val(JSON.parse(sessionStorage.getItem("shift")));
	$("#user_id").val(JSON.parse(userdata.user_id));	
}