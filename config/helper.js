function parseBoolean(string) {
    switch(string) {
        case 'true':
            return true;
        case 'TRUE':
            return true;
        case 'True':
            return true;
        case 'false':
            return false;
        case 'FALSE':
            return false;
        case 'False':
            return false;
        default:
            return true;
    }
}

function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') 
    return req.headers.authorization.split(' ')[1];

    return null
}

module.exports = {
    parseBoolean: parseBoolean,
    getTokenFromHeader: getTokenFromHeader
}