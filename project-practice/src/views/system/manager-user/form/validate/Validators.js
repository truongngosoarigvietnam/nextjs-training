
export default function useValidators() {
    const isEmpty = (fieldName, fieldValue) => {
        return !fieldValue ? "The " + fieldName + " field is required" : "";
    }

    const minLength = (fieldName, fieldValue, min) => {
        return fieldValue.length < min ? `The ${fieldName} field must be atleast ${min} characters long` : "";
    }
    const isEmail = (fieldName, fieldValue) => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(fieldValue) ? "The input is not a valid " + fieldName + " address" : "";
    }
    const isNum = (fieldName, fieldValue) => {
        let isNum = /^\d+$/.test(fieldValue);
        let isLocal = /(0[3|5|7|8|9])+([0-9]{8})\b/g.test(fieldValue)
        return !isNum ? "The " + fieldName + " field only have numbers" :(!isLocal ? "The " + fieldName + "must be correct vietnam phone number" : "" );
    }
    return { isEmpty, minLength, isEmail , isNum }
}