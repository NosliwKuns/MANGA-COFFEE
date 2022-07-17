
export const validate = (input: any) => {
  const errors = {
    postalCode: "",
    country: "",
    direction: "",
    reference: "",
    name: "",
    lastName: "",
    telephone: "",
    email: "",
  };
  let regExpEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let email = input.email.match(regExpEmail);

  let regExpTelf = /^[0-9]*$/;
  let telephone = input.telephone.match(regExpTelf);

  let regExpPostal = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
  let postalCode = input.postalCode.match(regExpPostal);

  if (!input.email) {
    errors.email = "copy an email ";
  } else if (!email?.length) {
    errors.email = "copy a valid email! ";
  }
  if (!input.telephone) {
    errors.telephone = "enter a phone number";
  } else if (!telephone?.length) {
    errors.telephone = "enter a valid phone number";
  }
  if (!input.postalCode) {
    errors.postalCode = "enter a postal code";
  } else if (!postalCode?.length) {
    errors.postalCode = "enter a valid postal code";
  }

  if (!input.name) {
    errors.name = "enter a name please";
  }
  if (!input.lastName) {
    errors.lastName = "enter a name please";
  }
  if (!input.country) {
    errors.country = "enter a country";
  }
  if (!input.reference) {
    errors.reference = "enter a reference";
  }
  if (!input.direction) {
    errors.direction = "enter a direction";
  }
  return errors;
};
