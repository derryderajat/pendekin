const ERR = (error) => {
  return { error: error };
};
function ResponseTemplate(data, message, error, success) {
  const response = {
    data,
    message,
    error,
    success,
  };

  return response;
}

module.exports = {
  ERR,
  ResponseTemplate,
};
