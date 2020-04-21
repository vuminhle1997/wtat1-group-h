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

module.exports = {
    parseBoolean: parseBoolean
}