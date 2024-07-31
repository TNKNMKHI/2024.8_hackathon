export const handler = async (event) => {
  const response = event.body;
  return {
    status : 300,
    body : JSON.stringify(response)
  };
};