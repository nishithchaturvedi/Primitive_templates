// JavaScript Document// DOM Ready
jQuery(function() {
	
	// SVG fallback
	// toddmotto.com/mastering-svg-use-for-a-retina-web-fallbacks-with-png-script#update
	if (!Modernizr.svg) {
		var imgs = document.getElementsByTagName('img');
		var dotSVG = /.*\.svg$/;
		for (var i = 0; i != imgs.length; ++i) {
			if(imgs[i].src.match(dotSVG)) {
				imgs[i].src = imgs[i].src.slice(0, -3) + "png";
			}
		}
	}
	
});

jQuery(document).ready( function($){
	
	getScreenWidth();
	
	//On click away from opened objects, close them
	$('nav').on('mousedownoutside', function(event){
		var target = $( event.target );
		if(!target.hasClass('nav-control') && !$('body').hasClass('mobile')){
			$('body.open').removeClass('open');
		}
	});
	
	//Profile Menu Control
	$('#profile-menu').on('click', function(){
		$('#user-settings').toggleClass('open');
	});
	
	//On click away from opened objects, close them
	$('#profile-menu').on('mousedownoutside', function(event){
		var target = $( event.target );
		if(!target.hasClass('settings') && !$('body').hasClass('mobile')){
			$('#user-settings').removeClass('open');
		}
	});					
	
	//Sub Nav toggle
	$('.sub-toggle').on('click', function(){
		$(this).toggleClass('expanded').siblings('ul').slideToggle(400);
	});
	
	// Action Menu (Half Circles)
	$('.actions-panel > ul > li').on('click', function(){
		//$('.actions-panel li.active').removeClass('active').find('ul').hide();
		$(this).toggleClass('active').removeClass('hasNew').find('ul').toggle();
		
	});
	
	//On click away from Action Menu, hide menu
	$('.actions-panel li').on('mousedownoutside', function(event){
		var target = $( event.target );
		$('.actions-panel li.active').removeClass('active').find('ul').hide();
	});
	

	
	/** Function to Simulate Hover states for the Header menus on Mobile **/
	$('.touch a.my-view, .touch a.settings').on('click', function(){
		//$(this).siblings('ul').slideToggle(400);
	});
	
	/** Function to show/hide module tabs **/
	$('.wrapper').on('click', '.module-tabs a', function(e){
		e.preventDefault();
		var li = $(this).parent('li'); //Set the Parent
		var ID = $(this).attr('data-tab');
		var module = $(this).parents('.module').first();
		
		if(!module.hasClass('hasSelectTabs')){
			//If the link is already active, skip it
			if(!li.hasClass('active')){
				module.find('.module-tab.active').removeClass('active');
				module.find('.module-tabs .active').removeClass('active');
				li.addClass('active');
			
				// Hide active Tab
				module.find('.module-tab[data-tab="'+ID+'"]').addClass('active');
			}
		} else {
		//If its a fake select changing views!
			module.find('.module-tab.active').removeClass('active');
			module.find('.module-tab[data-tab="'+ID+'"]').addClass('active');
		}
		
	});
    
     /** Prev/Next arrows for time range selector **/
     $('a.time').on('click', function(){
         var ul = $(this).siblings('ul').find('ul');
         var li = (ul.find('.selected').length > 0 ? ul.find('.selected') : ul.find('li').first());
         var control = $(this).siblings('ul').find('.control');

         var newValue;
        
        if($(this).data('change') == "next"){
            //Go to next one in list
            console.log(parseInt(control.data('value')));
            newValue = parseInt(control.data('value')) + parseInt(li.find('a').data('value'));
        } else {
            newValue = parseInt(control.data('value')) - parseInt(li.find('a').data('value'));
            if(newValue < 0) newValue = 0;
        }

        control.html(newValue+" hrs").data('value', newValue);     
     });
	
	/** Function to show/hide module views with Fake Select UL**/
	/*$('.wrapper').on('click', '.module-tabs a', function(e){
		e.preventDefault();
		var li = $(this).parent('li'); //Set the Parent
		var ID = $(this).attr('data-tab');
		var module = $(this).parents('.module');
		
		//If the link is already active, skip it
		if(!li.hasClass('active')){
			module.find('.module-tabs > .active, .module-tab.active').removeClass('active');
			li.addClass('active');
			
			// Hide active Tab
			module.find('.module-tab[data-tab="'+ID+'"]').addClass('active');
		}
	}); */
	
	/** Function to show/hide TOGGLE tabs **/
	$('.wrapper').on('click', '.view-toggle a', function(e){
		e.preventDefault();
		var li = $(this).parent('li'); //Set the Parent
		var ID = $(this).attr('data-toggle');
		var module = li.parent().parent();
		console.log(module);
		//If the link is already active, skip it
		if(!li.hasClass('active')){
			module.find('.active').removeClass('active');
			li.addClass('active');
			
			// Hide active Tab
			module.find('div[data-toggle="'+ID+'"]').addClass('active');
		}
	});
	
	/** Function to show/hide Module Left Hand side within other tabs **/
	$('.wrapper').on('click', '.left-tabs > li', function(){
		var li = $(this);
		var ID = $(this).attr('data-tab');
		var module = $(this).parents('.module-tab');
		
		//If the link is already active, skip it
		if(!li.hasClass('active')){
			module.find('.left-tab-wrap.active, .left-tabs .active').removeClass('active');
			li.addClass('active');
			
			// Show active Tab
			module.find('.left-tab-wrap[data-tab="'+ID+'"]').addClass('active');
		}
	});
	
	/** Function to Show/Hide Module Settings/Module Share actions **/
	$('.wrapper').on('click', 'a.module-control', function(e){
		e.preventDefault();
		//Toggle the menu visibility
		$(this).siblings('ul').slideToggle();
		
	});
		
	//On click away from opened objects, close them
	$('a.module-control').on('mousedownoutside', function(event){
		var target = $( event.target );
		if($(this) != target){
			$(this).siblings('ul').slideUp();
		}
		
	});
	
	//On click away from Drop Down Menus, close them
	$('.ddMenu').on('mousedownoutside', function(event){
		var target = $( event.target );
		if($(this) != target){
			//$(this).find('ul').first().slideUp();
		}
		
	});
	
	/** Function to handle some of the Module Settings actions
			-minimize
			-maximize
			-remove
			-duplicate
	**/
	$('.wrapper').on('click', '.module-settings ul a', function(e){
		e.preventDefault();
		// Grab the action
		var action = $(this).data('action');
		var module = $(this).parents('.module-settings').parent('div'); //Assumes settings are always direct child of div
		console.log(action);
		if(action == 'remove'){
			module.animate({opacity: 0}, 800, function(){
				$(this).remove();
				checkModuleCount();
			});
		} else if(action == 'minimize'){
			//Change the action and html of the trigger
			$(this).data('action', 'maximize').attr('title', 'Maximize').html('Maximize');
			//Hide the div
			module.find('.module-min').slideToggle(600);
				
		} else if(action == 'maximize'){
			//Change the action and html of the trigger
			$(this).data('action', 'minimize').attr('title', 'Minimize').html('Minimize');
			//Hide the div
			module.find('.module-min').slideToggle(600);
		} else if(action == 'duplicate'){
			var html = module.clone();
			module.parent().append(html);
		}
	});
	
	/** Function to show/hide accordian menus **/
	$('.accordian-controller').on('click', function(e){
		e.preventDefault();
		var parent = $(this).parents('.accordian-header');
		$(this).toggleClass('open');
		parent.next('.accordian-target').slideToggle(600);
	});
	
	/** Function to Remove Tags from Tag list
		NOTE: Only removes from Markup, does not remove from filter
	**/
	$('body').on('click', '.removeTag', function(e){
			e.preventDefault();
			$(this).parents('.tag').fadeOut().remove();
	});
	

	
	/* Function to hide/populate the placeholder value of text fields 
	   Unfortunately, the HTML5 attr placholder is not supported by IE9 :(
	 */
	$("input[type='text'], input[type='search']").on('focus', function(){
		// Store placeholder
		var placeholder = $(this).attr('value');
		//Remove placeholder if it equals the data value
		if($(this).val() == placeholder) $(this).val('');
		
		// On blur, add the initial placeholder back in if empty
		$(this).on('blur', function(){
			if($(this).val() == ''){
				$(this).val(placeholder);
			}
		})
			
	});
	
	//*  Check/un-check all checkboxs in a Search Results table **/
	$('input#global').on('click', function(){
		
		if($(this).prop("checked") === true){
			$(this).parents('.table').find('input[type="checkbox"]:not(checked)').each( function(){
				$(this).prop("checked", true);
			});
		} else {
			$(this).parents('.table').find('input[type="checkbox"]:checked').each( function(){
				$(this).prop("checked", false);
			});
		}
			
	});
	
	/* When using absolutely positioned labels for the Form elements
	   we need to hide/show the labels during focus/blur events
	   The parent Form must have the .showLabels class
	 */
	$('.showLabels input, .showLabels textarea').each( function (){
		//Define the label elmenent
		var label = $(this).parent('div').find('label');
		var error = $(this).parent('div').find('.error-msg');

		// If already filled in on Page Load, hide label
		if($(this).val() != ''){
			label.animate({'opacity': 0.0}, 300);
		}
		//On Focus, hide the label
		$(this).focus( function(){
			label.animate({'opacity': 0.0}, 300);
			if(error != undefined){ error.animate({'opacity': 1.0}, 300); }
		});
		// Show Label if Value of Field is still empty
		$(this).blur( function(){
				if($(this).val() == ""){
					label.show();
					label.animate({'opacity': 1.0}, 300);
				}
				else{
					label.hide();
				}
		if(error != undefined){ error.animate({'opacity': 0.0}, 300); }
					
		});
		$(this).keypress( function(){
			label.hide();
		});
	
	});
	
	/** Determine how many tabs are in a module
		and set the width of them. Useful for small Screens
	**/
	$('ul.module-tabs').each( function(){
		var li = $(this).children('li');
		var number = li.length;
		number  = (1/number)*100;
		// Set the width of each
		li.each( function(){
			$(this).css('width', 'calc('+number+'% - 10px)');
		})
	});

	
	/** iOS specific function
	**/
	if(navigator.userAgent.match(/(iPad|iPhone|iPod)/g)){}

	//On Window re-size
	$( window ).resize(function() {});
	
	
	/* modal trigger */
	$('.open-modal').on('click',function(e){
		e.preventDefault();
		$($(this).attr('href')).trigger('openModal');
	});
	
	
	/*** Functions to add select functionality to a UL list 
		 Used on account.html page for the avatar Drop Down
	***/
	$('.fake-select>li>a, .object-options>li>a').on('click', function(e){
		e.preventDefault();
		if(!$(this).parents('ul').hasClass('disabled')){
			$(this).toggleClass('expanded').next('ul').slideToggle('slow');
		}
		
	});
	
	/** Close Fake Select on Click Away **/
	$('.fake-select, .object-options').on('mousedownoutside', function(event){
		var target = $( event.target );
		if($(this) != target){
			$(this).find('ul').slideUp();
		}
		
	});
	/** When element is clicked, set it as selected and add to 
		hidden input 
	*/
	$('.fake-select ul li').on('click', function(e){
		e.preventDefault();
		// Remove class from sibling
		$(this).siblings('li').removeClass('selected');
		// Add Selected class to li
		$(this).addClass('selected');

		//Used on Metric Detail Page
		var value = $(this).find('a').attr('data-value');
		var html = $(this).find('a').html();
		var ul = $(this).parents('.fake-select');
		var controller = ul.find('.control');
		controller.html(html).data('value', value);
		//If its a time controller, enabled the custom time fields
		if(controller.data('control') == 'time'){
			//Inputs 
			var inputs = ul.siblings('.custom-range').find('.datepicker');
			if(value == 'custom'){
				inputs.removeAttr('disabled');
			} else {
				inputs.attr('disabled', 'disabled');
			}
			
		}
		
		//Close Select
		$(this).parent('ul').slideToggle('slow');
		
	});
	
						 
 
 /** Show Drop Down menus on Click **/
 $('body').on('click', '.showDD', function(){
	$(this).siblings('ul').slideToggle(); 
 });

$('.wrapper').on('click', '.removeLayer', function(){
	$(this).parents('.layer-box').fadeOut().remove();
});

$('body').on('click', '.ddMenu .cancel', function(){
	$(this).parents('.ddMenu').find('ul').first().slideUp();
});

/** Add Tile DEMO **/
$('#addTile').on('click', function(){				
// Decide where to position the new tile
	var html = $('.tile').clone().wrap('<div />').parent().html();
	$('.tile-container').addClass('two-column').append(html);
});

/** Object/Metric Selector Functions **/
$('.level a').on('click', function(e){
	e.preventDefault();
	var grandpa = $(this).parents('.metric-selector');
	var level = $(this).parents('.level');
	var num = level.data('level');
	//Toggle the click a element to selected/unselected
	if(level.hasClass('parent')){
		if($(this).hasClass('selected')){
			//Do nothing
		} else {
		level.find('.selected').removeClass('selected');
		$(this).addClass('selected');
		}
		//Update the Folder Name
		grandpa.find('.folder-back span').html($(this).html());
		//Slide the folder Browser to postion
		moveFolderTo(grandpa, num+1);
	} else {
		$(this).toggleClass('selected');
		metricsSelected(grandpa);
	}
	grandpa.find('.level-wrap .inner').data('level', num);
	
});

/** Folder Back Button **/
$('.folder-back').on('click', function(){
	var grandpa = $(this).parents('.metric-selector');
	var inner = grandpa.find('.inner');
	var curLevel = inner.attr('data-level');
	var num = 1;
	if(curLevel > 1){
		num = parseInt(curLevel)-1;
	}
	moveFolderTo(grandpa, num);
	var name = grandpa.find('.level[data-level="'+num+'"]').find('.selected').html();
	//Update the Folder Name
	$(this).find('span').html(name);
		
});

/** Folder Top Button **/
$('.top-folder').on('click', function(){
	var grandpa = $(this).parents('.metric-selector');
	moveFolderTo(grandpa, 1);
});
			
});

	
/** Function to get the current date and time
	
	@parameter  - jQuery object, element to populate
**/
function currentTime(el){
	var date = new Date().toJSON().slice(0,10); 
	
	el.html(date);
}

