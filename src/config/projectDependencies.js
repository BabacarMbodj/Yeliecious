const mongoDatabaseServices = require("../frameworks/mongoDbMongoose/mongoDatabaseServices");

module.exports = (() => {
    return {
        DatabaseService: new mongoDatabaseServices()
    };
})();