(function () {
  'use strict';

  const all = {
    day1: {
      part1: (data) => {
        const elves = data.trim().split('\n\n').map(cals => cals.split('\n').map(Number));
        console.log(elves);
        return elves;
      },
      part2: (data) => {
        return data;
      }
    },
    day2: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day3: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day4: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day5: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day6: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day7: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day8: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day9: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day10: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day11: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day12: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day13: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day14: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day15: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day16: {
      part1: (data) => {
        return data;
      },
      part2: () => {}
    },
    day17: {
      part1: (data) => {
        return data;
      },
      part2: () => {}
    },
    day18: {
      part1: (data) => {
        return data;
      },
      part2: () => {}
    },
    day19: {
      part1: (data) => {
        return data;
      },
      part2: () => {}
    },
    day20: {
      part1: (data) => {
        return data;
      },
      part2: () => {}
    },
    day21: {
      part1: (data) => {
        return data;
      },
      part2: (data) => {
        return data;
      }
    },
    day22: {
      part1: () => {},
      part2: () => {}
    },
    day23: {
      part1: () => {},
      part2: () => {}
    },
    day24: {
      part1: () => {},
      part2: () => {}
    },
    day25: {
      part1: () => {},
      part2: () => {}
    }
  };

  this.funs = (day, part) => all['day' + day]['part' + part];
}.call(this));
