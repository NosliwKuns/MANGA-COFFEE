export const validatePass = (input: string) => {
  let error = "";
  let regExpPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  let password = input.match(regExpPass);
  if (!input) {
    error = "copy an password ";
  } else if (!password?.length) {
    error = "copy a valid password! ";
  }
  return error;
};
