export const randomString = () =>
  Math.random().toString(36).substr(2, 5);

export const generateId = () => {
  let id;

  while (!id) {
    const temp = `poool-${randomString()}-${randomString()}`;

    /* istanbul ignore else: virtually impossible to happen */
    if (typeof document === 'undefined' || !document.getElementById?.(temp)) {
      id = temp;
    }
  }

  return id;
};

export const loadScript = (
  url,
  id,
  { timeout } = {}
) => new Promise((resolve, reject) => {
  /* istanbul ignore else: tested inside puppeteer */
  if (process.env.NODE_ENV === 'test') {
    return resolve();
  }

  const existing = document.getElementById(`#${id}`);

  if (existing) {
    return Promise.race([
      new Promise(resolve => existing.addEventListener('load', resolve)),
      new Promise(resolve => setTimeout(resolve, timeout ?? 2000)),
    ]);
  }

  const script = globalThis.document.createElement('script');
  script.onload = resolve;
  script.onerror = reject;
  script.async = true;
  script.src = url;
  script.id = id;
  globalThis.document.head.appendChild(script);
});
