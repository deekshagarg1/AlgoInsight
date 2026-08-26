# AlgoInsight 🚀

AlgoInsight is a high-fidelity, production-quality interactive Data Structures and Algorithms (DSA) visualization and learning platform built on the **MERN Stack** (MongoDB, Express, React, Node.js). 

Designed as a modern EdTech application, it bridges the gap between abstract textbook syntax and real-time execution states through live visual trace engines, multi-language code execution panels, Big-O complexity analysis, interactive courses, practice quizzes, and profile cloud syncing.

---

## 🌟 Comprehensive Features

### 1. Interactive Visualizers & Canvas Engines
* **Sorting Algorithms**:
  * **Bubble Sort**: Step-by-step adjacent comparisons, pointer tracking (`j`, `j+1`), arched 2.5D swapping, comparison/swap counters.
  * **Selection Sort**: Unsorted sub-array scanning, minimum element tracking (`min`), swapped element highlight.
  * **Insertion Sort**: Shift-backwards insertion with key element floating animation (`key`).
  * **Merge Sort**: Divide-and-conquer recursion tree split ranges, temporary array buffer grids (`temp`).
  * **Quick Sort**: Pivot element selection (`pivot`), partition boundaries (`low`..`high`), in-place swap highlights.
  * **Heap Sort**: Max-Heap tree construction, root extraction swaps, heapify comparisons.
  * **Counting Sort**: Non-comparison frequency count hashing array (`count`), prefix sum calculations, stable output list writes (`output`).
  * **Radix Sort**: Digit-by-digit (LSD) pass bucketing across ones, tens, and hundreds places.

* **Searching Algorithms**:
  * **Linear Search**: Sequential scan through array elements from index 0 to N-1, match detection, comparison count.
  * **Binary Search**: Range halving on sorted arrays (`low`, `high`, `mid` pointer indicators), logarithmic division curve.

* **Data Structure Visualizers**:
  * **Array Operations**: Dynamic Insert, Delete, Search, Update, and Linear Traversal.
  * **Linked List**: Node block representations, memory address labels, next pointer arrows, Head/Tail pointers, List Reversal.
  * **Stack (LIFO)**: Vertical stack frame cylinder with Push, Pop, Peek, and Top pointer animations.
  * **Queue (FIFO)**: Horizontal pipe buffer with Enqueue, Dequeue, Front, and Rear pointer animations.
  * **Binary Search Tree (BST)**: 2D Node tree canvas rendering Inorder, Preorder, Postorder, and Search traversals.
  * **Graph Engine**: Interactive Node & Weighted Edge canvas supporting BFS, DFS, Dijkstra's Shortest Path, visited nodes, active edge highlights, and front queue/stack buffer state tables.

### 2. Multi-Language Code Panel
* Interactive code viewer supporting **Java, C++, Python, and JavaScript**.
* Real-time line-by-line syntax highlighting mapped directly to active algorithm execution steps.
* One-click code copying to clipboard.

### 3. Complexity & Learning Panels
* **Time Complexity**: Best, Average, Worst Big-O runtimes.
* **Space Complexity**: Auxiliary memory bounds.
* **Beginner-Friendly Explanations**: Detailed step-by-step breakdown explaining why the complexity is what it is.

### 4. Global Search & Category Filters
* **Global Search (`Ctrl + K`)**: Instant modal search allowing users to type topics (e.g. "binary", "quick", "stack", "graph") and jump directly to visualizer pages.
* **Category Filters**: Easily filter catalog by Sorting, Searching, Data Structures, Trees, and Graphs.

### 5. UI/UX & Gamification
* **Dark / Light Mode Toggle**: Seamless theme switching persisted in localStorage.
* **Practice Section & Streaks**: Challenge topics with MCQ decks, instant scorecards, explanations, and perfect score flame streaks.
* **Dashboard & Cloud Syncing**: Secure JWT authentication and local progress synchronization.

---

## 🛠️ Tech Stack

* **Frontend**: React.js, Tailwind CSS (v4 theme), Framer Motion, Lucide Icons, Vite.
* **Backend**: Node.js, Express.js, JWT Authentication, Bcrypt.js encryption, Morgan logger, CORS.
* **Database**: MongoDB (Mongoose Schema models) with non-blocking offline fallback.

---

## 📂 Project Structure

```
algoInsight/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AuthModal.jsx
│   │   │   ├── BarVisualizer.jsx
│   │   │   ├── CodePanel.jsx
│   │   │   ├── ComplexityPanel.jsx
│   │   │   ├── GraphVisualizer.jsx
│   │   │   ├── LinkedListVisualizer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PlaybackControls.jsx
│   │   │   ├── QueueVisualizer.jsx
│   │   │   ├── SearchModal.jsx
│   │   │   ├── SearchVisualizer.jsx
│   │   │   ├── StackVisualizer.jsx
│   │   │   ├── TreeVisualizer.jsx
│   │   │   └── VisualizerInput.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── ToastContext.jsx
│   │   ├── data/
│   │   │   ├── allAlgorithmCodes.js
│   │   │   ├── bubbleSortCode.js
│   │   │   ├── insertionSortCode.js
│   │   │   └── selectionSortCode.js
│   │   ├── engine/
│   │   │   ├── algorithms/
│   │   │   │   ├── arrayOps.js
│   │   │   │   ├── binarySearch.js
│   │   │   │   ├── bubbleSort.js
│   │   │   │   ├── countingSort.js
│   │   │   │   ├── graphOps.js
│   │   │   │   ├── heapSort.js
│   │   │   │   ├── insertionSort.js
│   │   │   │   ├── linearSearch.js
│   │   │   │   ├── linkedListOps.js
│   │   │   │   ├── mergeSort.js
│   │   │   │   ├── quickSort.js
│   │   │   │   ├── radixSort.js
│   │   │   │   ├── selectionSort.js
│   │   │   │   ├── stackOps.js
│   │   │   │   └── treeOps.js
│   │   │   └── types.js
│   │   ├── pages/
│   │   │   ├── AlgorithmsPage.jsx
│   │   │   ├── CoursesPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── PracticePage.jsx
│   │   │   └── VisualizerPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Algorithm.js
│   │   └── User.js
│   ├── routes/
│   │   ├── algorithms.js
│   │   ├── auth.js
│   │   └── health.js
│   ├── scripts/
│   │   └── seed.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── README.md
```

---

## ⚡ Quick Setup & Environment Variables

### Environment Variables (.env)
Create a `.env` file in the `/server` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/algoinsight
JWT_SECRET=algoinsight_secret_key_mca_project
```

### Installation Commands

#### 1. Backend Server Setup
```bash
cd server
npm install
npm run seed     # Option: seed default algorithm dataset into MongoDB
npm run dev      # Runs Express server on port 5000
```

#### 2. Frontend Client Setup
```bash
cd client
npm install
npm run dev      # Runs Vite dev server on port 5173
```

---

## 🧪 Verification & Build Commands

* Build production bundle:
  ```bash
  cd client && npm run build
  ```
* Start production backend:
  ```bash
  cd server && npm start
  ```
