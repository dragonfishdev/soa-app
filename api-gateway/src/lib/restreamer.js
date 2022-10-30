module.exports = function restreamer(options = {}) {
  const opt = options;
  opt.property = options.property || 'body';
  opt.stringify = options.stringify || JSON.stringify;

  return (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      req.removeAllListeners('data');
      req.removeAllListeners('end');
      if (req.headers['content-length'] !== undefined) {
        req.headers['content-length'] = Buffer.byteLength(opt.stringify(req[opt.property]), 'utf8');
      }

      process.nextTick(() => {
        if (req[opt.property]) {
          if (typeof opt.modify === 'function') {
            req[opt.property] = opt.modify(req[opt.property]);
          }
          req.emit('data', opt.stringify(req[opt.property]));
        }
        req.emit('end');
      });
    }
    next();
  };
};
