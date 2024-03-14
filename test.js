const array = ["fantasy", "mystery"];
let counter = 5;

while (counter !== 0) {
  const looped = array[counter % array.length];
  console.log(looped);
  counter--;
}
