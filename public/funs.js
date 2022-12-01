(function () {
  'use strict';

  const all = {
    day1: {
      part1: (data) => {
        const elves = data.trim().split('\n\n').map(cals => cals.split('\n').map(Number));
        console.log(elves);
        const sums = elves.reduce((acc, item) => {
          acc.push(item.reduce((acc2, item2) => {
            return acc2 + item2;
          }, 0));
          return acc;
        }, []);
        console.log(sums);
        const max = Math.max.apply(Math, sums);
        console.log(max);
        return max;
      },
      part2: (data) => {
        const elves = data.trim().split('\n\n').map(cals => cals.split('\n').map(Number));
        console.log(elves);
        const sums = elves.reduce((acc, item) => {
          acc.push(item.reduce((acc2, item2) => {
            return acc2 + item2;
          }, 0));
          return acc;
          // Sort and Take last 3
        }, []).sort((a, b) => a - b).slice(-3);
        console.log(sums);
        // Sum:
        const sum = sums.reduce((a, b) => a + b, 0);
        console.log(sum);
        return sum;
      }
    },
    day2: {
      part1: () => {},
      part2: () => {}
    },
    day3: {
      part1: () => {},
      part2: () => {}
    },
    day4: {
      part1: () => {},
      part2: () => {}
    },
    day5: {
      part1: () => {},
      part2: () => {}
    },
    day6: {
      part1: () => {},
      part2: () => {}
    },
    day7: {
      part1: () => {},
      part2: () => {}
    },
    day8: {
      part1: () => {},
      part2: () => {}
    },
    day9: {
      part1: () => {},
      part2: () => {}
    },
    day10: {
      part1: () => {},
      part2: () => {}
    },
    day11: {
      part1: () => {},
      part2: () => {}
    },
    day12: {
      part1: () => {},
      part2: () => {}
    },
    day13: {
      part1: () => {},
      part2: () => {}
    },
    day14: {
      part1: () => {},
      part2: () => {}
    },
    day15: {
      part1: () => {},
      part2: () => {}
    },
    day16: {
      part1: () => {},
      part2: () => {}
    },
    day17: {
      part1: () => {},
      part2: () => {}
    },
    day18: {
      part1: () => {},
      part2: () => {}
    },
    day19: {
      part1: () => {},
      part2: () => {}
    },
    day20: {
      part1: () => {},
      part2: () => {}
    },
    day21: {
      part1: () => {},
      part2: () => {}
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
