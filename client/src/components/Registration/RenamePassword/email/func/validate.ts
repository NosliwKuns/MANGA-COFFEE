export const validate = (input :string) => {
    console.log(input)
    let error = ''
    let regExpEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let email = input.match(regExpEmail);
  if (!input) {
    error = "copy an email ";
  } else if (!email?.length) {
    error = "copy a valid email! ";
  }
  return error
}