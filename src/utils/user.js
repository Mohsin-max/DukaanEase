let userInfo = null;

// Set user info
export const setUserInfo = (info) => {
    userInfo = info;
    localStorage.setItem('user', JSON.stringify(info)); // optional, persist
};

// Get user info
export const getUserInfo = () => {
    if (!userInfo) {
        const storedInfo = localStorage.getItem('user');
        if (storedInfo) {
            userInfo = JSON.parse(storedInfo);
        }
    }
    return userInfo;
};

// Remove user info
export const removeUserInfo = () => {
    userInfo = null;
    localStorage.removeItem('user');
};
