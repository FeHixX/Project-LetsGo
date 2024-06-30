export interface SliderRangeProps {
  className?: string
  range: { [key: string]: number }
  start: [number, number]
  onUpdate?: (newStart: [number, number]) => void
}
