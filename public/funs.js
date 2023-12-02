(function () {
  'use strict';

  const all = {
    day1: {
      part1: (data) => {
        const left = /^\D*?(\d)/;
        const right = /(\d)\D*?$/;
        const elves = data.trim().split('\n').map(cals => {
          return cals.match(left)[1] + '' + cals.match(right)[1];
        }).map(Number);
        console.log(elves);
        return elves.reduce((acc, item) => {
          return acc + item;
        }, 0);
      },
      part2: (data) => {
        const matchD = /one|two|three|four|five|six|seven|eight|nine|\d/;
        const matchD2 = /enin|thgie|neves|xis|evif|ruof|eerht|owt|eno|\d/;
        const digitVal = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };
        for (let i = 1; i <= 9; i++) {
          digitVal['' + i] = i;
        }
        const elves = data.trim().split('\n').map(cals => {
          const slac = cals.split('').reverse().join('');
          const num = cals.match(matchD)[0].replace(matchD, m => digitVal[m]) + '' + slac.match(matchD2)[0].split('').reverse().join('').replace(matchD, m => digitVal[m]);
          return num;
        });
        console.log(elves);
        // 54558 is too low
        // 54490 is too low
        const elves2 = elves.map(Number);
        return elves2.reduce((acc, item) => {
          return acc + item;
        }, 0);
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
