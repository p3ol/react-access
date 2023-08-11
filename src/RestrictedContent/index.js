import {
  Children,
  cloneElement,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';

const RestrictedContent = forwardRef(({
  mode,
  percent,
  children,
}, ref) => {
  const contentRef = useRef();

  useImperativeHandle(ref, () => ({
    contentRef,
    mode,
    percent,
  }));

  return cloneElement(Children.only(children), {
    ref: contentRef,
  });
});

RestrictedContent.displayName = 'RestrictedContent';
RestrictedContent.propTypes = {
  children: PropTypes.element.isRequired,
  mode: PropTypes.oneOf(['excerpt', 'hide', 'custom']),
  percent: PropTypes.number,
};

export default RestrictedContent;
