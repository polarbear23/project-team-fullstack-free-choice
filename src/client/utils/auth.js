export const postFormToServer = async (url) => {
    const response = await fetch(url, fetchConfig());

    const data = await response.json();

    return data;
};

const fetchConfig = (form) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    };
};