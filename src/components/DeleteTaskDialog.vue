<template>
    <QDialog
        v-model="isOpen"
        :persistent="isDeletingTask"
        @update:model-value="handleDialogUpdate"
    >
        <QCard
            class="dialog-card confirm-dialog text-center bg-white rounded-borders"
            role="alertdialog"
            aria-labelledby="dialog-title-delete"
            aria-describedby="delete-description"
        >
            <QCardSection>
                <QBanner
                    v-if="deleteError"
                    class="q-mb-md bg-amber-1 text-dark text-left"
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
                    {{ deleteError }}
                </QBanner>
                <QIcon
                    class="q-mb-md"
                    name="delete_outline"
                    color="negative"
                    size="48px"
                    aria-hidden="true"
                />
                <h2
                    id="dialog-title-delete"
                    class="text-h6 text-weight-bold text-dark"
                >
                    Delete this task?
                </h2>
                <p
                    id="delete-description"
                    class="text-body2 text-grey-7 q-mt-sm q-mb-none"
                >
                    <strong>{{ task?.title }}</strong> will be removed from your list. This can’t be
                    undone.
                </p>
            </QCardSection>
            <QCardActions
                align="right"
                class="q-pa-md"
            >
                <QBtn
                    flat
                    no-caps
                    :disable="isDeletingTask"
                    label="Keep task"
                    @click="emit('close')"
                />
                <QBtn
                    color="negative"
                    unelevated
                    no-caps
                    :loading="isDeletingTask"
                    label="Delete task"
                    icon="delete"
                    @click="emit('confirm')"
                />
            </QCardActions>
        </QCard>
    </QDialog>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task'

defineProps<{
    task: Task | null
    isDeletingTask: boolean
    deleteError: string
}>()

const emit = defineEmits<{
    close: []
    confirm: []
}>()

const isOpen = defineModel<boolean>({ required: true })

function handleDialogUpdate(isOpen: boolean) {
    if (!isOpen) {
        emit('close')
    }
}
</script>
