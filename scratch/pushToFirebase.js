import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { initialBlogs } from "../src/data/initialBlogs.js";
import { initialProjects } from "../src/data/initialProjects.js";
import { initialServices } from "../src/data/initialServices.js";

const initialGallery = [
  { id: 'gal-1', title: 'City Surveillance Command Room', category: 'City Surveillance', image: '/images/city_surveillance.jpg' },
  { id: 'gal-2', title: 'High-Density Server Network Rack', category: 'Networking', image: '/images/network_rack.jpg' },
  { id: 'gal-3', title: 'Telecom AV Control Room', category: 'Audio/Video', image: '/images/telecom_av.jpg' },
  { id: 'gal-4', title: '4K IP CCTV Video Feed Center', category: 'CCTV', image: '/images/cctv_hero_bg.jpg' }
];

const firebaseConfig = {
  apiKey: "AIzaSyDSypUCiyKblxzFxUwaTUyvWNt5GCfpNUE",
  authDomain: "jepl-website.firebaseapp.com",
  projectId: "jepl-website",
  storageBucket: "jepl-website.firebasestorage.app",
  messagingSenderId: "118646212901",
  appId: "1:118646212901:web:16d86015ff55500843f2cc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function pushData() {
  console.log("🚀 Starting data push to Cloud Firestore project 'jepl-website'...");

  // 1. Push Blogs
  console.log(`\n📚 Pushing ${initialBlogs.length} Blogs to 'blogs' collection...`);
  for (const blog of initialBlogs) {
    await setDoc(doc(db, "blogs", blog.id), blog);
    console.log(`   ✓ Blog: ${blog.title}`);
  }

  // 2. Push Projects
  console.log(`\n🏗️ Pushing ${initialProjects.length} Projects to 'projects' collection...`);
  for (const proj of initialProjects) {
    await setDoc(doc(db, "projects", proj.id), proj);
    console.log(`   ✓ Project: ${proj.title}`);
  }

  // 3. Push Services
  console.log(`\n🛠️ Pushing ${initialServices.length} Services to 'services' collection...`);
  for (const service of initialServices) {
    await setDoc(doc(db, "services", service.id), service);
    console.log(`   ✓ Service: ${service.title}`);
  }

  // 4. Push Gallery
  console.log(`\n🖼️ Pushing ${initialGallery.length} Gallery items to 'gallery' collection...`);
  for (const item of initialGallery) {
    await setDoc(doc(db, "gallery", item.id), item);
    console.log(`   ✓ Gallery Item: ${item.title}`);
  }

  console.log("\n✅ All current website data successfully pushed to Cloud Firestore!");
  process.exit(0);
}

pushData().catch(err => {
  console.error("❌ Error pushing data to Firestore:", err);
  process.exit(1);
});
