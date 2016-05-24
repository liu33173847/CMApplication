define([], function() {
    var loggerStub = {
        errorCount: 0,
        infoCount : 0,
        logError: function(e) {
            //console.log('error count within this test: ' + (++this.errorCount) + '): ' + e);
        },
        logInfo: function(info) {
            //console.log('info count within this test: ' + (++this.infoCount) + '): ' + e);
        }
    };
    return loggerStub;
});