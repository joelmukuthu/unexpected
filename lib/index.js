var Unexpected = require('./Unexpected');

module.exports = Unexpected.create()
    .installPlugin(require('./colors'))
    .installPlugin(require('./types'))
    .installPlugin(require('./assertions'));

module.exports.output.installPlugin(require('magicpen-prism'));
