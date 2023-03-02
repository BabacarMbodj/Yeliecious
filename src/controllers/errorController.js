module.exports = (err, res) => {

    const handleValidationError = (err, res) => {
        let errors = Object.values(err.errors).map(el => el.message);
        let fields = Object.values(err.errors).map(el => el.path);
        let code = 400;
        if (errors.length > 1) {
            const formattedErrors = errors.join(' ');
            res.status(code).send({ messages: formattedErrors, fields: fields });
        } else {
            //res.status(code).send({ messages: errors, fields: fields })
            res.status(code).send({ errors });
        }
    }

    const handleDuplicateKeyError = (err, res) => {
        const field = Object.keys(err.keyValue);
        const code = 409;
        const error = `A record with that ${field} already exists.`;
        res.status(code).send(error);
    }


    if (err.name === 'ValidationError') return err = handleValidationError(err, res);
    if (err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);

    res.status(500).send('An unknown error occurred.');
}


