const postFormToServer = async (url, method, headers, reqBody) => {
    const response = await fetch(url, fetchConfig(method, headers, reqBody))

    const data = await response.json();

    localStorage.setItem('token', data.token); //asummes token is property within data
}

const fetchConfig = (method, headers, reqBody) => {
    return {
        method,
        headers,
        body: JSON.stringify(reqBody),
    }
}

module.exports = {
    postFormToServer,
}