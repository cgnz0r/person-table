export const BUTTON_TYPES = {
    ICON: 'icon',
    TEXT: 'text'
}

export const PERSON = {
    COLOR_LIST: ['red', 'green', 'blue', 'white', 'black'],
    CONTACT_PREFERENCES: ['by email', 'by phone call', 'via SMS']
}

export const VALIDATION = {
    TYPES: {
        EMAIL: 'email',
        NUMBER: 'number',
        ARRAY: 'array'
    },
    EMAIL_REGEXP: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    REASONS: {
        EMAIL_REASON: 'Incorrect Email',
        MIN_NUMBER_REASON: 'Should be greater or equals to',
        MAX_NUMBER_REASON: 'Should be less or equals to',
        MIN_ARRAY_LENGTH_REASON: 'Please choose at least',
        MAX_ARRAY_LENGTH_REASON: 'Please choose less or equals to'
    }
}