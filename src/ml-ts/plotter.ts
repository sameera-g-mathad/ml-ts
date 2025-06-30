import * as d3 from 'd3';

class Plotter {
  public plot: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  constructor(width: number = 500, height: number = 400) {
    this.plot = d3
      .select('.plot-container')
      .attr('width', width)
      .attr('height', height);
  }
}

export const plotter = new Plotter();
