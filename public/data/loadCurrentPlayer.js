export async function loadCurrentPlayer(){
  const response = await fetch('http://127.0.0.1:3000/player');
  const options = await response.json();
  return options;
}