var environment = function() {
    return {
        dev: {
            staticPath: '/public/app'
        },
        prod: {
            staticPath: '/build'
        },
        current: "dev"
    }
};

module.exports = new environment();