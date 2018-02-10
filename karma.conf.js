// Karma configuration
// Generated on Tue Feb 06 2018 23:00:06 GMT+0900 (대한민국 표준시)

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],
        files: [{ pattern: 'src/**/*.spec.ts' }],
        preprocessors: {
            '**/*.spec.ts': ['karma-typescript'] // *.tsx for React Jsx
        },
        reporters: ['kjhtml', 'karma-typescript'],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        port: 9876,
        autoWatch: true,
        singleRun: false,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        colors: true,
        browsers: ['Chrome']
    });
};
