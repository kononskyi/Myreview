//jshint strict: false
exports.config = {

    allScriptsTimeout: 11000,

    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../e2e-tests/features/Notes.feature'
    ],

    capabilities: {

        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:8000/',

    framework: 'custom',

    cucumberOpts: {
        require: [
            '../e2e-tests/features/step_definitions/Notes_Steps.js'
        ],
        tags: ['@test2'],
        strict: true,
        compiler: []
    }

};
