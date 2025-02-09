export const getNameInitials = (name: string) => {
  const splittedName = name.split(" ");
  if (splittedName.length === 1) return splittedName[0].charAt(0);
  if (splittedName.length === 0) return "";
  const firstName = splittedName[0];
  const lastName = splittedName[splittedName.length - 1];
  return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`;
};

export const capitalizeText = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
