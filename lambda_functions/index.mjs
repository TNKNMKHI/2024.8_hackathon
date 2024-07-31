export const handler = async (event,callback) => {
  const res = {
    "statusCode" : 200,
    "headers": {
      "Content-Type": "*/*"
    }
  };
  res.body = event.greeter;
  callback(null, res);
};