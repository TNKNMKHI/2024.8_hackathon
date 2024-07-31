export const handler = async (event) => {
  const res = {
    "statusCode" : 200,
    "headers": {
      "Content-Type": "*/*"
    }
  };
  res.body = event.greeter;
  return res;
};