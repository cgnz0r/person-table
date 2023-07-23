<script setup>
    import { ref, watch } from 'vue';
    import { usePersonStore } from '@/stores/personStore.js';
    import { BUTTON_TYPES } from '@/common/constants.js';
    import AppButton from '@/components/base/AppButton.vue';
    import FileCopy from '@/components/icons/FileCopy.vue';

    const emit = defineEmits(['close']);
    const { getJson } = usePersonStore();

    const json = ref(getJson());

    const copyJson = () => {
        navigator.clipboard.writeText(json.value);
    }
</script>

<template>
    <div class="json-view">
        <textarea 
            class="textarea"
            v-model="json" 
            disabled 
        />
        <AppButton 
            class="button_copy-json"
            :custom-type="BUTTON_TYPES.ICON"
            @click="copyJson"
        >
            <FileCopy />
        </AppButton>
    </div>
</template>