import fetch from 'node-fetch';
import https from 'https';

const agent = new https.Agent({ rejectUnauthorized: false });
const oldHandler = document.createElement;

document.createElement = (tagName, ...args) => {
  const tag = oldHandler.call(document, tagName, ...args);

  if (tagName === 'script') {
    Object.defineProperty(tag, 'src', {
      get: function() { return this._src; },
      set: function(src) {
        this._src = src;
        fetch(src, { agent }).then(res => res.text()).then(text => {
          const newTag = oldHandler.call(document, 'script');
          newTag.textContent = text;
          document.head.appendChild(newTag);
          this.onload();
        });
      },
    });
  }

  return tag;
};
