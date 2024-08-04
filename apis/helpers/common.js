'use strict';

module.exports.respond = (context, content, statusCode = 200) => {
  if (!context) return
  const response = {
      statusCode: statusCode,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(content),
  }
  context.succeed(response)
}

module.exports.parseData = data => {
  return (typeof data === 'object') ? data : JSON.parse(data);
}

module.exports.toJSON = data => JSON.parse(JSON.stringify(data))
