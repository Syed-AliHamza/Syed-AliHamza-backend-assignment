export const getTaskById = ({ name }) => ({
  where: {
    name,
  },
});

export const deleteTaskQuery = ({ id }) => ({
  where: {
    id,
  },
});
