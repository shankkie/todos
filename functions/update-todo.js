// import send query
const sendQuery = require("./utils/send-query");

// prepare query
const UPDATE_TODO = `
mutation($id: ID!, $text: String!, $completed: Boolean!) {
    updateTodo(id: $id, data: {text: $text, completed: $completed}){
      _id
      completed
    }
  }
`;

// handler function
exports.handler = async (event) => {
  const { id, text, completed } = JSON.parse(event.body);
  const { errors, data } = await sendQuery(UPDATE_TODO, {
    id,
    text,
    completed,
  });

  // error handling
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  //   return actual data
  return {
    statusCode: 200,
    body: JSON.stringify({ updateTodo: data.updateTodo }),
  };
};
