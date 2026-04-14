export function getHealthInfo(port) {
  return {
    message: `API is running on port ${port}`,
    time: new Date().toISOString(),
  }
}

