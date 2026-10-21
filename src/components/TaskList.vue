<template>
    <div
        class="task-section"
        aria-labelledby="tasks-heading"
    >
        <div class="row items-end justify-between q-col-gutter-md q-mb-md">
            <div class="col">
                <p class="eyebrow text-overline text-grey-7">THE LITTLE THINGS ADD UP</p>
                <h2
                    id="tasks-heading"
                    class="text-h5 text-weight-bold text-dark q-my-none"
                >
                    Your tasks
                    <QBadge
                        color="deep-purple-1"
                        text-color="primary"
                        class="q-ml-sm"
                        :label="totalCount"
                    />
                </h2>
            </div>
            <QInput
                class="search-field col-12 col-sm-4"
                :model-value="searchQuery"
                dense
                outlined
                clearable
                placeholder="Find a task..."
                aria-label="Find a task"
                @update:model-value="handleSearchUpdate"
            >
                <template #prepend>
                    <QIcon name="search" />
                </template>
            </QInput>
        </div>

        <div class="list-toolbar row items-center justify-between q-py-sm">
            <QTabs
                :model-value="filter"
                dense
                no-caps
                align="left"
                active-color="primary"
                indicator-color="primary"
                class="bg-grey-1 rounded-borders"
                aria-label="Filter tasks"
                @update:model-value="emit('update:filter', $event)"
            >
                <QTab
                    v-for="option in filters"
                    :key="option.value"
                    :name="option.value"
                    :label="option.label"
                />
            </QTabs>
            <span class="list-summary text-caption text-grey-7">
                {{ taskCountLabel }}
            </span>
        </div>

        <QBanner
            v-if="hasLoadError"
            class="q-mt-md bg-amber-1 text-dark"
            rounded
            dense
            inline-actions
            role="status"
        >
            <template #avatar>
                <QIcon
                    name="warning_amber"
                    color="warning"
                />
            </template>
            {{ loadError }}
            <template #action>
                <QBtn
                    flat
                    dense
                    no-caps
                    label="Retry"
                    @click="emit('retry')"
                />
            </template>
        </QBanner>
        <QBanner
            v-if="hasToggleError"
            class="q-mt-md bg-amber-1 text-dark"
            rounded
            dense
            role="alert"
        >
            <template #avatar>
                <QIcon
                    name="warning_amber"
                    color="warning"
                />
            </template>
            {{ toggleError }}
        </QBanner>
        <QList
            v-if="hasTasks"
            bordered
            separator
            class="rounded-borders bg-white q-mt-md"
        >
            <TaskCard
                v-for="task in tasks"
                :key="task.id"
                :task="task"
                :busy="isTaskControlsDisabled"
                @toggle="emit('toggle', $event)"
                @edit="emit('edit', $event)"
                @delete="emit('delete', $event)"
                @details="emit('details', $event)"
            />
        </QList>
        <QCard
            v-else-if="isLoadingTasks"
            flat
            bordered
            class="row items-center justify-center q-gutter-sm q-pa-xl q-mt-md"
        >
            <QSpinner
                color="primary"
                size="24px"
                aria-label="Loading tasks"
            />
            <span class="text-body2 text-grey-7">Loading your tasks...</span>
        </QCard>
        <TaskEmptyState
            v-else-if="showEmptyState"
            :filter="filter"
            :search-query="searchQuery"
            @create="emit('create')"
            @clear-search="emit('update:searchQuery', '')"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TaskFilter, type Task } from '@/types/task'
import TaskCard from '@/components/TaskCard.vue'
import TaskEmptyState from '@/components/TaskEmptyState.vue'

const props = defineProps<{
    tasks: Task[]
    totalCount: number
    filter: TaskFilter
    searchQuery: string
    loadError: string
    toggleError: string
    isLoadingTasks: boolean
    isTaskMutationPending: boolean
}>()

const taskCountLabel = computed(
    () => `${props.tasks.length} ${props.tasks.length === 1 ? 'task' : 'tasks'}`,
)
const hasTasks = computed(() => props.tasks.length > 0)
const hasLoadError = computed(() => Boolean(props.loadError))
const hasToggleError = computed(() => Boolean(props.toggleError))
const showEmptyState = computed(() => !props.loadError)
const isTaskControlsDisabled = computed(() => props.isLoadingTasks || props.isTaskMutationPending)

function handleSearchUpdate(value: string | number | null) {
    emit('update:searchQuery', String(value ?? ''))
}

const emit = defineEmits<{
    'update:filter': [filter: TaskFilter]
    'update:searchQuery': [query: string]
    toggle: [task: Task]
    edit: [task: Task]
    delete: [task: Task]
    details: [task: Task]
    create: []
    retry: []
}>()

const filters = [
    { value: TaskFilter.All, label: 'All tasks' },
    { value: TaskFilter.Active, label: 'In progress' },
    { value: TaskFilter.Completed, label: 'Completed' },
]
</script>
