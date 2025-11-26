const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charMap: Record<string, number> = {};

for (let i = 0; i < chars.length; i++) {
  charMap[chars[i]] = i;
}

export function NumberToBase62(num: number): string {
  if (num === 0) return "0";

  let result = "";

  while (num > 0) {
    const remainder = num % 62;
    result += chars[remainder];
    num = Math.floor(num / 62);
  }

  return result.split("").reverse().join("");
}

export function Base62ToNumber(str: string): number {
  let number = 0;

  for (const char of str) {
    number = number * 62 + charMap[char];
  }
  return number;
}
