/*
	anvil.coffee - CoffeeScript compiler plugin for anvil.js
	version: 0.0.2
	author: Alex Robson <alex@sharplearningcurve.com> (http://sharplearningcurve.com)
	copyright: 2012
	license: Dual licensed 
			 MIT (http://www.opensource.org/licenses/mit-license)
			 GPL (http://www.opensource.org/licenses/gpl-license)
*/
var coffeeScript = require( "coffee-script" );

var coffeeCompilerFactory = function( _, anvil ) {
	return anvil.plugin( {
		name: "anvil.coffee",
		
		configure: function( config, command, done ) {
			anvil.addCompiler( ".coffee", this );
			done();
		},

		compile: function( content, done ) {
			try {
				var js = coffeeScript.compile( content, { bare: true } );
				done( js );
			} catch ( error ) {
				done( "", error );
			}
		},

		rename: function( name ) {
			return name.replace( ".coffee", ".js" );
		}
	} );
};

module.exports = coffeeCompilerFactory;