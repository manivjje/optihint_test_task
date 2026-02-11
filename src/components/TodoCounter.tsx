interface TodoCounterProps {
  counter: number;
}

export default function TodoCounter({ counter }: TodoCounterProps) {
  return <span>{counter}</span>;
}
