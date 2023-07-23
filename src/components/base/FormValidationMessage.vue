<script setup>
    const props = defineProps({
        message: String
    });
</script>

<template>
    <div 
        class="form__error-message" 
        v-show="props.message.length"
    >
        {{ props.message }}
    </div>
</template>