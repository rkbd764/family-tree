document.querySelectorAll('.member').forEach(member => {
  member.addEventListener('click', e => {
    e.stopPropagation();

    // Toggle only the direct child UL
    let nextUl = member.nextElementSibling;
    if(nextUl && nextUl.tagName === 'UL') {
      nextUl.style.display = nextUl.style.display === 'block' ? 'none' : 'block';
    }
  });
});

function searchTree() {
  let query = document.getElementById('searchInput').value.trim().toLowerCase();
  let members = document.querySelectorAll('.member');
  let found = false;

  function transliterate(input) {
    const map = {
          'a':'া','i':'ি','u':'ু','e':'ে','o':'ো',
    'aa':'া','ee':'ী','oo':'ূ',

    'kh':'খ','gh':'ঘ','ch':'ছ','jh':'ঝ','th':'থ','dh':'ধ','ph':'ফ','bh':'ভ',
    'k':'ক','g':'গ','c':'চ','j':'জ','t':'ত','d':'দ','n':'ন','p':'প','f':'ফ','b':'ব','m':'ম',
    'y':'য','r':'র','l':'ল','s':'স','h':'হ',

    'sh':'শ','ss':'ষ','zh':'ঝ',
    'ng':'ঙ','ny':'ঞ',

    'T':'ট','D':'ড','N':'ণ','S':'স','R':'ড়','Rh':'ঢ়',

    'q':'ক','x':'ক্স','v':'ভ'


    };
    return map[input] || input;
  }

  members.forEach(m => m.classList.remove('highlight'));
  document.querySelectorAll('.tree ul').forEach(ul => ul.style.display = 'none');

  members.forEach(member => {
    let name = member.dataset.name.toLowerCase();
    let tQuery = transliterate(query).toLowerCase();
    if(name.includes(tQuery)) {
      found = true;
      member.classList.add('highlight');

      // Open all parent ULs
      let parent = member.parentElement;
      while(parent && parent.id !== 'treeContainer') {
        if(parent.tagName === 'UL') parent.style.display = 'block';
        parent = parent.parentElement;
      }
    }
  });

  if(!found) {
    alert('দুঃখিত এই নামে অত্র পরিবার বৃক্ষে কাউকে খুঁজে পাওয়া যায়নি');
  }
}
