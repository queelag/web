interface Detail {
  percentage: number
  percentages: number[]
  value: number
  values: number[]
}

export class SliderChangeEvent extends CustomEvent<Detail> {
  constructor(values: number[], percentages: number[]) {
    super('slider-change', { detail: { percentage: percentages[0], percentages, value: values[0], values } })
  }
}
