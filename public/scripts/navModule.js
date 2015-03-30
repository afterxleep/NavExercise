/**
* Generates and manages navigation for the app
* @author Daniel Bernal [afterxleep]
* @version 0.1
*/
var Navigation = (function (data) {

	var NavigationData = null;
	
	/* Used CSS classes */
	var MobileMenuCls = "mobile-nav-visible";
	var SecondaryNavCls = "menu-open";
	var OverlayCls = "overlay";
	var HasChildrenCls = "has-children";

	/* DOM Elements */
	var BodyEl = document.getElementsByTagName("body")[0];
	var MainEl = document.getElementsByTagName("main")[0];
	var NavEl = document.getElementsByTagName("nav")[0];
	var MobileMenuBtn = document.getElementById("mobile-menu-btn");
	var PrimaryNavItems = document.getElementsByClassName("menuitem-primary");
	
	/* State Control Vars */
	var ActiveNavigationItem = null;
	
	/* Private Methods */

	/* Checks whether an object has the specified CSS class */
	Element.prototype.hasClass = function(cls) {
		return this.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}

	/* Adds a CSS class to an object */	
	Element.prototype.addClass = function(cls) {
		if (!this.hasClass(cls)) {
			this.className += "  "+cls;
		}
	}

	/* Removes a CSS Class from an object */	
	Element.prototype.removeClass = function(cls) {
		if (this.hasClass(cls)) {		   	
		   	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		   	this.className=this.className.replace(reg,'');
		}
	}
	
	/* Toggles a CSS class for an element */
	Element.prototype.toggleClass = function(cls) {
		if (this.hasClass(cls)) {
			this.removeClass(cls);
		}
		else {
			this.addClass(cls);
		}
	}
	
	/* Checks wether a navigation item has secondary navigation */
	Element.prototype.hasSecondaryNav = function() {
		if(this.getElementsByTagName('ul')[0]) {
			return true;
		}
		return false;
		
	}
	
	/* Setup Event listeners for required DOM objects */
	function setupEvents() {
		
		/* Main Navigation Button */
		MobileMenuBtn.onclick = function() {
			BodyEl.toggleClass(MobileMenuCls);
			MainEl.toggleClass(OverlayCls);
		}
		
		/* Events to all menu items with secondary navigation */
		for (var i=0, max=PrimaryNavItems.length; i < max; i++) {
			
			var main = this;
			
			/* Enabling secondary Navigation Styles */
			PrimaryNavItems[i].onclick = function(e) {
				closeSecondaryNav();
				event.stopPropagation();					
			}
			
			/* Enabling secondary Navigation Styles */
			if(PrimaryNavItems[i].hasSecondaryNav()) {
				
				PrimaryNavItems[i].addClass(HasChildrenCls);
				
				PrimaryNavItems[i].onclick = function(e) {
					
					//Select the new one
					closeSecondaryNav();
					event.stopPropagation();					
					this.addClass(SecondaryNavCls);	
					MainEl.addClass(OverlayCls);
					
				}
			}
		}
		
		/* Hide the visible menu when clicking anywhere */
		BodyEl.onclick = function() {
			closeSecondaryNav();
		}
		
	}
	
	
	/* Loops over JSON data to create the navigation*/
	function generateNavigation(data, cls) {

		// It may be cool for some to work with the DOM directly,
		// but doing it by hand makes me want to kiil myself,
		// so this is done the lazy way
		
		//Set the default class to be primary nav
		cls = typeof cls !== 'undefined' ? cls : "menuitem-primary";
		
		var html = "<ul>";		

		for (var i=0, max=data.length; i < max; i++) {

			html += '<li role="menuitem" class="'+cls+'">';
			html += '<a href="'+data[i].url+'">'+data[i].label+'</a>';

			//If there's secondary navigation, parse it and add the appropiate class
			if (data[i].items !== void 0 && data[i].items.length) {
				html += generateNavigation(data[i].items, "menuitem-secondary")
			}
			html += '</li>';
			
		}
		html += "</ul>";		
		
		return html;
	}
	

	/* Hides the opened Secondary Navigation Menu */	
	function closeSecondaryNav() {
		var item = document.getElementsByClassName(SecondaryNavCls)[0];

		if(item) {
			/* Get rid of the overlay if the sideMenu is not open */
			if(!BodyEl.hasClass(MobileMenuCls)) {
				MainEl.removeClass(OverlayCls);  //Get rid of the overlay				
			}
			item.removeClass(SecondaryNavCls);  //Hide the submenu
		}

	}
	 
	// @constructor
    var Navigation = function (data) {		
		NavigationData = data;
		NavEl.innerHTML = generateNavigation(data);
		setupEvents();
    };

	// Public Methods..  - Nothing comes to mind here */
    Navigation.prototype = {
        constructor: Navigation,
                
    };

    // return module
    return Navigation;
})();