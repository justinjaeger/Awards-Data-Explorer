import badWords from './profanityList';

export default function profanityFilter(username) {
    let output = false;

    badWords.forEach((word) => {
        if (username.includes(word) === true) {
            console.log('it has profanity');
            output = true;
        }
    });

    return output;
}
