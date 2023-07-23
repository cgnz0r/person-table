<script setup>
    import { ref, computed } from 'vue';
    import TheHeader from './components/TheHeader.vue';
    import TheTable from './components/TheTable.vue';
    import AppModal from './components/base/AppModal.vue';
    import FormPerson from './components/FormPerson.vue';
    import JsonView from './components/JsonView.vue';
    import { usePersonStore } from '@/stores/personStore.js';

    const { personList } = usePersonStore();

    const isPersonListEmpty = computed(() => !personList.value.length);

    const isPersonModalOpened = ref(false);
    const isJsonModalOpened = ref(false);

    const onPersonModalClose = () => {
        isPersonModalOpened.value = false;
    }
    const onJsonModalClose = () => {
        isJsonModalOpened.value = false;
    }
    const onPersonModalOpen = () => {
        isPersonModalOpened.value = true;
    }
    const onJsonModalOpen = () => {
        isJsonModalOpened.value = true;
    }
</script>

<template>
    <TheHeader 
        @openPersonModal="onPersonModalOpen" 
        @openJsonModal="onJsonModalOpen"
    />

    <main class="main">
        <h1 v-show="isPersonListEmpty">No data</h1>
        <Transition>
            <TheTable v-show="!isPersonListEmpty" />
        </Transition>
    </main>

    <Transition>
        <AppModal 
            v-show="isPersonModalOpened" 
            @close="onPersonModalClose"
        >
            <FormPerson @close="onPersonModalClose" />
        </AppModal>
    </Transition>

    <Transition>
        <AppModal 
            v-if="isJsonModalOpened" 
            @close="onJsonModalClose"
        >
            <JsonView @close="onJsonModalClose"/>
        </AppModal>
    </Transition>
</template>

<style lang="scss">
    @import "./assets/styles/main.scss";
</style>