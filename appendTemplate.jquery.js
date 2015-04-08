/*
 * jQuery appendTemplate.js v1.0.0
 * https://github.com/adammcarth/appendTemplate.js
 *
 * Copyright 2015, Adam McArthur
 * https://adammcarthur.net
 * Twitter: @adammcarth
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

(function($) {
  "use strict";

  $.fn.appendTemplate = function( source, params, callback, prepend ) {
    var selector = this;
    // set prepend to false by default
    prepend = prepend || false;

    // Get the file from the specififed url
    $.get( source, function( file_contents ) {
      // If no params were specified, then don't worry about processing the file
      if ( params ) {
        // scan for variables and replace them with the appropriate value
        var processed = processTemplate( file_contents );
      } else {
        var processed = file_contents;
      };

      // Add the proccessed file to the DOM in the required position
      if ( prepend ) {
        $(selector).prepend( processed );
      } else {
        $(selector).append( processed );
      }

      // Finally, execute a callback if it was specified
      if ( callback ) {
        callback();
      };
    });

    // Function that proccesses the html templates and
    // adds variable data where needed.
    var processTemplate = function( template ) {
        // save all the parameter names into an array
        var param_names = Object.keys( params );
        
        // Regular expression to capture {{variables}} inside the file
        var regex = /({{)([A-Za-z_0-9]+)(}})/g;
        // Scan the template against the regex. Saves each match into an array.
        var template_variables = template.match( regex );

        // Are there actually {{variables}} inside the tempalate?
        if ( template_variables ) {

          // Loop through each variable in the template
          $.each( template_variables, function( index, match ) {
            // Extracts the actual variable name (without curly braces)
            var match_length = match.length;
            var variable_name = match.substr( 2, match_length - 4 );

            // Save the left and right sub strings between the variable
            var left = template.split( match )[0];
            var right = template.substr((left.length + match_length), (template.length));

            // If the variable name was specified in the params argument,
            // add it's value to the file.
            if ( jQuery.inArray( variable_name, param_names ) !== -1 ) {
              template = left + params[variable_name] + right;
            } else {
              // otherwise leave it blank and keep looping through
              template = left + right;
            };
          });

        };

        return template;
    };

    // return the jQuery object for chaining
    return this;
  };
})(jQuery);