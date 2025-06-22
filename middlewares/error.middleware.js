const errorHandler = (err, req, res, next) => {
  try {
    const statuseCode = res.statusCode ? res.statusCode : 500;
    switch (statuseCode) {
      case 400:
        res.json({ title: 'Bad Request', msg: err.message, stack: err.stack });
        break;

      case 401:
        res.json({ title: 'Unauthorized', msg: err.message, stack: err.stack });
        break;

      case 403:
        res.json({ title: 'Forbidden', msg: err.message, stack: err.stack });
        break;

      case 404:
        res.json({ title: 'Not Found', msg: err.message, stack: err.stack });
        break;

      case 500:
        res.json({ title: 'Server Error', msg: err.message, stack: err.stack });
        break;

      default:
        res.status(500).json({ title: 'Unknown Error', msg: err.message || 'Something Went Wrong', stack: err.stack });
        break;
    }
  } catch (error) {
    next(error);
  }
};

export default errorHandler;