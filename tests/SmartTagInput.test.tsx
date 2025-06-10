import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SmartTagInput from '../src/components/SmartTagInput/SmartTagInput';
import { vi, describe, it, beforeEach, expect } from 'vitest';
// import { fetchTags } from '../src/lib/api';

vi.mock('../src/lib/api', () => ({
  fetchTags: vi.fn(async (query: string) => {
    if (!query || query === 'empty') return [];
    return [
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Home Goods' },
    ];
  }),
}));

describe('SmartTagInput', () => {
  const handleChange = vi.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  it('renders input field', () => {
    render(<SmartTagInput onChange={handleChange} />);
    expect(
      screen.getByPlaceholderText('Type to search...'),
    ).toBeInTheDocument();
  });

  it('fetches and displays suggestions on input', async () => {
    render(<SmartTagInput onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Type to search...');
    fireEvent.change(input, { target: { value: 'Elec' } });

    await waitFor(() => {
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Home Goods')).toBeInTheDocument();
    });
  });

  it('selects a tag on click', async () => {
    render(<SmartTagInput onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Type to search...');
    fireEvent.change(input, { target: { value: 'Elec' } });

    await waitFor(() => screen.getByText('Electronics'));
    fireEvent.mouseDown(screen.getByText('Electronics'));

    expect(handleChange).toHaveBeenCalledWith([{ id: 1, name: 'Electronics' }]);
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('removes a tag on click', async () => {
    render(<SmartTagInput onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Type to search...');
    fireEvent.change(input, { target: { value: 'Elec' } });

    await waitFor(() => screen.getByText('Electronics'));
    fireEvent.mouseDown(screen.getByText('Electronics'));

    const removeButton = screen.getByLabelText('Remove Electronics');
    fireEvent.click(removeButton);

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('allows keyboard navigation and selection', async () => {
    render(<SmartTagInput onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Type to search...');

    fireEvent.change(input, { target: { value: 'Elec' } });

    await waitFor(() => screen.getByText('Electronics'));

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledWith([{ id: 1, name: 'Electronics' }]);
  });

  it('shows no suggestions if list is empty', async () => {
    render(<SmartTagInput onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Type to search...');
    fireEvent.change(input, { target: { value: 'empty' } });

    await waitFor(() => {
      const noSuggestion = screen.queryByRole('listitem');
      expect(noSuggestion).toBeNull();
    });
  });
});
