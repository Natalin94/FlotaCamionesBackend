'use strict';
//export by default
module.exports = function (app) {
    // grab
    var strain = require('../controllers/Strain');
    var siteRoot = require('../routes/root');

    // Site Index
    app.use('/', siteRoot);

    // Strains
    app.route('/strains')
        .get(strain.getAllItems);
}