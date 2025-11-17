const banglaMap = {
    'amar': 'আমার',
    'baba': 'বাবা',
    'ma': 'মা',
    'chhele': 'ছেলে',
    'meye': 'মেয়ে',
    'pita': 'পিতা',
    'mata': 'মাতা',
    'shishu': 'শিশু'
};

export function transliterateWord(word) {
    return banglaMap[word.toLowerCase()] || word;
}

export function handleAutoBanglaTyping(inputElement) {
    inputElement.addEventListener('keyup', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            const words = inputElement.value.split(' ');
            if (words.length >= 2) {
                words[words.length - 2] = transliterateWord(words[words.length - 2]);
                inputElement.value = words.join(' ');
            }
        }
    });
}
