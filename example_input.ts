import { lines } from "./lines.ts";

/**
 * Returns a python like input reader.
 */
function inputReader(r: Deno.Reader) {
  const lineReader = lines(r);
  /**
   * Python like input reader. Returns an array containing at the first index
   * the line read and at the second index a boolean indicating whether the eof
   * has been reached.
   */
  return async function input(output: string) {
    if (output) {
      Deno.stdout.write(new TextEncoder().encode(output));
    }
    const { value: line, done: eof } = await lineReader.next();
    return [line, eof];
  };
}

(async () => {
  const input = inputReader(Deno.stdin);
  console.log("-- DENO ADDER --");
  // get the value and whether it's the eof
  const [num1, eof] = await input("Enter a number: ");
  console.log(eof);
  // just get the value
  const num2 = (await input("Enter another number: "))[0];
  console.log(`${num1} + ${num2} = ${Number(num1) + Number(num2)}`);
})();
