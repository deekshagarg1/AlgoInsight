module.exports = {
  id: 'linear-search',
  name: 'Linear Search',
  code: {
    java: [
      { num: 1, text: "public int linearSearch(int[] arr, int target) {", type: "declaration" },
      { num: 2, text: "    int n = arr.length;", type: "normal" },
      { num: 3, text: "", type: "normal" },
      { num: 4, text: "    for (int i = 0; i < n; i++) {", type: "loop" },
      { num: 5, text: "        if (arr[i] == target) {", type: "compare" },
      { num: 6, text: "            return i; // Found", type: "control" },
      { num: 7, text: "        }", type: "normal" },
      { num: 8, text: "    }", type: "normal" },
      { num: 9, text: "    return -1; // Not found", type: "control" },
      { num: 10, text: "}", type: "declaration" }
    ],
    cpp: [
      { num: 1, text: "int linearSearch(int arr[], int n, int target) {", type: "declaration" },
      { num: 2, text: "    // Iterate sequentially through array", type: "comment" },
      { num: 3, text: "", type: "normal" },
      { num: 4, text: "    for (int i = 0; i < n; i++) {", type: "loop" },
      { num: 5, text: "        if (arr[i] == target) {", type: "compare" },
      { num: 6, text: "            return i; // Found", type: "control" },
      { num: 7, text: "        }", type: "normal" },
      { num: 8, text: "    }", type: "normal" },
      { num: 9, text: "    return -1; // Not found", type: "control" },
      { num: 10, text: "}", type: "declaration" }
    ],
    python: [
      { num: 1, text: "def linearSearch(arr, target):", type: "declaration" },
      { num: 2, text: "    n = len(arr)", type: "normal" },
      { num: 3, text: "", type: "normal" },
      { num: 4, text: "    for i in range(n):", type: "loop" },
      { num: 5, text: "        if arr[i] == target:", type: "compare" },
      { num: 6, text: "            return i # Found", type: "control" },
      { num: 7, text: "", type: "normal" },
      { num: 8, text: "", type: "normal" },
      { num: 9, text: "    return -1 # Not found", type: "control" },
      { num: 10, text: "", type: "normal" }
    ]
  }
};
