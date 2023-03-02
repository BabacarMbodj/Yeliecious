module.exports = (entity, body, res) => {

    switch (body) {
        case null:
            res.send(entity + " does not exist yet");
            break;
        case '':
            res.send(entity + " does not exist yet");
            break;
        default:
            res.status(200).send(body);
    }
}