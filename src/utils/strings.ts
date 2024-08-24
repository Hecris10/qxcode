export const getNameInitials = (name: string) => {
  const splittedName = name.split(" ");
  const firstName = splittedName[0];
  const lastName = splittedName[splittedName.length - 1];
  return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`;
};
