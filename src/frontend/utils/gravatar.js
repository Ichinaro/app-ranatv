import md5 from "md5";

const gravatar = (email) => {
  const base = "https://gravatar.com/avatar/";
  const formattedEmail = email.trim().toLowerCase(); //trim elimina espacios
  const hash = md5(formattedEmail, { encoding: "binary" });
  return `${base}${hash}?d=identicon`; //añado ?d=identicon para imagenes aleatorias
};

export default gravatar;
