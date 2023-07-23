<script setup>
    import CloseIcon from '@/components/icons/CloseIcon.vue';
    import AppButton from '@/components/base/AppButton.vue';
    import { BUTTON_TYPES } from '@/common/constants.js';

    const emit = defineEmits(['close']);

    const close = () => {
        emit('close');
    }
</script>

<template>
    <div class="modal-overlay" @mousedown="close">
        <div class="modal" @mousedown.stop>
            <div class="modal__header">
                <AppButton :custom-type="BUTTON_TYPES.ICON">
                    <CloseIcon @click="close"/>
                </AppButton>
            </div>
            <div class="modal__content">
                <slot />
            </div>
        </div>
    </div>
</template>