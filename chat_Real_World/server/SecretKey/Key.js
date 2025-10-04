const KeyMessage = () => {
    let hex = `XYZ${Math.random().toString(15).slice(2).padEnd(24, 'jugal')}`;
    return hex;
};

module.exports = KeyMessage;
