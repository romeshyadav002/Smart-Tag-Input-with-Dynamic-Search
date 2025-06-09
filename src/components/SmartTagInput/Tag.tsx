import React from 'react';
import { Tag } from './types';

interface TagItemProps {
  tag: Tag;
  onRemove: (id: number) => void;
  tagColor: string;
}

const TagItem: React.FC<TagItemProps> = ({ tag, onRemove, tagColor }) => {
  return (
    <span
      className={`flex items-center text-white px-2 py-1 rounded ${tagColor}`}
    >
      {tag.name}
      <button
        onClick={() => onRemove(tag.id)}
        className="ml-2 text-sm text-white hover:text-gray-200 focus:outline-none"
        aria-label={`Remove ${tag.name}`}
      >
        ×
      </button>
    </span>
  );
};

export default TagItem;
