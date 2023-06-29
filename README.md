# Unibit-company-assignment

## <u> Problem Statement </u>
Given an array of integers and a target value, you must determine which two integers' sum equals the target and return a 2D array. Then merge the array into a single array with sorting ( ascending ) order, in the next step double the target value and find again the combination of digits (can be multiple digits ) that are equal to the double targeted value and returned into a 2D array.

     Sample Input : [1, 3, 2, 2, -4, -6, -2, 8];

     Target Value = 4,

     Output: First Combination For “4” : [ [1,3],[2,2],[-4,8],[-6,2] ];

     Merge Into a single Array : [-6,-4,1,2,2,2,3,8];

     Second Combination For “8” : [ [ 1,3,2,2], [8,-4,2,2],....,[n,n,n,n] ]



## Explanation of Code

The provided code consists of three functions: `findTargetSumFromArr`, `findTargetSumByPointers`, and `findTargetSumWithSet`, along with a helper function `checkForDoubleTarget`. Let's go through each function and its purpose:

### 1. `findTargetSumFromArr`

<details>
<summary><b><u>Code</u></b></summary>

```javascript
function findTargetSumFromArr(arr, target) {
     const pairs = [];

     // Iterate through each pair of elements in the array
     for (let i = 0; i < arr.length - 1; i++) {
          for (let j = i + 1; j < arr.length; j++) {
               // Sort the pair in descending order
               const [num1, num2] = [arr[i], arr[j]].sort((a, b) => b - a);

               // Check if the pair sums up to the target and is distinct from existing results
               if (num1 + num2 === target && isDistinct(pairs, [num1, num2])) {
                    pairs.push([num1, num2]);
               }
          }
     }

     console.log(`For target: ${target}, result below:`);
     console.log(pairs);

     // Flatten the pairs array and sort it in ascending order
     const flattenedPairs = pairs.flat().sort((a, b) => a - b);
     console.log('flattenedPairs:', flattenedPairs);

     const doublePairs = [];
     // Find all combinations of elements in the flattenedPairs array that sum up to the target multiplied by 2
     checkForDoubleTarget(flattenedPairs, target * 2, 0, 0, [], doublePairs);
     console.log(`Second Combination For “${target*2}”, result below :`)
     console.log(doublePairs)
}

function isDistinct(pairs, [num1, num2]) {
     // Check if the pair [num1, num2] already exists in the pairs array
     for (let [x, y] of pairs) {
          if (num1 === x && num2 === y) {
               return false;
          }
     }
     return true;
}

```
          
</details>

This function takes an array (`arr`) and a target value (`target`) as input. It finds pairs of elements from the array that sum up to the target value. The function follows these steps:

1. Initialize an empty array called `pairs` to store the pairs.
2. Iterate through each pair of elements in the array using nested loops.
3. Sort each pair in descending order.
4. Check if the sum of the pair is equal to the target and if the pair is distinct from existing results.
5. If the conditions are satisfied, add the pair to the `pairs` array.
6. After the iteration, display the pairs found.
7. Flatten the `pairs` array and sort it in ascending order.
8. Display the flattened pairs.
9. Create an empty array called `doublePairs` to store combinations of elements that sum up to the target multiplied by 2.
10. Call the `checkForDoubleTarget` function to find combinations of elements in the flattened pairs array that satisfy the target multiplied by 2.
11. Display the `doublePairs` found.

### 2. `findTargetSumByPointers`

<details>
<summary><b><u>Code</u></b></summary>

```javascript
function findTargetSumByPointers(arr, target) {
     // Sort the array in ascending order
     arr.sort((a, b) => a - b);

     const pairs = [];
     let left = 0,
          right = arr.length - 1;

     // Use two pointers approach to find pairs summing up to the target
     while (left < right) {
          let sum = arr[left] + arr[right];

          if (sum === target) {
               // If the sum matches the target, add the pair to the result
               pairs.push([arr[left], arr[right]]);
               left++;
               right--;
          } else if (sum > target) {
               // If the sum is greater than the target, decrement the right pointer
               right--;
          } else {
               // If the sum is less than the target, increment the left pointer
               left++;
          }
     }

     console.log(`For target: ${target}, result below:`);
     console.log(pairs);

     // Flatten the pairs array and sort it in ascending order
     const flattenedPairs = pairs.flat().sort((a, b) => a - b);
     console.log('flattenedPairs:', flattenedPairs);

     const doublePairs = [];
     // Find all combinations of elements in the flattenedPairs array that sum up to the target multiplied by 2
     checkForDoubleTarget(flattenedPairs, target * 2, 0, 0, [], doublePairs);
     console.log(`Second Combination For “${target*2}”, result below :`)
     console.log(doublePairs)
}
```
          
</details>

This function takes an array (`arr`) and a target value (`target`) as input. It finds pairs of elements from the array that sum up to the target value using a two-pointers approach. The function follows these steps:

