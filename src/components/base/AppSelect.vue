<script setup>
    const props = defineProps({
        selectPlaceholder: {
            type: String,
            default: 'Please select one'
        },
        modelValue: {
            type: String
        },
        list: {
            type: Array
        }
    });

    const emit = defineEmits(['update:modelValue']);

    const onSelectChange = (event) => {
        emit('update:modelValue', event.target.value);
    }
</script>

<template>
    <select 
        class="select"
        :value="props.modelValue" 
        @change="onSelectChange"
    >
        <option disabled value="">{{ props.selectPlaceholder }}</option>
        <option 
            v-for="item in props.list" 
            :key="item" 
            :value="item"
        >
            {{ item }}
        </option>
    </select>
</template>