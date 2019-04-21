(async () => {
  const encoder = new TextEncoder();
  const bytes = encoder.encode("a".repeat(10 ** 6));
  for (var i = 0; i < 1000; ++i) {
    await Deno.stdout.write(bytes);
  }
})();
