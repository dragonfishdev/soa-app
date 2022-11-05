// eslint-disable-next-line no-shadow
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const TASK_SERVICE_URL = process.env.TASK_SERVICE_URL || 'http://localhost:5002';

async function findById(req, id) {
  const response = await fetch(
    `${TASK_SERVICE_URL}/api/tasks/${id}`,
    {
      headers: {
        'x-user-data': req.headers['x-user-data'],
      },
    },
  );
  if (response.status !== 200) {
    throw new Error(`Произошла ошибка при обращении к сервису задач: ${response.status}`);
  }
  return response.json();
}

module.exports = {
  findById,
};
