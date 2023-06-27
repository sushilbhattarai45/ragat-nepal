export default async function callAPI(url, d) {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  let data = { ...d, key: '5485FE5759545A4A' };
  let res;
  await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      res = response;
    })
    .catch((error) => {
      alert('Error:' + error);
    });
  return res;
}
