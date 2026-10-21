<template>
    <QItem
        class="q-pa-none"
        :class="taskItemClass"
    >
        <QItemSection side>
            <QCheckbox
                :model-value="task.completed"
                :aria-label="completionAriaLabel"
                color="primary"
                size="sm"
                :disable="busy"
                @update:model-value="emit('toggle', task)"
            />
        </QItemSection>
        <QItemSection class="q-py-md">
            <QItemLabel class="text-subtitle2 text-weight-medium">
                <span :class="titleClass">
                    {{ task.title }}
                </span>
                <QBadge
                    v-if="isCompleted"
                    color="positive"
                    class="q-ml-sm"
                    label="Done"
                />
            </QItemLabel>
            <QItemLabel
                v-if="hasDescription"
                caption
                lines="2"
                class="task-description q-mt-xs"
            >
                {{ task.description }}
            </QItemLabel>
            <QItemLabel
                v-if="hasLongDescription"
                caption
            >
                <QBtn
                    flat
                    dense
                    no-caps
                    color="primary"
                    label="Read more"
                    icon-right="chevron_right"
                    @click="emit('details', task)"
                />
            </QItemLabel>
            <QItemLabel
                caption
                class="q-mt-xs"
            >
                Added {{ formatDate(task.createdAt) }}
            </QItemLabel>
        </QItemSection>
        <QItemSection side>
            <div class="row no-wrap">
                <QBtn
                    round
                    flat
                    dense
                    :disable="busy"
                    color="grey-7"
                    icon="edit"
                    :aria-label="`Edit ${task.title}`"
                    @click="emit('edit', task)"
                />
                <QBtn
                    round
                    flat
                    dense
                    :disable="busy"
                    color="negative"
                    icon="delete_outline"
                    :aria-label="`Delete ${task.title}`"
                    @click="emit('delete', task)"
                />
            </div>
        </QItemSection>
    </QItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '@/types/task'

const props = defineProps<{
    task: Task
    busy: boolean
}>()

const DESCRIPTION_PREVIEW_LENGTH = 120

const isCompleted = computed(() => props.task.completed)
const hasDescription = computed(() => Boolean(props.task.description))
const hasLongDescription = computed(
    () => props.task.description.length > DESCRIPTION_PREVIEW_LENGTH,
)
const completionAriaLabel = computed(
    () => `${props.task.completed ? 'Reopen' : 'Complete'} ${props.task.title}`,
)
const titleClass = computed(() => (props.task.completed ? 'text-grey-6 text-strike' : 'text-dark'))
const taskItemClass = computed(() => ({
    'is-complete': isCompleted.value,
}))

const emit = defineEmits<{
    toggle: [task: Task]
    edit: [task: Task]
    delete: [task: Task]
    details: [task: Task]
}>()

function formatDate(timestamp: string) {
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(
        new Date(timestamp),
    )
}
</script>
