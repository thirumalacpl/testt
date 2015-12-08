var currentpage=1;
var pagelimit =6;
var total = 0;
var totalpage=0;
$(document).one('pagecreate', '#page_five', function(){  
	assignValues();
	$(".ui-content").css('margin-bottom', $('#footer').height());
	$(document).off('click', '#lpa_create').on('click', '#lpa_create', function() { 
		var allvalues =  readvalues();
		$.ajax({url: 'http://staging.eimpressive.com/slimrestapi-dev/createlpa.php',
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
$('#basic').popup('open'); 
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
/*	$( "#tw" ).bind({popupafterclose: function(event, ui) { 
$.mobile.changePage("two.html", { transition: "none", changeHash: true, reverse: false });
return false;						
}

});*/

/*$(document).off('click', '#tw').on('click', '#tw', function(e) { 
	$.mobile.changePage("two.html", { transition: "none", changeHash: true, reverse: false }); 												           
 return true;
});
*/
$(document).off('click', '#page_five_profile').on('click','#page_five_profile',function(){
$.mobile.changePage("profile.html", { transition: "none", changeHash: false, reverse: false });
return false;
});
	$(document).off('click', '#prev1').on('click', '#prev1', function() { 

		pagination1();
	});

	$(document).off('click', '#next6').on('click', '#next6', function() { 

		pagination2();
	});



	$(document).off('click', '#five_signout').on('click', '#five_signout', function() {
		sessionStorage.clear(); 
$.mobile.changePage("index.html", { transition: "none", changeHash: true, reverse: false }); 
return false;
});

	$('.demo').on( "tap", function() {
			var picker = $( "input[type='text']", this );
			picker.mobipick();
			picker.on( "change", function() {
					var date = $( this ).val();

					// formatted date					
					var dateObject = $( this ).mobipick( "option", "date" );
			});
		});

});


$(document).off('click', '#tw').on('click', '#tw', function(e) { 
	$.mobile.changePage("two.html", { transition: "none", changeHash: true, reverse: false }); 												           
 return false;
});
$(document).off('click', '#five_logo').on('click', '#five_logo', function(e) { 
	$.mobile.changePage("two.html", { transition: "none", changeHash: true, reverse: false }); 												           
 return true;
});

$(document).off('click', '#page_five_create').on('click', '#page_five_create', function(e) { 
	$.mobile.changePage("three.html", { transition: "none", changeHash: true, reverse: false }); 												            
	return true;
});


$(document).off('click', '#page_five_update').on('click', '#page_five_update', function(e) { 
	$.mobile.changePage("update_one.html", { transition: "none", changeHash: true, reverse: false }); 												            
	return true;
});

function assignValues(){
	userobject = 	JSON.parse(sessionStorage.getItem("user_data"));	

	$('#emplyee_name_five').text(userobject.firstname);
	$('#emplyee_id_five').text(userobject.username);

	plant_array = 	JSON.parse(sessionStorage.getItem("plant_data"));	
	category_array = 	JSON.parse(sessionStorage.getItem("category_data"));	
	activity_array = 	JSON.parse(sessionStorage.getItem("activity_data"));	
var c=0;
for(a=0;a<category_array.length;a++){
	category_obj = category_array[a];
	activity_arr = activity_array[a];
	var cat = '<p class="cen1" id="category'+c+'">'+category_obj.category+'</p>';
	$('#pagination').append(cat);
	for(b=0;b<activity_arr.length;b++){
activityobj = activity_arr[b];
var act = '<hr id="hr'+c+'"><p class="cen2" id="activity'+c+'">'+activityobj.activity+'</p> ';
var div_val = '<div class="ui-grid-c vgb" id="checkbox'+c+'"><div class="ui-block-a "><div class="ui-grid-a"><div class="ui-block-a"><label class="flo"> Yes:</label></div><div class="ui-block-b"><input type="radio" id="result_yes'+c+'" name="result_yes'+c+'"  value="yes" ></div></div></div><div class="ui-block-b"><div class="ui-grid-a"><div class="ui-block-a"><label class="flo">No:</label></div>  <div class="ui-block-b"><input type="radio" id="result_yes'+c+'" name="result_yes'+c+'" value="no" class="marl"><br id="result_no_br'+c+'"></div></div></div><div class="ui-block-c "><div class="ui-grid-a"><div class="ui-block-a"><label class="flo">N|A:</label ></div><div class="ui-block-b"><input type="radio" id="result_yes'+c+'" name="result_yes'+c+'" value="na" checked></div></div></div><div class="ui-block-d radp"><a href="#" class="ui-btn pls ui-shadow ui-corner-all ui-icon-plus ui-btn-icon-notext"  id="add'+c+'" onclick="showfields('+c+');">Add</a><a href="#" id="minus'+c+'" class="ui-btn pls ui-shadow ui-corner-all ui-icon-minus ui-btn-icon-notext" style="display:none" onclick="hidefields('+c+');" >Minus</a><br id="result_na_br'+c+'" style="display:none;"></div></div><div class="paf"><input type="text"   id="findings'+c+'" name="findings'+c+'" placeholder="Findings" class="dar" style="display:none;"><select name="responsibility'+c+'" id="responsibility'+c+'" onchange="enabledate('+c+');" ><option value="0">Choose Responsibility</option><option value="supervisor">Supervisor</option><option value="Manager">Manager</option><option value="GM">GM</option></select><div class="demo"><input type="text"  id="datepicker'+c+'" class="dar" placeholder="Date" name="datepicker'+c+'" /></div></div>';
c++;
$('#pagination').append(act+div_val);
$('#pagination').enhanceWithin();
}
}
total = c;

if((total+1)%6>0){
	totalpage = Math.floor((total+1)/6)+1;
}else {
	totalpage = Math.floor((total+1)/6);
}
hidestyle(0,total);
applystyle(0,4);
hidefield();
disablebutton($("#prev1"),'',$("#lpa_create"));
}
function enabledate(c)
{
	if($('#responsibility'+c).val()!="0"){

$('#datepicker'+c).removeAttr('disabled');	
$('#datepicker'+c).parent().removeClass('ui-state-disabled');	

}else {
	$('#datepicker'+c).attr('disabled','disabled');
	$('#datepicker'+c).parent().addClass('ui-state-disabled');	
}
}
function showfields(rowid){
	$('#result_na_br'+rowid).css({'display':''});				
	$('#findings'+rowid).css({'display':''});
	$('#responsibility'+rowid+'-button').css({'display':''});
	$('#responsibility'+rowid).css({'display':''});
	$('#datepicker'+rowid).css({'display':''});
	$('#add'+rowid).css({'display':'none'});
	$('#minus'+rowid).css({'display':''});				

}
function hidefields(rowid){
	$('#result_na_br'+rowid).css({'display':'none'});				
	$('#findings'+rowid).css({'display':'none'});
	$('#responsibility'+rowid+'-button').css({'display':'none'});
	$('#responsibility'+rowid).css({'display':'none'});
	$('#datepicker'+rowid).css({'display':'none'});
	$('#add'+rowid).css({'display':''});
	$('#minus'+rowid).css({'display':'none'});				

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
$("#region").val(JSON.parse(sessionStorage.getItem("region")));
$("#country").val(JSON.parse(sessionStorage.getItem("country")));
$("#plant_id").val(JSON.parse(sessionStorage.getItem("plant_name")));
$("#part_id").val(JSON.parse(sessionStorage.getItem("partno")));
$("#shift").val(JSON.parse(sessionStorage.getItem("shift")));
$("#user_id").val(JSON.parse(userdata.user_id));

}
function hidefield(){
	for(a=0;a<6;a++){
		$('#findings'+a).css({'display':'none'});
		$('#responsibility'+a+'-button').css({'display':'none'});
		$('#responsibility'+a).css({'display':'none'});
		$('#datepicker'+a).css({'display':'none'});				
		$('#result_na_br'+a).css({'display':'none'});				
	}
}
function hidestyle(start,end){
	for(d=start;d<=end;d++){
		$('#category'+d).css({'display':'none'});
		$('#activity'+d).css({'display':'none'});
		$('#checkbox'+d).css({'display':'none'});
		$('#result_no_br'+d).css({'display':'none'});
		$('#result_na_br'+d).css({'display':'none'});				
		$('#findings'+d).css({'display':'none'});
		$('#hr'+d).css({'display':'none'});
$('#responsibility'+d+'-button').css({'display':'none'});
$('#datepicker'+d).css({'display':'none'});				
$('#act_div'+d).css({'display':'none'});	
}
}
function applystyle(start,end){
for(d=start;d<=end;d++){
	$('#category'+d).css({'display':''});
	$('#activity'+d).css({'display':''});
	$('#checkbox'+d).css({'display':''});
	$('#result_no_br'+d).css({'display':''});
	$('#hr'+d).css({'display':''});
	$('#act_div'+d).css({'display':''});	 
}
}
function pagination2(){

	if(currentpage==totalpage){
		currentpage = 1;
	}else {
		currentpage = currentpage+1;	
	}
if(currentpage>1 && currentpage<totalpage){
start = (currentpage-1)*6;
end =((currentpage)*6)-1;
enablebutton($("#prev1"),$("#next6"),'');
disablebutton('','',$("#lpa_create"));
hidestyle(0,total);
applystyle(start,end);
}else {
start = (currentpage-1)*6;
end = total;
enablebutton($("#prev1"),'',$("#lpa_create"));
disablebutton('',$("#next6"),'');
hidestyle(0,total);
applystyle(start,end);
}
}
function pagination1(){
	if(currentpage>1){
		currentpage = currentpage-1;
	}else {
		currentpage = 1;	
	}
	if(currentpage>1 && currentpage<totalpage){
start = (currentpage-1)*6;
end =((currentpage)*6)-1;
enablebutton($("#prev1"),$("#next6"),'');
disablebutton('','',$("#lpa_create"));
hidestyle(0,total);
applystyle(start,end);
}else if(currentpage<=1){
	enablebutton('',$("#next6"),'');
	disablebutton($("#prev1"),'',$("#lpa_create"));
	start=0;
	end = ((currentpage)*6)-1;
	hidestyle(0,total);
	applystyle(start,end);
}
}
function disablebutton(prev,next,lpasubmit){
	if(prev!=''){
		prev.addClass('ui-disabled');
	}
	if(next!=''){
		next.addClass('ui-disabled');
	}
	if(lpasubmit!=''){
		lpasubmit.css({'display':'none'})
	}
}
function enablebutton(prev,next,lpasubmit){
	if(prev!=''){
		prev.removeClass('ui-disabled');
	}
	if(next!=''){
		next.removeClass('ui-disabled');
		next.removeClass('ui-btn-active');

	}
	if(lpasubmit!=''){
		lpasubmit.css({'display':''})
	}

}




