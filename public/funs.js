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
      part1: (data) => {
        const input = data.trim();
        const scoring = [
          { rx: /^A X$/mg, score: 1 + 3 },
          { rx: /^A Y$/mg, score: 2 + 6 },
          { rx: /^A Z$/mg, score: 3 + 0 },
          { rx: /^B X$/mg, score: 1 + 0 },
          { rx: /^B Y$/mg, score: 2 + 3 },
          { rx: /^B Z$/mg, score: 3 + 6 },
          { rx: /^C X$/mg, score: 1 + 6 },
          { rx: /^C Y$/mg, score: 2 + 0 },
          { rx: /^C Z$/mg, score: 3 + 3 }
        ];
        const total = scoring.reduce((sum, item) => {
          const scored = input.match(item.rx);
          if (scored) {
            console.log(scored, item);
            sum += (scored.length * item.score);
          }
          return sum;
        }, 0);
        console.log(total);
        // 13334 is too high
        // 12551 is too high
        return total;
      },
      part2: (data) => {
        const input = data.trim();
        const scoring = [
          { rx: /^A X$/mg, score: 3 + 0 },
          { rx: /^A Y$/mg, score: 1 + 3 },
          { rx: /^A Z$/mg, score: 2 + 6 },
          { rx: /^B X$/mg, score: 1 + 0 },
          { rx: /^B Y$/mg, score: 2 + 3 },
          { rx: /^B Z$/mg, score: 3 + 6 },
          { rx: /^C X$/mg, score: 2 + 0 },
          { rx: /^C Y$/mg, score: 3 + 3 },
          { rx: /^C Z$/mg, score: 1 + 6 }
        ];
        const total = scoring.reduce((sum, item) => {
          const scored = input.match(item.rx);
          if (scored) {
            console.log(scored, item);
            sum += (scored.length * item.score);
          }
          return sum;
        }, 0);
        console.log(total);
        return total;
      }
    },
    day3: {
      part1: (data) => {
        console.log(data.length);
        const all = data.trim().split('\n');
        console.log(all.length);
        const rucks = all.map(pocket => {
          const mid = Math.floor(pocket.length / 2);
          const items = {
            left: pocket.substr(0, mid),
            right: pocket.substr(mid)
          }
          const common = [];
          for (let i of items.left) {
            if (items.right.includes(i)) {
              common.push(i);
              break;
            }
          }
          return common;
        }).flat();
        console.log(rucks);
        const scores = {};
        for (let l = 1; l <= 26; l++) {
          // lowercase
          scores[String.fromCharCode(l + 96)] = l;
          // uppercase
          scores[String.fromCharCode(l + 64)] = l + 26;
        }
        console.log(scores);
        const result = rucks.reduce((sum, item) => {
          
          return sum + scores[item];
        }, 0)
        // not 7763
        return result;
      },
      part2: (data) => {
        
      }
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
