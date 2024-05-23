export async function saveCurrentPlayer(playerMove) {
  const response = await fetch('http://127.0.0.1:3000/player', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ playerMove })
  });
}
