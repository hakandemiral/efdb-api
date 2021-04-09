const { connect } = require('mongoose');

module.exports = () => {
    connect(
        process.env.DATABASE_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
        .then(() => console.log('MongoDB Connection Successfully'))
        .catch((err) => console.error(`MongoDB Connection Failed: ${err}`));
};
