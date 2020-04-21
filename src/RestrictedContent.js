import React, { useContext, useEffect, useRef } from 'react';

import { DefaultContext } from './contexts';
import { generateId } from './utils';

export default ({ children }) => {
  const { setContent } = useContext(DefaultContext);
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.id = contentRef.current.id || generateId();
      setContent(contentRef.current.id);
    }
  }, [contentRef.current]);

  return React.cloneElement(React.Children.only(children), {
    ref: contentRef,
  });
};
