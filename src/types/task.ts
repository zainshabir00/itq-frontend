export interface Task {
    id: number
    title: string
    description: string
    completed: boolean
    createdAt: string
}

export enum TaskFilter {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
}