function destroySelect(){
	$("select").selectmenu("destroy").selectmenu();
}

/** Get the screen width, add a class */
function getScreenWidth(){
	var width = $('body').width();
	// Add class mobile to body 
	if(width < 769){
		$('body').addClass('mobile');
	} else {
		//Open Up Left Tabs by Default on desktop
		$('#topology .wrap').addClass('expanded');
	}
}

/** Count the Number of modules on a page
	If only one left, remove multiple columns
	i.e. body container class of 'two-columns'
**/
function checkModuleCount(){
	var modules = $('.module');
	console.log(modules.length);
	if(modules.length === 1){
		$('.module-container').removeClass('two-column');
	}
}

 /** Count the current number of Metrics Selected via
	 the Metric/Object picker and add it to the button
	 @parent - the jQuery parent object
 **/
 function metricsSelected(parent){
	 var length = 0;
	 
	 if(parent.find('.level.last-level a.selected') != undefined){
		var selected = parent.parents('ul.list').find('.level.last-level a.selected');
		length = selected.length;
		console.log(length);
	 }
	 
	 parent.parents('ul.list').find('#addMetrics span').html(length);
 }
 
 /**  Slide the folder browser to the correct position
	  @parent - the jQuery Parent Object
	  @variable num - integer
	  
**/
 function moveFolderTo(parent, num){
	parent.find('.inner').attr('data-level', num);
 }
 
/** Function for Scrolling to top, when necasary **/

function scrollToTop(){
	$('html, body').animate({scrollTop : 0},800);	
}


	
