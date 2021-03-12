import wrapper from 'utils/wrapper';
import authController from 'controllers/authController';

const handler = async (req, res) => {
  try {
    /* Verify the access_token */
    await authController.verifyToken(req, res);
    console.log(res.finished)
    if (res.finished) return;

    /* Fetch data if token is true */
    await authController.getUserId(req, res)
    if (res.finished) return;

    return res.json({ 
      username: res.locals.username
    });
  } catch(e) {
    return res.status(500).send(e.message);
  }
};

export default wrapper(handler);