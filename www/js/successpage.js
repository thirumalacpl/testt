$(document).one('pageshow', '#success_page', function(e){  
	
				 assignProfileValues();

				$(document).off('click', '#success_create').on('click','#success_create',function(e1){
						

						$.mobile.changePage("three.html", { transition: "none", changeHash: false, reverse: false });							 						
						e1.stopPropagation();
		   				e1.preventDefault();	
						return false;
				});
	
				$(document).off('click', '#success_update').on('click','#success_update',function(e){
						if(!e.handled){
						$('#pagethree').remove();
						$.mobile.changePage("update_one.html", { transition: "none", changeHash: false, reverse: false });							 						e.handled=true;

						}

						return false;

				});	

				$(document).off('click', '#success_signout').on('click', '#success_signout', function() {
					sessionStorage.clear(); 
					$.mobile.changePage("index.html", { transition: "none", changeHash: true, reverse: false }); 
					return false;
				});			
	});
	$(document).off('click', '#success_logo').on('click', '#success_logo', function(e) { 
								$.mobile.changePage("two.html", { transition: "none", changeHash: true, reverse: false }); 
								return true;
	});

		function assignProfileValues(){
			userobject = 	JSON.parse(sessionStorage.getItem("user_data"));
			$('#success_employee_name').text(userobject.firstname);
			$('#success_employee_id').text('Emp Id :' + userobject.username);

		}
