const success = (res, data, statusCode = 200) => {
  res.status(statusCode).json({ ok: true, data: data });
};

const failure = (res, error, statusCode = 400) => {
  res.status(statusCode).json({ ok: false, error: error });
};

const visibleInfo = (data) => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
  };
};

module.exports = { success, failure, visibleInfo };
