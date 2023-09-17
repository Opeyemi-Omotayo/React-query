import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getColors } from "../api/colors";


// /colors -> ["colors"]
// /colors/1 -> ["colors", color.id]
// /colors?labelId=1 -> ["color", {labelId: 1}]
// /colors/2/comments -> ["colors", color.id, "comments"]

const Colors = () => {

  const colorsQuery = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });

  if (colorsQuery.status === "loading") return <h1>Loading...</h1>;
  if (colorsQuery.status === "error") return <h1>{JSON.stringify(colorsQuery.error)}</h1>;

  return (
    <div className="colors">
      <h1>Colors</h1>
      <ul>
        {colorsQuery.data.map((color) => (
          <li
            key={color.id}
            style={{
              backgroundColor: color.label,
              padding: "1rem",
              margin: "0.5rem",
            }}
          >
           <Link to={`/colors/${color.id}`}>{color.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Colors;
