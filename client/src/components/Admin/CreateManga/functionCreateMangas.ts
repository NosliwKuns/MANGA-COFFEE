export const genreManga : Array<string> = [
    'action' , 
    'adventure' ,
    'fantasy' ,
    'comedy' ,
    'drama' ,
    'mystery' ,
    'romance' ,
    'horror' ,
    'sciFi' ,
    'school life' ,
    'sports' ,
    'super power' ,
    'magic' ,
]


export const arrayGenre = (booleans: Array<boolean>, allDiets : Array<string>) => {
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

export const validate = (input : any) => {
  const error = {
      title : "" ,
      description : "" ,
      cover_image : "" ,
      rating : "" ,
      chapter : "" ,
      books : ""
  }
  if(!input.title){ error.title = "insert a title"}
  if(!input.description){ error.description = "insert a description"}
  if(!input.cover_image){ error.cover_image = "insert a cover_image"}
  if(!(input.rating <0 && input.rating > 5)){ error.rating = "insert a value from 0 to 5"}
  if(!input.chapter){ error.chapter = "insert a chapter"}
  return error
}