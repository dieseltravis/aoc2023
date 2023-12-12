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
        // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        const gn = /^Game (\d+): /;
        const gs = /(\d+)\s([rgb])/;
        let possible = 0;
        data.trim().split('\n').forEach(g => {
          const gameNum = +g.match(gn)[1];
          const right = g.split(':')[1].trim();
          const game = {
            gameNum,
            r: 0,
            g: 0,
            b: 0,
            d: 0,
            dd: 0,
            p: 0
          };
          right.split(';').forEach(s => {
            game.d++;
            s.split(',').forEach(c => {
              const cube = c.match(gs);
              game.dd++;
              game[cube[2]] = Math.max(+cube[1], game[cube[2]]);
            });
          });
          // 12 red cubes, 13 green cubes, and 14 blue cubes
          if (game.r <= 12 && game.g <= 13 && game.b <= 14) {
            possible += gameNum;
            game.p = 1;
          }
          console.log(game);
        });
        // not 234
        return possible;
      },
      part2: (data) => {
        const gn = /^Game (\d+): /;
        const gs = /(\d+)\s([rgb])/;
        let sum = 0;
        data.trim().split('\n').forEach(g => {
          const gameNum = +g.match(gn)[1];
          const right = g.split(':')[1].trim();
          const game = {
            gameNum,
            r: 0,
            g: 0,
            b: 0,
            s: 0
          };
          right.split(';').forEach(s => {
            s.split(',').forEach(c => {
              const cube = c.match(gs);
              game[cube[2]] = Math.max(+cube[1], game[cube[2]]);
            });
          });
          game.s = game.r * game.g * game.b;
          sum += game.s;
          console.log(game);
        });
        return sum;
      }
    },
    day3: {
      part1: (data) => {
        const nums = /(\d+)/g;
        const sym = /[^0-9.]/;
        const parts = [];
        const elves = data.trim().split('\n').map(cals => {
          return {
            matches: [...cals.matchAll(nums)],
            row: cals.split(''),
            len: cals.length
          };
        });

        for (let y = 0; y < elves.length; y++) {
          console.log(elves[y].matches);
          for (const m of elves[y].matches) {
            const low = Math.max(0, m.index - 1);
            const val = m[1];
            const hi = Math.min(elves[y].len - 1, m.index + m[0].length);
            console.log(val, low, hi);
            let isClean = true;
            let char = '';
            if (y > 0) { // look prev if not first
              for (let x = low; x <= hi; x++) {
                if (sym.test(elves[y - 1].row[x])) {
                  char = elves[y - 1].row[x];
                  isClean = false;
                  break;
                }
              }
            }
            // need to test left & right
            if (isClean && sym.test(elves[y].row[low])) {
              char = elves[y].row[low];
              isClean = false;
            }
            if (isClean && sym.test(elves[y].row[hi])) {
              char = elves[y].row[hi];
              isClean = false;
            }
            if (isClean && y < (elves.length - 1)) {
              // look next
              for (let x = low; x <= hi; x++) {
                if (sym.test(elves[y + 1].row[x])) {
                  char = elves[y + 1].row[x];
                  isClean = false;
                  break;
                }
              }
            }
            if (!isClean) {
              parts.push({
                val: +val,
                ch: char
              });
            }
          }
        }
        console.log('parts', parts);
        // 533578 is too high
        // 530940 is too high
        return parts.reduce((acc, item) => {
          return acc + item.val;
        }, 0);
      },
      part2: (data) => {
        const nums = /(\d+)/g;
        const sym = /[^0-9.]/;
        const gears = {};
        const ratios = [];
        const elves = data.trim().split('\n').map(cals => {
          return {
            matches: [...cals.matchAll(nums)],
            row: cals.split(''),
            len: cals.length
          };
        });

        for (let y = 0; y < elves.length; y++) {
          for (const m of elves[y].matches) {
            const low = Math.max(0, m.index - 1);
            const val = m[1];
            const hi = Math.min(elves[y].len - 1, m.index + m[0].length);
            let isClean = true;
            let char = '';
            let charx = -1;
            let chary = -1;
            if (y > 0) { // look prev if not first
              for (let x = low; x <= hi; x++) {
                if (sym.test(elves[y - 1].row[x])) {
                  char = elves[y - 1].row[x];
                  chary = y - 1;
                  charx = x;
                  isClean = false;
                  break;
                }
              }
            }
            // need to test left & right
            if (isClean && sym.test(elves[y].row[low])) {
              char = elves[y].row[low];
              chary = y;
              charx = low;
              isClean = false;
            }
            if (isClean && sym.test(elves[y].row[hi])) {
              char = elves[y].row[hi];
              chary = y;
              charx = hi;
              isClean = false;
            }
            if (isClean && y < (elves.length - 1)) {
              // look next
              for (let x = low; x <= hi; x++) {
                if (sym.test(elves[y + 1].row[x])) {
                  char = elves[y + 1].row[x];
                  chary = y + 1;
                  charx = x;
                  isClean = false;
                  break;
                }
              }
            }
            if (!isClean && char === '*') {
              const gearid = charx + ',' + chary;
              if (!gears[gearid]) {
                gears[gearid] = [];
              }
              gears[gearid].push(+val);
              if (gears[gearid].length === 2) {
                ratios.push(gears[gearid][0] * gears[gearid][1]);
              }
            }
          }
        }
        console.log('gears', gears);
        return ratios.reduce((acc, item) => {
          return acc + item;
        }, 0);
      }
    },
    day4: {
      part1: (data) => {
        const lotto = data.trim().split('\n').map(cals => {
          const line = cals.split('|');
          const card = line[0].split(':');
          const values = card[1].trim().split(/\s+/).map(Number);
          const winner = line[1].trim().split(/\s+/).map(Number);
          const good = values.filter(n => winner.includes(n));
          let score = good.length;
          if (score > 0) {
            score = 2 ** (score - 1);
          }
          return score;
        });
        return lotto.reduce((acc, item) => acc + item, 0);
      },
      part2: (data) => {
        const copies = {};
        const lotto = data.trim().split('\n').map(cals => {
          const line = cals.split('|');
          const card = line[0].split(':');
          const num = +card[0].match(/\d+/)[0];
          const values = card[1].trim().split(/\s+/).map(Number);
          const winner = line[1].trim().split(/\s+/).map(Number);
          const good = values.filter(n => winner.includes(n));
          const score = good.length;
          if (score > 0) {
            const inc = 1 + (copies[num] || 0);
            for (let i = num + 1; i <= num + score; i++) {
              if (!copies[i]) {
                copies[i] = 0;
              }
              copies[i] += inc;
            }
          }
          return score;
        });
        console.log(lotto, copies);
        return lotto.length + Object.values(copies).reduce((acc, item) => acc + item, 0);
      }
    },
    day5: {
      part1: (data) => {
        const almanac = data.trim().split('\n\n');
        const seeds = almanac[0].split(':')[1].trim().split(' ').map(Number);
        const maps = almanac.slice(1).map(m => {
          const lines = m.split('\n');
          const matchName = /(\w+)-to-(\w+)/;
          const matched = lines[0].match(matchName);
          const source = matched[1];
          const dest = matched[2];
          const routes = lines.slice(1).map(l => {
            const nums = l.split(' ').map(Number);
            return {
              s1: nums[1],
              s2: nums[1] + nums[2],
              d1: nums[0],
              d2: nums[0] + nums[2],
              r: nums[2]
            };
          });
          return {
            source,
            dest,
            routes
          };
        });
        console.log(seeds, maps);
        const paths = seeds.reduce((acc, s) => {
          acc.push({ seed: s });
          return acc;
        }, []);
        let step = 'seed';
        maps.forEach(m => {
          const next = m.dest;
          paths.forEach(p => {
            const val = p[step];
            let isMapped = false;
            for (let i = 0; i < m.routes.length; i++) {
              if (val >= m.routes[i].s1 && val <= m.routes[i].s2) {
                p[next] = (val - m.routes[i].s1) + m.routes[i].d1;
                isMapped = true;
                break;
              }
            }
            if (!isMapped) {
              p[next] = val;
            }
          });
          step = next;
        });
        console.log(paths);
        return Math.min(...paths.map(p => p.location));
      },
      part2: (data) => {
        const almanac = data.trim().split('\n\n');
        const seedRanges = almanac[0].split(':')[1].trim().split(' ').map(Number);
        const seedPairs = {};
        for (let i = 0; i < seedRanges.length; i += 2) {
          seedPairs[seedRanges[i]] = seedRanges[i + 1];
        }
        const maps = almanac.slice(1).map(m => {
          const lines = m.split('\n');
          const matchName = /(\w+)-to-(\w+)/;
          const matched = lines[0].match(matchName);
          const sourceName = matched[1];
          const destName = matched[2];
          const routes = lines.slice(1).map(l => {
            const nums = l.split(' ').map(Number);
            return {
              sourceStart: nums[1],
              sourceEnd: nums[1] + nums[2] - 1,
              dest: nums[0]
            };
          });
          return {
            sourceName,
            destName,
            routes
          };
        });
        const routes = maps.map(m => m.routes);
        console.log(Object.keys(seedPairs).length, routes);

        let smallest = Infinity;
        let seedGroup = 0;
        Object.keys(seedPairs).forEach(seedKey => {
          const seedStart = +seedKey;
          const seedRange = seedPairs[seedKey];
          const seedEnd = seedStart + seedRange;
          console.log(++seedGroup, seedStart, seedRange, seedEnd);

          for (let seed = seedStart; seed < seedEnd; seed++) {
            const last = routes.reduce((seedPos, routeList) => {
              const newRoute = routeList.find(route => seedPos >= route.sourceStart && seedPos <= route.sourceEnd);
              const newPos = newRoute ? (seedPos - newRoute.sourceStart) + newRoute.dest : seedPos;
              return newPos;
            }, seed);

            smallest = Math.min(smallest, last);
          }
        });

        console.log(smallest);
        return smallest;
      }
    },
    day6: {
      part1: (data) => {
        const input = data.trim().split('\n').map(l => l.split(':')[1].trim().split(/\s+/).map(Number));
        const times = input[0];
        const dists = input[1];
        console.log(times, dists);
        const actual = {};
        for (let t = 0; t < times.length; t++) {
          const time = times[t];
          const dist = dists[t];
          actual[t] = [];
          for (let b = 0; b <= time; b++) {
            const race = b * (time - b);
            if (race > dist) {
              actual[t].push(race);
            }
          }
        }
        console.log(actual);
        return Object.values(actual).reduce((acc, a) => acc * a.length, 1);
      },
      part2: (data) => {
        const input = data.trim().split('\n').map(l => l.split(':')[1].trim().split(/\s+/).join('')).map(Number);
        const time = input[0];
        const dist = input[1];
        console.log(time, dist);
        let wins = 0;
        for (let b = 0; b <= time; b++) {
          const race = b * (time - b);
          if (race > dist) {
            wins++;
          }
        }
        console.log(wins);
        return wins;
      }
    },
    day7: {
      part1: (data) => {
        const cards = '23456789TJQKA'.split('');
        const cardVal = c => {
          return cards.indexOf(c) + 1;
        };
        const score2 = h => {
          const val = {
            five: 0,
            four: 0,
            full: 0,
            three: 0,
            twopair: 0,
            pair: 0,
            high: 0
          };
          if (h.every(val => val === h[0])) {
            val.five = 1;
          } else {
            cards.slice().reverse().forEach(c1 => {
              const count = h.filter(c2 => c1 === c2).length;
              if (count === 4) {
                val.four = 1;
              } else if (count === 3) {
                val.three = 1;
              } else if (count === 2) {
                val.pair += 1;
              } else if (count === 1) {
                val.high = 1;
              }
            });
            if (val.three === 1 && val.pair === 1) {
              val.full = 1;
              val.three = 0;
              val.pair = 0;
            } else if (val.pair === 2) {
              val.twopair = 1;
              val.pair = 0;
            }
          }
          return Object.values(val);
        };
        const input = data.trim().split('\n').map(l => {
          const line = l.split(' ');
          const o = {
            raw: line[0],
            hand: line[0].split(''),
            bid: +line[1]
          };
          o.score = score2(o.hand);
          o.vals = o.hand.reduce((a, v) => {
            a.push(cardVal(v));
            return a;
          }, []);
          return o;
        });
        const sorted = input.slice().sort((a, b) => {
          for (let i = 0; i < 7; i++) {
            const as = a.score[i];
            const bs = b.score[i];
            if (as < bs) {
              return -1;
            } else if (as > bs) {
              return 1;
            } else if (as > 0 && bs > 0) {
              for (let j = 0; j < 5; j++) {
                const ac = a.vals[j];
                const bc = b.vals[j];
                if (ac < bc) {
                  return -1;
                } else if (ac > bc) {
                  return 1;
                }
              }
            }
          }
          return 0;
        });
        const answer = sorted.reduce((a, v, i) => a + (v.bid * (i + 1)), 0);
        console.log(input, sorted, answer);
        // 250946742
        // 251308771 too high
        return answer;
      },
      part2: (data) => {
        const cards = 'J23456789TQKA'.split('');
        const cardVal = c => cards.indexOf(c) + 1;
        const score2 = h => {
          const val = {
            five: 0,
            four: 0,
            full: 0,
            three: 0,
            twopair: 0,
            pair: 0,
            high: 0
          };
          const cs = cards.slice(1);
          const csl = cs.length;
          for (let i = 5; i > 0; i--) {
            for (let j = 0; j < csl; j++) {
              const c1 = cs[j];
              const matched = h.filter(c2 => c1 === c2 || c2 === 'J');
              const count = matched.length;
              if (count === i) {
                if (count === 5) {
                  val.five = 1;
                  h = h.join('').replace(/J/g, c1).split('');
                  i = 0;
                  j = csl;
                } else if (count === 4) {
                  val.four = 1;
                  val.high = 1;
                  h = h.join('').replace(/J/g, c1).split('');
                  i = 0;
                  j = csl;
                } else if (count === 3) {
                  val.three = 1;
                  h = h.join('').replace(/J/g, c1).split('');
                } else if (count === 2) {
                  val.pair += 1;
                  h = h.join('').replace(/J/g, c1).split('');
                } else if (count === 1) {
                  val.high = 1;
                }
              }
            }
          }
          if (val.three === 1 && val.pair === 1) {
            val.full = 1;
            val.three = 0;
            val.pair = 0;
          } else if (val.pair === 2) {
            val.twopair = 1;
            val.pair = 0;
          }
          return Object.values(val);
        };
        const input = data.trim().split('\n').map(l => {
          const line = l.split(' ');
          const o = {
            raw: line[0],
            hand: line[0].split(''),
            bid: +line[1]
          };
          o.score = score2(o.hand);
          o.vals = o.hand.reduce((a, v) => {
            a.push(cardVal(v));
            return a;
          }, []);
          return o;
        });
        const sorted = input.slice().sort((a, b) => {
          for (let i = 0; i < 7; i++) {
            const as = a.score[i];
            const bs = b.score[i];
            if (as < bs) {
              return -1;
            } else if (as > bs) {
              return 1;
            } else if (as > 0 && bs > 0) {
              for (let j = 0; j < 5; j++) {
                const ac = a.vals[j];
                const bc = b.vals[j];
                if (ac < bc) {
                  return -1;
                } else if (ac > bc) {
                  return 1;
                }
              }
            }
          }
          return 0;
        });
        const answer = sorted.reduce((a, v, i) => a + (v.bid * (i + 1)), 0);
        console.log(sorted, answer);
        // 251824095?
        // 251910588 is wrong
        // 251794152 is wrong
        // 251681150 is too low
        // 250726533 is too low
        // 251982524 is too high
        return answer;
      }
    },
    day8: {
      part1: (data) => {
        const input = data.trim().split('\n\n');
        const directions = input[0].trim().split('');
        const map = input[1].trim().split('\n').reduce((m, line) => {
          m[line.substring(0, 3)] = {
            L: line.substring(7, 10),
            R: line.substring(12, 15)
          };
          return m;
        }, {});
        console.log(directions, map);
        const len = directions.length;
        let node = 'AAA';
        let i = 0;
        let c = 0;
        let safety = 100000;
        while (node !== 'ZZZ' && safety-- > 0) {
          i = i % len;
          const d = directions[i];
          node = map[node][d];
          // console.log(c, i, d, node);
          i++;
          c++;
        }
        console.log(safety, c);
        return c;
      },
      part2: (data) => {
        const gcd = (a, b) => !b ? a : gcd(b, a % b);
        const lcm = (a, b) => (a * b) / gcd(a, b);
        const input = data.trim().split('\n\n');
        const directions = input[0].trim().split('');
        const map = input[1].trim().split('\n').reduce((m, line) => {
          m[line.substring(0, 3)] = {
            L: line.substring(7, 10),
            R: line.substring(12, 15)
          };
          return m;
        }, {});
        const nodes = Object.keys(map).filter(m => m[2] === 'A');
        const zzz = n => n[2] === 'Z';
        const dlen = directions.length;
        const nlen = nodes.length;
        const starts = nodes.slice();
        console.log(nodes, directions, map, starts);
        let safety = 100000;
        let i = 0;
        let c = 1;
        const found = [];
        const lowest = [];
        while (lowest.length < nlen && safety-- > 0) {
          i = i % dlen;
          const d = directions[i];
          for (let l = nlen; l--;) {
            if (!found.includes(l)) {
              let node = nodes[l];
              node = map[node][d];
              nodes[l] = node;
              if (zzz(node)) {
                found.push(l);
                lowest.push(c);
              }
            }
          }
          // console.log(c, i, d, node);
          i++;
          c++;
        }
        const multiple = lowest.reduce((acc, l) => lcm(acc, l), 1);
        console.log(safety, c, lowest, multiple);
        return multiple;
      }
    },
    day9: {
      part1: (data) => {
        const input = data.trim().split('\n').map(l => l.split(' ').map(Number));
        const allEq = (val, _i, arr) => val === arr[0];
        console.log(input);
        const extra = [];
        input.forEach(row => {
          const agg = [row.slice()];
          let cycle = 0;
          let safety = 100;
          do {
            agg[cycle + 1] = [];
            for (let l = agg[cycle].length - 1; l > 0; l--) {
              agg[cycle + 1].unshift(agg[cycle][l] - agg[cycle][l - 1]);
            }
            cycle++;
          } while (!agg[cycle].every(allEq) && safety--);
          if (safety <= 0) {
            console.warn('safety.');
          }
          // console.log(agg);
          const sum = agg.reduce((acc, set) => acc + set[set.length - 1], 0);
          extra.push(sum);
        });
        console.log(extra);
        return extra.reduce((sum, val) => sum + val, 0);
      },
      part2: (data) => {
        const input = data.trim().split('\n').map(l => l.split(' ').map(Number));
        const allEq = (val, _i, arr) => val === arr[0];
        console.log(input);
        const extra = [];
        input.forEach(row => {
          const agg = [row.slice()];
          let cycle = 0;
          let safety = 100;
          do {
            agg[cycle + 1] = [];
            for (let l = agg[cycle].length - 1; l > 0; l--) {
              agg[cycle + 1].unshift(agg[cycle][l] - agg[cycle][l - 1]);
            }
            cycle++;
          } while (!agg[cycle].every(allEq) && safety--);
          if (safety <= 0) {
            console.warn('safety.');
          }
          // console.log(agg);
          const sub = agg.reverse().reduce((acc, set) => -acc + set[0], 0);
          extra.push(sub);
        });
        console.log(extra);
        return extra.reduce((sum, val) => sum + val, 0);
      }
    },
    day10: {
      part1: (data) => {
        const map = {
          S: ['N', 'E', 'S', 'W'],
          '|': ['N', 'S'],
          '-': ['E', 'W'],
          L: ['N', 'E'],
          J: ['N', 'W'],
          7: ['S', 'W'],
          F: ['E', 'S'],
          '.': []
        };
        const fromDir = {
          N: 'S',
          E: 'W',
          S: 'N',
          W: 'E'
        };
        let startY = -1;
        let startX = -1;
        const input = data.trim().split('\n').map((l, y) => {
          const s = l.indexOf('S');
          if (s > -1) {
            startY = y;
            startX = s;
          }
          return l.split('');
        });
        const route = {};
        const maxY = input.length;
        const maxX = input[0].length;
        const maxLoop = maxY * maxX;
        // use a loop instead
        const go = (dir, y, x, len) => {
          let i = 0;
          while (i++ < maxLoop) {
            if (dir === 'N') {
              y--;
            } else if (dir === 'E') {
              x++;
            } else if (dir === 'S') {
              y++;
            } else if (dir === 'W') {
              x--;
            }
            // console.log(dir, 'y', y, 'x', x);
            if (y < 0 || y >= maxY || x < 0 || x >= maxX) {
              return;
            }
            const char = input[y][x];
            // console.log('char', char);
            if (char === '.' || char === 'S') {
              return;
            }

            const pipe = map[char];
            const from = fromDir[dir];
            // console.log('pipe', pipe);
            if (!pipe.includes(from)) {
              // bad pipe
              return;
            }
            const next = pipe.find(c => c !== from);
            len++;
            const val = route[y + ':' + x] || Infinity;
            route[y + ':' + x] = Math.min(val, len);
            // Uncaught InternalError: too much recursion
            // return go(next, y, x, len);
            dir = next;
          }
        };
        // start
        route[startY + ':' + startX] = 0;
        console.log('look N', startY, startX);
        go('N', startY, startX, 0);
        console.log('look E');
        go('E', startY, startX, 0);
        console.log('look S');
        go('S', startY, startX, 0);
        console.log('look W');
        go('W', startY, startX, 0);
        console.log(route);
        return Math.max(...Object.values(route));
      },
      part2: (data) => {
        const map = {
          S: ['N', 'E', 'S', 'W'],
          '|': ['N', 'S'],
          '-': ['E', 'W'],
          L: ['N', 'E'],
          J: ['N', 'W'],
          7: ['S', 'W'],
          F: ['E', 'S'],
          '.': []
        };
        const fromDir = {
          N: 'S',
          E: 'W',
          S: 'N',
          W: 'E'
        };
        let startY = -1;
        let startX = -1;
        const dirts = [];
        const input = data.trim().split('\n').map((l, y) => {
          const s = l.indexOf('S');
          if (s > -1) {
            startY = y;
            startX = s;
          }
          return l.split('');
        });
        const shape = [];
        const maxY = input.length;
        const maxX = input[0].length;
        const maxLoop = maxY * maxX;
        // use a loop instead
        const go = (dir, y, x) => {
          let i = 0;
          while (i++ < maxLoop) {
            if (dir === 'N') {
              y--;
            } else if (dir === 'E') {
              x++;
            } else if (dir === 'S') {
              y++;
            } else if (dir === 'W') {
              x--;
            }
            if (y < 0 || y >= maxY || x < 0 || x >= maxX) {
              return;
            }
            const char = input[y][x];
            if (char === '.' || char === 'S') {
              return;
            }

            const pipe = map[char];
            const from = fromDir[dir];
            if (!pipe.includes(from)) {
              // bad pipe
              return;
            }
            const next = pipe.find(c => c !== from);
            if (!shape.find(s => s[0] === y && s[1] === x)) {
              shape.push([y, x]);
            }
            dir = next;
          }
        };
        // start
        shape.push([startY, startX]);
        go('N', startY, startX);
        go('E', startY, startX);
        go('S', startY, startX);
        go('W', startY, startX);
        const inner = [];
        const pointInPolygon = function (polygon, point) {
          // A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
          let odd = false;
          // For each edge (In this case for each point of the polygon and the previous one)
          for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
            // If a line from the point into infinity crosses this edge
            if (((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1])) && // One point needs to be above, one below our y coordinate
              // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
              (point[0] < ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
              // Invert odd
              odd = !odd;
            }
            j = i;
          }
          // If the number of crossings was odd, the point is in the polygon
          return odd;
        };
        for (let y = maxY - 1; y--;) {
          for (let x = maxX - 1; x--;) {
            if (!shape.some(s => s[0] === y && s[1] === x)) {
              dirts.push([y, x]);
              if (pointInPolygon(shape, [y, x])) {
                inner.push([y, x]);
              }
            }
          }
        }
        console.log(dirts, shape, inner);
        return inner.length;
      }
    },
    day11: {
      part1: (data) => {
        const dotRows = [];
        const dotCols = [];
        const allEmpty = c => c === '.';
        const input = data.trim().split('\n').map((l, i) => {
          const row = l.split('');
          if (row.every(allEmpty)) {
            dotRows.push(i);
          }
          return row;
        });
        for (let l = input[0].length; l--;) {
          if (input.map(r => r[l]).every(allEmpty)) {
            dotCols.push(l);
          }
        }
        console.log(dotRows, dotCols);
        const expanded = [];
        for (let l = input.length; l--;) {
          const newRow = [];
          for (let ll = input[l].length; ll--;) {
            newRow.unshift(input[l][ll]);
            if (dotCols.includes(ll)) {
              newRow.unshift('.');
            }
          }
          expanded.unshift(newRow);
          if (dotRows.includes(l)) {
            expanded.unshift(newRow.slice());
          }
        }
        console.log(expanded);
        const manhattan = (y1, x1, y2, x2) => Math.abs(x2 - x1) + Math.abs(y2 - y1);
        const points = expanded.reduce((acc, row, y) => {
          row.forEach((c, x) => {
            if (c === '#') {
              acc.push([y, x]);
            }
          });
          return acc;
        }, []);
        console.log(points);
        const pairs = [];
        points.forEach((p1, i1) => {
          points.forEach((p2, i2) => {
            if (i1 !== i2 && !pairs.some(pp => pp.keys.includes(i1) && pp.keys.includes(i2))) {
              pairs.push({
                keys: [i1, i2],
                distance: manhattan(p1[0], p1[1], p2[0], p2[1])
              });
            }
          });
        });
        console.log(pairs);
        const sum = pairs.reduce((acc, pp) => acc + pp.distance, 0);
        console.log(sum);
        return sum;
      },
      part2: (data) => {
        const dotRows = [];
        const dotCols = [];
        const allEmpty = c => c === '.';
        const input = data.trim().split('\n').map((l, i) => {
          const row = l.split('');
          if (row.every(allEmpty)) {
            dotRows.push(i);
          }
          return row;
        });
        for (let l = input[0].length; l--;) {
          if (input.map(r => r[l]).every(allEmpty)) {
            dotCols.push(l);
          }
        }
        console.log(dotRows, dotCols);
        const manhattan = (y1, x1, y2, x2) => Math.abs(x2 - x1) + Math.abs(y2 - y1);
        const points = input.reduce((acc, row, y) => {
          row.forEach((c, x) => {
            if (c === '#') {
              acc.push([y, x]);
            }
          });
          return acc;
        }, []);
        console.log(points);
        const pairs = [];
        const expandBy = 1000000 - 1;
        const inRange = (i, v1, v2) => {
          if (v1 < v2) {
            return i > v1 && i < v2;
          } else if (v1 > v2) {
            return i > v2 && i < v1;
          } else {
            return false;
          }
        };
        points.forEach((p1, i1) => {
          points.forEach((p2, i2) => {
            if (i1 !== i2 && !pairs.some(pp => pp.keys.includes(i1) && pp.keys.includes(i2))) {
              const expanse = BigInt(expandBy * (dotRows.filter(r => inRange(r, p1[0], p2[0])).length + dotCols.filter(c => inRange(c, p1[1], p2[1])).length));
              pairs.push({
                keys: [i1, i2],
                distance: BigInt(manhattan(p1[0], p1[1], p2[0], p2[1])) + expanse
              });
            }
          });
        });
        console.log(pairs);
        const sum = pairs.reduce((acc, pp) => acc + pp.distance, BigInt(0));
        console.log(sum);
        return sum;
      }
    },
    day12: {
      part1: (data) => {
        const isFullSpring = /^#+$/;
        const matchSpots = /[?#]+/g;
        const eachQ = /\?/g;
        const onlySpring = /#+/g;
        const options = ['.', '#'];
        const isValid = (text, lens) => [...text.matchAll(onlySpring)].map(m => m[0].length).join(',') === lens;
        const input = data.trim().split('\n').map(line => {
          const parts = line.trim().split(' ');
          const springMap = parts[0];
          const potential = [...springMap.matchAll(matchSpots)].map(m => {
            const txt = m[0];
            return {
              matched: txt,
              start: m.index,
              length: txt.length,
              isFull: isFullSpring.test(txt)
            };
          });
          const qAt = [...springMap.matchAll(eachQ)].map(m => m.index);
          const count = qAt.length;
          const lens = parts[1];
          const sizes = lens.split(',').map(Number);
          return {
            qAt,
            count,
            max: (2 ** count),
            springMap,
            potential,
            lens,
            sizes
          };
        });
        console.log(input);
        const validSum = input.reduce((sum, springs) => {
          for (let l = springs.max; l--;) {
            const chars = ('0'.repeat(springs.count) + l.toString(2)).slice(-springs.count).split('').map(Number).map(m => options[m]);
            // console.log(chars);
            let newMap = springs.springMap;
            for (let q = 0; q < springs.count; q++) {
              let begin = '';
              const qi = springs.qAt[q];
              if (qi > 0) {
                begin = newMap.slice(0, qi);
              }
              const mid = chars[q];
              let end = '';
              if (qi < springs.springMap.length - 1) {
                end = newMap.slice(qi + 1);
              }
              newMap = begin + mid + end;
            }
            // console.log(newMap);
            if (isValid(newMap, springs.lens)) {
              sum++;
            }
          }
          return sum;
        }, 0);
        console.log(validSum);
        return validSum;
      },
      part2: (data) => {
        const isFullSpring = /^#+$/;
        const matchSpots = /[?#]+/g;
        const eachQ = /\?/g;
        const onlySpring = /#+/g;
        const options = ['.', '#'];
        const isValid = (text, lens) => [...text.matchAll(onlySpring)].map(m => m[0].length).join(',') === lens;
        const input = data.trim().split('\n').map(line => {
          const parts = line.trim().split(' ');
          const springMap = parts[0];
          const potential = [...springMap.matchAll(matchSpots)].map(m => {
            const txt = m[0];
            return {
              matched: txt,
              start: m.index,
              length: txt.length,
              isFull: isFullSpring.test(txt)
            };
          });
          const qAt = [...springMap.matchAll(eachQ)].map(m => m.index);
          const count = qAt.length;
          const lens = parts[1];
          const sizes = lens.split(',').map(Number);
          return {
            qAt,
            count,
            max: (2 ** count),
            springMap,
            potential,
            lens,
            sizes
          };
        });
        console.log(input);
        const validSum = input.reduce((sum, springs) => {
          for (let l = springs.max; l--;) {
            const chars = ('0'.repeat(springs.count) + l.toString(2)).slice(-springs.count).split('').map(Number).map(m => options[m]);
            // console.log(chars);
            let newMap = springs.springMap;
            for (let q = 0; q < springs.count; q++) {
              let begin = '';
              const qi = springs.qAt[q];
              if (qi > 0) {
                begin = newMap.slice(0, qi);
              }
              const mid = chars[q];
              let end = '';
              if (qi < springs.springMap.length - 1) {
                end = newMap.slice(qi + 1);
              }
              newMap = begin + mid + end;
            }
            // console.log(newMap);
            if (isValid(newMap, springs.lens)) {
              sum++;
            }
          }
          return sum;
        }, 0);
        console.log(validSum);
        return validSum;
      }
    },
    day13: {
      part1: (data) => { return data; },
      part2: (data) => { return data; }
    },
    day14: {
      part1: d => d,
      part2: d => d
    },
    day15: {
      part1: d => d,
      part2: d => d
    },
    day16: {
      part1: d => d,
      part2: d => d
    },
    day17: {
      part1: d => d,
      part2: d => d
    },
    day18: {
      part1: d => d,
      part2: d => d
    },
    day19: {
      part1: d => d,
      part2: d => d
    },
    day20: {
      part1: d => d,
      part2: d => d
    },
    day21: {
      part1: d => d,
      part2: d => d
    },
    day22: {
      part1: d => d,
      part2: d => d
    },
    day23: {
      part1: d => d,
      part2: d => d
    },
    day24: {
      part1: d => d,
      part2: d => d
    },
    day25: {
      part1: d => d,
      part2: d => d
    }
  };

  this.funs = (day, part) => all['day' + day]['part' + part];
}.call(this));
