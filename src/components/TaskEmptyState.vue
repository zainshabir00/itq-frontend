<template>
    <QCard
        class="empty-state column flex-center text-center q-pa-xl bg-transparent"
        flat
    >
        <QIcon
            class="empty-icon q-mb-md"
            :name="emptyState.icon"
            color="primary"
            size="56px"
            aria-hidden="true"
        />
        <h3 class="text-h6 text-weight-medium text-dark q-mb-sm">
            {{ emptyState.title }}
        </h3>
        <p class="empty-description text-body2 text-grey-7 q-mb-md">
            {{ emptyState.description }}
        </p>
        <QBtn
            v-if="showCreateButton"
            color="primary"
            outline
            no-caps
            icon="add"
            label="Create your first task"
            @click="emit('create')"
        />
        <QBtn
            v-else-if="showClearSearchButton"
            color="primary"
            flat
            dense
            no-caps
            label="Clear search"
            @click="emit('clearSearch')"
        />
    </QCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TaskFilter } from '@/types/task'

const props = defineProps<{
    filter: TaskFilter
    searchQuery: string
}>()

const emptyStateMessages = {
    search: {
        icon: 'search_off',
        title: 'No tasks found',
        description: 'Try another search or clear your query to see all your tasks.',
    },
    [TaskFilter.Completed]: {
        icon: 'task_alt',
        title: 'Nothing checked off yet',
        description: 'Your finished tasks will find a home here.',
    },
    [TaskFilter.Active]: {
        icon: 'task_alt',
        title: 'You’re all caught up',
        description: 'You have no tasks in progress. Take a breather or add something new.',
    },
    [TaskFilter.All]: {
        icon: 'task_alt',
        title: 'A fresh start',
        description:
            'Every meaningful thing starts somewhere. Add your first task and make today count.',
    },
} as const

const emptyState = computed(() => {
    if (props.searchQuery) {
        return emptyStateMessages.search
    }

    return emptyStateMessages[props.filter]
})
const showCreateButton = computed(() => !props.searchQuery && props.filter === TaskFilter.All)
const showClearSearchButton = computed(() => Boolean(props.searchQuery))

const emit = defineEmits<{
    create: []
    clearSearch: []
}>()
</script>
