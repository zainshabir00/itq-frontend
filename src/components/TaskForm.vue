<template>
    <QForm @submit.prevent="submitForm">
        <QCardSection class="q-pt-none">
            <QInput
                id="task-title"
                v-model="titleInput"
                :disable="loading"
                label="Task title *"
                outlined
                dense
                maxlength="100"
                placeholder="e.g. Plan the weekend"
                :error="hasFormError"
                :error-message="formError"
            />
            <QInput
                id="task-description"
                v-model="descriptionInput"
                :disable="loading"
                label="Description"
                hint="OPTIONAL"
                class="q-mt-md"
                type="textarea"
                outlined
                maxlength="1000"
                placeholder="Add a few details to help you get started..."
                rows="4"
            />
        </QCardSection>
        <QCardActions
            align="right"
            class="q-pa-md"
        >
            <QBtn
                flat
                no-caps
                :disable="loading"
                label="Cancel"
                @click="emit('cancel')"
            />
            <QBtn
                color="primary"
                unelevated
                no-caps
                :loading="loading"
                :label="submitLabel"
                icon="check"
                type="submit"
            />
        </QCardActions>
    </QForm>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
    initialTitle?: string
    initialDescription?: string
    submitLabel: string
    loading: boolean
}>()

const emit = defineEmits<{
    submit: [values: { title: string; description: string }]
    cancel: []
}>()

const titleInput = ref('')
const descriptionInput = ref('')
const formError = ref('')
const hasFormError = computed(() => Boolean(formError.value))

watch(
    () => [props.initialTitle, props.initialDescription] as const,
    ([title, description]) => {
        titleInput.value = title ?? ''
        descriptionInput.value = description ?? ''
        formError.value = ''
    },
    { immediate: true },
)

function submitForm() {
    const title = titleInput.value.trim()
    if (!title) {
        formError.value = 'Add a title before saving this task.'
        return
    }

    emit('submit', { title, description: descriptionInput.value.trim() })
}
</script>
