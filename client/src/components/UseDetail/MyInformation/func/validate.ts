export const validate = (input: any) => {
  const error =  {
        phone : "",
        name_user: "" , 
        last_user :"" ,
        country_user : "" ,
        direction_user : "" ,
        postal_code : "" ,
        reference : ""
      }
      let regExpNum = /^[0-9]*$/;
      let phone = input.phone[0].match(regExpNum);
      let postal = input.postal_code[0].match(regExpNum)
 if (!phone?.length) {
        error.phone = "enter a valid phone number";
      }
      if(!postal){
        error.postal_code = "enter a valid postal code"
      }
      console.log(error)
      return error
    }