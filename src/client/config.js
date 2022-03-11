/* eslint-disable no-undef */

const API_URL = {
    GET: 'http://localhost:4000/admin/get',
    REGISTER: 'http://localhost:4000/admin/register',
    LOGIN: 'http://localhost:4000/admin/login',
};

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
};
