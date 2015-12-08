$(document).one('pageshow', '#profile', function(e){  

	assignProfileValues();

	/*$(document).off('click', '#profile_create').on('click','#profile_create',function(e1){
		$('#pagethree').remove();
		$('#profile').remove();
		$.mobile.changePage("three.html", { transition: "none", changeHash: true, reverse: false });							 						
		e1.stopPropagation();
		e1.preventDefault();
		return false;
	});*/

$(document).off('click', '#profile_create').on('click','#profile_create',function(){
				$.mobile.changePage("three.html", { transition: "none", changeHash: true, reverse: false });
				return false;

		});

	$(document).off('click', '#profile_update').on('click','#profile_update',function(e){
		if(!e.handled){
			$('#pagethree').remove();

			$.mobile.changePage("update_one.html", { transition: "none", changeHash: true, reverse: false });							 						e.handled=true;

		}
		return false;
	});	

	$(document).off('click', '#profile_signout').on('click', '#profile_signout', function() {
		sessionStorage.clear(); 
		$.mobile.changePage("index.html", { transition: "none", changeHash: true, reverse: false }); 
		return false;
	});	
});
$(document).off('click', '#profile_logo').on('click', '#profile_logo', function(e) { 
	$.mobile.changePage("two.html", { transition: "none", changeHash: true, reverse: false }); 
	return false;
});			
$(document).off('click', '#lpa_update_two').on('click', '#lpa_update_two', function(e) { 
if(e.handled !== true) 
{
e.handled = true;
}
$.mobile.changePage("update_one.html", { transition: "none", changeHash: true, reverse: false }); 
return false;
});
function assignProfileValues(){
userobject = 	JSON.parse(sessionStorage.getItem("user_data"));
$('#profile_employee_name').text(userobject.firstname);
$('#profile_employee_id').text(userobject.username);

$('#profile_empid').text('Employee Id    : '+userobject.username+'');
$('#profile_first_name').text("FirstName : "+userobject.firstname);
$('#profile_last_name').text("LastName   : "+userobject.lastname);
$('#profile_location').text("Location    :"+userobject.plant_name);
$('#profile_country').text("Country      :"+userobject.country);
}
