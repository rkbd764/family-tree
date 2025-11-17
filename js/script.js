import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import transliterate from "./transliterate.js";

// 🔹 Load New Members from Firebase
async function loadNewMembers() {
  try {
    const snapshot = await getDocs(collection(db, "Morols family tree"));
    const members = snapshot.docs.map(doc => doc.data());

    const treeContainer = document.getElementById("treeContainer");
    const mainUL = treeContainer.querySelector("ul");

    members.forEach(member => {
      // আগের ট্রিতে যদি member থাকে, skip করুন
      if (document.querySelector(`.member[data-name="${member.name}"]`)) return;

      // নতুন <li> তৈরি করুন
      const li = document.createElement("li");
      const div = document.createElement("div");
      div.classList.add("member");
      div.dataset.name = member.name;
      div.dataset.mobile = member.phone || "";

      const img = document.createElement("img");
      img.src = member.picture || "images/om.jpg";
      img.alt = member.name;

      const span = document.createElement("span");
      span.textContent = member.name;

      div.appendChild(img);
      div.appendChild(span);
      li.appendChild(div);

      mainUL.appendChild(li); // মূল UL-তে append করুন
    });

  } catch (error) {
    console.error("Failed to load members:", error);
  }
}

// 🔹 Search Function
function searchTree() {
  const searchInput = document.getElementById("searchInput").value;
  const tQuery = transliterate(searchInput).toLowerCase();
  const members = document.querySelectorAll(".member");

  let found = false;

  members.forEach(member => {
    member.classList.remove("highlight");

    if (
      member.dataset.name.toLowerCase().includes(tQuery) ||
      (member.dataset.mobile && member.dataset.mobile.includes(tQuery))
    ) {
      member.classList.add("highlight");
      found = true;

      // Collapsible parent খুলুন
      let parent = member.parentElement;
      while (parent && parent.id !== "treeContainer") {
        if (parent.tagName === "UL") parent.style.display = "block";
        parent = parent.parentElement;
      }
    }
  });

  if (!found) alert("দুঃখিত এই নামে অত্র পরিবার বৃক্ষে কাউকে খুঁজে পাওয়া যায়নি");
}

// 🔹 Initial Load
loadNewMembers();

// Make searchTree global so button onclick works
window.searchTree = searchTree;
