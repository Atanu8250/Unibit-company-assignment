
const arr = [1, 3, 2, 2, -4, -6, -2, 8];
const target = 4;
findTargetSumWithSet(arr, target);



function findTargetSumFromArr(arr, target) {
     const results = [];

     // Iterate through each pair of elements in the array
     for (let i = 0; i < arr.length - 1; i++) {
          for (let j = i + 1; j < arr.length; j++) {
               // Sort the pair in descending order
               const [x, y] = [arr[i], arr[j]].sort((a, b) => b - a);

               // Check if the pair sums up to the target and is distinct from existing results
               if (x + y === target && isDistinct(results, [x, y])) {
                    results.push([x, y]);
               }
          }
     }

     console.log(`For target: ${target}, below result:`);
     console.log(results);

     // Flatten the results array and sort it in ascending order
     const combination = results.flat().sort((a, b) => a - b);
     console.log('combination:', combination);

     const doubleRes = [];
     // Find all combinations of elements in the combination array that sum up to the target multiplied by 2
     checkForDoubleTarget(combination, target * 2, 0, 0, [], doubleRes);
     console.log('doubleRes:', doubleRes);
}

function isDistinct(arr, [x, y]) {
     // Check if the pair [x, y] already exists in the results array
     for (let [i, j] of arr) {
          if (x === i && y === j) {
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

     console.log(`For target: ${target}, below result:`);
     console.log(pairs);

     // Flatten the pairs array and sort it in ascending order
     const combination = pairs.flat().sort((a, b) => a - b);
     console.log('combination:', combination);

     const doubleRes = [];
     // Find all combinations of elements in the combination array that sum up to the target multiplied by 2
     checkForDoubleTarget(combination, target * 2, 0, 0, [], doubleRes);
     console.log('doubleRes:', doubleRes);
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

     console.log(`For target: ${target}, below result:`);
     console.log(pairs);

     // Flatten the pairs array and sort it in ascending order
     const combination = pairs.flat().sort((a, b) => a - b);
     // TC for `flat & sort` => O(m log m)
     // SC => O(m)
     //  - where m is the number of pairs.
     console.log('combination:', combination);

     const doubleRes = [];
     // Find all combinations of elements in the combination array that sum up to the target multiplied by 2
     checkForDoubleTarget(combination, target * 2, 0, 0, [], doubleRes);
     console.log('doubleRes:', doubleRes);
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