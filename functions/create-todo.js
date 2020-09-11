// import send query
const sendQuery = require("./utils/send-query");

// prepare query
const CREATE_TODO = `
mutation ($text: String!) {
    createTodo(data: { text: $text, completed: false}) {
     _id
     text
     completed
   }
   }
`;

// handler function
exports.handler = async (event) => {
  const { text } = JSON.parse(event.body);
  const { data, errors } = await sendQuery(CREATE_TODO, { text });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ newTodo: data.createTodo }),
  };
};
