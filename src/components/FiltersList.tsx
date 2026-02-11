import { FilterOption } from '@/types';
import clsx from 'clsx';

interface FiltersListProps {
  className?: string;
  selectedFilter: FilterOption['type'];
  onSelect: (type: FilterOption['type']) => void;
}

export default function FiltersList({ className, selectedFilter, onSelect }: FiltersListProps) {
  const filterOptions: Array<FilterOption> = [
    { type: 'all', label: 'Всі' },
    { type: 'uncompleted', label: 'Активні' },
    { type: 'completed', label: 'Виконані' },
  ];

  return (
    <ul className={clsx('flex gap-2', className)}>
      {filterOptions.map((item) => {
        return (
          <li key={item.type}>
            <button
              onClick={() => onSelect(item.type)}
              className={clsx('px-3 py-2 rounded-md bg-blue-50', selectedFilter === item.type ? 'bg-blue-200' : '')}
            >
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
