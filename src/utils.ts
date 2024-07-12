export const randomString = () =>
  Math.random().toString(36).slice(2, 7);

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
  url: string,
  id: string,
  opts: { timeout?: number } = {}
) => new Promise((resolve, reject) => {
  /* istanbul ignore else: tested inside puppeteer */
  if (process.env.NODE_ENV === 'test') {
    return resolve(true);
  }

  const existing = globalThis.document.getElementById(id);

  if (existing) {
    return Promise.race([
      new Promise(resolve => existing.addEventListener('load', resolve)),
      new Promise(resolve => setTimeout(resolve, opts.timeout ?? 2000)),
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
