// O(N) time | O(N) space
function reverseWordsInString(string) {
  let words = [];
  let startOfWord = 0;

  for (let i = 0; i < string.length; i++) {
    if (string[i] === ' ') {
      words.push(string.slice(startOfWord, i));
      startOfWord = i;
    } else if (string[startOfWord] === ' ') {
      words.push(' ');
      startOfWord = i;
    }
  }

  words.push(string.slice(startOfWord, string.length));

  reverseArray(words, 0, words.length - 1);

  return words;
}

function reverseArray(array, start, end) {
  let left = start;
  let right = end;

  while (left < right) {
    [array[left], array[right]] = [array[right], array[left]];
    left++;
    right--;
  }
}
