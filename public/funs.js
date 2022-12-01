(function () {
  'use strict';

  const all = {
    day1: {
      part1: (data) => {
        const elves = data.trim().split('\n\n').map(cals => cals.split('\n').map(Number));
        console.log(elves);
        const length = elves.length;
        let sums = elves.reduce((acc, item, i) => {
          acc.push(item.reduce((acc2, item2, i2) => {
            return acc2 + item2;
          }, 0));
          return acc;
        }, []);
        console.log(sums);
        let max = Math.max.apply(Math, sums);
        console.log(max);
        return max;
      },
      part2: (data) => {
        const list = data.trim().split('\n').map(Number);
        const length = list.length;
        const windows = [];
        for (let i = 2; i < length; i++) {
          windows.push(list[i] + list[i - 1] + list[i - 2]);
        }
        const windowLength = windows.length;
        let increased = 0;
        for (let i = 1; i < windowLength; i++) {
          if (windows[i] > windows[i - 1]) {
            increased++;
          }
        }
        return increased;
      }
    },
    day2: {
      part1: (data) => {
        const commands = data.trim().split('\n').map(command => command.split(' '));
        let horiz = 0;
        let depth = 0;

        for (let i = 0, l = commands.length; i < l; i++) {
          const action = commands[i][0];
          const value = parseInt(commands[i][1], 10);
          switch (action) {
            case 'forward':
              horiz += value;
              break;
            case 'up':
              depth -= value;
              break;
            case 'down':
              depth += value;
              break;
          }
        }

        return horiz * depth;
      },
      part2: (data) => {
        const commands = data.trim().split('\n').map(command => command.split(' '));
        let horiz = 0;
        let depth = 0;
        let aim = 0;

        for (let i = 0, l = commands.length; i < l; i++) {
          const action = commands[i][0];
          const value = parseInt(commands[i][1], 10);
          switch (action) {
            case 'forward':
              horiz += value;
              depth += aim * value;
              break;
            case 'up':
              aim -= value;
              break;
            case 'down':
              aim += value;
              break;
          }
        }

        return horiz * depth;
      }
    },
    day3: {
      part1: (data) => {
        const bits = data.trim().split('\n').map(word => word.split('').map(Number));
        let common = null;
        const bitLength = bits.length;
        for (let i = 0; i < bitLength; i++) {
          const word = bits[i];
          const wordLength = word.length;
          if (i === 0) {
            common = Array.from({ length: wordLength }, () => [0, 0]);
          }
          for (let j = 0; j < wordLength; j++) {
            common[j][word[j]] += 1;
          }
        }

        const maxs = common.reduce((acc, item, i) => {
          acc[i] = item.indexOf(Math.max.apply(Math, item));
          return acc;
        }, []);
        const gamma = parseInt(maxs.join(''), 2);

        const mins = common.reduce((acc, item, i) => {
          acc[i] = item.indexOf(Math.min.apply(Math, item));
          return acc;
        }, []);
        const epsilon = parseInt(mins.join(''), 2);

        const val = gamma * epsilon;
        return val;
      },
      part2: (data) => {
        const bits = data.trim().split('\n').map(word => word.split('').map(Number));
        const bitLength = bits.length;
        const wordLength = bits[0].length;
        const getCommon = function (bitArr) {
          const bitArrLength = bitArr.length;
          const common = Array.from({ length: wordLength }, () => [0, 0]);
          for (let i = 0; i < bitArrLength; i++) {
            const word = bitArr[i];
            for (let j = 0; j < wordLength; j++) {
              common[j][word[j]] += 1;
            }
          }
          return common;
        };

        let o2 = Array.from({ length: bitLength }, (v, i) => i);
        for (let b = 0; b < wordLength && o2.length > 1; b++) {
          const common = getCommon(bits.filter((v, i) => o2.includes(i)));
          const counts = common[b];
          if (counts[0] > counts[1]) {
            // find all that match in bit b
            o2 = o2.filter(val => bits[val][b] === 0);
          } else if (counts[0] < counts[1]) {
            o2 = o2.filter(val => bits[val][b] === 1);
          } else if (counts[0] === counts[1]) {
            o2 = o2.filter(val => bits[val][b] === 1);
          }
        }

        let co2 = Array.from({ length: bitLength }, (v, i) => i);
        for (let b = 0; b < wordLength && co2.length > 1; b++) {
          const common = getCommon(bits.filter((v, i) => co2.includes(i)));
          const counts = common[b];
          if (counts[0] > counts[1]) {
            co2 = co2.filter(val => bits[val][b] === 1);
          } else if (counts[0] < counts[1]) {
            co2 = co2.filter(val => bits[val][b] === 0);
          } else if (counts[0] === counts[1]) {
            co2 = co2.filter(val => bits[val][b] === 0);
          }
        }

        const o2bits = bits[o2[0]];
        const co2bits = bits[co2[0]];

        const o2value = parseInt(o2bits.join(''), 2);
        const co2value = parseInt(co2bits.join(''), 2);

        return o2value * co2value;
      }
    },
    day4: {
      part1: (data) => {
        const input = data.trim().split(/\r?\n\r?\n/);
        const numbers = input.shift().split(',').map(Number);
        const boards = input.map(board => board.split('\n').map(row => row.trim().split(/\s+/).map(Number)));
        const boardCount = boards.length;
        console.log(numbers, boards);
        const marked = Array.from({ length: boardCount }, () => {
          return {
            dots: {},
            // col counts
            c0: 0,
            c1: 0,
            c2: 0,
            c3: 0,
            c4: 0,
            // row counts
            r0: 0,
            r1: 0,
            r2: 0,
            r3: 0,
            r4: 0
          };
        });
        console.log(marked);

        const numberLength = numbers.length;
        for (let d = 0; d < numberLength; d++) {
          const draw = numbers[d];
          for (let b = 0; b < boardCount; b++) {
            const board = boards[b];
            for (let c = 0; c < 5; c++) {
              for (let r = 0; r < 5; r++) {
                if (draw === board[c][r]) {
                  marked[b].dots['c' + c + 'r' + r] = 1;
                  marked[b]['c' + c]++;
                  marked[b]['r' + r]++;
                }
              }
            }
          }
          if (d >= 4) {
            // check for bingo
            for (let m = boardCount; m--;) {
              const mark = marked[m];
              for (let x = 5; x--;) {
                if (mark['c' + x] === 5 || mark['r' + x] === 5) {
                  // bingo in col or row x, sum unmarked numbers
                  const winner = boards[m];
                  console.log('bingo!', draw, winner, mark);
                  let unmarked = 0;
                  for (let c = 0; c < 5; c++) {
                    for (let r = 0; r < 5; r++) {
                      if (!mark.dots['c' + c + 'r' + r]) {
                        unmarked += winner[c][r];
                      }
                    }
                  }
                  console.log(unmarked);
                  return unmarked * draw;
                }
              }
            }
          }
        }
        return 'error';
      },
      part2: (data) => {
        const input = data.trim().split(/\r?\n\r?\n/);
        const numbers = input.shift().split(',').map(Number);
        const numberLength = numbers.length;
        const boards = input.map(board => board.split('\n').map(row => row.trim().split(/\s+/).map(Number)));
        const boardCount = boards.length;
        const marked = Array.from({ length: boardCount }, () => {
          return {
            dots: {},
            winner: 0,
            draw: 0,
            unmarked: [],
            sum: 0,
            result: 0,
            // col counts
            c0: 0,
            c1: 0,
            c2: 0,
            c3: 0,
            c4: 0,
            // row counts
            r0: 0,
            r1: 0,
            r2: 0,
            r3: 0,
            r4: 0
          };
        });
        let winCount = 0;
        let lastWinner = null;
        for (let d = 0; d < numberLength; d++) {
          const draw = numbers[d];
          for (let b = 0; b < boardCount; b++) {
            const mark = marked[b];
            if (mark.winner !== 1) {
              for (let c = 0; c < 5; c++) {
                for (let r = 0; r < 5; r++) {
                  const board = boards[b];
                  if (draw === board[c][r]) {
                    marked[b].dots['c' + c + 'r' + r] = 1;
                    marked[b]['c' + c] += 1;
                    marked[b]['r' + r] += 1;
                  }
                }
              }
            }
          }
          if (d >= 4) {
            // check for bingo
            for (let m = 0; m < boardCount; m++) {
              const mark = marked[m];
              if (mark.winner !== 1) {
                for (let x = 0; x < 5; x++) {
                  if (mark['c' + x] === 5 || mark['r' + x] === 5) {
                    console.log('bingo ' + m + ' count ' + winCount);
                    // bingo in col or row x, sum unmarked numbers
                    mark.winner = 1;
                    winCount += 1;
                    if (winCount === boardCount) {
                      const winner = boards[m];
                      mark.draw = draw;
                      let unmarked = 0;
                      for (let c = 0; c < 5; c++) {
                        for (let r = 0; r < 5; r++) {
                          if (mark.dots['c' + c + 'r' + r] !== 1) {
                            mark.unmarked.push(winner[c][r]);
                            unmarked += winner[c][r];
                          }
                        }
                      }
                      mark.sum = unmarked;
                      mark.result = unmarked * draw;
                      lastWinner = mark;
                      console.log('last bingo!', draw, winner, mark);
                    }
                    break;
                  }
                }
              }
            }
          }
        }
        // 13826 too low
        // 21068 too high
        return (lastWinner) ? lastWinner.result : 'error';
      }
    },
    day5: {
      part1: (data) => {
        const max = {
          x: 0,
          y: 0
        };
        const input = data.trim().split('\n').map(row => {
          const pairs = row.split(' -> ').map(pair => pair.split(',').map(Number));
          const pair = {
            x1: pairs[0][0],
            y1: pairs[0][1],
            x2: pairs[1][0],
            y2: pairs[1][1]
          };
          max.x = Math.max(max.x, pair.x1, pair.x2);
          max.y = Math.max(max.y, pair.y1, pair.y2);
          return pair;
        }).filter(pair => pair.x1 === pair.x2 || pair.y1 === pair.y2).map(pair => {
          return {
            x1: Math.min(pair.x1, pair.x2),
            y1: Math.min(pair.y1, pair.y2),
            x2: Math.max(pair.x1, pair.x2),
            y2: Math.max(pair.y1, pair.y2)
          };
        });
        const grid = Array.from({ length: max.y + 1 }, () => Array.from({ length: max.x + 1 }, () => 0));
        input.forEach(pair => {
          for (let y = pair.y1; y <= pair.y2; y++) {
            for (let x = pair.x1; x <= pair.x2; x++) {
              grid[y][x]++;
            }
          }
        });

        const result = grid.flatMap((row, yindex) => row.map((val, xindex) => {
          return {
            y: yindex,
            x: xindex,
            val: val
          };
        })).filter(point => point.val > 1);

        return result.length;
      },
      part2: (data) => {
        const max = {
          x: 0,
          y: 0
        };
        const input = data.trim().split('\n').map(row => {
          const pairs = row.split(' -> ').map(pair => pair.split(',').map(Number));
          const pair = {
            x1: pairs[0][0],
            y1: pairs[0][1],
            x2: pairs[1][0],
            y2: pairs[1][1]
          };
          max.x = Math.max(max.x, pair.x1, pair.x2);
          max.y = Math.max(max.y, pair.y1, pair.y2);
          return pair;
        });
        const grid = Array.from({ length: max.y + 1 }, () => Array.from({ length: max.x + 1 }, () => 0));
        input.forEach(pair => {
          let x = pair.x1;
          let y = pair.y1;
          let dx = 0;
          if (x < pair.x2) {
            dx = 1;
          } else if (x > pair.x2) {
            dx = -1;
          }
          let dy = 0;
          if (y < pair.y2) {
            dy = 1;
          } else if (y > pair.y2) {
            dy = -1;
          }
          // prevent infinite loops (it's late)
          let safety = 1000;
          do {
            grid[y][x]++;
            x += dx;
            y += dy;
          } while ((x !== pair.x2 + dx || y !== pair.y2 + dy) && safety-- > 0);
        });

        const result = grid.flatMap((row, yindex) => row.map((val, xindex) => {
          return {
            y: yindex,
            x: xindex,
            val: val
          };
        })).filter(point => point.val > 1);

        return result.length;
      }
    },
    day6: {
      part1: (data) => {
        const list = data.trim().split(',').map(Number);
        let days = 80;
        let result = list.map(v => v);
        while (days--) {
          const temp = [];
          let kids = 0;
          result.forEach(v => {
            if (v === 0) {
              v = 6;
              kids++;
            } else {
              v -= 1;
            }
            temp.push(v);
          });
          while (kids--) {
            temp.push(8);
          }
          result = temp;
        }
        return result.length;
      },
      part2: (data) => {
        const list = data.trim().split(',').map(Number);
        let days = 256;
        let counter = {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0
        };
        list.forEach(v => {
          counter[v]++;
        });
        while (days--) {
          const temp = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: counter[0],
            7: 0,
            8: counter[0]
          };
          temp[0] += counter[1];
          temp[1] += counter[2];
          temp[2] += counter[3];
          temp[3] += counter[4];
          temp[4] += counter[5];
          temp[5] += counter[6];
          temp[6] += counter[7];
          temp[7] += counter[8];
          counter = temp;
        }
        return counter[0] + counter[1] + counter[2] + counter[3] + counter[4] + counter[5] + counter[6] + counter[7] + counter[8];
      }
    },
    day7: {
      part1: (data) => {
        const list = data.trim().split(',').map(Number);
        const len = list.length;
        const distances = Array.from({ length: len }, () => 0);
        list.forEach((v1, i) => {
          distances[i] = list.reduce((acc, v2) => acc + Math.abs(v1 - v2), 0);
        });
        const min = Math.min(...distances);
        return min;
      },
      part2: (data) => {
        const list = data.trim().split(',').map(Number);
        const len = list.length;
        const max = Math.max(...list);
        const fuel = Array.from({ length: max + 1 }, () => 0);
        fuel.forEach((v, i) => {
          fuel[i] = i === 0 ? 0 : fuel[i - 1] + i;
        });
        const positions = Array.from({ length: max }, (e, i) => i);
        const distances = Array.from({ length: len }, () => 0);
        positions.forEach((v1, i) => {
          distances[i] = list.reduce((acc, v2) => acc + fuel[Math.abs(v1 - v2)], 0);
        });
        const min = Math.min(...distances);
        return min;
      }
    },
    day8: {
      part1: (data) => {
        let counter = 0;
        data.trim().split('\n').forEach(row => {
          const pair = row.split(' | ').map(str => str.split(' '));
          pair[1].forEach(item => {
            const pattern = item.split('').sort().join('');
            switch (pattern.length) {
              case 2:
                counter++;
                break;
              case 3:
                counter++;
                break;
              case 4:
                counter++;
                break;
              case 7:
                counter++;
                break;
            }
          });
        });
        // not 800
        return counter;
      },
      part2: (data) => {
        let sum = 0;
        const list = data.trim().split('\n');
        list.forEach(row => {
          const pair = row.split(' | ').map(str => str.split(' '));
          const signal = pair[0].map(item => {
            const pattern = item.split('').sort();
            const val = {
              pattern: pattern,
              str: pattern.join(''),
              digit: -1
            };
            switch (pattern.length) {
              case 2:
                val.digit = 1; //   c  f
                break;
              case 3:
                val.digit = 7; // a c  f
                break;
              case 4:
                val.digit = 4; //  bcd f
                break;
              case 7:
                val.digit = 8; // abcdefg
                break;
            }
            return val;
          });
          const digits = {
            1: signal.filter(item => item.digit === 1)[0],
            4: signal.filter(item => item.digit === 4)[0],
            7: signal.filter(item => item.digit === 7)[0],
            8: signal.filter(item => item.digit === 8)[0]
          };
          const known = {
            a: digits[7].pattern.filter(char => !digits[1].pattern.includes(char))[0],
            bd: digits[4].pattern.filter(char => !digits[1].pattern.includes(char)),
            cf: digits[1].pattern,
            eg: digits[8].pattern.filter(char => !digits[4].pattern.includes(char) && !digits[7].pattern.includes(char))
          };
          // 2,3,5
          const case5 = signal.filter(item => item.pattern.length === 5);
          // all have adg
          known.adg = case5[0].pattern.filter(char => case5[1].pattern.includes(char) && case5[2].pattern.includes(char));
          known.b = known.bd.filter(char => !known.adg.includes(char))[0];
          known.d = known.bd.filter(char => known.adg.includes(char))[0];
          known.e = known.eg.filter(char => !known.adg.includes(char))[0];
          known.g = known.eg.filter(char => known.adg.includes(char))[0];
          // 23: c in 1478
          // 35: f in 1478
          digits[3] = case5.filter(item => known.cf.every(char => item.pattern.includes(char)))[0];
          digits[3].digit = 3;
          // 2:  e not in 147, in 8
          digits[2] = case5.filter(item => item.pattern.includes(known.e))[0];
          digits[2].digit = 2;
          // 5:  b not in 17, in 48
          digits[5] = case5.filter(item => item.pattern.includes(known.b))[0];
          digits[5].digit = 5;
          // 0,6,9
          const case6 = signal.filter(item => item.pattern.length === 6);
          // all have abfg
          // 09: c in 1478
          // 69: d
          // 06: e not in 147, in 8
          digits[0] = case6.filter(item => !item.pattern.includes(known.d))[0];
          digits[0].digit = 0;
          digits[9] = case6.filter(item => item.str !== digits[0].str && !item.pattern.includes(known.e))[0];
          digits[9].digit = 9;
          digits[6] = case6.filter(item => item.str !== digits[0].str && item.pattern.includes(known.e))[0];
          digits[6].digit = 6;
          const mapped = {};
          for (let i = 0; i <= 9; i++) {
            mapped[digits[i].str] = i;
          }
          const value = pair[1].map(item => {
            const key = item.split('').sort().join('');
            const digit = mapped[key];
            return digit;
          }).join('');
          sum += parseInt(value, 10);
        });
        return sum;
      }
    },
    day9: {
      part1: (data) => {
        const list = data.trim().split('\n').map(row => row.split('').map(Number));
        const lowest = [];
        const ymax = list.length;
        for (let y = 0; y < ymax; y++) {
          const xmax = list[y].length;
          for (let x = 0; x < xmax; x++) {
            const height = list[y][x];
            let min = 99;
            if (y > 0) { // N
              min = Math.min(min, list[y - 1][x]);
            }
            if (y < ymax - 1) { // S
              min = Math.min(min, list[y + 1][x]);
            }
            if (x > 0) { // W
              min = Math.min(min, list[y][x - 1]);
            }
            if (x < xmax - 1) { // E
              min = Math.min(min, list[y][x + 1]);
            }
            if (min > height) {
              lowest.push(height);
            }
          }
        }
        const result = lowest.reduce((acc, val) => acc + val, lowest.length);
        // 1797 is too high
        return result;
      },
      part2: (data) => {
        const list = data.trim().split('\n').map(row => row.split('').map(Number));
        const lowest = [];
        const basins = [];
        const ymax = list.length;
        const xmax = list[0].length;
        const getNeighbors = (y, x) => { // Jim Nabors is way cool
          const neighbors = [];
          if (y > 0) { // N
            neighbors.push({
              y: y - 1,
              x: x,
              height: list[y - 1][x]
            });
          }
          if (y < ymax - 1) { // S
            neighbors.push({
              y: y + 1,
              x: x,
              height: list[y + 1][x]
            });
          }
          if (x > 0) { // W
            neighbors.push({
              y: y,
              x: x - 1,
              height: list[y][x - 1]
            });
          }
          if (x < xmax - 1) { // E
            neighbors.push({
              y: y,
              x: x + 1,
              height: list[y][x + 1]
            });
          }
          return neighbors;
        };
        for (let y = 0; y < ymax; y++) {
          for (let x = 0; x < xmax; x++) {
            const height = list[y][x];
            const neighbors = getNeighbors(y, x);
            const min = Math.min(...neighbors.map(n => n.height));
            if (min > height) {
              lowest.push({
                y: y,
                x: x,
                height: height
              });
            }
          }
        }
        const findHigher = (point) => {
          const higher = [];
          const neighbors = getNeighbors(point.y, point.x);
          neighbors.forEach(n => {
            if (n.height > point.height && n.height < 9) {
              higher.push(n);
              const next = findHigher(n);
              if (next.length > 0) {
                higher.push(...next);
              }
            }
          });
          return higher;
        };
        lowest.forEach(point => {
          const basin = [point];
          const higher = findHigher(point);
          higher.forEach(h => {
            if (!basin.some(p => p.y === h.y && p.x === h.x)) {
              basin.push(h);
            }
          });
          basins.push(basin);
        });
        const result = basins.sort((a, b) => b.length - a.length) // descending by length
          .slice(0, 3) // top 3
          .reduce((acc, basin) => acc * basin.length, 1); // multiply result
        return result;
      }
    },
    day10: {
      part1: (data) => {
        const list = data.trim().split('\n').map(row => row.split(''));
        // +1 for open,-1 for close
        const x = { '(': 1, '[': 1, '{': 1, '<': 1, ')': -1, ']': -1, '}': -1, '>': -1 };
        const pair = { '(': ')', '[': ']', '{': '}', '<': '>', ')': '(', ']': '[', '}': '{', '>': '<' };
        const points = {
          ')': 3,
          ']': 57,
          '}': 1197,
          '>': 25137
        };
        const score = list.reduce((acc, row) => {
          const stack = [];
          for (const c of row) {
            if (x[c] === 1) {
              stack.push(c);
            } else {
              if (stack[stack.length - 1] === pair[c]) {
                stack.pop();
              } else {
                acc += points[c];
                break;
              }
            }
          }
          return acc;
        }, 0);
        return score;
      },
      part2: (data) => {
        const list = data.trim().split('\n').map(row => row.split(''));
        // +1 for open,-1 for close
        const x = { '(': 1, '[': 1, '{': 1, '<': 1, ')': -1, ']': -1, '}': -1, '>': -1 };
        const pair = { '(': ')', '[': ']', '{': '}', '<': '>', ')': '(', ']': '[', '}': '{', '>': '<' };
        const points = {
          ')': 1,
          ']': 2,
          '}': 3,
          '>': 4
        };
        const endings = list.reduce((acc, row) => {
          const stack = [];
          for (const c of row) {
            if (x[c] === 1) {
              stack.push(c);
            } else {
              if (stack[stack.length - 1] === pair[c]) {
                stack.pop();
              } else {
                return acc;
              }
            }
          }
          const closers = [];
          stack.reverse().forEach(c => closers.push(pair[c]));
          acc.push(closers);
          return acc;
        }, []);
        const scores = endings.reduce((acc, ends) => {
          const lineScore = ends.reduce((sum, c) => {
            const by5 = sum * 5;
            return by5 + points[c];
          }, 0);
          acc.push(lineScore);
          return acc;
        }, []).sort((a, b) => a - b);
        const mid = Math.floor(scores.length / 2);
        return scores[mid];
      }
    },
    day11: {
      part1: (data) => {
        const octos = data.trim().split('\n').map(r => r.split('').map(Number));
        const ymax = octos.length;
        const xmax = octos[0].length;
        const steps = 100;
        let flashes = 0;
        const flash = (y, x) => {
          flashes++;
          const flashQueue = [];
          const ys = [y - 1, y, y + 1].filter(yy => yy >= 0 && yy < ymax);
          const xs = [x - 1, x, x + 1].filter(xx => xx >= 0 && xx < xmax);
          for (const yy of ys) {
            for (const xx of xs) {
              if (yy !== y || xx !== x) {
                if (octos[yy][xx] === 9) {
                  flashQueue.push({ y: yy, x: xx });
                }
                octos[yy][xx] += 1;
              }
            }
          }
          for (const f of flashQueue) {
            flash(f.y, f.x);
          }
        };
        for (let i = 0; i < steps; i++) {
          const flashQueue = [];
          for (let y = 0; y < ymax; y++) {
            for (let x = 0; x < xmax; x++) {
              if (octos[y][x] === 9) {
                flashQueue.push({ y: y, x: x });
              }
              octos[y][x] += 1;
            }
          }
          for (const f of flashQueue) {
            flash(f.y, f.x);
          }
          for (let y = 0; y < ymax; y++) {
            for (let x = 0; x < xmax; x++) {
              if (octos[y][x] > 9) {
                octos[y][x] = 0;
              }
            }
          }
        }
        return flashes;
      },
      part2: (data) => {
        const octos = data.trim().split('\n').map(r => r.split('').map(Number));
        const ymax = octos.length;
        const xmax = octos[0].length;
        const flash = (y, x) => {
          const flashQueue = [];
          const ys = [y - 1, y, y + 1].filter(yy => yy >= 0 && yy < ymax);
          const xs = [x - 1, x, x + 1].filter(xx => xx >= 0 && xx < xmax);
          for (const yy of ys) {
            for (const xx of xs) {
              if (yy !== y || xx !== x) {
                if (octos[yy][xx] === 9) {
                  flashQueue.push({ y: yy, x: xx });
                }
                octos[yy][xx] += 1;
              }
            }
          }
          for (const f of flashQueue) {
            flash(f.y, f.x);
          }
        };
        const SAFETY = 1000;
        let result = -1;
        for (let i = 0; i < SAFETY; i++) {
          const flashQueue = [];
          for (let y = 0; y < ymax; y++) {
            for (let x = 0; x < xmax; x++) {
              if (octos[y][x] === 9) {
                flashQueue.push({ y: y, x: x });
              }
              octos[y][x] += 1;
            }
          }
          for (const f of flashQueue) {
            flash(f.y, f.x);
          }
          for (let y = 0; y < ymax; y++) {
            for (let x = 0; x < xmax; x++) {
              if (octos[y][x] > 9) {
                octos[y][x] = 0;
              }
            }
          }
          const str = octos.map(r => r.join('')).join('');
          const matched = str.match(/[0]/g);
          if (matched !== null && str.length === matched.length) {
            result = i + 1;
            break;
          }
        }
        return result;
      }
    },
    day12: {
      part1: (data) => {
        const list = data.trim().split('\n').map(r => r.split('-'));
        let id = 0;
        const addCave = (arr, a, b) => {
          if (typeof arr[a] === 'undefined') {
            arr[a] = {
              id: id++,
              cave: a,
              isBig: a === a.toUpperCase(),
              doors: [b]
            };
          } else {
            arr[a].doors.push(b);
          }
        };
        const caves = list.reduce((acc, pair) => {
          const a = pair[0];
          const b = pair[1];
          addCave(acc, a, b);
          addCave(acc, b, a);
          return acc;
        }, {});
        const allCaves = Object.values(caves);
        console.log(allCaves.map(c => {
          let output = c.cave + '(' + c.id + ')';
          if (c.doors.length) {
            output += ' => ' + c.doors.join(',');
          }
          return output;
        }).join('\n'));
        const getPaths = (cave, path) => {
          if (cave.cave === 'end') {
            path.push('end');
            return [path];
          }
          if (cave.isBig || !path.includes(cave.cave)) {
            const dl = cave.doors.length;
            let newpaths = [];
            path.push(cave.cave);
            for (let i = 0; i < dl; i++) {
              const child = caves[cave.doors[i]];
              newpaths = newpaths.concat(getPaths(child, path.slice()));
            }
            return newpaths;
          }
          return [];
        };
        const routes = getPaths(caves.start, []);
        return routes.length;
      },
      part2: (data) => {
        const list = data.trim().split('\n').map(r => r.split('-'));
        let id = 0;
        const addCave = (arr, a, b) => {
          if (typeof arr[a] === 'undefined') {
            arr[a] = {
              id: id++,
              cave: a,
              isBig: a === a.toUpperCase(),
              doors: [b]
            };
          } else {
            arr[a].doors.push(b);
          }
        };
        const caves = list.reduce((acc, pair) => {
          const a = pair[0];
          const b = pair[1];
          addCave(acc, a, b);
          addCave(acc, b, a);
          return acc;
        }, {});
        const allCaves = Object.values(caves);
        console.log(allCaves.map(c => {
          let output = c.cave + '(' + c.id + ')';
          if (c.doors.length) {
            output += ' => ' + c.doors.join(',');
          }
          return output;
        }).join('\n'));
        const getPaths = (cave, path) => {
          if (cave.cave === 'end') {
            path.path.push('end');
            return [path];
          } else if (cave.isBig || !path.path.includes(cave.cave)) {
            const dl = cave.doors.length;
            let newpaths = [];
            path.path.push(cave.cave);
            for (let i = 0; i < dl; i++) {
              const child = caves[cave.doors[i]];
              newpaths = newpaths.concat(getPaths(child, { treat: path.treat, path: path.path.slice() }));
            }
            return newpaths;
          } else if (cave.cave !== 'start' && path.treat === 0) {
            // let a little cave have a treat
            path.treat = 1;
            const dl = cave.doors.length;
            let newpaths = [];
            path.path.push(cave.cave);
            for (let i = 0; i < dl; i++) {
              const child = caves[cave.doors[i]];
              newpaths = newpaths.concat(getPaths(child, { treat: path.treat, path: path.path.slice() }));
            }
            return newpaths;
          }
          return [];
        };
        const routes = getPaths(caves.start, { treat: 0, path: [] });
        return routes.length;
      }
    },
    day13: {
      part1: (data) => {
        const input = data.trim().split(/\r?\n\r?\n/);
        const coords = input[0].split('\n').map(r => r.split(',').map(Number)).map(r => {
          return { x: r[0], y: r[1] };
        });
        const folds = input[1].split('\n').map(r => r.split(' ')[2].split('=')).map(r => {
          return { axis: r[0], value: parseInt(r[1], 10) };
        });
        const coordsLength = coords.length;
        const xMax = Math.max(...coords.map(p => p.x));
        const yMax = Math.max(...coords.map(p => p.y));
        const grid = Array.from({ length: yMax + 1 }, () => Array.from({ length: xMax + 1 }, () => 0));
        for (let i = 0; i < coordsLength; i++) {
          const point = coords[i];
          grid[point.y][point.x]++;
        }
        console.log(grid.map(r => r.map(v => v > 0 ? '#' : '.').join(' ')).join('\n'));
        const firstFold = folds[0];
        if (firstFold.axis === 'y') {
          for (let y = firstFold.value; y <= yMax; y++) {
            const dy = firstFold.value - y;
            const yy = firstFold.value + dy;
            for (let x = 0; x <= xMax; x++) {
              if (dy < 0) {
                const p = grid[y][x];
                if (p > 0) {
                  grid[yy][x] += p;
                }
              }
              grid[y][x] = 0;
            }
          }
        } else if (firstFold.axis === 'x') {
          for (let y = 0; y <= yMax; y++) {
            for (let x = firstFold.value; x <= xMax; x++) {
              const dx = firstFold.value - x;
              const xx = firstFold.value + dx;
              if (dx < 0) {
                const p = grid[y][x];
                if (p > 0) {
                  grid[y][xx] += p;
                }
              }
              grid[y][x] = 0;
            }
          }
        }
        console.log(grid.map(r => r.map(v => v > 0 ? '#' : '.').join(' ')).join('\n'));
        const result = grid.map(r => r.map(v => v > 0 ? '1' : '').join('')).join('').length;
        return result;
      },
      part2: (data) => {
        const input = data.trim().split(/\r?\n\r?\n/);
        const coords = input[0].split('\n').map(r => r.split(',').map(Number)).map(r => {
          return { x: r[0], y: r[1] };
        });
        const folds = input[1].split('\n').map(r => r.split(' ')[2].split('=')).map(r => {
          return { axis: r[0], value: parseInt(r[1], 10) };
        });
        const coordsLength = coords.length;
        const xMax = Math.max(...coords.map(p => p.x));
        const yMax = Math.max(...coords.map(p => p.y));
        const grid = Array.from({ length: yMax + 1 }, () => Array.from({ length: xMax + 1 }, () => 0));
        for (let i = 0; i < coordsLength; i++) {
          const point = coords[i];
          grid[point.y][point.x]++;
        }
        console.log(grid.map(r => r.map(v => v > 0 ? '#' : '.').join(' ')).join('\n'));
        for (let f = 0; f < folds.length; f++) {
          const firstFold = folds[f];
          if (firstFold.axis === 'y') {
            for (let y = firstFold.value; y <= yMax; y++) {
              const dy = firstFold.value - y;
              const yy = firstFold.value + dy;
              for (let x = 0; x <= xMax; x++) {
                if (dy < 0) {
                  const p = grid[y][x];
                  if (p > 0) {
                    grid[yy][x] += p;
                  }
                }
                grid[y][x] = 0;
              }
            }
          } else if (firstFold.axis === 'x') {
            for (let y = 0; y <= yMax; y++) {
              for (let x = firstFold.value; x <= xMax; x++) {
                const dx = firstFold.value - x;
                const xx = firstFold.value + dx;
                if (dx < 0) {
                  const p = grid[y][x];
                  if (p > 0) {
                    grid[y][xx] += p;
                  }
                }
                grid[y][x] = 0;
              }
            }
          }
        }
        console.log(grid.map(r => r.map(v => v > 0 ? '#' : '.').join(' ').replace(/(\s?\.)+$/g, '')).join('\n').replace(/\n\n/g, ''));
        return 'look in console';
      }
    },
    day14: {
      part1: (data) => {
        const input = data.trim().split(/\r?\n\r?\n/);
        let template = input[0];
        const chars = input[1].split('\n').reduce((acc, p) => {
          const pair = p.split(' -> ');
          const find = pair[0];
          const repl = pair[1];
          acc[find] = find[0] + repl + find[1];
          return acc;
        }, {});
        const passes = 10;
        for (let p = 0; p < passes; p++) {
          const tempLength = template.length;
          const chunks = [];
          for (let i = 0; i < tempLength - 1; i++) {
            let chunk = template.substring(i, i + 2);
            chunk = chars[chunk] || chunk;
            chunks.push(chunk);
          }
          template = chunks.join(',').replace(/(\w),\1/g, '$1');
        }
        const counts = template.split('').reduce((acc, c) => {
          if (!acc[c]) {
            acc[c] = 0;
          }
          acc[c]++;
          return acc;
        }, {});
        const result = {
          min: Math.min(...Object.values(counts)),
          max: Math.max(...Object.values(counts))
        };
        return result.max - result.min;
      },
      part2: (data) => {
        const input = data.trim().split(/\r?\n\r?\n/);
        const template = input[0];
        const chars = input[1].split('\n').reduce((acc, p) => {
          const pair = p.split(' -> ');
          const find = pair[0];
          const repl = pair[1];
          acc[find] = repl;
          return acc;
        }, {});
        const tempLength = template.length;
        let chunkCounts = {};
        for (let i = 0; i < tempLength - 1; i++) {
          const chunk = template.substring(i, i + 2);
          if (!chunkCounts[chunk]) {
            chunkCounts[chunk] = 0;
          }
          chunkCounts[chunk]++;
        }
        const passes = 40;
        for (let p = 0; p < passes; p++) {
          const chunks = Object.keys(chunkCounts);
          const cl = chunks.length;
          const newChunkCounts = {};
          for (let i = 0; i < cl; i++) {
            const chunk = chunks[i];
            const chunkCount = chunkCounts[chunk];
            if (chars[chunk]) {
              const chunkA = chunk[0] + chars[chunk];
              const chunkB = chars[chunk] + chunk[1];
              if (!newChunkCounts[chunkA]) {
                newChunkCounts[chunkA] = 0;
              }
              newChunkCounts[chunkA] += chunkCount;
              if (!newChunkCounts[chunkB]) {
                newChunkCounts[chunkB] = 0;
              }
              newChunkCounts[chunkB] += chunkCount;
            } else {
              if (!newChunkCounts[chunk]) {
                newChunkCounts[chunk] = 0;
              }
              newChunkCounts[chunk] += chunkCount;
            }
          }
          chunkCounts = newChunkCounts;
        }
        const counts2 = Object.keys(chunkCounts).reduce((acc, chunk) => {
          const a = chunk[0];
          const b = chunk[1];
          const c = chunkCounts[chunk];
          if (!acc[a]) {
            acc[a] = 0;
          }
          acc[a] += c;
          if (!acc[b]) {
            acc[b] = 0;
          }
          acc[b] += c;
          return acc;
        }, {});
        const result = {
          min: Math.min(...Object.values(counts2)),
          max: Math.max(...Object.values(counts2))
        };
        return Math.ceil((result.max - result.min) / 2);
      }
    },
    day15: {
      part1: (data) => {
        const grid = data.trim().split(/\r?\n/).map(r => r.split('').map(Number));
        const ymax = grid.length;
        const xmax = grid[0].length;
        console.log(ymax, xmax);
        const points = grid.reduce((acc, r, y) => acc.concat(r.reduce((acc2, v, x) => {
          const p = {
            // this should be the same as the index
            id: (y * ymax) + x,
            y: y,
            x: x,
            v: v,
            n: []
          };
          // no diagonals
          if (y > 0) {
            p.n.push(((y - 1) * ymax) + x);
          }
          if (y < ymax - 1) {
            p.n.push(((y + 1) * ymax) + x);
          }
          if (x > 0) {
            p.n.push((y * ymax) + x - 1);
          }
          if (x < xmax - 1) {
            p.n.push((y * ymax) + x + 1);
          }
          acc2.push(p);
          return acc2;
        }, [])), []);
        console.log(points);
        // find min value going from 0,0 to ymax, xmax
        const pointsLength = points.length;
        const start = points[0];
        const end = points[pointsLength - 1];
        let min = 999999999;
        const getPaths = (point, path) => {
          if (point.id >= end.id) {
            const sum = path.reduce((acc, p) => acc + points[p].v, 0) + end.v;
            min = Math.min(min, sum);
            // stop at end
            return false;
          }
          if (!path.includes(point.id)) {
            const stepLength = point.n.length;
            let newpaths = [];
            path.push(point.id);
            for (let i = 0; i < stepLength; i++) {
              const step = points[point.n[i]];
              if (!path.includes(step.id)) {
                const newerpaths = getPaths(step, path.slice());
                if (newerpaths !== false) {
                  newpaths = newpaths.concat(newerpaths);
                }
              }
            }
            return newpaths;
          }
          // stop at dead end
          return false;
        };
        getPaths(start, []);
        return min;
      },
      part2: () => {}
    },
    day16: {
      part1: (data) => {
        const bits = data.trim().split('').map(c => (parseInt(c, 16).toString(2)).padStart(4, '0')).join('');
        console.log(bits);
        const matchType = /^\d{3}(\d{3})/;
        const literal = /^(\d{3})(100)((?:1\d{4})+)(0\d{4})0+/;
        //                1 VVV  2TTT 3 A.B...     4 CCCC
        const operator = /^(\d{3})(\d{3})(?:(?:0(\d{15}))|(?:1(\d{11})))/;
        //                 1 VVV  2 TTT         3 length      4 number  ???
        const getType = (str) => {
          return parseInt(str.match(matchType)[1], 2);
        };
        const getLiteral = (match) => {
          const version = parseInt(match[1], 2);
          const type = 4;
          let bin = '';
          const notLast = match[3];
          const notLastLength = notLast.length;
          for (let i = 0; i < notLastLength; i += 5) {
            // skip 1, keep next 4
            bin += notLast.substring(i + 1, i + 5);
          }
          const last = match[4];
          // skip leading 0
          bin += last.substring(1);
          const value = parseInt(bin, 2);
          return {
            pt: 'literal',
            pl: match[0].length,
            v: version,
            t: type,
            val: value
          };
        };
        const getOperator = (match, bitstr) => {
          const version = parseInt(match[1], 2);
          const type = parseInt(match[2], 2);
          const length = parseInt(match[3], 2);
          const number = parseInt(match[4], 2);
          const op = {
            pt: 'operator',
            pl: match[0].length,
            v: version,
            t: type,
            len: length,
            num: number,
            packets: []
          };
          // remove matched chars
          bitstr = bitstr.substring(op.pl);
          if (!isNaN(op.len)) {
            // next len chars are packets for op
            let sub = bitstr.substring(0, op.len);
            op.pl += op.len;
            let safety = 1000;
            while (sub.length > 0 && !sub.split('').every(c => c === '0') && safety-- > 0) {
              const result = getNextPacket(sub);
              op.packets.push(result.packet);
              sub = result.bitstr;
            }
          } else if (!isNaN(op.num)) {
            // next num packets are for op
            for (let i = 0; i < op.num; i++) {
              // set pl to sum of lens
              const result = getNextPacket(bitstr);
              op.packets.push(result.packet);
              bitstr = result.bitstr;
            }
            op.pl += op.packets.reduce((sum, p) => sum + p.pl, 0);
          }
          return op;
        };
        const versions = [];
        const packets = [];
        const getNextPacket = (bitstr) => {
          let packet = null;
          let safety = 1000;
          while (packet === null && bitstr.length > 0 && !bitstr.split('').every(c => c === '0') && safety-- > 0) {
            const pt = getType(bitstr);
            if (!isNaN(pt) && pt !== 0) {
              if (pt === 4) {
                const matched = bitstr.match(literal);
                const lit = getLiteral(matched);
                versions.push(lit.v);
                console.log('literal:', lit);
                packet = lit;
              } else {
                const matched = bitstr.match(operator);
                const op = getOperator(matched, bitstr);
                versions.push(op.v);
                console.log('operator:', op);
                packet = op;
              }
              packets.push(packet);
            } else {
              bitstr = bitstr.substring(1);
            }
          }
          return {
            packet: packet,
            bitstr: bitstr
          };
        };
        getNextPacket(bits);
        console.log(packets);
        return versions.reduce((result, v) => result + v, 0);
      },
      part2: () => {}
    },
    day17: {
      part1: (data) => {
        // target area: x=20..30, y=-10..-5
        // result: 6,9 = 45
        // target area: x=211..232, y=-124..-69
        const input = data.trim().split(', ').map(p => p.split('=')[1].split('..').map(Number));
        const target = {
          x: [input[0][0], input[0][1]],
          y: [input[1][0], input[1][1]]
        };
        let ymax = 10;
        const xmax = Math.max(...target.x);
        const offsetY = -Math.min(...target.y) + 10;
        const grid = Array.from({ length: offsetY + 10 }, () => Array.from({ length: xmax + 10 }, () => '.'));
        grid[offsetY][0] = 'S';
        for (let y = target.y[0]; y <= target.y[1]; y++) {
          for (let x = target.x[0]; x <= target.x[1]; x++) {
            grid[y + offsetY][x] = 'T';
          }
        }
        const v = { dx: 0, dy: 0 };
        let maxmaxy = 0;
        let xstart = 0;
        for (let x = 1; x < xmax; x++) {
          let dx = x;
          let sum = 0;
          while (dx > 0) {
            sum += dx;
            dx--;
            if (sum >= xmax) {
              xstart = x;
              dx = -1;
              x = 999;
            }
          }
        }
        console.log('xstart:' + xstart);
        // try different velocities
        for (let dy = 100; dy < 200; dy++) {
          for (let dx = 5; dx < 100; dx++) {
            v.dy = dy;
            v.dx = dx;
            const last = { x: 0, y: 0 };
            let maxy = 0;
            let safety = 1000;
            const newGrid = grid.map(r => r.slice()).slice();
            while (last.y >= target.y[1] && last.x <= target.x[1] && safety-- > 0) {
              last.y += v.dy--;
              last.x += Math.max(v.dx--, 0);
              ymax = Math.max(ymax, last.y + offsetY + 1);
              const gridmax = newGrid.length - 1;
              if (ymax >= gridmax) {
                // expand grid
                for (let ll = 10 + ymax - gridmax; ll--;) {
                  newGrid.push(Array.from({ length: xmax + 10 }, () => '.'));
                }
              }
              if (newGrid[last.y + offsetY]) {
                if (newGrid[last.y + offsetY][last.x] === 'T') {
                  maxmaxy = Math.max(maxy, maxmaxy);
                }
                maxy = Math.max(maxy, last.y);
                newGrid[last.y + offsetY][last.x] = '#';
              }
            }
            if (safety <= 0) {
              console.warn('safety hit');
            }
          }
          console.log('dy:' + dy + ' ' + maxmaxy);
        }
        // console.log(grid.reduce((str, r) => r.join('') + '\n' + str, ''));
        // 1830 is too low
        return maxmaxy;
      },
      part2: (data) => {
        // target area: x=20..30, y=-10..-5
        // result: 112
        // target area: x=211..232, y=-124..-69
        const input = data.trim().split(', ').map(p => p.split('=')[1].split('..').map(Number));
        const xl = input[0][0];
        const xh = input[0][1];
        const yl = input[1][0];
        const yh = input[1][1];
        const inTarget = (x, y) => {
          return x >= xl && x <= xh && y >= yl && y <= yh;
        };
        let hits = 0;
        for (let sy = yl; sy < 200; sy++) {
          for (let sx = 1; sx < 400; sx++) {
            let safety = 1000;
            let vx = sx;
            let vy = sy;
            let lx = 0;
            let ly = 0;
            let isHit = 0;
            while (!isHit && ly >= yl && lx <= xh && safety-- > 0) {
              ly += vy--;
              lx += Math.max(vx--, 0);
              if (inTarget(lx, ly)) {
                hits++;
                isHit = 1;
              }
            }
            if (safety <= 0) {
              console.warn('safety hit');
            }
          }
        }
        return hits;
      }
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
