import { reactive, computed } from 'vue';

let idx = 0;

const state = reactive({
    personList: []
});

export function usePersonStore() {
    const personList = computed(() => state.personList);
    
    const getJson = () => {
        const filteredPersonList = state.personList.map(person => {
            const { id, ...fields } = person;
            return fields;
        });
        return JSON.stringify(filteredPersonList, null, 4);
    }

    const addPerson = (person) => {
        state.personList.push({ ...person, id: ++idx });
    }

    const removePerson = (person) => {
        const idx = state.personList.findIndex(p => p.id === person.id);
        state.personList.splice(idx, 1);
    }

    return {
        state,

        personList,
        getJson,
        addPerson,
        removePerson
    }
}