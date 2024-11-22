export function validateDate(dateString: string): boolean {
  // Regular expression to match YYYY-MM-DD format
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  // Test the dateString against the regex
  if (!regex.test(dateString)) {
    return false;
  }

  // Parse the date parts to check if it's a valid date
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  // Check if the date is valid
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function formatInputDateToIso(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString();
}
