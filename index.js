
const arr = [1, 3, 2, 2, -4, -6, -2, 8];
const target = 4;
findTargetSumWithSet(arr, target);



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
     console.log(`Second Combination For “${target*2}”, result below :`);
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

// Time-Complexity: O(N^2)
// Space-Complexity: O(N)
//   - N is number of elements in the array


// =================================================================================== //


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
     console.log(`Second Combination For “${target*2}”, result below :`);
     console.log(doublePairs)
}


// Time-Complexity: O(N log N)
// Space-Complexity: O(N)
//   - where N is number of elements in the array

// ================================================================================ //

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
     console.log(`Second Combination For “${target*2}”, result below :`);
     console.log(doublePairs)
     
}

// Time-Complexity: O(N)
// Space-Complexity: O(N)
//   - where N is number of elements in the array


// ============================================================================== //




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

// Time-Complexity: O(2^N)
// Space-Complexity: O(N)
//   - where N is number of elements in the array



// All total TC =>  approximated as O(n + m log m + 2^m) [using findTargetSumWithSet]
// All total SC => O(n + m + 2^m), considering the dominant factors