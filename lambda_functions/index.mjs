export const handler = function(event, context, callback) {
  console.log('Received event:', JSON.stringify(event, null, 2));
  var res ={
      "statusCode": 200,
      "headers": {
          "Content-Type": "*/*"
      }
  };
  
  var greeter = 'World';
  if (event.greeter && event.greeter!=="") {
      greeter =  event.greeter;
  } else if (event.body && event.body !== "") {
      var body = JSON.parse(event.body);
      if (body.greeter && body.greeter !== "") {
          greeter = body.greeter;
      }
  }
  
  res.body = greeter;
  callback(null, res);
};