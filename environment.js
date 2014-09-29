var environment = function() {
    return {
        dev: {
            staticPath: '/public/app'
        },
        prod: {
            staticPath: '/build'
        },
        current: "prod"
    }
};

module.exports = new environment();