
export const withTryCatchLogging = async <T>(callback: () => T | PromiseLike<T>, onCatch?: (error: unknown) => void) => {
  const isCallbackAPromise = "then" in callback
  const onCatchCallback = onCatch ?? ((error) => {
    console.trace({
      error
    })
  })
  
  try {
    return isCallbackAPromise ? await callback() : callback()
  } catch (error) {
    onCatchCallback(error)
    throw error
  }
}