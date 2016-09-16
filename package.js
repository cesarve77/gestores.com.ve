Package.describe({
    name: 'cesarve:mp',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.4.1.1');
    api.use(['mongo'],'server')
    api.use(['ecmascript','jquery','templating', 'aldeed:autoform','underscore','reactive-var','check','meteor-base']);
    api.addFiles('styles.css')
    api.mainModule('client.js','client');
    api.mainModule('server.js','server');
})
;

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('cesarve:mp');
    api.mainModule('mp-tests.js');
});


Npm.depends({
    mercadopago: '0.5.0',
    fibers:'1.0.13',
    "body-parser": '1.15.2'
});


