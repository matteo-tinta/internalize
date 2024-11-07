
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionLike<T = unknown> = (...args: any[]) => T

export const withLogger = 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  (logFn: (...args: unknown[]) => void) => 
    <T extends FunctionLike,>(callback: T) => 
      (...args: Parameters<T>) => {
  logFn(...args)

  callback(...args)
}