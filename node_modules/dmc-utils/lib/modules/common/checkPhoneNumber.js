export default function checkPhoneNumber(number, { validator = /^[1][3456789][0-9]{9}$/ } = {}) {
  return validator instanceof RegExp ? validator.test(number) : validator instanceof Function ? validator(number) : (console.warn(`validator is ${typeof validator}`), !1);
}
