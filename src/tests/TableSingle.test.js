import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react'
import TableSingle from '../components/TableSingle';

test('renders content', () => {
  const manga = {
    title: 'test title', 
    lastRead: new Date(),
    chapter: 1,
    link: 'www.test.com'
  }

  const component = render(
    <TableSingle manga={manga} />
  )

  expect(component.container).toHaveTextContent(
    'test title'
  )
})