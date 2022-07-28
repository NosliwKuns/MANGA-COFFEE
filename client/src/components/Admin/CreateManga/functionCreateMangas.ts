export const genreManga: Array<string> = [
  "action",
  "adventure",
  "fantasy",
  "comedy",
  "drama",
  "mystery",
  "romance",
  "horror",
  "sciFi",
  "school life",
  "sports",
  "super power",
  "magic",
];

export const arrayGenre = (
  booleans: Array<boolean>,
  allDiets: Array<string>
) => {
  var indices = [];
  var element = true;
  var idx = booleans.indexOf(element);
  while (idx !== -1) {
    indices.push(idx);
    idx = booleans.indexOf(element, idx + 1);
  }
  var porFin = indices.map((e) => allDiets[e]);
  console.log(porFin);
  return porFin;
};

export const validate = (input: any) => {
  const error = {
    title: "",
    description: "",
    // rating: "",
    chapter: "",
  };
  let regExpCha = /^[0-9]*$/;
  let chapter = input.chapter.match(regExpCha);
  if (!input.chapter ) {
    error.chapter = "enter a chapter";
  } else if (!chapter?.length) {
    error.chapter = "enter a valid chapter";
  }
  if (!input.title) {
    error.title = "insert a title";
  }
  if (!input.description) {
    error.description = "insert a description";
  }
  // if (!input.rating) {
  //   error.rating = "insert a rating";
  // } else if (!(input.rating >= 0 && input.rating <= 5)) {
  //   error.rating = "insert a value from 0 to 5";
  // }
  return error;
};
