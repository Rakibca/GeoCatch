/* 
  API for book search engine
  route to get logged in user's info (needs the token)
*/

export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save image data for a logged in user
export const saveImage = (imageData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(imageData),
  });
};

// remove saved image data for a logged in user
export const deleteImage = (imageId, token) => {
  return fetch(`/api/users/images/${imageId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google images api
// https://www.googleapis.com/images/v1/volumes?q=harry+potter
export const searchAllImages = (query) => {
  return fetch(`API?`);
};
