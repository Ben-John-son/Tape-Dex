const url = "/api/tape";

export const getTapes = () => {
  return fetch(url).then((res) => res.json());
};


export const getUserTapes = (id) => {
  return fetch(`${url}/${id}`).then((res) => res.json());
}


export const getTapeById = (id) => {
  return fetch(`${url}/tapeBy/${id}`).then((res) => res.json());
}

export const updateTape = (id, tape) => {
  return fetch(`${url}/${id}`, {
    method: "PATCH",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tape),
  });
}
