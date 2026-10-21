<template>
    <QHeader
        elevated
        class="bg-white text-dark"
    >
        <QToolbar class="workspace q-mx-auto q-px-md">
            <QToolbarTitle class="text-h6 text-weight-bolder">
                <QAvatar
                    rounded
                    text-color="white"
                    color="primary"
                    icon="task_alt"
                />
                <span class="q-ml-sm">daymark<span class="text-primary">.</span></span>
            </QToolbarTitle>
            <div class="row items-center no-wrap q-gutter-sm text-caption text-grey-7">
                <QIcon
                    name="fiber_manual_record"
                    color="positive"
                    size="sm"
                />
                <span>A little progress, every day</span>
            </div>
        </QToolbar>
    </QHeader>
</template>

<script setup lang="ts"></script>
