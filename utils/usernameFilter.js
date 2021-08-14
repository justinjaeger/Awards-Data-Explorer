/**
 * Restricts username to alphanumeric and underscore and period
 */

export default function isValid(username) {
    const output = {
        status: true,
        message: 'valid',
    };
    const regex = RegExp('^[a-z0-9_.]*$');

    if (username.length > 20) {
        output.status = false;
        output.message = 'Username cannot be more than 20 characters.';
    }
    if (regex.test(username) === false) {
        output.status = false;
        output.message =
            'Username can only contain lowercase letters, numbers, underscores and periods';
    }
    if (username.includes('__') === true) {
        output.status = false;
        output.message = 'Username cannot contain a double underscore';
    }
    if (username[0] === '_' || username[0] === '.') {
        output.status = false;
        output.message = 'Username cannot begin with an underscore or period';
    }

    return output;
}
