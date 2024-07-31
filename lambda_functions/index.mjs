export const handler = async (event) => {
  // TODO implement
  let body;
  if (event.body) {
    body = JSON.parse(event.body).greeter;
  }
  
  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };
  return response;
};