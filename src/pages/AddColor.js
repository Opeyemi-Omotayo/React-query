import React, { useRef} from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { addColor } from '../api/colors';

const AddColor = () => {
    const navigate = useNavigate();
    const labelRef = useRef();
    const bodyRef = useRef();
    const queryClient = useQueryClient();
    const addColorMutation = useMutation({
      mutationFn: addColor,
      onSuccess: data => {
        queryClient.setQueryData(["colors", data.id], data)
        queryClient.invalidateQueries(["colors"], { exact: true })
        navigate(`/colors/${data.id}`)
      },
    })
  
    function handleSubmit(e) {
      e.preventDefault()
      addColorMutation.mutate({
        label: labelRef.current.value,
        body: bodyRef.current.value,
      })
    }
  
    return (
      <div className='colors'>
        {addColorMutation.isError && JSON.stringify(addColorMutation.error)}
        <h1>Add Color</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="label">label</label>
            <input id="label" ref={labelRef} />
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <input id="body" ref={bodyRef} />
          </div>
          <button disabled={addColorMutation.isLoading}>
            {addColorMutation.isLoading ? "Loading..." : "Add"}
          </button>
        </form>
      </div>
    )
}

export default AddColor;
