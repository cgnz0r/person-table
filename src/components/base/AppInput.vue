<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        label: {
            type: String,
            required: false
        },
        type: {
            type: String,
            default: 'text'
        },
        id: {
            type: String
        },
        modelValue: {
            type: String
        }
    });

    const emit = defineEmits(['update:modelValue']);

    const filteredProps = computed(() => {
        const { label, modelValue, ...attrs } = props;
        return attrs;
    });

    const inputWrapperClasses = computed(() => [
        'input-wrapper',
        `input-wrapper_${props.type}`
    ]);

    const updateValue = (event) => {
        emit('update:modelValue', event.target.value);
    }
</script>

<template>
    <div :class="inputWrapperClasses">
        <template v-if="props.label">
            <label :for="props.id">{{ props.label }}</label>
        </template>
        <input
            v-bind="filteredProps" 
            :value="props.modelValue"
            @input="updateValue"
        />
    </div>
</template>