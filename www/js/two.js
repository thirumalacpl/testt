		$(document).one('pageshow', '#pagetwo', function(){  

		userobject = 	JSON.parse(sessionStorage.getItem("user_data"));	
		$('#emplyee_name_two').text(userobject.firstname);
		$('#emplyee_id_two').text(userobject.username);
		ScaleContentToDevice();

		$(document).off('click', '#pagecreate_two').on('click', '#pagecreate_two', function() { 
			changepage();
			return false;
		});
		
		
		$(document).off('click', '#pagetwo_profile').on('click','#pagetwo_profile',function(){
				$.mobile.changePage("profile.html", { transition: "none", changeHash: true, reverse: false });
				return false;

		});

		
		$(document).off('click', '#lpa_update_one').on('click', '#lpa_update_one', function() { 
			$.mobile.changePage("update_one.html", { transition: "none", changeHash: true, reverse: false }); 
			return false;
		});


		$(document).off('click', '#two_signout').on('click', '#two_signout', function() {
			sessionStorage.clear(); 
			$.mobile.changePage("index.html", { transition: "none", changeHash: true, reverse: false }); 
			return false;
		});
		$(document).off('click', '#feedback_submit').on('click', '#feedback_submit', function() { // catch the form's submit event
            if($('#feedback').val().length > 0){
				userdata = JSON.parse(sessionStorage.getItem("user_data"));

				console.log($('#feedback_form').serialize());
                    $.ajax({url: 'http://staging.eimpressive.com/slimrestapi-dev/updatefeedback.php?userid='+userdata.user_id,
                        data:$('#feedback_form').serialize(),
                        type: 'post',                   
                        async: 'true',
						crossDomain: true,
                        dataType: 'json',
                        beforeSend: function() {
							$('body').addClass('ui-loading');

                        },
                        complete: function() {
							$.mobile.loading().hide();
                        },
                        success: function (result) {
							if(result[0]){
								alert('details submitted successfully');
								$("#feedback_form").trigger('reset');
								$('#mpopup').popup('close'); 
							}else {
								alert('Network error has occurred please try again!');

							}
							return false;
                        },
                        error: function (request,error) {
						console.log(error);
						console.log(request);
                        alert('Network error has occurred please try again!');
                        }
                    });                  
            } else {
                alert('Please fill the value before you submit');
            }           
            return false;
        });    	
		
	});
	function changepage(){
				$.mobile.changePage("three.html", { transition: "none", changeHash: true, reverse: false }); 
	}
	function ScaleContentToDevice() {
    scroll(0, 0);
    var headerHeight = $("#jqmHeader:visible").outerHeight();
    var footerHeight = $("#jqmFooter:visible").outerHeight();
    var viewportHeight = $(window).height();
       
    var content = $("#jqmContent:visible");
    var contentMargins =  content.outerHeight() - content.height();
    
    var contentheight = viewportHeight - headerHeight - footerHeight - contentMargins;
    
    content.height(contentheight);
};
		function onDeviceReady() {
			document.addEventListener("backbutton", onBackKeyDown, false);
			console.log('Device ready - register onBackKeyDown()');                
	   }
	   function onBackKeyDown() {
				var active_page = $( ":mobile-pagecontainer" ).pagecontainer( "getActivePage" );
				var id =active_page.page().attr('id');
				if (id==='pagetwo') 
				{
					if (confirm('Do you want to exit the app? If not, use the top left button to go to Previous Page?')==true)
					{
					}
				}else
				{
					navigator.app.backHistory();
				}
		}