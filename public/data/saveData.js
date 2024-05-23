export async function saveData(options){
  const response = await fetch('http://127.0.0.1:3000/options',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options)
  });
}
