// transliterate.js
export function transliterateWord(word) {
  const map = {
    amar: 'আমার',
    baba: 'বাবা',
    ma: 'মা',
    chhele: 'ছেলে',
    meye: 'মেয়ে'
    // আরও শব্দ যোগ করা যাবে
  };
  return map[word.toLowerCase()] || word;
}
