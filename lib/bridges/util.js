var util = require('util');

var _level     = 'debug';
  
exports = module.exports = function(level) {

  if (level) { _level = level; }
 
  var logwrapper =  function() {};
    
  logwrapper.debug      = function() { delegate('debug', arguments); };
  logwrapper.info       = function() { delegate('info', arguments); };
  logwrapper.notice     = function() { delegate('notice', arguments); };
  logwrapper.warning    = function() { delegate('warning', arguments); };
  logwrapper.error      = function() { delegate('error', arguments); };
  logwrapper.critical   = function() { delegate('critical', arguments); };
  logwrapper.alert      = function() { delegate('alert', arguments); };
  logwrapper.emergency  = function() { delegate('emergency', arguments); };
    
  return logwrapper;
};

function delegate(method, _args) {

  var shouldLog    = require('../metalogger').shouldLog
    , callposition = require('../metalogger').callposition();

  if (!shouldLog(method, _level)) {
    return;
  }

  var args = Array.prototype.slice.call(_args);
  var msg, caption;
  
  if (args.length === 1) {
    msg = args[0];
    if (typeof msg !== 'string') {
      msg = util.inspect(args[0], { showHidden: true, depth: null });
    }
    util.log(method.toUpperCase() + " " + callposition + msg);
  }

  if (args.length === 2) {
    caption = args.shift();
    msg = args[0];
    if (typeof msg !== 'string') {
      msg = util.inspect(args[0], { showHidden: true, depth: null });
    }
    util.log(method.toUpperCase() + " " + callposition +  caption + " " + msg);
  }
  
  if (args.length > 2) {
    caption = args.shift();
    util.log(method.toUpperCase() + " " + callposition + caption + " " + util.format.apply(null, args));
  }
  
}