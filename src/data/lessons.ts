export interface ItalianNumber {
  number: number;
  italian: string;
  pronunciation?: string;
  korean?: string;
  english?: string;
}

export interface Question {
  number: number;
  italian: string;
  options: string[];
  correct: string;
}

export interface MatchingPair {
  id: string;
  number: number;
  italian: string;
}

export interface Lesson {
  id: string;
  title: string;
  level: "초급" | "중급" | "고급";
  numbers: ItalianNumber[];
  type: "quiz" | "matching";
}

// Italian numbers database
export const italianNumbers: ItalianNumber[] = [
  { number: 0, italian: "zero", pronunciation: "제로", korean: "영", english: "zero" },
  { number: 1, italian: "uno", pronunciation: "우노", korean: "하나", english: "one" },
  { number: 2, italian: "due", pronunciation: "두에", korean: "둘", english: "two" },
  { number: 3, italian: "tre", pronunciation: "트레", korean: "셋", english: "three" },
  { number: 4, italian: "quattro", pronunciation: "콰트로", korean: "넷", english: "four" },
  { number: 5, italian: "cinque", pronunciation: "친퀘", korean: "다섯", english: "five" },
  { number: 6, italian: "sei", pronunciation: "세이", korean: "여섯", english: "six" },
  { number: 7, italian: "sette", pronunciation: "세테", korean: "일곱", english: "seven" },
  { number: 8, italian: "otto", pronunciation: "오토", korean: "여덟", english: "eight" },
  { number: 9, italian: "nove", pronunciation: "노베", korean: "아홉", english: "nine" },
  { number: 10, italian: "dieci", pronunciation: "디에치", korean: "열", english: "ten" },
  { number: 11, italian: "undici", pronunciation: "운디치", korean: "열하나", english: "eleven" },
  { number: 12, italian: "dodici", pronunciation: "도디치", korean: "열둘", english: "twelve" },
  { number: 13, italian: "tredici", pronunciation: "트레디치", korean: "열셋", english: "thirteen" },
  { number: 14, italian: "quattordici", pronunciation: "콰토르디치", korean: "열넷", english: "fourteen" },
  { number: 15, italian: "quindici", pronunciation: "퀸디치", korean: "열다섯", english: "fifteen" },
  { number: 16, italian: "sedici", pronunciation: "세디치", korean: "열여섯", english: "sixteen" },
  { number: 17, italian: "diciassette", pronunciation: "디차세테", korean: "열일곱", english: "seventeen" },
  { number: 18, italian: "diciotto", pronunciation: "디초토", korean: "열여덟", english: "eighteen" },
  { number: 19, italian: "diciannove", pronunciation: "디찬노베", korean: "열아홉", english: "nineteen" },
  { number: 20, italian: "venti", pronunciation: "벤티", korean: "스물", english: "twenty" },
  { number: 25, italian: "venticinque", pronunciation: "벤티친퀘", korean: "스물다섯", english: "twenty-five" },
  { number: 30, italian: "trenta", pronunciation: "트렌타", korean: "서른", english: "thirty" },
  { number: 40, italian: "quaranta", pronunciation: "콰란타", korean: "마흔", english: "forty" },
  { number: 50, italian: "cinquanta", pronunciation: "친콴타", korean: "쉰", english: "fifty" },
  { number: 60, italian: "sessanta", pronunciation: "세산타", korean: "예순", english: "sixty" },
  { number: 70, italian: "settanta", pronunciation: "세탄타", korean: "일흔", english: "seventy" },
  { number: 80, italian: "ottanta", pronunciation: "오탄타", korean: "여든", english: "eighty" },
  { number: 90, italian: "novanta", pronunciation: "노반타", korean: "아흔", english: "ninety" },
  { number: 100, italian: "cento", pronunciation: "첸토", korean: "백", english: "one hundred" },
];

// Generate lessons
export const lessons: Lesson[] = [
  {
    id: "beginner-1",
    title: "기본 숫자 1-5",
    level: "초급",
    numbers: italianNumbers.slice(1, 6), // 1-5
    type: "quiz",
  },
  {
    id: "beginner-2", 
    title: "기본 숫자 6-10",
    level: "초급",
    numbers: italianNumbers.slice(6, 11), // 6-10
    type: "matching",
  },
  {
    id: "beginner-3",
    title: "숫자 1-10 복습",
    level: "초급", 
    numbers: italianNumbers.slice(1, 11), // 1-10
    type: "quiz",
  },
  {
    id: "intermediate-1",
    title: "십의 자리 11-15",
    level: "중급",
    numbers: italianNumbers.slice(11, 16), // 11-15
    type: "quiz",
  },
  {
    id: "intermediate-2",
    title: "십의 자리 16-20",
    level: "중급", 
    numbers: italianNumbers.slice(16, 21), // 16-20
    type: "matching",
  },
  {
    id: "intermediate-3",
    title: "숫자 11-20 복습",
    level: "중급",
    numbers: italianNumbers.slice(11, 21), // 11-20
    type: "quiz",
  },
  {
    id: "advanced-1",
    title: "큰 숫자 20-50",
    level: "고급",
    numbers: [
      italianNumbers[20], // 20
      italianNumbers[21], // 25
      italianNumbers[22], // 30
      italianNumbers[23], // 40
      italianNumbers[24], // 50
    ],
    type: "quiz",
  },
  {
    id: "advanced-2",
    title: "큰 숫자 60-100",
    level: "고급", 
    numbers: [
      italianNumbers[25], // 60
      italianNumbers[26], // 70
      italianNumbers[27], // 80
      italianNumbers[28], // 90
      italianNumbers[29], // 100
    ],
    type: "matching",
  },
];

// Generate quiz questions from lesson numbers
export function generateQuizQuestions(lessonNumbers: ItalianNumber[]): Question[] {
  const questions: Question[] = [];
  
  lessonNumbers.forEach((target) => {
    // Get all other italian words as wrong options
    const allOtherWords = italianNumbers
      .filter(n => n.italian !== target.italian)
      .map(n => n.italian);
    
    // Randomly select 2 wrong options
    const wrongOptions = allOtherWords
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    // Create options array with correct answer
    const options = [target.italian, ...wrongOptions]
      .sort(() => Math.random() - 0.5);
    
    questions.push({
      number: target.number,
      italian: target.italian,
      options,
      correct: target.italian,
    });
  });
  
  return questions;
}

// Generate matching pairs from lesson numbers
export function generateMatchingPairs(lessonNumbers: ItalianNumber[]): MatchingPair[] {
  return lessonNumbers.map((num, index) => ({
    id: `pair-${index}`,
    number: num.number,
    italian: num.italian,
  }));
}