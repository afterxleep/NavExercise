/**
* A place to put common utilities that can be used across the entire app
* @author Daniel Bernal [afterxleep]
* @version 0.1
*/
var Utils = (function () {

	// @constructor
    var Utils = function () {
    };

    Utils.prototype = {
        constructor: Utils,

		/**
		* Sends a remote request asynchronously
		* @param {string} method The desired request method (GET or POST)
		* @param {string} url a remote URL
		* @returns a Promise
		*/
		httpRequest: function(method, url) {
						
			var request = new XMLHttpRequest();
			var promise = new Promise(function(resolve, reject) {

				//Load the data
				request.open(method, url);
				
				//Parse and return the data
				request.onload = function() {
					if(request.status == 200) {
						var data = JSON.parse(request.response)
						resolve(data)
					}
				}
				
				//Error Handling
				request.onerror = function() {
					reject({"error": "Error loading data"})
				}
				
				//Send the request
				request.send();
				
			} );
		
			return promise;
		}
    };

    return Utils;
})();