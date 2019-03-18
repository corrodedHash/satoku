({
  baseUrl : "lib/",
  paths : {
    almond : "../node_modules/almond/almond"

  },
  name : "almond",
  optimize: "none",
  include : [ "index" ],
  insertRequire : [ "index" ],
  out : "lib/main-built.js",
  wrap : true,
  fileExclusionRegExp : ".*\.spec\.js",
  uglify2 : {
    output : {beautify : false, quote_style : 3, comments : false},
    warnings : true,
    mangle : true
  },
  preserveLicenseComments : false
});
