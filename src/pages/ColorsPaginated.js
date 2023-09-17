import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getColorsPaginated } from "../api/colors";

const ColorsPaginated = () => {
  const [page, setPage] = useState(1);

  const { status, error, data, isPreviousData } = useQuery({
    queryKey: ["colors", { page }],
    keepPreviousData: true,
    queryFn: () => getColorsPaginated(page),
  })

  if (status === "loading") return <h1>Loading...</h1>
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>

  return (
    <>
      <h1>
        Colors Paginated
        <br />
        <small>{isPreviousData && "Previous Data"}</small>
      </h1>
      {data.colors.map(color => (
        <div key={color.id} style={{
            backgroundColor: color.label,
            padding: "1rem",
            margin: "0.5rem",
          }}>{color.label}</div>
      ))}
      {data.previousPage && (
        <button onClick={() => setPage(data.previousPage)}>Previous</button>
      )}{" "}
      {data.nextPage && (
        <button onClick={() => setPage(data.nextPage)}>Next</button>
      )}
    </>
  )
}

export default ColorsPaginated;