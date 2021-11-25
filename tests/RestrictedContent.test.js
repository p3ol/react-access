import { render } from '@testing-library/react';

import { RestrictedContent } from '../src';

describe('<RestrictedContent />', () => {

  it('should render children', () => {
    const { container } = render(
      <RestrictedContent><div className="test" /></RestrictedContent>
    );
    expect(container.querySelectorAll('.test').length).toBe(1);
  });

});
