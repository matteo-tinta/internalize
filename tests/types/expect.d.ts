import 'vitest'

interface CustomMatchers<R = unknown> {
  toHaveBeenNthCalledWithMatch: (nthCall: number, ...args: any[]) => R
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toHaveBeenNthCalledWithMatch(received, nthCall, ...args) {
    const { isNot } = this

    const fnArgs = received.mock.calls[nthCall - 1]
    const pass = args.every((a, i) => expect(fnArgs[i]).toMatchObject(a))

    return {
      // do not alter your "pass" based on isNot. Vitest does it for you
      pass: pass,
      message: () => `Call ${nthCall} does ${isNot ? '' : 'not'} matches the arguments`
    }
  }
})