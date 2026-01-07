let authToken = null;

// Set token
export const setToken = (token) => {
  authToken = token;
  localStorage.setItem('authToken', token); // optional, persist
};

// Get token
export const getToken = () => {
  if (!authToken) {
    authToken = localStorage.getItem('authToken'); // fallback localStorage
  }
  return authToken;
};

// Remove token
export const removeToken = () => {
  authToken = null;
  localStorage.removeItem('authToken');
};
