//jshint strict: false
exports.config = {

    allScriptsTimeout: 11000,

    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../e2e-tests/features/Login.feature'
    ],

    capabilities: {

        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:8000/',

    framework: 'custom',

    cucumberOpts: {
        require: [
            '../e2e-tests/features/step_definitions/LoginPage_Steps.js'
        ],
        tags: [],
        strict: true,
        compiler: []
    }

};
