export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = 'all' | 'completed' | 'uncompleted';

export interface FilterOption {
  type: FilterType;
  label: string;
}
