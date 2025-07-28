📄 `README.md` for **CineStack**

# 🎬 CineStack

**CineStack** is a modern, responsive **Netflix-inspired web application** built using **React, Firebase, HTML, CSS, and JavaScript**. It not only mimics the Netflix UI/UX but also introduces a **custom "MyList" feature**, empowering users to build and manage their personalized watchlist.

---


## 🌟 Features

- 🔐 **Firebase Authentication** – Email/password & Google sign-in
- 🧠 **MyList Feature** – Add or remove favorite shows & movies
- ⚡ **Fast Rendering** – Powered by Vite + React
- 🔄 **Real-Time Sync** – Instant updates using Firebase Firestore
- 🍿 **UI Inspired by Netflix** – Familiar and intuitive
- 📱 **Mobile-Responsive Design**

---

## 🧰 Tech Stack

| Technology | Purpose                        |
|------------|--------------------------------|
| HTML, CSS  | Markup and Styling             |
| JavaScript | Frontend Interactivity         |
| React      | UI Components & Routing        |
| Firebase   | Auth, Firestore, Hosting       |
| Vite       | Development Build Tool         |

---

## 📦 Installation & Setup

### 🔧 Prerequisites
- Node.js & npm installed
- Firebase CLI installed (`npm install -g firebase-tools`)

### 🛠️ Local Setup

```bash
# Clone the repository
git clone https://github.com/Anusri-26/CineStack.git
cd CineStack

# Install dependencies
npm install

# Run the app in development mode
npm run dev
````

---

## 📁 Folder Structure

```
CineStack/
├── public/                 # Static files
├── src/
│   ├── assets/             # Images, logos
│   ├── components/         # Reusable UI components
│   ├── firebase/           # Firebase config
│   ├── pages/              # App pages like Home, Login
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── index.html
├── vite.config.js
└── README.md
```

---

## 🔐 Firebase Configuration

In your `/src/firebase/firebaseConfig.js`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 🧠 MyList Firestore Structure

```plaintext
users (collection)
└── [userId] (document)
    └── myList (subcollection)
        ├── [movieId]
        ├── [showId]
```

---
## Screenshots
![page1](https://github.com/user-attachments/assets/bef0be94-b5eb-4bf8-b8f4-464966a1f0ea)
![page2](https://github.com/user-attachments/assets/9194ffe5-2c4e-481a-a93d-758ebdbd1349)

---

## 🛠️ Future Improvements

* 🎯 Add search & filter functionality
* 🌗 Add dark/light mode
* 🎬 Integrate a movie trailer preview
* 💬 Add user reviews and ratings

---

## ✍️ Author

**Anusri Chundru**
📧 [chundruanusri6822@gmail.com](mailto:chundruanusri6822@gmail.com)
🔗 [GitHub](https://github.com/Anusri-26)

---



