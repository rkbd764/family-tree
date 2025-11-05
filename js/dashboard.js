import { getTreeNames } from './firebase-config.js';

// ====== Form Elements ======
const form = document.getElementById('member-form');
const fatherInput = document.getElementById('father');
const motherInput = document.getElementById('mother');
const remarkInput = document.getElementById('remark');

// ====== Setup Father/Mother Dropdown ======
getTreeNames().then(names => {
    setupDropdown(fatherInput, names);
    setupDropdown(motherInput, names);
});

function setupDropdown(input, list) {
    const datalistId = input.id + '-list';
    let datalist = document.getElementById(datalistId);
    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = datalistId;
        document.body.appendChild(datalist);
        input.setAttribute('list', datalistId);
    }
    datalist.innerHTML = list.map(n => `<option value="${n}">`).join('');
}

// ====== Form Validation ======
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Minimum one parent required
    if (!fatherInput.value && !motherInput.value) {
        alert('পিতার নাম বা মাতার নামের মধ্যে কমপক্ষে একটি পূরণ করুন।');
        return;
    }

    // Optional: max 150 chars for remark
    if (remarkInput.value.length > 150) {
        alert('Remark ১৫০ অক্ষরের বেশি হতে পারবে না।');
        return;
    }

    alert('সাবমিট সফল!');
    form.reset();
});

// ====== Auto Bangla Typing ======
const banglaMap = {
    'amar': 'আমার',
    'pita': 'পিতা',
    'mata': 'মাতা',
    'shishu': 'শিশু'
    // আরও চাইলে এখানে শব্দগুলো যোগ করা যাবে
};

function transliterateWord(word) {
    return banglaMap[word.toLowerCase()] || word;
}

function handleAutoBanglaTyping(input) {
    input.addEventListener('keyup', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            let words = input.value.split(' ');
            words[words.length - 2] = transliterateWord(words[words.length - 2]);
            input.value = words.join(' ');
        }
    });
}

handleAutoBanglaTyping(fatherInput);
handleAutoBanglaTyping(motherInput);
handleAutoBanglaTyping(remarkInput);
