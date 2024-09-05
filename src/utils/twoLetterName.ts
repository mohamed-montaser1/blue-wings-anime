export default function twoLetterName(name: string) {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
}
