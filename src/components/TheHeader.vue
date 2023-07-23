<script setup>
    import AppButton from '@/components/base/AppButton.vue';

    const emit = defineEmits(['openPersonModal', 'openJsonModal']);

    const openPersonForm = () => {
        emit('openPersonModal');
    }
    const openJsonForm = () => {
        emit('openJsonModal');
    }
</script>

<template>
    <header class="header">
        <AppButton @click="openPersonForm">Add Person</AppButton>
        <AppButton @click="openJsonForm">Export JSON</AppButton>
    </header>
</template>