const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://blooming-fortress-14400.herokuapp.com/', 'https://blooming-fortress-14400.herokuapp.com/recipes'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);