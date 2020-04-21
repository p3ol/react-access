import React, { useContext, useEffect, useRef } from 'react';

import { DefaultContext } from './contexts';

export default ({ mode = 'excerpt', percent = '80', children }) => {
  const { setContent } = useContext(DefaultContext);
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef.current) {
      setContent({ container: contentRef.current, mode, percent });
    }
  }, [contentRef.current, mode, percent]);

  return React.Children.only(children, child => ({
    ...child.props,
    ref: contentRef,
  }));
};
