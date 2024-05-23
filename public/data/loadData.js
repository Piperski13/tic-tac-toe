export async function loadData(){
  const response = await fetch('http://127.0.0.1:3000/options');
  const options = await response.json();
  return options;
}