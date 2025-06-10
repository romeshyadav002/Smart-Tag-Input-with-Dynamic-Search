'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchTags } from '../../lib/api';
import { Tag } from './types';
import TagItem from './Tag';
import SuggestionsList from './SuggestionsList';

interface SmartTagInputProps {
  tagColor?: string;
  onChange: (tags: Tag[]) => void;
}

const DEBOUNCE_DELAY = 300;

const SmartTagInput: React.FC<SmartTagInputProps> = ({
  tagColor = 'bg-blue-500',
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cacheRef = useRef<Record<string, Tag[]>>({});

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFetchSuggestions = useCallback(
    async (query: string) => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      // Return cached suggestions if available
      if (cacheRef.current[query]) {
        const cachedTags = cacheRef.current[query].filter(
          (tag) => !selectedTags.find((selected) => selected.id === tag.id),
        );
        setSuggestions(cachedTags);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const tags = await fetchTags(query);
        cacheRef.current[query] = tags; // Cache the results

        const filtered = tags.filter(
          (tag) => !selectedTags.find((selected) => selected.id === tag.id),
        );
        setSuggestions(filtered);
      } catch (err) {
        setError('Failed to fetch suggestions');
      } finally {
        setLoading(false);
      }
    },
    [selectedTags],
  );

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (inputValue) {
      debounceTimeoutRef.current = setTimeout(() => {
        handleFetchSuggestions(inputValue);
      }, DEBOUNCE_DELAY);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [inputValue, handleFetchSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setHighlightedIndex(null);
  };

  const handleSelectTag = (tag: Tag) => {
    if (!selectedTags.find((t) => t.id === tag.id)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      onChange(newTags);
    }
    setInputValue('');
    setSuggestions([]);
  };

  const handleRemoveTag = (id: number) => {
    const updated = selectedTags.filter((tag) => tag.id !== id);
    setSelectedTags(updated);
    onChange(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !inputValue && selectedTags.length > 0) {
      const lastTag = selectedTags[selectedTags.length - 1];
      handleRemoveTag(lastTag.id);
    } else if (e.key === 'ArrowDown') {
      setHighlightedIndex((prev) => {
        if (prev === null || prev === suggestions.length - 1) return 0;
        return prev + 1;
      });
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prev) => {
        if (prev === null || prev === 0) return suggestions.length - 1;
        return prev - 1;
      });
    } else if (e.key === 'Enter' && highlightedIndex !== null) {
      e.preventDefault();
      handleSelectTag(suggestions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  return (
    <div className="w-full max-w-xl">
      <div
        className="flex flex-wrap items-center gap-2 border border-gray-300 bg-white p-2 rounded-md"
        onClick={() => inputRef.current?.focus()}
      >
        {selectedTags.map((tag) => (
          <TagItem
            key={tag.id}
            tag={tag}
            onRemove={handleRemoveTag}
            tagColor={tagColor}
          />
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-grow outline-none p-1"
          placeholder="Type to search..."
          aria-autocomplete="list"
          aria-controls="suggestions-list"
          aria-activedescendant={
            highlightedIndex !== null
              ? `suggestion-${highlightedIndex}`
              : undefined
          }
        />
      </div>
      {loading && <div className="text-sm text-gray-500 mt-1">Loading...</div>}
      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
      {!loading && suggestions.length > 0 && (
        <SuggestionsList
          suggestions={suggestions}
          onSelect={handleSelectTag}
          highlightedIndex={highlightedIndex}
        />
      )}
    </div>
  );
};

export default SmartTagInput;
