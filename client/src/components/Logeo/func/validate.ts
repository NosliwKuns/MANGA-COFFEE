
export const validate = (input: any) => {
  const errors = {
    email: "",
    password: "",
    user: "",
  };
  let regExpEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let email = input.email.match(regExpEmail);

  let regExpPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  let password = input.password.match(regExpPass);

  if (!input.email) {
    errors.email = "copy an email ";
  } else if (!email?.length) {
    errors.email = "copy a valid email! ";
  }

  if (!input.password) {
    errors.password = "copy an password ";
  } else if (!password?.length) {
    errors.password = "copy a valid password! ";
  }

  return errors;
};
