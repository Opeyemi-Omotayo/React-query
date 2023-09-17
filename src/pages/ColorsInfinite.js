import React from 'react';
import { getColorsPaginated } from '../api/colors';
import { useInfiniteQuery } from '@tanstack/react-query';

const ColorsInfinite = () => {
    const {
        status,
        error,
        data,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
      } = useInfiniteQuery({
        queryKey: ["colors", "infinite"],
        getNextPageParam: prevData => prevData.nextPage,
        queryFn: ({ pageParam = 1 }) => getColorsPaginated(pageParam),
      })
    
      if (status === "loading") return <h1>Loading...</h1>
      if (status === "error") return <h1>{JSON.stringify(error)}</h1>
    
      return (
        <>
          <h1>Colors Infinite</h1>
          {data.pages
            .flatMap(data => data.colors)
            .map(color => (
              <div key={color.id}>{color.label}</div>
            ))}
          {hasNextPage && (
            <button onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      )
}

export default ColorsInfinite;
