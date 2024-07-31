export const handler = async (event,callback) => {
  let res = {
    "statusCode" : 200,
    "headers": {
      "Content-Type": "*/*"
    }
  };
  res.body = event.greeter;
  callback(null, res);
};