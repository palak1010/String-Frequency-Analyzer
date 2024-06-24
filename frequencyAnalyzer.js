class frequencyAnalyzer {
  constructor(para) {
    this.paragraph = para;
    // create frequency object
    this.frequencyMap = this.createFrequencyMap();
    this.subStringFrequencyMap = this.createSubStringFrequencyMap();
  }
  createFrequencyMap() {
    const freqMap = {};
    const stringToLower = this.paragraph.toLowerCase();
    for (const char of stringToLower) {
      if (freqMap[char]) {
        freqMap[char] = freqMap[char] + 1;
      } else {
        freqMap[char] = 1;
      }
    }
    return freqMap;
  }
  createSubStringFrequencyMap() {
    const lowerString = this.paragraph.toLowerCase();
    const subString = lowerString.split(" ");
    const subStringFrequencyObj = {};
    subString.forEach((word) => {
      if (word !== "") {
        subStringFrequencyObj[word] = (subStringFrequencyObj[word] || 0) + 1;
      }
    });
    return subStringFrequencyObj;
  }
  checkPalindrom(string) {
    let normalizedText = string.toLowerCase();
    let reverseText = normalizedText.split("").reverse().join("");
    return normalizedText === reverseText;
  }
  noramlizeText(str) {
    return str.toLowerCase().split("").sort().join("");
  }
  checkAnagram(str1, str2) {
    return this.noramlizeText(str1) === this.noramlizeText(str2);
  }
  getSubString() {
    const mostFrequent = () => {
      let maxFreq = 0;
      let maxFreqSubStrings = [];

      for (const key in this.subStringFrequencyMap) {
        if (this.subStringFrequencyMap[key] > maxFreq) {
          // exclude space from condition
          if (key !== " ") {
            maxFreq = this.subStringFrequencyMap[key];
          }
        }
      }

      for (const key in this.subStringFrequencyMap) {
        if (this.subStringFrequencyMap[key] === maxFreq) {
          maxFreqSubStrings.push({ [key]: this.subStringFrequencyMap[key] });
        }
      }
      return maxFreqSubStrings;
    };
    const palindromList = () => {
      let palindroms = [];
      for (const key in this.subStringFrequencyMap) {
        console.log(key);
        if (this.checkPalindrom(key)) {
          palindroms.push(key);
        }
      }
      return palindroms;
    };
    return { mostFrequent, palindromList };
  }
  getSorting() {
    const byChar = () => {
      const sortedKeys = Object.keys(this.frequencyMap).sort((a, b) =>
        // localCompare methos ensures a proper lexicographical order tjat consider case & special charater
        a.localeCompare(b)
      );
      const sortedObjByKey = {};
      sortedKeys.forEach((key) => {
        sortedObjByKey[key] = this.frequencyMap[key];
      });
      return sortedObjByKey;
    };
    const byFrequency = () => {
      const sortedValue = Object.entries(this.frequencyMap).sort(
        ([, valueA], [, valueB]) => valueB - valueA
      );

      const sortedObjByValue = {};
      sortedValue.forEach(([key, value]) => {
        sortedObjByValue[key] = value;
      });
      return sortedObjByValue;
    };
    return { byChar, byFrequency };
  }
  getFrequencyCount() {
    const most = () => {
      let maxFreq = 0;
      let maxFreqChar = {};
      for (const key in this.frequencyMap) {
        if (this.frequencyMap[key] > maxFreq) {
          // exclude space from condition
          if (key !== " ") {
            maxFreq = this.frequencyMap[key];
            maxFreqChar = { [key]: this.frequencyMap[key] };
          }
        }
      }
      return maxFreqChar;
    };
    const least = () => {
      let minFreq = Infinity;
      let leastFreqChars = [];
      for (const key in this.frequencyMap) {
        if (this.frequencyMap[key] < minFreq) {
          minFreq = this.frequencyMap[key];
          // Use this if you want to return only 1 least value
          //leastFreqChars = {[key]:this.frequencyMap[key]}
        }
      }
      // Use this if you want to return only multiple least value
      for (const key in this.frequencyMap) {
        if (this.frequencyMap[key] === minFreq) {
          leastFreqChars.push({ [key]: this.frequencyMap[key] });
        }
      }
      return leastFreqChars;
    };
    const unique = () => {
      let uniqueChars = new Set(this.paragraph.toLowerCase());
      return uniqueChars;
    };
    const allFrequencyOfChar = (char) => {
      if (char in this.frequencyMap) {
        return { [char]: this.frequencyMap[char] };
      } else {
        return { [char]: 0 };
      }
    };
    return { most, least, unique, allFrequencyOfChar };
  }
  getIndexOfChar(char) {
    const first = () => {
      return this.paragraph.toLowerCase().indexOf(char);
    };
    const last = () => {
      return this.paragraph.toLowerCase().lastIndexOf(char);
    };
    const all = () => {
      let indexes = [];
      for (let i = 0; i < this.paragraph.length; i++) {
        if (char.toLowerCase() === this.paragraph[i].toLowerCase()) {
          indexes.push(i);
        }
      }
      return indexes;
    };
    return { first, last, all };
  }
  transformChar() {
    const replace = (char1, char2) => {
      return this.paragraph.replaceAll(char1, char2);
    };
    const remove = (char) => {
      return this.paragraph.replaceAll(char, "");
    };
    const swap = (char1, char2) => {
      return (this.paragraph = this.paragraph
        .split(char1)
        .join("_")
        .split(char2)
        .join(char1)
        .split("_")
        .join(char2));
    };
    return { replace, remove, swap };
  }
}

