export const validate = (input:any) => {
    const error = {
        title : "" ,
        description : "" ,
        price : "" ,
        stock :""
    }
    let regExpNum = /^[0-9]*$/;
    let price = input.price.match(regExpNum);
    let stock = input.stock.match(regExpNum);
    if (!input.price ) {
      error.price = "enter a price";
    } else if (!price?.length) {
      error.price = "enter a valid price";
    }
    if (!input.stock ) {
        error.stock = "enter a stock";
      } else if (!stock?.length) {
        error.stock = "enter a valid stock";
      }
    if(!input.title) {
        error.title = "please insert a title"
    }
    if(!input.description){
        error.description = "please insert a description"
    }
    return error
}

export const categories =  [
    
]