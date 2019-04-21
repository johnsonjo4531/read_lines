import { runTests, test } from "https://deno.land/std@v0.3.4/testing/mod.ts";
import { assertEquals } from "https://deno.land/std@v0.3.4/testing/asserts.ts";
import { lines, linesBuffer } from "./lines.ts";

test(async function linesBufferTest() {
	const line1 = "Something something";
	const line2 = "Blah blah blah";
	const line3 = "";
	const line4 = "Don't know what to write here";
	const encoder = new TextEncoder();
	const input = new Deno.Buffer();
	const outputLine1 = new Deno.Buffer();
	const outputLine2 = new Deno.Buffer();
	const outputLine3 = new Deno.Buffer();
	const outputLine4 = new Deno.Buffer();
	input.write(encoder.encode(`${line1}\n${line2}\n${line3}\n${line4}`));
	outputLine1.write(encoder.encode(line1));
	outputLine2.write(encoder.encode(line2));
	outputLine3.write(encoder.encode(line3));
	outputLine4.write(encoder.encode(line4));
	const expected = [outputLine1, outputLine2, outputLine3, outputLine4];

	const output = [];
	for await (const lineBuff of linesBuffer(input)) {
		output.push(lineBuff);
	}

	assertEquals(output, expected);
});

test(async function linesTest() {
	const line1 = "Something something";
	const line2 = "Blah blah blah";
	const line3 = "";
	const line4 = "Don't know what to write here";
	const encoder = new TextEncoder();
	const input = new Deno.Buffer();
	input.write(encoder.encode(`${line1}\n${line2}\n${line3}\n${line4}`));
	const expected = [line1, line2, line3, line4];

	const output = [];
	for await (const lineBuff of lines(input)) {
		output.push(lineBuff);
	}

	assertEquals(output, expected);
});

runTests();
