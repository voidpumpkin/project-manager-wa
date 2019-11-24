const getUserFetch = async () => {
    const response = await fetch(process.env.BACKEND_HOST + '/users/me', {
        credentials: 'include'
    });
    const json = await response.json();
    if (response.ok) {
        const {
            data: { id, attributes },
            relationships
        } = json;
        const managedProjects = relationships.managedProjects.map(({ id }) => {
            return { id };
        });
        const participatedProjects = relationships.participatedProjects.map(({ id }) => {
            return { id };
        });
        return { user: { id, ...attributes, managedProjects, participatedProjects } };
    } else {
        const { errors } = json || {};
        if (errors) {
            return { errors };
        } else {
            return { errors: [{ title: `${response.status} ${response.statusText}` }] };
        }
    }
};

const postUserFetch = async args => {
    const { username, password, companyName, firstName, lastName, email, phoneNumber } = args;
    const attributes = {
        username,
        password,
        companyName,
        firstName,
        lastName,
        email,
        phoneNumber
    };
    const response = await fetch(process.env.BACKEND_HOST + '/users', {
        method: 'POST',
        body: JSON.stringify({
            data: {
                type: 'users',
                attributes
            }
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    const json = await response.json();
    if (response.ok) {
        const { data } = json || {};
        const { id, attributes } = data || {};
        const { username, password, companyName, firstName, lastName, email, phoneNumber } =
            attributes || {};
        return {
            id,
            username,
            password,
            companyName,
            firstName,
            lastName,
            email,
            phoneNumber
        };
    } else {
        const { errors: respErrors } = json || {};
        const errors = [
            ...(respErrors || []),
            { title: `${response.status} ${response.statusText}` }
        ];
        return { errors };
    }
};

const getManagedProjectsFetch = async () => {
    const response = await fetch(process.env.BACKEND_HOST + '/users/me/managed-projects', {
        credentials: 'include'
    });
    const json = await response.json();
    if (response.ok) {
        const { data } = json || {};
        const managedProjects = data.map(project => {
            const { id, attributes } = project || {};
            return { id, ...attributes };
        });
        return { managedProjects };
    } else {
        const { errors } = json || {};
        if (errors) {
            return { errors };
        } else {
            return { errors: [{ title: `${response.status} ${response.statusText}` }] };
        }
    }
};

const getParticipatedProjectsFetch = async () => {
    const response = await fetch(process.env.BACKEND_HOST + '/users/me/participated-projects', {
        credentials: 'include'
    });
    const json = await response.json();
    if (response.ok) {
        const { data } = json || {};
        const participatedProjects = data.map(project => {
            const { id, attributes } = project || {};
            return { id, ...attributes };
        });
        return { participatedProjects };
    } else {
        const { errors } = json || {};
        if (errors) {
            return { errors };
        } else {
            return { errors: [{ title: `${response.status} ${response.statusText}` }] };
        }
    }
};

const patchUserFetch = async args => {
    const { username, password, companyName, firstName, lastName, email, phoneNumber } = args;
    const attributes = {
        username,
        password,
        companyName,
        firstName,
        lastName,
        email,
        phoneNumber
    };
    const response = await fetch(process.env.BACKEND_HOST + '/users/me', {
        method: 'PATCH',
        body: JSON.stringify({
            data: {
                type: 'users',
                attributes
            }
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    if (response.ok) {
        return {};
    } else {
        const errors = [{ title: `${response.status} ${response.statusText}` }];
        return { errors };
    }
};

export {
    getUserFetch,
    postUserFetch,
    getManagedProjectsFetch,
    getParticipatedProjectsFetch,
    patchUserFetch
};
