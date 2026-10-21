<template>
    <div class="row q-col-gutter-md q-mb-xl">
        <div class="col-12 col-md-7">
            <QCard
                class="full-height shadow-1 rounded-borders"
                bordered
            >
                <QCardSection class="row items-center justify-between q-pa-lg">
                    <div>
                        <div
                            class="progress-label row items-center q-gutter-sm text-overline text-grey-7"
                        >
                            <QIcon
                                name="task_alt"
                                color="primary"
                                size="20px"
                            />
                            <span>YOUR PROGRESS</span>
                        </div>
                        <div class="column q-gutter-xs q-mt-md">
                            <QItemLabel class="text-subtitle1 text-weight-bold text-dark">
                                {{ progressTitle }}
                            </QItemLabel>
                            <QItemLabel
                                v-if="hasRemainingTasks"
                                class="text-body2 text-grey-7"
                            >
                                {{ remainingTaskMessage }}
                            </QItemLabel>
                            <QItemLabel
                                v-else-if="hasCompletedTasks"
                                class="text-body2 text-grey-7"
                            >
                                You made it through your list.
                            </QItemLabel>
                            <QItemLabel
                                v-else
                                class="text-body2 text-grey-7"
                            >
                                Your next small win is just around the corner.
                            </QItemLabel>
                        </div>
                    </div>
                    <QCircularProgress
                        show-value
                        :value="progress"
                        size="82px"
                        :thickness="0.12"
                        color="primary"
                        track-color="deep-purple-1"
                        class="text-dark"
                        role="img"
                        :aria-label="progressAriaLabel"
                    >
                        <span class="text-subtitle1 text-weight-bold text-dark">
                            {{ progress }}<small class="text-caption text-grey-7">%</small>
                        </span>
                    </QCircularProgress>
                </QCardSection>
            </QCard>
        </div>

        <div class="col-12 col-md-5">
            <QCard
                class="full-height shadow-1 rounded-borders"
                bordered
            >
                <QCardSection class="row items-center justify-evenly q-pa-md">
                    <QItem class="q-pa-none">
                        <QItemSection avatar>
                            <QIcon
                                name="format_list_bulleted"
                                color="primary"
                                size="22px"
                            />
                        </QItemSection>
                        <QItemSection>
                            <QItemLabel class="text-h6 text-weight-bold text-dark">
                                {{ totalCount }}
                            </QItemLabel>
                            <QItemLabel caption>Total tasks</QItemLabel>
                        </QItemSection>
                    </QItem>
                    <QSeparator
                        vertical
                        inset
                    />
                    <QItem class="q-pa-none">
                        <QItemSection avatar>
                            <QIcon
                                name="task_alt"
                                color="positive"
                                size="22px"
                            />
                        </QItemSection>
                        <QItemSection>
                            <QItemLabel class="text-h6 text-weight-bold text-dark">
                                {{ completedCount }}
                            </QItemLabel>
                            <QItemLabel caption>Completed</QItemLabel>
                        </QItemSection>
                    </QItem>
                </QCardSection>
            </QCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    totalCount: number
    remainingCount: number
    completedCount: number
    progress: number
}>()

const hasRemainingTasks = computed(() => props.remainingCount > 0)
const hasCompletedTasks = computed(() => props.totalCount > 0)
const progressTitle = computed(() =>
    props.remainingCount === 0 && props.totalCount > 0 ? 'Everything is done!' : 'You’ve got this.',
)
const remainingTaskMessage = computed(() => {
    const taskLabel = props.remainingCount === 1 ? 'task' : 'tasks'

    return `${props.remainingCount} ${taskLabel} left on your list`
})
const progressAriaLabel = computed(() => `${props.progress}% of tasks completed`)
</script>
