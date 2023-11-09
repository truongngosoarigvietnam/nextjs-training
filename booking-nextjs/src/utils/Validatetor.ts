import { PASSWORD_MIN_LENGTH, URL_MAX_LENGTH } from "@/components/constants";
import { EMAIL_REGEX } from "@/components/constants/regex";
import {EMAIL_REQUIRED ,PLEASE_ENTER_VALID_FORMAT  , PASSWORD_REQUIRED, VALUE_REQUIRED} from "@/components/constants/message"





export const emailRules = (
  isRequired = false,
  requireMsg = EMAIL_REQUIRED,
  patternMsg = PLEASE_ENTER_VALID_FORMAT
) => {

  return {
    ...(isRequired && { required: requireMsg }),
    pattern: {
      value: EMAIL_REGEX,
      message: patternMsg,
    },
  };
};

export const passwordLoginRules = (isRequired = false) => {
  return {
    ...(isRequired && { required: PASSWORD_REQUIRED }),
  };
};
export const fieldRules = (isRequired = false) => {
    return {
        ...(isRequired && { required:  VALUE_REQUIRED}),
    };
  };

export const passwordRegisterRules = (isRequired = false) => {
  return {
    ...(isRequired && { required:PASSWORD_REQUIRED }),
    minLength: {
      value: PASSWORD_MIN_LENGTH,
      message: PLEASE_ENTER_VALID_FORMAT,
    },
  };
};


