const Alert = (props: React.PropsWithChildren) => {
  const {
    children
  } = props

  return (
    <div className="bg-gray-400">
      {children}
    </div>
  )
}

export {
  Alert
}