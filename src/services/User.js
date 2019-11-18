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
export { getUserFetch };
