export const sleep = (timout: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, timout))
}
