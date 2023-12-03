export default function (contents: string) {
  let value = 0;

  for (const line of contents.split("\n")) {
    if (line.length === 0) continue;
    const [_, parsedDraws] = lineParser(line);
    const minimumNumberOfCubes: Record<string, number> = {};
    for (const parsedDraw of parsedDraws) {
      for (const color of Object.keys(parsedDraw)) {
        if (!minimumNumberOfCubes[color]) minimumNumberOfCubes[color] = parsedDraw[color];
        if (minimumNumberOfCubes[color] < parsedDraw[color]) minimumNumberOfCubes[color] = parsedDraw[color];
      }
    }
    value += Object.values(minimumNumberOfCubes).reduce((pv, cv) => pv * cv);
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

interface parsedDraw extends Record<string, number> {
  red: number,
  green: number,
  blue: number
}