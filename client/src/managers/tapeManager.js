const url = "/api/tape";


const safeJson = async (res) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Request failed");
  }
  if (res.status === 204) return null; 
  return res.json();
};


export const getTapes = () =>
   fetch(url).then(safeJson);


export const getUserTapes = (id) => 
  fetch(`${url}/${id}`).then(safeJson);


export const getTapeById = (id) => 
  fetch(`${url}/tapeBy/${id}`).then(safeJson);

export const updateTape = (id, tape) => {
  return fetch(`${url}/${id}`, {
    method: "PATCH",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tape),
  }).then(safeJson);
};


export const newTape = (tape) => {
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tape),
  }).then(safeJson);
};


export const deleteTape = (id) => {
  return fetch(`${url}/${id}`, { method: "DELETE" }).then(safeJson);
};
