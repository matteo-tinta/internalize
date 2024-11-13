const InputError = (props: {
  error: string | string[] | undefined
}) => {

  if(!props.error){
    return null;
  }

  const renderError = (error: string) => {
    return (
      <div key={error} className="text-red-400">
        {error}
      </div>
    )
  }

  if(Array.isArray(props.error)){
    return props.error.map(renderError)
  }

  return renderError(props.error)
}

export {
  InputError
}