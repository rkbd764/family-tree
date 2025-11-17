import { db, app } from "./firebase-config.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const storage = getStorage(app);
const membersRef = collection(db, "Morols family tree");

// বাংলা ফনেটিক (english → bangla)
import transliterate from "./transliterate.js";

// ফর্ম এলিমেন্ট
const form = document.getElementById("memberForm");
const nameField = document.getElementById("name");
const fatherField = document.getElementById("father");
const motherField = document.getElementById("mother");
const addressField = document.getElementById("address");
const nidField = document.getElementById("nid");
const phoneField = document.getElementById("phone");
const emailField = document.getElementById("email");
const facebookField = document.getElementById("facebook");
const pictureField = document.getElementById("picture");
const remarkField = document.getElementById("remark");
const messageBox = document.getElementById("message");

// বাংলা অটো টাইপ (phonetic)
[nameField, fatherField, motherField, remarkField].forEach(input => {
  input.addEventListener("input", () => {
    input.value = transliterate(input.value);
  });
});

// Submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  messageBox.innerHTML = "ডেটা সেভ হচ্ছে... অপেক্ষা করুন...";

  try {
    let imageURL = "";

    // যদি ছবি সিলেক্ট করা হয়
    if (pictureField.files.length > 0) {
      const file = pictureField.files[0];
      const storageRef = ref(storage, `members/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      imageURL = await getDownloadURL(storageRef);
    }

    await addDoc(membersRef, {
      name: nameField.value.trim(),
      father: fatherField.value.trim(),
      mother: motherField.value.trim(),
      address: addressField.value.trim(),
      nid: nidField.value.trim(),
      phone: phoneField.value.trim(),
      email: emailField.value.trim(),
      facebook: facebookField.value.trim(),
      picture: imageURL,
      remark: remarkField.value.trim(),
      createdAt: new Date()
    });

    messageBox.innerHTML = "<span style='color: green;'>✅ সদস্য সফলভাবে যুক্ত হয়েছে!</span>";
    form.reset();

  } catch (error) {
    console.error("Error:", error);
    messageBox.innerHTML = "<span style='color: red;'>❌ সমস্যা হয়েছে, আবার চেষ্টা করুন!</span>";
  }
});
