const sendQuery = require("./utils/send-query");

const DELETE_TODO = `
mutation($id: ID!) {
    deleteTodo(id: $id) {
      _id
      text
    }
  }
`;

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  const { errors, data } = await sendQuery(DELETE_TODO, {
    id,
  });

  if (errors) {
    return {
      statusCode: 500,
      data: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ deleteTodo: data.deleteTodo }),
  };
};
