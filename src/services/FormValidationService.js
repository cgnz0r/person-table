import { VALIDATION } from "@/common/constants";

const { 
    EMAIL_REASON,
    MIN_NUMBER_REASON,
    MAX_NUMBER_REASON,
    MIN_ARRAY_LENGTH_REASON,
    MAX_ARRAY_LENGTH_REASON
} = VALIDATION.REASONS;

const VALID_VALIDATION_OBJECT = {
    isValid: true
}

const validate = (args, validator, reason) => {
    const validation = {
        isValid: validator(...args)
    }

    if (!validation.isValid) {
        validation.reason = reason;
    }

    return validation;
}

const validateEmail = (args) => {
    const isValid = (email) => {
        return VALIDATION.EMAIL_REGEXP.test(email);
    }

    return validate(args, isValid, EMAIL_REASON);
}

const validateMinNumberLength = (args, rules) => {
    if (typeof rules.min === 'undefined') return VALID_VALIDATION_OBJECT;

    const isValid = (number) => {
        return number >= rules.min;
    }

    const reason = `${MIN_NUMBER_REASON} ${rules.min}`;

    return validate(args, isValid, reason);
}

const validateMaxNumberLength = (args, rules) => {
    if (typeof rules.max === 'undefined') return VALID_VALIDATION_OBJECT;

    const isValid = (number) => {
        return number <= rules.max;
    }

    const reason = `${MAX_NUMBER_REASON} ${rules.max}`;

    return validate(args, isValid, reason);
}

const validateMinArrayLength = (args, rules) => {
    if (typeof rules.min === 'undefined') return VALID_VALIDATION_OBJECT;

    const isValid = (array) => {
        return array.length >= rules.min;
    }

    const reason = `${MIN_ARRAY_LENGTH_REASON} ${rules.min}`;

    return validate(args, isValid, reason);

}

const validateMaxArrayLength = (args, rules) => {
    if (typeof rules.max === 'undefined') return VALID_VALIDATION_OBJECT;

    const isValid = (array) => {
        return array.length <= rules.max;
    }

    const reason = `${MAX_ARRAY_LENGTH_REASON} ${rules.max}`;

    return validate(args, isValid, reason);
}

const validatorsByType = {
    email: [validateEmail],
    number: [validateMinNumberLength, validateMaxNumberLength],
    array: [validateMinArrayLength, validateMaxArrayLength]
}

export function validateFields(fields) {
    let isValid = true;
    
    for (let fieldIdx = 0; fieldIdx < fields.length; fieldIdx++) {
        const field = fields[fieldIdx];
        const validators = validatorsByType[field.type];
        
        // check until the first error by field
        // field can have only one error to avoid scaring the user with a large list of errors
        for (let i = 0; i <= validators.length - 1; i++) {
            const validator = validators[i];
            const validation = validator(field.values, field.rules);
            
            if (!validation.isValid) {
                field.errorField.message = validation.reason;
                isValid = false;
                break;
            }
        }
    }

    return isValid;
}