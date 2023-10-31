import checkPhoneNumber from "./checkPhoneNumber";
export default function formatPhoneNumber(number, { before = 3, after = 7, divide = " ", isCheckPhoneNumber = !0 } = {}) {
  try {
    const phoneString = number.toString().replace(/\D/g, "");
    if (checkPhoneNumber(phoneString) || !isCheckPhoneNumber) {
      const beforeString = phoneString.slice(0, before), middleString = phoneString.slice(before, after), afterString = phoneString.slice(after, phoneString.length);
      return {
        value: [beforeString, middleString, afterString].filter((item) => item !== "").join(divide),
        trimValue: phoneString,
        beforeString,
        middleString,
        afterString,
        flag: !0
      };
    }
    return {
      value: number,
      trimValue: phoneString,
      beforeString: "",
      middleString: "",
      afterString: "",
      flag: !1
    };
  } catch (err) {
    return console.error("err: ", err), "";
  }
}
