"use server"

export async function posting_a_form(val: any) {
  const promise = new Promise((res) => {
    setTimeout(() => {
      console.log(val)
      res(undefined)
    }, 2500)
  })
  
  await promise
}