// eslint-disable-next-line no-shadow
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:5001';

function findUserById(req, id) {
  return new Promise((resolve, reject) => {
    fetch(`${USER_SERVICE_URL}/api/users/${id}`, {
      headers: {
        'x-user-data': req.headers['x-user-data'],
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            resolve(null);
          }
          reject(new Error('Произошла ошибка при обращении к сервису пользователей'));
        }
        resolve(response.json());
      })
      .catch(reject);
  });
}

module.exports = {
  findUserById,
};
