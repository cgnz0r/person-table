<script setup>
    import { computed } from 'vue';
    import { BUTTON_TYPES } from '@/common/constants.js';

    const props = defineProps({
        customType: {
            type: String,
            default: BUTTON_TYPES.TEXT
        }
    });

    const filteredProps = computed(() => {
        const { customType, ...attrs } = props;
        return attrs;
    });

    const emit = defineEmits(['click']);
    
    const onClick = () => {
        emit('click');
    }

    const classes = computed(() => [
        'button',
        `button_${props.customType}`
    ]);
</script>

<template>
    <button 
        :class="classes"
        v-bind="filteredProps" 
        @click="onClick"
    >
        <slot />
    </button>
</template>