export const calculateGradeAndPoints = (marks:number) => {
  const result = {
    grade: 'NA',
    gradePoints: 0,
  };

  /**
   * 0-19 F
   * 20-39 D
   * 40-59 C
   * 60-79 B
   * 80-100 A
   */

  // Write your code here
  if (marks >= 0 && marks <= 19) {
    result.grade = 'F';
    result.gradePoints = 0;
  } else if (marks >= 20 && marks <= 39) {
    result.grade = 'D';
    result.gradePoints = 1;
  } else if (marks >= 40 && marks <= 59) {
    result.grade = 'C';
    result.gradePoints = 2;
  } else if (marks >= 60 && marks <= 79) {
    result.grade = 'B';
    result.gradePoints = 3;
  } else if (marks >= 80 && marks <= 100) {
    result.grade = 'A';
    result.gradePoints = 4;
  } else {
    result.grade = 'NA';
    result.gradePoints = 0;
  }

  return result;
};
