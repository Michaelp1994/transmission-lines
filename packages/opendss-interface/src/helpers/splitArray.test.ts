import splitStringsIntoRows from "./splitArray";

test("should split an array of strings into rows with a maximum length of 150 characters", () => {
  // Example usage:
  const inputArray = ["abcde", "xyz", "ijklm", "uvwxy", "qrst"];
  const result = splitStringsIntoRows(inputArray);
  result.forEach((row) => {
    const rowLength = row.length;
    // const rowLength = row.reduce((acc, str) => acc + str.length, 0);
    expect(rowLength).toBeLessThanOrEqual(150);
  });
});
