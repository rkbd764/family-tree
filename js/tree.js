import { getFamilyTree } from './firebase-config.js';

const treeContainer = document.getElementById('tree');
const searchInput = document.getElementById('search');

let familyData = [];

// ====== Fetch Family Tree Data ======
getFamilyTree().then(data => {
    familyData = data;
    renderTree(familyData, treeContainer);
});

// ====== Render Tree Function ======
function renderTree(data, container) {
    container.innerHTML = '';

    const createNode = (member) => {
        const node = document.createElement('div');
        node.classList.add('node');
        node.textContent = member.name;

        // Click to toggle children
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            if (member.children && member.children.length) {
                childrenDiv.style.display = childrenDiv.style.display === 'flex' ? 'none' : 'flex';
            }
        });

        let childrenDiv = document.createElement('div');
        childrenDiv.classList.add('children');

        if (member.children && member.children.length) {
            member.children.forEach(child => {
                childrenDiv.appendChild(createNode(child));
            });
        }

        const wrapper = document.createElement('div');
        wrapper.appendChild(node);
        wrapper.appendChild(childrenDiv);

        return wrapper;
    };

    // Top-level nodes
    data.forEach(member => {
        container.appendChild(createNode(member));
    });
}

// ====== Search Functionality ======
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = familyData.filter(member => filterMember(member, query));
    renderTree(filtered, treeContainer);
});

// ====== Recursive search ======
function filterMember(member, query) {
    if (member.name.toLowerCase().includes(query) ||
        (member.mobile && member.mobile.includes(query)) ||
        (member.email && member.email.toLowerCase().includes(query))) {
        return true;
    }
    if (member.children) {
        return member.children.some(child => filterMember(child, query));
    }
    return false;
}
