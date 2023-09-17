import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const COLORS = [
  { id: 1, label: "red" },
  { id: 2, label: "yellow" },
  { id: 3, label: "blue" },
  { id: 4, label: "purple" },
  { id: 5, label: "brown" },
];

const Colors = () => {
    const queryClient = useQueryClient();

  const colorsQuery = useQuery({
    queryKey: ["colors"],
    queryFn: () => wait(1000).then(() => [...COLORS]),
  });

  const newColorMutation = useMutation({
    mutationFn: label => {
        return wait(1000).then(() => {
            COLORS.push({id: crypto.randomUUID(), label})
        })
    },
    onSuccess: () => {
        queryClient.invalidateQueries(["colors"])
    }
  })

  if (colorsQuery.isLoading) return <h1>Loading...</h1>;
  if (colorsQuery.isError) return <h1>{JSON.stringify(colorsQuery.error)}</h1>;

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
            {color.label}
          </li>
        ))}
      </ul>
      <button disabled={newColorMutation.isLoading} onClick={() => newColorMutation.mutate("green")}>Add Color</button>
    </div>
  );
};

const wait = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export default Colors;
