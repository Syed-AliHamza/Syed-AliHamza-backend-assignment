export const getUserByIdQuery = ({ id }) => {
  const query = {
    where: {
      id,
    },
  };
  query.attributes = {
    exclude: ['createdAt', 'updatedAt'],
  };
  return query;
};
