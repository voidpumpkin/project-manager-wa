const postLoginFetch = async args => {
    const { username, password } = args;
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
const postLogoutFetch = async () => {
    const response = await fetch(process.env.BACKEND_HOST + '/logout', {
        method: 'POST',
        credentials: 'include'
    });

    if (response.ok) {
        return {};
    } else {
        return { errors: [{ title: `${response.status} ${response.statusText}` }] };
    }
};
export { postLoginFetch, postLogoutFetch };
