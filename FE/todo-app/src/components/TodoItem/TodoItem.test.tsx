import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoItem from './';

const queryClient = new QueryClient();

const setup = (complete = false) =>
  render(
    <QueryClientProvider client={queryClient}>
      <TodoItem
        id="1"
        title="Test Todo"
        content="Test Content"
        complete={complete}
      />
    </QueryClientProvider>,
  );

describe('TodoItem', () => {
  it('should render todo item', () => {
    const { getByRole } = setup();

    expect(getByRole('heading', { name: 'Test Todo' })).toBeInTheDocument();
  });

  it('should render an unchecked checkbox if the complete prop is false', () => {
    const { getByRole } = setup();

    expect(getByRole('checkbox')).not.toBeChecked();
  });
});
