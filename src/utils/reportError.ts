export async function reportError(where: string, error: Error): Promise<void> {
  await fetch('/api/reportException', {
    method: 'POST',
    body: JSON.stringify({
      where,
      message: error.message,
      exception: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      state: localStorage.getItem('persist:root'),
    }),
  });
}
