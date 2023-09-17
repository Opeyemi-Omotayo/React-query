import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getColor } from '../api/colors';
import { getUser } from '../api/users';

const EachColor = () => {
    const { id } = useParams();

  const colorQuery = useQuery({
    queryKey: ["colors", id],
    queryFn: () => getColor(id),
  })

  const userQuery = useQuery({
    queryKey: ["users", colorQuery?.data?.userId],
    enabled: colorQuery?.data?.userId != null,
    queryFn: () => getUser(colorQuery.data.userId),
  })

  if (colorQuery.status === "loading") return <h1>Loading...</h1>
  if (colorQuery.status === "error") {
    return <h1>{JSON.stringify(colorQuery.error)}</h1>
  }

  return (
    <>
      <h1>
        {colorQuery.data.label} <br />
        <small>
          {userQuery.isLoading
            ? "Loading User..."
            : userQuery.isError
            ? "Error Loading User"
            : userQuery.data.name}
        </small>
      </h1>
      <h3>Color ID: {id}</h3>
      <p>{colorQuery.data.body}</p>
    </>
  )
}
  

export default EachColor;
