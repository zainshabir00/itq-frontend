<template>
    <QLayout view="hHh lpR fFf">
        <AppHeader />

        <QPageContainer>
            <QPage class="bg-grey-1 text-dark">
                <div
                    class="workspace q-mx-auto q-px-md q-py-xl"
                    aria-labelledby="page-title"
                >
                    <div class="row items-end justify-between q-col-gutter-md q-mb-lg">
                        <div class="col-12 col-sm">
                            <p class="eyebrow text-overline text-grey-7 q-mb-sm">
                                YOUR PERSONAL SPACE
                            </p>
                            <h1
                                id="page-title"
                                class="text-h3 text-weight-bold text-dark q-my-none"
                            >
                                Make room for <span class="text-primary">what matters.</span>
                            </h1>
                            <p class="intro text-body2 text-grey-7 q-mt-sm q-mb-none">
                                A clear mind starts with a clear list. What would you like to get
                                done?
                            </p>
                        </div>
                        <div class="col-12 col-sm-auto">
                            <QBtn
                                color="primary"
                                unelevated
                                no-caps
                                icon="add"
                                label="New task"
                                :disable="isCreateTaskButtonDisabled"
                                @click="openCreateDialog"
                            />
                        </div>
                    </div>

                    <TaskOverview
                        :total-count="tasks.length"
                        :remaining-count="remainingCount"
                        :completed-count="completedCount"
                        :progress="progress"
                    />

                    <TaskList
                        :tasks="filteredTasks"
                        :total-count="tasks.length"
                        :filter="activeFilter"
                        :search-query="searchQuery"
                        :load-error="tasksLoadError"
                        :toggle-error="toggleTaskError"
                        :is-loading-tasks="isLoadingTasks"
                        :is-task-mutation-pending="isTaskMutationPending"
                        @update:filter="activeFilter = $event"
                        @update:search-query="searchQuery = $event"
                        @toggle="toggleTask"
                        @edit="openEditDialog"
                        @delete="openDeleteDialog"
                        @details="openDetailsDialog"
                        @create="openCreateDialog"
                        @retry="loadTasks"
                    />

                    <QSeparator
                        class="q-mt-xl"
                        color="grey-3"
                    />

                    <div class="row items-center justify-between q-mt-md">
                        <span class="text-caption text-grey-7">
                            A gentle reminder: progress is progress, no matter the pace.
                        </span>
                        <span class="text-caption text-grey-7">
                            Made for your next small win
                            <QIcon name="auto_awesome" />
                        </span>
                    </div>
                </div>
            </QPage>
        </QPageContainer>

        <CreateTaskDialog
            v-model="isCreateTaskDialogOpen"
            :is-creating-task="isCreatingTask"
            :create-error="createTaskError"
            @close="closeDialog"
            @create="handleCreateTask"
        />
        <EditTaskDialog
            v-model="isEditTaskDialogOpen"
            :task="taskToEdit"
            :is-updating-task="isUpdatingTask"
            :update-error="updateTaskError"
            @close="closeDialog"
            @update="handleUpdateTask"
        />
        <TaskDetailsDialog
            v-model="isTaskDetailsDialogOpen"
            :task="taskToShowDetails"
            @close="closeDialog"
            @edit="editSelectedTask"
        />
        <DeleteTaskDialog
            v-model="isDeleteTaskDialogOpen"
            :task="taskToDelete"
            :is-deleting-task="isDeletingTask"
            :delete-error="deleteTaskError"
            @close="closeDialog"
            @confirm="handleDeleteTask"
        />
    </QLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import CreateTaskDialog from '@/components/CreateTaskDialog.vue'
import DeleteTaskDialog from '@/components/DeleteTaskDialog.vue'
import EditTaskDialog from '@/components/EditTaskDialog.vue'
import TaskList from '@/components/TaskList.vue'
import TaskDetailsDialog from '@/components/TaskDetailsDialog.vue'
import TaskOverview from '@/components/TaskOverview.vue'
import { useTasks } from '@/composables/useTasks'
import { TaskFilter, type Task } from '@/types/task'

const {
    tasks,
    isLoadingTasks,
    isCreatingTask,
    isUpdatingTask,
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
} = useTasks()

const activeFilter = ref(TaskFilter.All)
const searchQuery = ref('')
const isCreateTaskDialogOpen = ref(false)
const isEditTaskDialogOpen = ref(false)
const isTaskDetailsDialogOpen = ref(false)
const isDeleteTaskDialogOpen = ref(false)
const taskToEdit = ref<Task | null>(null)
const taskToShowDetails = ref<Task | null>(null)
const taskToDelete = ref<Task | null>(null)

const isCreateTaskButtonDisabled = computed(
    () => isLoadingTasks.value || isTaskMutationPending.value,
)
const remainingCount = computed(() => tasks.value.filter((task) => !task.completed).length)
const completedCount = computed(() => tasks.value.length - remainingCount.value)
const progress = computed(() =>
    tasks.value.length === 0 ? 0 : Math.round((completedCount.value / tasks.value.length) * 100),
)
const filteredTasks = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()

    return tasks.value
        .filter((task) => {
            if (activeFilter.value === TaskFilter.Active && task.completed) {
                return false
            }
            if (activeFilter.value === TaskFilter.Completed && !task.completed) {
                return false
            }
            return (
                !query ||
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query)
            )
        })
})

function openCreateDialog() {
    clearErrors()
    closeDialogs()
    isCreateTaskDialogOpen.value = true
}

function openEditDialog(task: Task) {
    clearErrors()
    closeDialogs()
    taskToEdit.value = task
    isEditTaskDialogOpen.value = true
}

function editSelectedTask() {
    if (taskToShowDetails.value) {
        openEditDialog(taskToShowDetails.value)
    }
}

function openDetailsDialog(task: Task) {
    clearErrors()
    closeDialogs()
    taskToShowDetails.value = task
    isTaskDetailsDialogOpen.value = true
}

function openDeleteDialog(task: Task) {
    clearErrors()
    closeDialogs()
    taskToDelete.value = task
    isDeleteTaskDialogOpen.value = true
}

function closeDialogs() {
    isCreateTaskDialogOpen.value = false
    isEditTaskDialogOpen.value = false
    isTaskDetailsDialogOpen.value = false
    isDeleteTaskDialogOpen.value = false
    taskToEdit.value = null
    taskToShowDetails.value = null
    taskToDelete.value = null
}

function closeDialog() {
    clearErrors()
    closeDialogs()
}

async function handleCreateTask(values: { title: string; description: string }) {
    const created = await createTask(values)
    if (created) {
        closeDialog()
    }
}

async function handleUpdateTask(values: { title: string; description: string }) {
    if (!taskToEdit.value) {
        return
    }

    const updated = await updateTask({
        ...taskToEdit.value,
        title: values.title,
        description: values.description,
    })
    if (updated) {
        closeDialog()
    }
}

async function handleDeleteTask() {
    if (!taskToDelete.value || isDeletingTask.value) {
        return
    }

    const deleted = await deleteTask(taskToDelete.value.id)
    if (deleted) {
        closeDialog()
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/app.scss';
</style>
