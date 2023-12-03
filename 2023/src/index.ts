import MyInterface from "./Myinterface";

const ADVENT_DAYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];
const ADVENT_DAY_PART = ["1", "2"];

const contents = await Bun.file(`${import.meta.dir}/input.txt`).text();

const rl = new MyInterface(process.stdin, process.stdout);

const day = await rl.question("Which day do you want to start?\n> ", {expectedOutput: ADVENT_DAYS});;
const part = await rl.question(`Which part do you want to start in day ${day}?\n> `, {expectedOutput: ADVENT_DAY_PART});

try {
  const func = (await import(`${import.meta.dir}/day ${day}/part ${part}.js`)).default;
  console.log(func(contents));
} catch (e) {
  console.error(e);
}

rl.close();
