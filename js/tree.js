import { db } from './firebase-config.js';
import { transliterateWord } from './transliterate.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const treeContainer = document.getElementById('tree');
const searchInput = document.getElementById('search');

let familyData = [];

export async function getFamilyTree() {
    const snapshot = await getDocs(collection(db, "familyMembers"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return buildTree(data);
}

function buildTree(data) {
    const map = {};
    const roots = [];
    data.forEach(member => map[member.id] = { ...member, children: [] });
    data.forEach(member => {
        if (member.fatherId && map[member.fatherId]) map[member.fatherId].children.push(map[member.id]);
        else if (member.motherId && map[member.motherId]) map[member.motherId].children.push(map[member.id]);
        else roots.push(map[member.id]);
    });
    return roots;
}

export function renderTree(data, container) {
    container.innerHTML = '';
    const createNode = (member) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('tree-node-wrapper');

        const node = document.createElement('div');
        node.classList.add('node');

        const img = document.createElement('img');
        img.src = member.photoURL || 'Images/default.png';
        img.alt = member.name;
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.borderRadius = '50%';
        img.style.marginRight = '5px';
        img.style.verticalAlign = 'middle';

        const span = document.createElement('span');
        span.textContent = member.name;

        node.appendChild(img);
        node.appendChild(span);

        const childrenDiv = document.createElement('div');
        childrenDiv.classList.add('children');
        if (member.children.length > 0) {
            member.children.forEach(child => {
                childrenDiv.appendChild(createNode(child));
            });
        }

        node.addEventListener('click', (e) => {
            e.stopPropagation();
            childrenDiv.style.display = childrenDiv.style.display === 'flex' ? 'none' : 'flex';
        });

        wrapper.appendChild(node);
        wrapper.appendChild(childrenDiv);
        return wrapper;
    };

    data.forEach(member => container.appendChild(createNode(member)));
}

// Initial Load
getFamilyTree().then(data => {
    familyData = data;
    renderTree(familyData, treeContainer);
});

// Search
searchInput.addEventListener('input', () => {
    const query = transliterateWord(searchInput.value.trim().toLowerCase());
    const filtered = familyData.filter(member => filterMember(member, query));
    renderTree(filtered, treeContainer);
});

function filterMember(member, query) {
    if (!query) return true;
    const fields = [member.name, member.mobile, member.email].filter(Boolean);
    if (fields.some(f => f.toLowerCase().includes(query))) return true;
    if (member.children) return member.children.some(child => filterMember(child, query));
    return false;
}
