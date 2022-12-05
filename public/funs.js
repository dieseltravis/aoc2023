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
        const all = data.trim().split('\n');
        console.log(all.length);
        const rucks = all.map(pocket => {
          const mid = Math.floor(pocket.length / 2);
          const items = {
            left: pocket.substr(0, mid),
            right: pocket.substr(mid)
          };
          const common = [];
          for (const i of items.left) {
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
        }, 0);
        // not 7763
        return result;
      },
      part2: (data) => {
        const all = data.trim().split('\n');
        console.log(all.length);
        const rucks = [];
        for (let i = 0; i < all.length; i += 3) {
          rucks.push(all.slice(i, i + 3));
        }
        console.log(rucks);
        const common = rucks.reduce((comm, group) => {
          const same = [];
          for (const i of group[0]) {
            if (group[1].includes(i)) {
              same.push(i);
            }
          }
          for (const i of same) {
            if (group[2].includes(i)) {
              comm.push(i);
              break;
            }
          }
          return comm;
        }, []);
        console.log(common);
        const scores = {};
        for (let l = 1; l <= 26; l++) {
          // lowercase
          scores[String.fromCharCode(l + 96)] = l;
          // uppercase
          scores[String.fromCharCode(l + 64)] = l + 26;
        }
        const result = common.reduce((sum, item) => {
          return sum + scores[item];
        }, 0);
        return result;
      }
    },
    day4: {
      part1: (data) => {
        const pairs = data.trim().split('\n').map(row => {
          const pair = row.split(',').map(pair => {
            const range = pair.split('-').map(Number);

            return {
              lo: Math.min(range[0], range[1]),
              hi: Math.max(range[0], range[1])
            };
          });
          return {
            one: pair[0],
            two: pair[1]
          };
        });
        console.log(pairs);

        const result = pairs.reduce((count, pair) => {
          const one = pair.one;
          const two = pair.two;
          if (one.lo <= two.lo && one.hi >= two.hi) {
            // two is inside one
            count++;
          } else if (two.lo <= one.lo && two.hi >= one.hi) {
            // one is inside two
            count++;
          }
          return count;
        }, 0);
        console.log(result);

        // not 603
        return result;
      },
      part2: (data) => {
        const pairs = data.trim().split('\n').map(row => {
          const pair = row.split(',').map(pair => {
            const range = pair.split('-').map(Number);

            return {
              lo: Math.min(range[0], range[1]),
              hi: Math.max(range[0], range[1]),
              overlaps: []
            };
          });
          return {
            one: pair[0],
            two: pair[1]
          };
        });
        console.log(pairs);

        const hasOverlap = (left, right) => {
          const is =
                // left lo is in range
                (left.lo >= right.lo && left.lo <= right.hi) ||
                // left hi is in range
                (left.hi >= right.lo && left.hi <= right.hi) ||
                // left contains right
                (left.lo <= right.lo && left.hi >= right.hi);
          return is;
        };
        const result = pairs.reduce((allOverlap, pair) => {
          const one = pair.one;
          const two = pair.two;
          if (hasOverlap(one, two) || hasOverlap(two, one)) {
            allOverlap++;
          }
          return allOverlap;
        }, 0);
        console.log(result);
        // 791 is too low
        return result;
      }
    },
    day5: {
      part1: (data) => {
        const rx = /move (\d+) from (\d+) to (\d+)/;
        const rxdigit = /\d/;
        const rxupper = /[A-Z]/;
        const input = data.split('\n\n');
        const crates = input[0].split('\n').reverse().map(row => row.split(''));
        const crateInfo = crates[0].reduce((acc, char, i) => {
          if (rxdigit.test(char)) {
            acc[char] = {
              name: char,
              crates: []
            };
            for (let x = 1; x < crates.length; x++) {
              const crate = crates[x][i];
              if (rxupper.test(crate)) {
                acc[char].crates.push(crate);
              } else {
                break;
              }
            }
          }
          return acc;
        }, {});
        console.log(crateInfo);
        const instructions = input[1].split('\n').map(row => {
          const match = row.match(rx);
          return {
            amt: +match[1],
            src: match[2],
            dst: match[3],
          };
        });
        console.log(instructions);

        instructions.forEach(instruct => {
          //console.log(instruct);
          const srcCrate = crateInfo[instruct.src].crates;
          const dstCrate = crateInfo[instruct.dst].crates;
          //console.log(srcCrate, dstCrate);
          const newSrc = srcCrate.slice(0, -instruct.amt)
          //console.log(newSrc);
          dstCrate.push(...srcCrate.slice(-instruct.amt).reverse());
          //console.log(dstCrate);
          crateInfo[instruct.src].crates = newSrc;
          //crateInfo[instruct.dst].crates = newDst;
        });
        console.log(crateInfo);

        let result = "";
        for (const key in crateInfo) {
          const stack = crateInfo[key];
          //console.log(stack);
          result += stack.crates.slice().reverse()[0];
        }
        return result;
      },
      part2: (data) => {
        const rx = /move (\d+) from (\d+) to (\d+)/;
        const rxdigit = /\d/;
        const rxupper = /[A-Z]/;
        const input = data.split('\n\n');
        const crates = input[0].split('\n').reverse().map(row => row.split(''));
        const crateInfo = crates[0].reduce((acc, char, i) => {
          if (rxdigit.test(char)) {
            acc[char] = {
              name: char,
              crates: []
            };
            for (let x = 1; x < crates.length; x++) {
              const crate = crates[x][i];
              if (rxupper.test(crate)) {
                acc[char].crates.push(crate);
              } else {
                break;
              }
            }
          }
          return acc;
        }, {});
        console.log(crateInfo);
        const instructions = input[1].split('\n').map(row => {
          const match = row.match(rx);
          return {
            amt: +match[1],
            src: match[2],
            dst: match[3],
          };
        });
        console.log(instructions);

        instructions.forEach(instruct => {
          const srcCrate = crateInfo[instruct.src].crates;
          const dstCrate = crateInfo[instruct.dst].crates;
          const newSrc = srcCrate.slice(0, -instruct.amt)
          dstCrate.push(...srcCrate.slice(-instruct.amt));
          crateInfo[instruct.src].crates = newSrc;
        });
        console.log(crateInfo);

        let result = "";
        for (const key in crateInfo) {
          const stack = crateInfo[key];
          result += stack.crates.slice().reverse()[0];
        }
        return result;
      }
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
