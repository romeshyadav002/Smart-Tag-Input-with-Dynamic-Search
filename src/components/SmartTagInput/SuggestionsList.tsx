import React from 'react';
import { Tag } from './types';

interface SuggestionsListProps {
  suggestions: Tag[];
  onSelect: (tag: Tag) => void;
  highlightedIndex: number | null;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  onSelect,
  highlightedIndex,
}) => {
  return (
    <ul className="mt-1 border border-gray-300 bg-white rounded-md shadow-md max-h-60 overflow-auto">
      {suggestions.map((tag, index) => (
        <li
          key={tag.id}
          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
            highlightedIndex === index ? 'bg-gray-200' : ''
          }`}
          onMouseDown={() => onSelect(tag)}
          aria-selected={highlightedIndex === index}
          role="option"
        >
          {tag.name}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsList;
