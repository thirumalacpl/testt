var up_currentpage=1;
var up_pagelimit =6;
var up_total = 0;
var up_totalpage=0;
$(document).one('pagecreate', '#update_lpa', function(){  
	assignValues();
	$(".ui-content").css('margin-bottom', $('#footer').height());
	$(document).off('click', '#lpa_update_btn').on('click', '#lpa_update_btn', function() { 
		readvalues();
		$.ajax({url: 'http://staging.eimpressive.com/slimrestapi-dev/updatelpa.php',
			data:$('#lpa_update_form').serialize(),
			type: 'post',                   
			async: 'true',
			crossDomain: true,
			beforeSend: function() {

			},
			complete: function() {

			},
			success: function (result) {
				console.log(result);

				$('#basica').popup('open'); 
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

	/*$( "#basica" ).bind({popupafterclose: function(event, ui) { 
$.mobile.changePage("two.html", { transition: "none", changeHash: true, reverse: false });
return false;						
}

});*/
	$(document).off('click', '#update_prev').on('click', '#update_prev', function() { 

		pagination1();
	});

	$(document).off('click', '#update_next').on('click', '#update_next', function() { 

		pagination2();
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

$(document).off('click', '#twu').on('click', '#twu', function(e) { 
	$.mobile.changePage("two.html", { transition: "none", changeHash: true, reverse: false }); 												           
 return false;
});

$(document).on('click', '#update_logo', function(e) { 
	$.mobile.changePage("two.html", { transition: "none", changeHash: true, reverse: false }); 												           
	 return true;
});

$(document).off('click', '#update_lpa_signout').on('click', '#update_lpa_signout', function() {
	sessionStorage.clear(); 
$.mobile.changePage("index.html", { transition: "none", changeHash: true, reverse: false }); 
return false;
});
function assignValues(){
	userobject = 	JSON.parse(sessionStorage.getItem("user_data"));	

	$('#emplyee_name_updatelpa').text(userobject.firstname);
	$('#emplyee_id_updatelpa').text(userobject.username);
	category_array = 	JSON.parse(sessionStorage.getItem("update_category_data"));	
	activity_array = 	JSON.parse(sessionStorage.getItem("update_activity_data"));	
	var c=0;
	var closed_datea=0;
	for(a=0;a<category_array.length;a++){
	category_obj = category_array[a];
	activity_arr = activity_array[a];
	var cat = '<p class="cen1" id="up_category'+c+'">'+category_obj.category+'</p>';
	$('#update_pagination').append(cat);
	for(b=0;b<activity_arr.length;b++){
		activityobj = activity_arr[b];
		//alert(activityobj.closed_date);
		if(activityobj.closed_date == "0000-00-00")
		{
			closed_datea="";
		}
		else{
			closed_datea=activityobj.closed_date;
		}
		//alert(closed_datea);
		var act = '<hr id="up_hr'+c+'"><p class="cen2" id="up_activity'+c+'">'+activityobj.activity+'</p> ';
		var div_val = '<div class="ui-grid-c vgb" id="up_checkbox'+c+'"><div class="ui-block-a"><div class="ui-grid-a"><div class="ui-block-a"><label class="flo">Yes:</label></div><div class="ui-block-b"><input type="radio" id="up_result_yes_a'+c+'" name="up_result_yes'+c+'"  value="yes"></div></div></div><div class="ui-block-b"><div class="ui-grid-a"><div class="ui-block-a"><label class="flo">No:</label></div><div class="ui-block-b"><input type="radio" id="up_result_yes_b'+c+'" name="up_result_yes'+c+'" value="no" class="marl"><br id="up_result_no_br'+c+'"></div></div></div><div class="ui-block-c "><div class="ui-grid-a"><div class="ui-block-a"><label class="flo">N|A:</label ></div><div class="ui-block-b"><input type="radio" id="up_result_yes_c'+c+'" name="up_result_yes'+c+'" value="na"></div></div></div><div class="ui-block-d radp"><a href="#" class="ui-btn pls ui-shadow ui-corner-all ui-icon-plus ui-btn-icon-notext"  id="up_add'+c+'" onclick="showfields('+c+');">up_add</a><a href="#" id="up_minus'+c+'" class="ui-btn pls ui-shadow ui-corner-all ui-icon-minus ui-btn-icon-notext" style="display:none" onclick="hidefields('+c+');" >up_minus</a><br id="up_up_result_na_br'+c+'" style="display:none;"></div></div><div class="paf"><input type="text"   id="up_findings'+c+'" class="dar" name="up_findings'+c+'" value="'+activityobj.findings+'" placeholder="Findings" style="display:none;"><select name="up_responsibility'+c+'" id="up_responsibility'+c+'" ><option value="0">Choose Responsibility</option><option value="supervisor">Supervisor</option><option value="Manager">Manager</option><option value="GM">GM</option></select><div class="demo"><input type="text" style="display:none;"  id="up_datepicker'+c+'" class="dar" placeholder="Date" name="up_datepicker'+c+'" value="'+closed_datea+'"/></div></div>';
		$('#update_pagination').append(act+div_val);
		$('#update_pagination').enhanceWithin();
		if(activityobj.evaluation_status == "yes")
		{
			$('#up_result_yes_a'+c).val(activityobj.evaluation_status).attr("checked",true).checkboxradio("refresh",true);
		}
		if(activityobj.evaluation_status == "no")
		{
			$('#up_result_yes_b'+c).val(activityobj.evaluation_status).attr("checked",true).checkboxradio("refresh",true);
		}
		if(activityobj.evaluation_status == "na")
		{
			$('#up_result_yes_c'+c).val(activityobj.evaluation_status).attr("checked",true).checkboxradio("refresh",true);
		}

		$('#up_responsibility'+c).val(activityobj.reponsible_person).attr("selected",true).selectmenu("refresh", true);
		c++;
	}		
}
up_total = c;

if((up_total+1)%6>0){
	up_totalpage = Math.floor((up_total+1)/6)+1;
}else {
	up_totalpage = Math.floor((up_total+1)/6);
}
hidestyle(0,up_total);
applystyle(0,4);
hidefield();
disablebutton($("#update_prev"),'',$("#lpa_update_btn"));	
}
function showfields(rowid){
	$('#up_result_na_br'+rowid).css({'display':''});				
	$('#up_findings'+rowid).css({'display':''});
	$('#up_responsibility'+rowid+'-button').css({'display':''});
	$('#up_responsibility'+rowid).css({'display':''});
	$('#up_datepicker'+rowid).css({'display':''});
	$('#up_add'+rowid).css({'display':'none'});
	$('#up_minus'+rowid).css({'display':''});										
}
function hidefields(rowid){
	$('#up_result_na_br'+rowid).css({'display':'none'});				
	$('#up_findings'+rowid).css({'display':'none'});
	$('#up_responsibility'+rowid+'-button').css({'display':'none'});
	$('#up_responsibility'+rowid).css({'display':'none'});
	$('#up_datepicker'+rowid).css({'display':'none'});
	$('#up_add'+rowid).css({'display':''});
	$('#up_minus'+rowid).css({'display':'none'});										
}
function readvalues(){
	activity_array = 	JSON.parse(sessionStorage.getItem("update_activity_data"));
	category_array = 	JSON.parse(sessionStorage.getItem("update_category_data"));	
	var act_val="";
	var id_val ="";
	for(a=0;a<category_array.length;a++){
		activity_arr = activity_array[a];
		for(b=0;b<activity_arr.length;b++){
			activityobj = activity_arr[b];
			act_val+=activityobj.activity_id+"#";
			id_val+=activityobj.user_activity_id+'#';
		}
	}
	userdata = JSON.parse(sessionStorage.getItem("user_data"));
	$("#up_activityval").val(act_val);
	$('#idval').val(id_val);
	$('#user_id').val(userdata.user_id);
}

function hidefield(){
	for(a=0;a<6;a++){
		$('#up_findings'+a).css({'display':'none'});
		$('#up_responsibility'+a+'-button').css({'display':'none'});
		$('#up_responsibility'+a).css({'display':'none'});
		$('#up_datepicker'+a).css({'display':'none'});				
		$('#up_result_na_br'+a).css({'display':'none'});				
	}
}
function hidestyle(start,end){
	for(d=start;d<=end;d++){
		$('#up_category'+d).css({'display':'none'});
		$('#up_activity'+d).css({'display':'none'});
		$('#up_checkbox'+d).css({'display':'none'});
		$('#up_result_no_br'+d).css({'display':'none'});
		$('#up_result_na_br'+d).css({'display':'none'});				
		$('#up_findings'+d).css({'display':'none'});
		$('#up_hr'+d).css({'display':'none'});
		$('#up_responsibility'+d+'-button').css({'display':'none'});
		$('#up_datepicker'+d).css({'display':'none'});				
	}
}
function applystyle(start,end){
	for(d=start;d<=end;d++){
		$('#up_category'+d).css({'display':''});
		$('#up_activity'+d).css({'display':''});
		$('#up_checkbox'+d).css({'display':''});
		$('#up_result_no_br'+d).css({'display':''});
		$('#up_hr'+d).css({'display':''});
	}

}
function pagination2(){
	if(up_currentpage==up_totalpage){
		up_currentpage = 1;
	}else {
		up_currentpage = up_currentpage+1;	
	}

	if(up_currentpage>1 && up_currentpage<up_totalpage){
		start = (up_currentpage-1)*6;
		end =((up_currentpage)*6)-1;
		enablebutton($("#update_prev"),$("#update_next"),'');
		disablebutton('','',$("#lpa_update_btn"));

		hidestyle(0,up_total);
		applystyle(start,end);
	}else {
		start = (up_currentpage-1)*6;
		end = up_total;
		enablebutton($("#update_prev"),'',$("#lpa_update_btn"));
		disablebutton('',$("#update_next"),'');
		hidestyle(0,up_total);
		applystyle(start,end);
	}
}
function pagination1(){
	if(up_currentpage>1){
		up_currentpage = up_currentpage-1;
	}else {
		up_currentpage = 1;	
	}
	if(up_currentpage>1 && up_currentpage<up_totalpage){
start = (up_currentpage-1)*6;
end =((up_currentpage)*6)-1;
enablebutton($("#update_prev"),$("#update_next"),'');
disablebutton('','',$("#lpa_update_btn"));
hidestyle(0,up_total);
applystyle(start,end);
}else if(up_currentpage<=1){
	enablebutton('',$("#update_next"),'');
	disablebutton($("#update_prev"),'',$("#lpa_update_btn"));
	start=0;
	end = ((up_currentpage)*6)-1;
	hidestyle(0,up_total);
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
		prev.removeClass('ui-btn-active');
		prev.addClass('ui-btn-active');
	}
	if(next!=''){
		next.removeClass('ui-disabled');
		next.removeClass('ui-btn-active');
next.css('ui-btn-a:visited',{'background-color': '#007030 !important'});

}
if(lpasubmit!=''){
	lpasubmit.css({'display':''})
}
}
$(document).off('click', '#update_lpa_profile').on('click','#update_lpa_profile', function(e1){
	$.mobile.changePage("profile.html", { transition: "none", changeHash: false, reverse: false });
	return false;
});

$(document).off('click', '#update_lpa_logo').on('click', '#update_lpa_logo', function(e) { 
	$.mobile.changePage("two.html", { transition: "none", changeHash: true, reverse: false }); 												        	    return true;
});

$(document).off('click', '#update_lpa_create').on('click', '#update_lpa_create', function(e) { 
	$.mobile.changePage("three.html", { transition: "none", changeHash: true, reverse: false }); 												            return true;
});

$(document).off('click', '#update_lpa_two').on('click', '#update_lpa_two', function(e) { 
	$.mobile.changePage("update_one.html", { transition: "none", changeHash: true, reverse: false }); 												            return true;
});
	
