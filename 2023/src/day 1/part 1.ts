export default function (contents: string) {
  let value = 0;
  for (const e of contents.split("\n")) {
    if (e.length == 0) continue;

    let firstDigit = -1, lastDigit = -1;
    for (const char of e) {
      let digit = Number(char)
      if (isNaN(digit)) continue;

      if (firstDigit === -1) firstDigit = digit;
      lastDigit = digit;
    }

    if (firstDigit === -1 || lastDigit === -1) {
      console.error(`Error on string ${e}`);
    }

    value += (firstDigit * 10) + lastDigit;
  }

  return value;
}