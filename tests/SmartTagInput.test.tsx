import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SmartTagInput from '@/components/SmartTagInput/SmartTagInput';

jest.mock('@/lib/api', () => ({
  fetchTags: jest.fn(async (query: string) => {
    if (!query) return [];
    if (query === 'empty') return [];
    return [
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Home Goods' },
    ];
  }),
}));

describe('SmartTagInput', () => {
  const handleChange = jest.fn();

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

  // New test: Keyboard navigation (ArrowDown, ArrowUp, Enter)
  it('allows keyboard navigation and selection', async () => {
    render(<SmartTagInput onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Type to search...');

    fireEvent.change(input, { target: { value: 'Elec' } });

    await waitFor(() => screen.getByText('Electronics'));

    fireEvent.keyDown(input, { key: 'ArrowDown' }); // highlight first suggestion (Electronics)
    fireEvent.keyDown(input, { key: 'ArrowDown' }); // highlight second suggestion (Home Goods)
    fireEvent.keyDown(input, { key: 'ArrowUp' }); // back to first suggestion (Electronics)
    fireEvent.keyDown(input, { key: 'Enter' }); // select Electronics

    expect(handleChange).toHaveBeenCalledWith([{ id: 1, name: 'Electronics' }]);
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  // New test: Handles empty suggestion list gracefully
  it('shows no suggestions if list is empty', async () => {
    render(<SmartTagInput onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Type to search...');

    // Use 'empty' query to mock no suggestions
    fireEvent.change(input, { target: { value: 'empty' } });

    // Wait for suggestions area to update
    await waitFor(() => {
      const noSuggestion = screen.queryByRole('listitem');
      expect(noSuggestion).toBeNull();
    });
  });
});
