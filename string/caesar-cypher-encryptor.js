// O(N) time | O(N) space
function caesarCipherEncryptor(string, key) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const newKey = key % 26;

  return string
    .split("")
    .map((char) => {
      const newCharCode = alphabet.indexOf(char) + newKey;
      return alphabet[newCharCode % 26];
    })
    .join("");
}