const paragraph =
  "The quick brown madam fox jumps over the lazy dog! 123456789000, and then it rests. Suddenly, it woke up and realized it was all just a dream: an adventure with 99 possibilities, 88 challenges, and countless moments of excitement. What's next? Only time will tell...";

const analyzer = new frequencyAnalyzer(paragraph);

const frequencyObj = analyzer.frequencyMap;
console.log("Frequency Object is => ", frequencyObj);

const sorted = analyzer.getSorting();
const sortedByChar = sorted.byChar();
console.log("Frequency Object sort by key is => ", sortedByChar);

const sortedByFrequency = sorted.byFrequency();
console.log("Frequency Object sort by Frequency is => ", sortedByFrequency);

const specificChar = "a";

const frequencyCount = analyzer.getFrequencyCount();
const mostFrequencyCount = frequencyCount.most();
console.log(`The Most Frequent character is => `, mostFrequencyCount);

const leastFrequencyCount = frequencyCount.least();
console.log(`The least Frequent character is => `, leastFrequencyCount);

const uniqueFrequencyCount = frequencyCount.unique();
console.log(`The Unique characte is => `, uniqueFrequencyCount);

const specificCharacterFreq = frequencyCount.allFrequencyOfChar(specificChar);
console.log(
  `Frequency of character ${specificChar} is => `,
  specificCharacterFreq
);

const indexOfChar = analyzer.getIndexOfChar(specificChar);
const firstIndex = indexOfChar.first();
console.log(`The first occurance of ${specificChar} is => `, firstIndex);

const lastIndex = indexOfChar.last();
console.log(`The last occurance of ${specificChar} is => `, lastIndex);

const allIndex = indexOfChar.all();
console.log(`The ccurance of ${specificChar} is => `, allIndex);

const charTranformation = analyzer.transformChar();
const charReplace = charTranformation.replace("a", "@");
console.log(`Replace string is is => `, charReplace);

const charRemove = charTranformation.remove("e");
console.log(`Remove string is is => `, charRemove);

const charSwap = charTranformation.swap("e", "z");
console.log(`Swap string is is => `, charSwap);

const subString = analyzer.getSubString();
const mostFrequentSubString = subString.mostFrequent();
console.log(`The Most Frequent sub string are => `, mostFrequentSubString);

const palindromSubStrings = subString.palindromList();
console.log(`Palindrom sub string are => `, palindromSubStrings);

const str1 = "Listen";
const str2 = "Silent";
const isAnagram = analyzer.checkAnagram(str1, str2);

console.log(
  `${str1} & ${str2} are ${isAnagram ? "Anagrams" : "not Anagrams"}. `
);
