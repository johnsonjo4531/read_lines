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
    return lineReader.next();
  };
}

(async () => {
  const input = inputReader(Deno.stdin);
  console.log("-- DENO ADDER --");
  // get the value and whether the iterator is finished
  const { value: num1, done } = await input("Enter a number: ");
  // just get the value
  const num2 = (await input("Enter another number: ")).value;
  console.log(`${num1} + ${num2} = ${Number(num1) + Number(num2)}`);
})();
