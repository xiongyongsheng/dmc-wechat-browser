export default function formatHideString(string, { start = 0, count = string.length, divide = "*" } = {}) {
  const stringArr = string.toString().split("");
  return `${stringArr.slice(0, start).join("")}${stringArr.slice(start, start + count).map(() => divide).join("")}${stringArr.slice(start + count).join("")}`;
}
