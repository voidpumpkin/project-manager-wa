const postLoginFetch = async (username, password) => {
    const response = await fetch(process.env.BACKEND_HOST + '/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (response.ok) {
        return {};
    } else {
        if (response.status === 401) {
            return { errors: [{ title: 'Unauthorized' }] };
        } else {
            return { errors: [{ title: `${response.status} ${response.statusText}` }] };
        }
    }
};
export { postLoginFetch };
