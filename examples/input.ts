import { input } from "../input.ts";

(async () => {
	console.log("-- DENO ADDER --");
	const num1 = String(await input("Enter a number: "));
	const num2 = String(await input("Enter another number: "));
	console.log(`${num1} + ${num2} = ${Number(num1) + Number(num2)}`);
})();
