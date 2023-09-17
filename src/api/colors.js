import axios from "axios"

export function getcolors() {
  return axios
    .get("http://localhost:4000/colors", { params: { _sort: "label" } })
    .then(res => res.data)
}
