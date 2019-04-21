import { input } from "../input.ts";

(async () => {
	console.log("-- DENO ADDER --");
	// get the next line throws if it reaches the EOF
	const num1 = await input("Enter a number: ");
	const num2 = await input("Enter another number: ");
	console.log(`${num1} + ${num2} = ${Number(num1) + Number(num2)}`);
})();
