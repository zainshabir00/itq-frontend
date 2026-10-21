<template>
    <QDialog
        v-model="isOpen"
        :persistent="isCreatingTask"
        @update:model-value="handleDialogUpdate"
    >
        <QCard class="dialog-card bg-white rounded-borders">
            <QCardSection class="row items-start justify-between">
                <div>
                    <p class="eyebrow text-overline text-grey-7">A NEW BEGINNING</p>
                    <h2 class="text-h5 text-weight-bold text-dark q-my-none">Add a task</h2>
                </div>
                <QBtn
                    round
                    flat
                    dense
                    :disable="isCreatingTask"
                    icon="close"
                    aria-label="Close dialog"
                    @click="emit('close')"
                />
            </QCardSection>
            <QBanner
                v-if="createError"
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
                {{ createError }}
            </QBanner>
            <TaskForm
                submit-label="Create task"
                :loading="isCreatingTask"
                @submit="emit('create', $event)"
                @cancel="emit('close')"
            />
        </QCard>
    </QDialog>
</template>

<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue'

defineProps<{
    isCreatingTask: boolean
    createError: string
}>()

const emit = defineEmits<{
    close: []
    create: [values: { title: string; description: string }]
}>()

const isOpen = defineModel<boolean>({ required: true })

function handleDialogUpdate(isOpen: boolean) {
    if (!isOpen) {
        emit('close')
    }
}
</script>
