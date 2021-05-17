import cookie from './cookies';

const wrapper = handler => {

  return (req, res, next) => {

    next = async (...funcs) => {
      let finished = true;
      for (const func of funcs) {
        await func(req, res)
        if (res.finished) {
          finished = false;
          break;
        };
      };
      return finished;
    };

    res.cookieArray = [];
    res.cookie = (name, value, options) => cookie(res, name, value, options);
    res.sendCookies = () => res.setHeader('set-cookie', res.cookieArray);

    res.locals = {};

    /* handle SQL errors, send 500 status by default */
    res.handleErrors = result => {
      if (result.error) {
        console.log('handling error: ', result.error.message)
        throw new Error(result.error);
      };
    };

    /* if message, it sends data back for frontend to handle
      if no message, it throws an error / 500 status */
    res.handleEmptyResult = (result, message) => {

      if (!message) message = 'Did not affect any rows in db';

      console.log('message',message)
      // first check if affected rows is less than one
      if (result.affectedRows === 0) {
        throw new Error(message);
      /* not all queries hav affectedRows property... some queries return data
        in that case, if no data is returned, flag it */
      } else if (result[0] === undefined) {
        throw new Error(message);
      };
    };
    
    return handler(req, res, next);
  };
};

module.exports = wrapper;