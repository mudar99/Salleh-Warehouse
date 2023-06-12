export const isArabic = (text) => {
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F]/;
  return arabicPattern.test(text);
};

export const isEnglish = (text) => {
  const englishPattern = /^[a-zA-Z0-9\s]+[\.\s]?$/;
  return englishPattern.test(text);
};
