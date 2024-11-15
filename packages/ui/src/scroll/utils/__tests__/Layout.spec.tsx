/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render } from '@crossed/test';
import { Layout } from '../Layout';

describe('Layout', () => {
  test('rend les enfants passés en prop', () => {
    const { getByText } = render(
      <Layout
        footer={<div>Footer</div>}
        showFooter={false}
        stickyFooter={false}
      >
        <div>Contenu de Layout</div>
      </Layout>
    );

    expect(getByText('Contenu de Layout')).toBeInTheDocument();
  });

  test('rend le footer lorsque showFooter est true et stickyFooter est true', () => {
    const { getByText } = render(
      <Layout footer={<div>Footer</div>} showFooter={true} stickyFooter={true}>
        <div>Contenu de Layout</div>
      </Layout>
    );

    expect(getByText('Footer')).toBeInTheDocument();
  });

  test('ne rend pas le footer lorsque showFooter est false', () => {
    const { queryByText } = render(
      <Layout footer={<div>Footer</div>} showFooter={false} stickyFooter={true}>
        <div>Contenu de Layout</div>
      </Layout>
    );

    expect(queryByText('Footer')).toBeNull();
  });

  test('ne rend pas le footer lorsque stickyFooter est false', () => {
    const { queryByText } = render(
      <Layout footer={<div>Footer</div>} showFooter={true} stickyFooter={false}>
        <div>Contenu de Layout</div>
      </Layout>
    );

    expect(queryByText('Footer')).toBeNull();
  });

  test('applique le style dynamique de paddingRight', () => {
    const { getByTestId } = render(
      <Layout
        footer={<div>Footer</div>}
        showFooter={true}
        stickyFooter={true}
        paddingRight={20}
      >
        <div>Contenu de Layout</div>
      </Layout>
    );

    const footerElement = getByTestId('stickyFooter');
    expect(footerElement).toHaveStyle('padding-right: 20px');
  });
});
