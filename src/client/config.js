/* eslint-disable no-undef */
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const API_URL = {
    GET: `${SERVER_URL}/admin/get`,
    REGISTER: `${SERVER_URL}/admin/register`,
    LOGIN: `${SERVER_URL}/admin/login`,
};

const COMPETITION_API_URL = {
    GET: `${SERVER_URL}/competition`
}

const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

const LOCAL_STORAGE = {
    TOKEN: 'token'
}

module.exports = {
    API_URL,
    HTTP_METHOD,
    LOCAL_STORAGE,
    COMPETITION_API_URL
};
