export const getTaskById = ({ name }) => ({
  where: {
    name,
  },
});
