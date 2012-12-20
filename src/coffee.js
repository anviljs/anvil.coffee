var coffeeScript;

module.exports = function( _, anvil ) {
	anvil.plugin( {
		name: "anvil.coffee",
		configure: function( config, command, done ) {
			anvil.addCompiler( ".coffee", this );
			anvil.config[ "anvil.combiner" ].patterns.push( {
				extensions: [ ".coffee" ],
				find: "/[#]{3}.?import.?[(]?.?[\"'].*[\"'].?[)]?.?[#]{3}/g",
				replace: "/([ \t]*)[#]{3}.?import.?[(]?.?[\"']replace[\"'].?[)]?.?[#]{3}/g"
			} );
			done();
		},
		compile: function( content, done ) {
			if( !coffeeScript ) {
				coffeeScript = require( "coffee-script" );
			}
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