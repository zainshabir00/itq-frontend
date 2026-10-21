<template>
    <QDialog
        v-model="isOpen"
        :persistent="isUpdatingTask"
        @update:model-value="handleDialogUpdate"
    >
        <QCard class="dialog-card bg-white rounded-borders">
            <QCardSection class="row items-start justify-between">
                <div>
                    <p class="eyebrow text-overline text-grey-7">MAKE IT JUST RIGHT</p>
                    <h2 class="text-h5 text-weight-bold text-dark q-my-none">Edit task</h2>
                </div>
                <QBtn
                    round
                    flat
                    dense
                    :disable="isUpdatingTask"
                    icon="close"
                    aria-label="Close dialog"
                    @click="emit('close')"
                />
            </QCardSection>
            <QBanner
                v-if="updateError"
                class="q-mx-md q-mb-sm bg-amber-1 text-dark"
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
                {{ updateError }}
            </QBanner>
            <TaskForm
                :initial-title="task?.title"
                :initial-description="task?.description"
                submit-label="Save changes"
                :loading="isUpdatingTask"
                @submit="emit('update', $event)"
                @cancel="emit('close')"
            />
        </QCard>
    </QDialog>
</template>

<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue'
import type { Task } from '@/types/task'

defineProps<{
    task: Task | null
    isUpdatingTask: boolean
    updateError: string
}>()

const emit = defineEmits<{
    close: []
    update: [values: { title: string; description: string }]
}>()

const isOpen = defineModel<boolean>({ required: true })

function handleDialogUpdate(isOpen: boolean) {
    if (!isOpen) {
        emit('close')
    }
}
</script>
