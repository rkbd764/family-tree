// transliterate.js (ES Module)

export default function transliterate(input) {
    if (!input) return "";

    input = input.toLowerCase();

    const map = {
        "kh": "খ",
        "gh": "ঘ",
        "ch": "ছ",
        "jh": "ঝ",
        "th": "থ",
        "dh": "ধ",
        "ph": "ফ",
        "bh": "ভ",
        "sh": "শ",
        "ss": "ষ",
        "ng": "ঙ",
        "ny": "ঞ",

        "a": "া",
        "i": "ি",
        "u": "ু",
        "e": "ে",
        "o": "ো",
        "aa": "া",
        "ee": "ী",
        "oo": "ূ",

        "k": "ক",
        "g": "গ",
        "c": "চ",
        "j": "জ",
        "t": "ত",
        "d": "দ",
        "n": "ন",
        "p": "প",
        "b": "ব",
        "m": "ম",
        "y": "য",
        "r": "র",
        "l": "ল",
        "s": "স",
        "h": "হ",

        "q": "ক",
        "v": "ভ",
        "x": "ক্স",

        "t": "ট",
        "d": "ড",
        "n": "ণ"
    };

    let result = input;

    // Sort keys by length to convert "kh" before "k"
    const keys = Object.keys(map).sort((a, b) => b.length - a.length);

    keys.forEach(key => {
        const regex = new RegExp(key, "g");
        result = result.replace(regex, map[key]);
    });

    return result;
}
