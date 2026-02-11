import clsx from 'clsx';

interface TodoCounterProps {
  counter: number;
  className?: string;
}

export default function TodoCounter({ counter, className }: TodoCounterProps) {
  return <span className={clsx('text-xl font-bold text-blue-400', className)}>Залишилось виконати: {counter}</span>;
}
