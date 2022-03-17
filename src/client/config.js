/* eslint-disable no-undef */
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const API_URL = {
    ADMIN_GET: `${SERVER_URL}/admin/get`,
    ADMIN_REGISTER: `${SERVER_URL}/admin/register`,
    ADMIN_LOGIN: `${SERVER_URL}/admin/login`,
    COMPETITION_GET: `${SERVER_URL}/competition`,
    SEASON_POST: `${SERVER_URL}/season/create`
};

const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

const LOCAL_STORAGE = {
    TOKEN: 'token',
};

const STORE_ACTIONS = {
    COMPETITION: 'competition',
    USER: 'user'
}

module.exports = {
    API_URL,
    HTTP_METHOD,
    LOCAL_STORAGE,
    STORE_ACTIONS
};
