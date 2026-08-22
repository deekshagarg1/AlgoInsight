module.exports = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  code: {
    java: [
      { num: 1, text: "public void insertionSort(int[] arr) {", type: "declaration" },
      { num: 2, text: "    int n = arr.length;", type: "normal" },
      { num: 3, text: "", type: "normal" },
      { num: 4, text: "    for (int i = 1; i < n; i++) {", type: "loop" },
      { num: 5, text: "        int key = arr[i];", type: "normal" },
      { num: 6, text: "        int j = i - 1;", type: "normal" },
      { num: 7, text: "", type: "normal" },
      { num: 8, text: "        while (j >= 0 && arr[j] > key) {", type: "loop" },
      { num: 9, text: "            arr[j + 1] = arr[j];", type: "swap" },
      { num: 10, text: "            j = j - 1;", type: "normal" },
      { num: 11, text: "        }", type: "normal" },
      { num: 12, text: "        arr[j + 1] = key;", type: "swap" },
      { num: 13, text: "    }", type: "normal" },
      { num: 14, text: "}", type: "declaration" }
    ],
    cpp: [
      { num: 1, text: "void insertionSort(int arr[], int n) {", type: "declaration" },
      { num: 2, text: "    // Array size n is passed as argument", type: "comment" },
      { num: 3, text: "", type: "normal" },
      { num: 4, text: "    for (int i = 1; i < n; i++) {", type: "loop" },
      { num: 5, text: "        int key = arr[i];", type: "normal" },
      { num: 6, text: "        int j = i - 1;", type: "normal" },
      { num: 7, text: "", type: "normal" },
      { num: 8, text: "        while (j >= 0 && arr[j] > key) {", type: "loop" },
      { num: 9, text: "            arr[j + 1] = arr[j];", type: "swap" },
      { num: 10, text: "            j = j - 1;", type: "normal" },
      { num: 11, text: "        }", type: "normal" },
      { num: 12, text: "        arr[j + 1] = key;", type: "swap" },
      { num: 13, text: "    }", type: "normal" },
      { num: 14, text: "}", type: "declaration" }
    ],
    python: [
      { num: 1, text: "def insertionSort(arr):", type: "declaration" },
      { num: 2, text: "    n = len(arr)", type: "normal" },
      { num: 3, text: "", type: "normal" },
      { num: 4, text: "    for i in range(1, n):", type: "loop" },
      { num: 5, text: "        key = arr[i]", type: "normal" },
      { num: 6, text: "        j = i - 1", type: "normal" },
      { num: 7, text: "", type: "normal" },
      { num: 8, text: "        while j >= 0 and arr[j] > key:", type: "loop" },
      { num: 9, text: "            arr[j + 1] = arr[j]", type: "swap" },
      { num: 10, text: "            j = j - 1", type: "normal" },
      { num: 11, text: "", type: "normal" },
      { num: 12, text: "        arr[j + 1] = key", type: "swap" }
    ]
  }
};
