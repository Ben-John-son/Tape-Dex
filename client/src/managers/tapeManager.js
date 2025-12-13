const url = "/api/tape";

export const getTapes = () => {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch tapes");
    return res.json();
  });
};

export const getUserTapes = (id) => {
  return fetch(`${url}/${id}`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch user tapes");
    return res.json();
  });
};

export const getTapeById = (id) => {
  return fetch(`${url}/tapeBy/${id}`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch tape");
    return res.json();
  });
};

export const updateTape = (id, tape) => {
  return fetch(`${url}/${id}`, {
    method: "PATCH",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tape),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to update tape");
    if (res.status === 204) return null;

    return res.json();
  });
};

export const newTape = (tape) => {
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tape),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to create tape");
    return res.json();
  });
};

export const deleteTape = (id) => {
  return fetch(`${url}/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to delete tape");
    return null;
  });
};