1. Sort the array in ascending order.
2. Initialize an empty array called `pairs` to store the pairs.
3. Set two pointers: `left` at the beginning of the array and `right` at the end.
4. Use a while loop to iterate until the pointers meet.
5. Calculate the sum of the elements at the current positions of the pointers.
6. If the sum is equal to the target, add the pair to the `pairs` array and move both pointers.
7. If the sum is greater than the target, decrement the right pointer.
8. If the sum is less than the target, increment the left pointer.
9. After the iteration, display the pairs found.
10. Flatten the `pairs` array and sort it in ascending order.
11. Display the flattened pairs.
12. Create an empty array called `doublePairs` to store combinations of elements that sum up to the target multiplied by 2.
13. Call the `checkForDoubleTarget` function to find combinations of elements in the flattened pairs array that satisfy the target multiplied by 2.
14. Display the `doublePairs` found.

### 3. `findTargetSumWithSet`

<details>
<summary><b><u>Code</u></b></summary>

```javascript
function findTargetSumWithSet(arr, target) {
     let pairs = [];
     let visited = new Set();

     // Iterate through each element in the array
     for (let i = 0; i < arr.length; i++) {
          let d = target - arr[i];
          if (visited.has(d)) {
               // If the complement of the current element exists in the visited set,
               // add the pair [complement, current element] to the pairs array
               pairs.push([d, arr[i]]);
          }
          visited.add(arr[i]);
     }

     console.log(`For target: ${target}, result below:`);
     console.log(pairs);


     // Flatten the pairs array and sort it in ascending order
     const flattenedPairs = pairs.flat().sort((a, b) => a - b);
     console.log('flattenedPairs:', flattenedPairs);

     const doublePairs = [];
     // Find all combinations of elements in the flattenedPairs array that sum up to the target multiplied by 2
     checkForDoubleTarget(flattenedPairs, target * 2, 0, 0, [], doublePairs);
     // TC for `flat & sort` => O(m log m)
     // SC => O(m)
     //  - where m is the number of pairs.
     console.log(`Second Combination For “${target*2}”, result below :`)
     console.log(doublePairs)
     
}
```
          
</details>

This function takes an array (`arr`) and a target value (`target`) as input. It finds pairs of elements from the array that sum up to the target value using a Set data structure. The function follows these steps:

1. Create an empty array called `pairs` to store the pairs.
2. Create an empty Set called `visited` to keep track of visited elements.
3. Iterate through each element in the array.
4. Calculate the complement (`d`) of the current element by subtracting it from the target.
5. Check if the complement exists in the `visited` Set.
6. If the complement exists, add the pair `[complement, current element]` to the `pairs` array.
7. Add the current element to the `visited` Set.
8. After the iteration, display the pairs found.
9. Flatten the `pairs` array and sort it in ascending order.
10. Display the flattened pairs.
11. Create an empty array called `doublePairs` to store combinations of elements that sum up to the target multiplied by 2.
12. Call the `checkForDoubleTarget` function to find combinations of elements in the flattened pairs array that satisfy the target multiplied by 2.
13. Display the `doublePairs` found.

### 4. `checkForDoubleTarget`

<details>
<summary><b><u>Code</u></b></summary>

```javascript
function checkForDoubleTarget(arr, target, index, sum, current, res) {
     // Base case: If all elements in the array have been processed
     if (index === arr.length) {
          // If the sum is equal to the target, add the current combination to the result
          if (sum === target) {
               res.push([...current]);
          }
          return;
     }

     // Recursive call without including the current element
     checkForDoubleTarget(arr, target, index + 1, sum, current, res);

     // Recursive call including the current element
     current.push(arr[index]);
     checkForDoubleTarget(arr, target, index + 1, sum + arr[index], current, res);
     current.pop();
}
```
          
</details>

This helper function is used by both `findTargetSumFromArr` and `findTargetSumByPointers` to recursively find combinations of elements that sum up to a given target. The function follows these steps:

1. The function takes an array (`arr`), target value (`target`), index, sum, current combination (`current`), and results array (`res`) as input.
2. The base case is when the index equals the length of the array. If so, check if the sum is equal to the target.
3. If the sum is equal to the target, add the current combination to the results array.
4. Recursively call the function without including the current element.
5. Recursively call the function including the current element.
6. After each recursive call, backtrack by removing the current element from the current combination.

---

### Time and Space Complexity Analysis

- `findTargetSumFromArr`:
  - Time Complexity: O(N^2) (N is the number of elements in the array)
  - Space Complexity: O(N)

- `findTargetSumByPointers`:
  - Time Complexity: O(N log N) (N is the number of elements in the array)
  - Space Complexity: O(N)

- `findTargetSumWithSet`:
  - Time Complexity: O(N) (N is the number of elements in the array)
  - Space Complexity: O(N)

- `checkForDoubleTarget`:
  - Time Complexity: O(2^N) (N is the number of elements in the array)
  - Space Complexity: O(N)

Overall time complexity and space complexity of the entire code can be approximated as O(N + M log M + 2^M) when using `findTargetSumWithSet`, where N is the number of elements in the array and M is the number of pairs found.

Note: The space complexity analysis considers the dominant factors contributing to space usage.

