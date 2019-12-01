const getTaskFetch = async id => {
    const response = await fetch(process.env.BACKEND_HOST + '/tasks/' + id, {
        credentials: 'include'
    });
    const json = await response.json();
    if (response.ok) {
        const { data, relationships } = json || {};
        const { id, attributes } = data || {};
        const { assignee, project, task } = relationships || {};
        const { id: assigneeId } = assignee || {};
        const { id: projectId } = project || {};
        const { id: taskId } = task || {};
        const { isDone } = attributes || {};
        return { task: { id, ...attributes, assigneeId, projectId, taskId, isDone: !!isDone } };
    } else {
        const { errors } = json || {};
        if (errors) {
            return { errors };
        } else {
            return { errors: [{ title: `${response.status} ${response.statusText}` }] };
        }
    }
};

const patchTaskFetch = async ({ id, title, details, isDone, assigneeId }) => {
    const body = {};
    if (title || details || isDone !== undefined) {
        body.data = {
            type: 'tasks',
            attributes: {
                title,
                details,
                isDone
            }
        };
    }
    if (assigneeId) {
        body.relationships = {
            assignee: {
                type: 'users',
                id: assigneeId
            }
        };
    }
    const response = await fetch(process.env.BACKEND_HOST + '/tasks/' + id, {
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

export { getTaskFetch, patchTaskFetch };
