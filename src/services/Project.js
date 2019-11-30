const getProjectFetch = async id => {
    const response = await fetch(process.env.BACKEND_HOST + '/projects/' + id, {
        credentials: 'include'
    });
    const json = await response.json();
    if (response.ok) {
        const { data, relationships } = json || {};
        const { id, attributes } = data || {};
        const { manager } = relationships || {};
        const { id: managerId } = manager || {};
        return { project: { id, ...attributes, managerId } };
    } else {
        const { errors } = json || {};
        if (errors) {
            return { errors };
        } else {
            return { errors: [{ title: `${response.status} ${response.statusText}` }] };
        }
    }
};

const patchProjectFetch = async ({ id, title, details, managerId }) => {
    const body = {};
    if (title || details) {
        body.data = {
            type: 'projects',
            attributes: {
                title,
                details
            }
        };
    }
    if (managerId) {
        body.relationships = {
            manager: {
                type: 'users',
                id: managerId
            }
        };
    }
    const response = await fetch(process.env.BACKEND_HOST + '/projects/' + id, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    if (response.ok) {
        return {};
    } else {
        const json = await response.json();
        const { errors } = json || {};
        if (errors) {
            return { errors };
        } else {
            return { errors: [{ title: `${response.status} ${response.statusText}` }] };
        }
    }
};

export { getProjectFetch, patchProjectFetch };
