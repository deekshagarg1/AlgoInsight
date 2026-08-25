module.exports = {
  id: 'binary-search',
  name: 'Binary Search',
  code: {
    java: [
      { num: 1, text: "public int binarySearch(int[] arr, int target) {", type: "declaration" },
      { num: 2, text: "    int low = 0, high = arr.length - 1;", type: "normal" },
      { num: 3, text: "    while (low <= high) {", type: "loop" },
      { num: 4, text: "        int mid = low + (high - low) / 2;", type: "normal" },
      { num: 5, text: "        if (arr[mid] == target) {", type: "compare" },
      { num: 6, text: "            return mid; // Found", type: "control" },
      { num: 7, text: "        }", type: "normal" },
      { num: 8, text: "        if (arr[mid] < target) {", type: "compare" },
      { num: 9, text: "            low = mid + 1; // Search right half", type: "swap" },
      { num: 10, text: "        } else {", type: "normal" },
      { num: 11, text: "            high = mid - 1; // Search left half", type: "swap" },
      { num: 12, text: "        }", type: "normal" },
      { num: 13, text: "    }", type: "normal" },
      { num: 14, text: "    return -1; // Not found", type: "control" },
      { num: 15, text: "}", type: "declaration" }
    ],
    cpp: [
      { num: 1, text: "int binarySearch(int arr[], int n, int target) {", type: "declaration" },
      { num: 2, text: "    int low = 0, high = n - 1;", type: "normal" },
      { num: 3, text: "    while (low <= high) {", type: "loop" },
      { num: 4, text: "        int mid = low + (high - low) / 2;", type: "normal" },
      { num: 5, text: "        if (arr[mid] == target) {", type: "compare" },
      { num: 6, text: "            return mid; // Found", type: "control" },
      { num: 7, text: "        }", type: "normal" },
      { num: 8, text: "        if (arr[mid] < target) {", type: "compare" },
      { num: 9, text: "            low = mid + 1; // Search right half", type: "swap" },
      { num: 10, text: "        } else {", type: "normal" },
      { num: 11, text: "            high = mid - 1; // Search left half", type: "swap" },
      { num: 12, text: "        }", type: "normal" },
      { num: 13, text: "    }", type: "normal" },
      { num: 14, text: "    return -1; // Not found", type: "control" },
      { num: 15, text: "}", type: "declaration" }
    ],
    python: [
      { num: 1, text: "def binarySearch(arr, target):", type: "declaration" },
      { num: 2, text: "    low, high = 0, len(arr) - 1", type: "normal" },
      { num: 3, text: "    while low <= high:", type: "loop" },
      { num: 4, text: "        mid = (low + high) // 2", type: "normal" },
      { num: 5, text: "        if arr[mid] == target:", type: "compare" },
      { num: 6, text: "            return mid # Found", type: "control" },
      { num: 7, text: "        if arr[mid] < target:", type: "compare" },
      { num: 8, text: "            low = mid + 1 # Search right half", type: "swap" },
      { num: 9, text: "        else:", type: "normal" },
      { num: 10, text: "            high = mid - 1 # Search left half", type: "swap" },
      { num: 11, text: "    return -1 # Not found", type: "control" }
    ]
  }
};
