export const classNames = (...args) => {
  const classes = [];

  args.map(arg => {
    if (!arg) {
      return;
    }

    /* istanbul ignore else: not needed */
    if (typeof arg === 'string' || typeof arg === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);

      /* istanbul ignore else: not needed */
      if (inner) {
        classes.push(inner);
      }
    } else if (typeof arg === 'object') {
      Object.keys(arg).map(k => {
        if (arg[k]) {
          classes.push(k);
        }
      });
    }
  });

  return classes.join(' ');
};

export const mockState = (state, action) => ({ ...state, ...action });

export const randomString = () =>
  Math.random().toString(36).substr(2, 5);

export const generateId = () => {
  let id;

  while (!id) {
    const temp = `poool-${randomString()}-${randomString()}`;

    /* istanbul ignore else: virtually impossible to happen */
    if (!document.getElementById(temp)) {
      id = temp;
    }
  }

  return id;
};
