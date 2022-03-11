/* eslint-disable no-undef */

const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

const API_URL = {
    GET: 'http://localhost:4000/admin/get',
    REGISTER: 'http://localhost:4000/admin/register',
    LOGIN: 'http://localhost:4000/admin/login',
};

module.exports = {
    HTTP_METHOD,
    API_URL,
};
