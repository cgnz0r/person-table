<script setup>
    import { usePersonStore } from '@/stores/personStore.js';
    import { getStringFromArray, fixIfEmptyString } from '@/utils/output.js';
    import AppButton from '@/components/base/AppButton.vue';

    const { personList, removePerson } = usePersonStore();

    const remove = (person) => {
        const isConfirmed = confirm("Are you sure?");
        if (isConfirmed) removePerson(person);
    }
</script>

<template>
    <div class="table-container">
        <table class="table">
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Age</th>
                <th>Favorite Color</th>
                <th>Contact Preferences</th>
                <th></th>
            </tr>
            <tr v-for="person in personList" :key="person.id">
                <td>{{ person.name }}</td>
                <td>{{ person.surname }}</td>
                <td>{{ person.email }}</td>
                <td>{{ person.age }}</td>
                <td>{{ fixIfEmptyString(person.favoriteColor) }}</td>
                <td>{{ getStringFromArray(person.contactPreferenceList) }}</td>
                <td>
                    <AppButton 
                        class="button_remove-person"
                        @click="remove(person)"
                    >
                        Delete
                    </AppButton>
                </td>
            </tr>
        </table>
    </div>
</template>