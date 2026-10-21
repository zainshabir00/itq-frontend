import { request } from '@/services/request'
import type { Task } from '@/types/task'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? ''
const tasksUrl = `${apiBaseUrl}/api/tasks`

interface TaskPayload {
    title: string
    description: string
}

export const tasksApi = {
    async list(): Promise<Task[]> {
        const tasks = await request<Task[] | null>(tasksUrl)
        return tasks ?? []
    },

    create(values: TaskPayload): Promise<unknown> {
        return request(tasksUrl, {
            method: 'POST',
            body: JSON.stringify(values),
        })
    },

    update(task: Task): Promise<unknown> {
        return request(tasksUrl, {
            method: 'PUT',
            body: JSON.stringify({
                id: task.id,
                title: task.title,
                description: task.description,
                completed: task.completed,
            }),
        })
    },

    delete(id: number): Promise<unknown> {
        return request(tasksUrl, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        })
    },
}
