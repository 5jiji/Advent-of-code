export default function (contents: string) {
  let value = 0;

  const defaultRules = {
    red: 12,
    green: 13,
    blue: 14,
    total: 12 + 13 + 14,
  }

  for (const line of contents.split("\n")) {
    if (line.length === 0) continue;
    const [gameNumber, parsedDraws] = lineParser(line);
    let invalid = false;
    for (const parsedDraw of parsedDraws) {
      if (parsedDraw.green > defaultRules.green) invalid = true;
      if (parsedDraw.blue > defaultRules.blue) invalid = true;
      if (parsedDraw.red > defaultRules.red) invalid = true;
      if (parsedDraw.red + parsedDraw.green + parsedDraw.blue > defaultRules.total) invalid = true;
    }
    if (!invalid) value += gameNumber;
  }

  return value;
}

function lineParser(line: string): [number, parsedDraw[]] {
  const [gameNum, record] = line.split(": ");
  const gameNumber = Number(gameNum.split(" ")[1]);
  if (isNaN(gameNumber)) throw new Error(`Error on line ${line}`)

  const parsedDraws = recordParser(record);

  return [gameNumber, parsedDraws];
}

function recordParser(record: string): parsedDraw[] {
  const arr: parsedDraw[] = [];

  for (const draw of record.split("; ")) {
    arr.push(drawParser(draw));
  }

  return arr;
}

function drawParser(draw: string): parsedDraw {
  const parsedDraw: parsedDraw = {red: 0, green: 0, blue: 0};

  for (const e of draw.split(", ")) {
    const numberAndColor = e.split(" ");
    const number = Number(numberAndColor[0]);
    const color = numberAndColor[1] as "red" | "blue" | "green";
    parsedDraw[color] = number;
  }

  return parsedDraw;
}

interface parsedDraw {
  red: number,
  green: number,
  blue: number
}