export const setAuthToken = (token) => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-auth-token': token
});