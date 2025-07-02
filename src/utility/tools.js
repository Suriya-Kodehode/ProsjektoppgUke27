// Capitalize the first letter of a string
export function cap(str) {
  return str && str[0].toUpperCase() + str.slice(1);
}
// Capitalize the first letter of each word in a string
export function capW(str) {
  return str ? str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    : str;
}
// Convert the entire string to lowercase
export function low(str) {
  return str ? str.toLowerCase() : str;
}

// Utility function to concatenate class names with spaces
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Helper to convert bg classes to hover classes
export function getHoverClass(bgClass) {
  return bgClass ? bgClass.replace('bg-', 'hover:bg-') : ''
}