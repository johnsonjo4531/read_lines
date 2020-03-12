import { input } from "../input.ts";

(async () => {
	console.log("-- DENO ADDER --");
	const num1 = await input("Enter a number: ");
	const num2 = await input("Enter another number: ");
	if(num1 != Deno.EOF && num2 != Deno.EOF) {
		console.log(`${num1} + ${num2} = ${Number(num1) + Number(num2)}`);
	}
})();
