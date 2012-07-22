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