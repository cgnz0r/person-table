<script setup>
    import { reactive, ref } from 'vue';
    import AppButton from '@/components/base/AppButton.vue';
    import AppInput from '@/components/base/AppInput.vue';
    import AppSelect from '@/components/base/AppSelect.vue';
    import FormValidationMessage from '@/components/base/FormValidationMessage.vue';
    import { PERSON, VALIDATION } from '@/common/constants.js';
    import { validateFields } from '@/services/FormValidationService.js';
    import { usePersonStore } from '@/stores/personStore.js';

    const emit = defineEmits(['close']);

    const { addPerson } = usePersonStore(); 

    const form = reactive({
        name: '',
        surname: '',
        email: '',
        age: 0,
        favoriteColor: '',
        contactPreferenceList: []
    });

    const formErrors = reactive({
        email: {
            message: ''
        },
        age: {
            message: ''
        },
        contactPreferenceList: {
            message: ''
        }
    });

    const getValidationRules = () => ([
        {
            values: [form.email],
            errorField: formErrors.email,
            type: VALIDATION.TYPES.EMAIL
        },
        {
            values: [form.age],
            errorField: formErrors.age,
            type: VALIDATION.TYPES.NUMBER,
            rules: {
                min: 0,
                max: 120
            }
        },
        {
            values: [form.contactPreferenceList],
            errorField: formErrors.contactPreferenceList,
            type: VALIDATION.TYPES.ARRAY,
            rules: {
                min: 1
            }
        }
    ]);

    const onUpdateName = v => form.name = v;
    const onUpdateSurname = v => form.surname = v;
    const onUpdateFavoriteColor = v => form.favoriteColor = v;

    const onUpdateEmail = email => {
        if (formErrors.email.message.length) {
            formErrors.email.message = '';
        }

        form.email = email;
    }

    const onUpdateAge = age => {
        if (formErrors.age.message.length) {
            formErrors.age.message = '';
        }

        form.age = age;
    }

    const onUpdateContactPreferenceList = (value) => {
        if (formErrors.contactPreferenceList.message.length) {
            formErrors.contactPreferenceList.message = '';
        }

        const idx = form.contactPreferenceList.indexOf(value);

        if (idx > -1) {
            form.contactPreferenceList.splice(idx, 1);
            return;
        }

        form.contactPreferenceList.push(value);
    }

    const onSubmit = () => {
        const isValid = validateFields(getValidationRules());

        if (!isValid) return;
    
        addPerson({
            name: form.name,
            surname: form.surname,
            email: form.email,
            age: form.age,
            favoriteColor: form.favoriteColor,
            contactPreferenceList: [...form.contactPreferenceList]
        });

        emit('close');
    }
</script>

<template>
    <form class="form" @submit.prevent="onSubmit">
        <AppInput 
            label="Name" 
            id="name" 
            :modelValue="form.name"
            @update:modelValue="onUpdateName"
            placeholder="Enter your name"
        />

        <AppInput 
            label="Surname" 
            id="surname" 
            :modelValue="form.surname"
            @update:modelValue="onUpdateSurname"
            placeholder="Enter your surname"
        />

        <AppInput 
            label="Email" 
            id="email" 
            :modelValue="form.email"
            @update:modelValue="onUpdateEmail"
            placeholder="Enter your email"
        />
        <FormValidationMessage
            :message="formErrors.email.message"
        />

        <AppInput 
            type="number"
            label="Age" 
            id="number" 
            :modelValue="form.age"
            @update:modelValue="onUpdateAge"
            placeholder="Enter your age"
        />
        <FormValidationMessage
            :message="formErrors.age.message"
        />

        <AppInput 
            type="checkbox"
            v-for="contancePref in PERSON.CONTACT_PREFERENCES" 
            :id="contancePref"
            :key="contancePref"
            :label="contancePref"
            :modelValue="contancePref"
            @update:modelValue="onUpdateContactPreferenceList"
        />
        <FormValidationMessage
            :message="formErrors.contactPreferenceList.message"
        />

        <AppSelect
            :list="PERSON.COLOR_LIST"
            :modelValue="form.favoriteColor"
            @update:modelValue="onUpdateFavoriteColor"
        />

        <AppButton type="submit">Submit</AppButton>
    </form>
</template>