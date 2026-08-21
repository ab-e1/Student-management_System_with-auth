const now = new Date().toISOString();
const logger = (req, res) => {
  console.log(`${req.method} => ${req.url} ----------- ${now}`);

  next();
};

module.exports = logger;
