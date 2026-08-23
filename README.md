# AlgoInsight 🚀

AlgoInsight is a high-fidelity, interactive Data Structures and Algorithms (DSA) visualization and learning platform built on the **MERN Stack** (MongoDB, Express, React, Node.js). 

It is designed to bridge the gap between abstract textbook syntax and real-time execution states by combining visual trace workspaces, conceptual checklists courses, dynamic practice quizzes, and profile cloud-syncing.

---

## 🌟 Key Features

* **Interactive Sandbox Visualizers**:
  * **Bubble Sort**: Live step-by-step adjacent comparisons, index pointer loops (`j`, `j+1`), and arched slide swaps. Includes a mini-visualizer preview playground on the homepage.
  * **Merge Sort**: Divide-and-conquer recursion tree steps showing division intervals and intermediate sorted temporary array buffers.
  * **Counting Sort**: Non-comparison sorting tracing showing the original list, dynamic count hashing keys accumulator, and stable output list writes.
* **Complete Multi-Language Code Panel**: Supports C++, Java, and Python templates that highlight matching lines dynamically as the visualizer plays.
* **Structured Concept Courses**: Check off completed lessons mapped to core visual structures (Linear structures, Stacks, Queues, Complexity runtimes).
* **Practice MCQ Challenges**: Test conceptual theory with multiple-choice decks, scoreboards, and orange learning flame streaks on perfect 5/5 runs.
* **Personal Cloud Syncing Dashboard**: Secure JWT-based signups and logins with real-time password strength checklists and visibility eye toggles. Syncs local browser progress data to MongoDB under your registered profile.
* **Premium UX Aesthetics**: Frosted glassmorphism Slate-Navy & Indigo theme with custom sliding toast notifications and ambient drop shadows.

---

## 🛠️ Tech Stack
* **Frontend**: React.js, Tailwind CSS (v4 theme), Lucide Icons, Framer Motion animations, Vite compiler.
* **Backend**: Node.js, Express REST APIs, JWT Session Authentication, Bcrypt.js encryption.
* **Database**: MongoDB (Mongoose Schema models).

---

## 🚀 Quick Setup & Installation

Follow these steps to clone, configure, and run the project locally on your system.

### Prerequisites
Make sure you have the following installed on your machine:
* **Node.js** (v18.0.0 or higher)
* **MongoDB Local Server** (or MongoDB Atlas connection string)
* **Git** (to clone the repository)

---

### Step 1: Clone the Repository
Open your terminal and run:
```bash
git clone https://github.com/pulkit100/AlgoInsight--DSA-visulization-platform-.git
cd AlgoInsight--DSA-visulization-platform-
```

---

### Step 2: Configure & Run the Backend Server
1. Navigate to the `/server` directory:
   ```bash
   cd server
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` configuration file in the `/server` folder root:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/algoinsight
   JWT_SECRET=algoinsight_secret_key_mca_project
   NODE_ENV=development
   ```
4. **Seed the Database**: Load default algorithm source codes into MongoDB (Required for the Code Panel to display code templates!):
   ```bash
   npm run seed
   ```
5. Launch the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start running on port `5000` (e.g., `http://localhost:5000`).*

---

### Step 3: Configure & Run the Frontend Client
1. Open a new terminal window, navigate to the `/client` directory:
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
   *Vite will compile and host the application on `http://localhost:5173`.*

---

### Step 4: Open and Explore!
1. Open your browser and navigate to: **`http://localhost:5173/`**
2. Head to the **Dashboard** tab to create a profile and test out password strength criteria locks.
3. Test sandbox visualizers under the **Algorithms** tab or start courses checklists!
