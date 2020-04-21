import React, { useContext, useEffect, useRef } from 'react';

import { DefaultContext } from './contexts';
import { generateId } from './utils';

export default ({ mode = 'excerpt', percent = '80', children }) => {
  const { setContent } = useContext(DefaultContext);
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.id = contentRef.current.id || generateId();
      setContent({ container: contentRef.current.id, mode, percent });
    }
  }, [contentRef.current, mode, percent]);

  return React.cloneElement(React.Children.only(children), {
    ref: contentRef,
  });
};
