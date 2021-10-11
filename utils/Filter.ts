import bannedWords from './profanityList';

/**
 * Restrict username to alphanumeric, underscore, and period
 */
export const validateUsername = (
    username: string
): { accepted: boolean; message: string } => {
    const regex = RegExp('^[a-z0-9_.]*$');

    if (username.length > 20) {
        return {
            accepted: false,
            message: 'Username cannot be more than 20 characters.',
        };
    }
    if (regex.test(username) === false) {
        return {
            accepted: false,
            message:
                'Username can only contain lowercase letters, numbers, underscores and periods',
        };
    }
    if (username.includes('__') === true) {
        return {
            accepted: false,
            message: 'Username cannot contain a double underscore',
        };
    }
    if (username[0] === '_' || username[0] === '.') {
        return {
            accepted: false,
            message: 'Username cannot begin with an underscore or period',
        };
    }
    return {
        accepted: true,
        message: 'accepted',
    };
};

/**
 * Filter username for profane words
 */
export const profanityFilter = (username: string) =>
    bannedWords.some((word) => username.includes(word) === true);
