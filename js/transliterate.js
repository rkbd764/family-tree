// transliterate.js — Full Bangla Phonetic Engine

export default function transliterate(input) {
  if (!input) return "";

  const map = {
    "kh": "খ", "gh": "ঘ", "ch": "ছ", "jh": "ঝ",
    "th": "থ", "dh": "ধ", "ph": "ফ", "bh": "ভ",
    "sh": "শ", "ss": "ষ", "ng": "ঙ", "ny": "ঞ",
    "Rh": "ঢ়",

    "aa": "া", "ee": "ী", "oo": "ূ",

    "a": "া", "i": "ি", "u": "ু", "e": "ে", "o": "ো",
    "k": "ক", "g": "গ", "c": "চ", "j": "জ",
    "t": "ত", "d": "দ", "n": "ন",
    "p": "প", "f": "ফ", "b": "ব", "m": "ম",

    "y": "য", "r": "র", "l": "ল", "s": "স", "h": "হ",

    "T": "ট", "D": "ড", "N": "ণ", "S": "স", "R": "ড়",

    "v": "ভ", "x": "ক্স", "q": "ক"
  };

  input = input.toLowerCase().trim();
  let out = "";

  for (let i = 0; i < input.length; i++) {
    let two = input.substring(i, i + 2);
    if (map[two]) {
      out += map[two];
      i++;
      continue;
    }

    let one = input[i];
    out += map[one] || one;
  }

  return out;
}
