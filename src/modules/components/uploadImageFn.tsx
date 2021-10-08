export const uploadImageFn = (formData: FormData) =>
  fetch('/api/images/upload', {
    method: 'POST',
    body: formData,
  }).then((res) => res.json() as Promise<{ imageUrl: string }>);
