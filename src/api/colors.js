import axios from "axios"

export function getColors() {
  return axios
    .get("http://localhost:4000/colors", { params: { _sort: "label" } })
    .then(res => res.data)
}

export function getColor(id) {
    return axios.get(`http://localhost:4000/colors/${id}`).then(res => res.data)
}

export function addColor({ label, body }) {
    return axios
      .post("http://localhost:4000/colors", {
        label,
        body,
        userId: 1,
        id: crypto.randomUUID(),
      })
      .then(res => res.data)
  }