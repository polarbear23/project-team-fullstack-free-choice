export const postFormToServer = async (url, reqBody) => {
    const response = await fetch(url, fetchConfig(reqBody));

    const data = await response.json();

    return data;
};

const fetchConfig = (reqBody) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
    };
};