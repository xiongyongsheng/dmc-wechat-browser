export default function formatPrice(amount = 0) {
  if (amount === null)
    return "";
  const [integer, decimal] = amount.toString().split(".");
  let [...strArr] = integer, newStrArr = [], i = 0;
  const flag = integer.includes("-");
  return strArr.filter((item) => item !== "-").reverse().forEach((item, index) => {
    i < 3 ? (i++, newStrArr.push(item)) : (i = 1, newStrArr.push(","), newStrArr.push(item));
  }), flag && newStrArr.push("-"), `${newStrArr.reverse().join("")}.${decimal || "00"}`;
}
