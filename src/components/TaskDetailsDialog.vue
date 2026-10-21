<template>
    <QDialog
        v-model="isOpen"
        @update:model-value="handleDialogUpdate"
    >
        <QCard class="dialog-card bg-white rounded-borders">
            <QCardSection class="row items-start justify-between">
                <div>
                    <p class="eyebrow text-overline text-grey-7">TASK DETAILS</p>
                    <h2 class="text-h5 text-weight-bold text-dark q-my-none">
                        {{ task?.title }}
                    </h2>
                </div>
                <QBtn
                    round
                    flat
                    dense
                    icon="close"
                    aria-label="Close dialog"
                    @click="emit('close')"
                />
            </QCardSection>
            <QCardSection class="details-description text-body1 text-grey-8">
                {{ task?.description }}
            </QCardSection>
            <QCardActions
                align="right"
                class="q-pa-md"
            >
                <QBtn
                    flat
                    no-caps
                    label="Close"
                    @click="emit('close')"
                />
                <QBtn
                    color="primary"
                    unelevated
                    no-caps
                    label="Edit task"
                    icon="edit"
                    @click="emit('edit')"
                />
            </QCardActions>
        </QCard>
    </QDialog>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task'

defineProps<{
    task: Task | null
}>()

const emit = defineEmits<{
    close: []
    edit: []
}>()

const isOpen = defineModel<boolean>({ required: true })

function handleDialogUpdate(isOpen: boolean) {
    if (!isOpen) {
        emit('close')
    }
}
</script>
