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

export function generateShortCode(id: number): string {
  const base = NumberToBase62(id);

  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";

  const L1 = letters[Math.floor(Math.random() * letters.length)];
  const D1 = digits[Math.floor(Math.random() * digits.length)];

  return `${L1}${D1}${base}`;
}

export function decodeShortCode(shortCode: string): number {
  const base62 = shortCode.slice(2); 
  return Base62ToNumber(base62);
}
