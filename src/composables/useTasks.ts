import { computed, onMounted, ref } from 'vue'
import { tasksApi } from '@/services/tasks'
import type { Task } from '@/types/task'

export function useTasks() {
    const tasks = ref<Task[]>([])
    const isLoadingTasks = ref(true)
    const isCreatingTask = ref(false)
    const isUpdatingTask = ref(false)
    const isTogglingTask = ref(false)
    const isDeletingTask = ref(false)
    const tasksLoadError = ref('')
    const createTaskError = ref('')
    const updateTaskError = ref('')
    const toggleTaskError = ref('')
    const deleteTaskError = ref('')
    const isTaskMutationPending = computed(
        () =>
            isCreatingTask.value ||
            isUpdatingTask.value ||
            isTogglingTask.value ||
            isDeletingTask.value,
    )

    async function loadTasks() {
        isLoadingTasks.value = true
        try {
            tasks.value = await tasksApi.list()
            tasksLoadError.value = ''
        } catch (error) {
            // prettier-ignore
            tasksLoadError.value = error instanceof Error
                ? error.message
                : 'Could not load tasks from the task API.'
        } finally {
            isLoadingTasks.value = false
        }
    }

    function clearErrors() {
        tasksLoadError.value = ''
        createTaskError.value = ''
        updateTaskError.value = ''
        toggleTaskError.value = ''
        deleteTaskError.value = ''
    }

    async function createTask(values: { title: string; description: string }) {
        if (isTaskMutationPending.value) {
            return false
        }

        isCreatingTask.value = true
        createTaskError.value = ''
        try {
            await tasksApi.create(values)
            await loadTasks()
            return true
        } catch (error) {
            // prettier-ignore
            createTaskError.value = error instanceof Error
                ? error.message
                : 'Could not create the task.'
            return false
        } finally {
            isCreatingTask.value = false
        }
    }

    async function updateTask(task: Task) {
        if (isTaskMutationPending.value) {
            return false
        }

        isUpdatingTask.value = true
        updateTaskError.value = ''
        try {
            await tasksApi.update(task)
            await loadTasks()
            return true
        } catch (error) {
            // prettier-ignore
            updateTaskError.value = error instanceof Error
                ? error.message
                : 'Could not update the task.'
            return false
        } finally {
            isUpdatingTask.value = false
        }
    }

    async function toggleTask(task: Task) {
        if (isTaskMutationPending.value) {
            return false
        }

        isTogglingTask.value = true
        toggleTaskError.value = ''
        try {
            await tasksApi.update({ ...task, completed: !task.completed })
            await loadTasks()
            return true
        } catch (error) {
            // prettier-ignore
            toggleTaskError.value = error instanceof Error
                ? error.message
                : 'Could not update task completion.'
            return false
        } finally {
            isTogglingTask.value = false
        }
    }

    async function deleteTask(id: number) {
        if (isTaskMutationPending.value) {
            return false
        }

        isDeletingTask.value = true
        deleteTaskError.value = ''
        try {
            await tasksApi.delete(id)
            await loadTasks()
            return true
        } catch (error) {
            // prettier-ignore
            deleteTaskError.value = error instanceof Error
                ? error.message
                : 'Could not delete the task.'
            return false
        } finally {
            isDeletingTask.value = false
        }
    }

    onMounted(loadTasks)

    return {
        tasks,
        isLoadingTasks,
        isCreatingTask,
        isUpdatingTask,
        isTogglingTask,
        isDeletingTask,
        isTaskMutationPending,
        tasksLoadError,
        createTaskError,
        updateTaskError,
        toggleTaskError,
        deleteTaskError,
        clearErrors,
        loadTasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask,
    }
}
