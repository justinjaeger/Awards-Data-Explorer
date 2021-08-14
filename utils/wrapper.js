import cookie from './cookies';

export default (handler) => (req, res) => {
    res.cookieArray = [];
    res.cookie = (name, value, options) => cookie(res, name, value, options);
    res.sendCookies = () => res.setHeader('set-cookie', res.cookieArray);

    res.locals = {};

    return handler(req, res);
};
