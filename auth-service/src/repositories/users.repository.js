// eslint-disable-next-line no-shadow
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:5001';

function findUserByUsername(username) {
  return new Promise((resolve, reject) => {
    fetch(`${USER_SERVICE_URL}/api/users/search?username=${username}`)
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

async function createUser(req, user) {
  const response = await fetch(
    `${USER_SERVICE_URL}/api/users/`,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
        'x-user-data': req.headers['x-user-data'],
      },
    },
  );
  if (response.status !== 201) {
    if (response.status === 400) {
      return null;
    }
    throw new Error(`Произошла ошибка при обращении к сервису пользователей: ${response.status}`);
  }
  return response.json();
}

module.exports = {
  findUserByUsername, createUser,
};
