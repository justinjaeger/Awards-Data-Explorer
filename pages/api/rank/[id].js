import wrapper from 'utils/wrapper';
import tokenController from 'controllers/tokenController';

/**
 * All actions for RANK game
 */

const handler = async (req, res, next) => {

  const {
    method, // GET or POST etc
    params: { id } // user_id
  } = req;

  console.log('id',id)

  try {
    res.locals.access_token = req.cookies.access_token;

    await next
    (
      tokenController.getTokenData,
      tokenController.deleteAccessToken,
    )
    .then(result => { if (!result) return; })
    .catch(err => { throw new Error(err); })
     
    /* Delete access token from browser */
    res.cookie('access_token');
    
    res.sendCookies();
    return res.json({});
  } 
  catch(e) {
    console.log('error ', e);
    return res.status(500).send(e.message);
  };

};

export default wrapper(handler);
