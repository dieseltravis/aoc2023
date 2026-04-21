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
        const dots = /\.+/g;
        // count each chunk recursively
        const found = {};
        const rCount = (chunk, counts) => {
          const key = chunk + counts.join(',');
          if (key in found) {
            return found[key];
          } else {
            const noCounts = (counts.length === 0);
            if (chunk === '') {
              return noCounts ? 1 : 0;
            } else if (noCounts) {
              return (chunk.includes('#')) ? 0 : 1;
            } else {
              let num = 0;
              if ('.?'.includes(chunk[0])) {
                num += rCount(chunk.slice(1), counts.slice());
              }
              if ('#?'.includes(chunk[0])) {
                const chunkLen = chunk.length;
                if (counts[0] <= chunkLen &&
                    !chunk.slice(0, counts[0]).includes('.') &&
                   (counts[0] === chunkLen || chunk[counts[0]] !== '#')) {
                  num += rCount(chunk.slice(counts[0] + 1), counts.slice(1));
                }
              }
              found[key] = num;
              return num;
            }
          }
        };
        const input = data.trim().split('\n').map(line => {
          const parts = line.trim().split(' ');
          // remove redundant dots
          const oldMap = parts[0].replace(dots, '.');
          const springMap = ('?' + oldMap).repeat(5).slice(1);
          const lens = (',' + parts[1]).repeat(5).slice(1);
          const nums = lens.split(',').map(Number);
          return {
            springMap,
            nums,
            lenslen: nums.length,
            combos: rCount(springMap, nums.slice())
          };
        });
        console.log(input);
        const validSum = input.reduce((acc, row) => acc + row.combos, 0);
        console.log(validSum);
        return validSum;
      }
    },
    day13: {
      part1: (data) => {
        const fold = (block) => {
          const ymax = block.length;
          const xmax = block[0].length;
          // reflect x
          for (let x = 1; x < xmax; x++) {
            // take first half and compare it to reverse of second half
            const len = Math.min(x, xmax - x);
            const lefts = block.map(l => l.slice(0, x).slice(-len).join('')).join('\n');
            const rights = block.map(r => r.slice(x, x + len).reverse().join('')).join('\n');
            if (lefts === rights) {
              return { x };
            }
          }
          // reflect y
          for (let y = 1; y < ymax; y++) {
            // take top half and compare it to reverse of bottom half
            const len = Math.min(y, ymax - y);
            const tops = block.slice(0, y).slice(-len).map(t => t.join('')).join('\n');
            const bottoms = block.slice(y, y + len).reverse().map(b => b.join('')).join('\n');
            if (tops === bottoms) {
              return { y };
            }
          }
        };
        const input = data.trim().split('\n\n').map(b => {
          const chars = b.split('\n').map(r => r.split(''));
          return chars;
        });
        console.log(input);
        const result = input.reduce((sum, block, i) => {
          console.log(i, sum);
          const obj = fold(block);
          if ('x' in obj) {
            sum += obj.x;
          }
          if ('y' in obj) {
            sum += obj.y * 100;
          }
          return sum;
        }, 0);
        console.log(result);
        // 19301 too low
        return result;
      },
      part2: (data) => {
        const bits = s => '0b' + s.split('').map(c => c === '#').map(Number).join('');
        const diff = (b1, b2) => (BigInt(b1) - BigInt(b2)).toString(2).replace(/[-0]+/g, '');
        const fold = (block) => {
          const xmax = block[0].length;
          // reflect x
          for (let x = 1; x < xmax; x++) {
            // take first half and compare it to reverse of second half
            const len = Math.min(x, xmax - x);
            const lefts = bits(block.map(l => l.slice(0, x).slice(-len).join('')).join(''));
            const rights = bits(block.map(r => r.slice(x, x + len).reverse().join('')).join(''));
            if (diff(lefts, rights) === '1') {
              return { x };
            }
          }
          const ymax = block.length;
          // reflect y
          for (let y = 1; y < ymax; y++) {
            // take top half and compare it to reverse of bottom half
            const len = Math.min(y, ymax - y);
            const tops = bits(block.slice(0, y).slice(-len).map(t => t.join('')).join(''));
            const bottoms = bits(block.slice(y, y + len).reverse().map(b => b.join('')).join(''));
            if (diff(tops, bottoms) === '1') {
              return { y };
            }
          }
        };
        const input = data.trim().split('\n\n').map(b => {
          const chars = b.split('\n').map(r => r.split(''));
          return chars;
        });
        console.log(input);
        const result = input.reduce((sum, block, i) => {
          console.log(i, sum);
          const obj = fold(block);
          if ('x' in obj) {
            sum += obj.x;
          }
          if ('y' in obj) {
            sum += obj.y * 100;
          }
          return sum;
        }, 0);
        console.log(result);
        // 35583 too high
        return result;
      }
    },
    day14: {
      part1: (data) => {
        const input = data.trim().split('\n').map(l => {
          return l.split('').map(c => {
            return {
              // c,
              isEmpty: c === '.',
              isCube: c === '#',
              isRound: c === 'O'
            };
          });
        });
        const ymax = input.length;
        const xmax = input[0].length;
        input.forEach((r, y) => {
          r.forEach(c => {
            c.load = ymax - y;
          });
        });
        console.log(input.slice());
        const rounds = [];
        for (let x = 0; x < xmax; x++) {
          for (let y = 0; y < ymax; y++) {
            if (input[y][x].isRound) {
              // look up
              if (y > 0) {
                const lastPos = { y, x };
                for (let newY = y; newY--;) {
                  const newSpot = input[newY][x];
                  if (newSpot.isEmpty) {
                    lastPos.y = newY;
                  } else {
                    break;
                  }
                }
                if (lastPos.y !== y) {
                  input[y][x].isRound = false;
                  input[y][x].isEmpty = true;
                  input[lastPos.y][x].isRound = true;
                  input[lastPos.y][x].isEmpty = false;
                }
              }
            }
          }
        }
        console.log(rounds);
        const load = input.reduce((acc, row) => {
          return acc + row.reduce((acc2, c) => {
            if (c.isRound) {
              acc2 += c.load;
            }
            return acc2;
          }, 0);
        }, 0);
        console.log(load);
        return load;
      },
      part2: (data) => {
        const cycles = 1000000000;
        const input = data.trim().split('\n').map(l => {
          return l.trim().split('').map(c => {
            return {
              isEmpty: c === '.',
              isCube: c === '#',
              isRound: c === 'O'
            };
          });
        });
        const ymax = input.length;
        const xmax = input[0].length;
        input.forEach((r, y) => {
          r.forEach(c => {
            c.load = ymax - y;
          });
        });
        const render = (arr) => arr.map(r => r.map(c => c.isRound ? 'O' : c.isCube ? '#' : '.').join('')).join('\n');
        const getLoad = (arr) => arr.reduce((acc, row) => {
          return acc + row.reduce((acc2, c) => {
            if (c.isRound) {
              acc2 += c.load;
            }
            return acc2;
          }, 0);
        }, 0);
        const lookup = {};
        let id = 0;
        const idtokey = {};
        const keytoid = {};
        const loads = {};
        const pattern = [];
        for (let i = 0; i < cycles; i++) {
          let key = '';
          let found = false;
          let newInput = [];
          key = render(input);
          newInput = lookup[key];
          found = !!newInput;
          if (found) {
            console.log('repeat at i:', i);
            const prem = cycles - i;
            const plen = pattern.length;
            const pidx = pattern.indexOf(keytoid[key]);
            // take the remaining less one, remainder of number of items in array that repeat, offset by index
            const presult = ((prem - 1) % (plen - pidx)) + pidx;
            console.log(pattern, 'prem', prem, 'plen', plen, 'pidx', pidx, 'plen - pidx', plen - pidx, 'presult', presult);
            console.log(Object.values(loads));
            const pkey = idtokey[presult];
            const result = loads[pkey];
            console.log(result);
            return result;
          } else {
            // N
            for (let x = 0; x < xmax; x++) {
              for (let y = 0; y < ymax; y++) {
                if (input[y][x].isRound) {
                  let newY = y;
                  let lastY = y;
                  while (newY > 0) {
                    newY = newY - 1;
                    if (input[newY][x].isEmpty) {
                      lastY = newY;
                    } else {
                      break;
                    }
                  }
                  if (lastY !== y) {
                    input[y][x].isRound = false;
                    input[y][x].isEmpty = true;
                    input[lastY][x].isRound = true;
                    input[lastY][x].isEmpty = false;
                  }
                }
              }
            }
            // W
            for (let y = 0; y < ymax; y++) {
              for (let x = 0; x < xmax; x++) {
                if (input[y][x].isRound) {
                  let newX = x;
                  let lastX = x;
                  while (newX > 0) {
                    newX = newX - 1;
                    if (input[y][newX].isEmpty) {
                      lastX = newX;
                    } else {
                      break;
                    }
                  }
                  if (lastX !== x) {
                    input[y][x].isRound = false;
                    input[y][x].isEmpty = true;
                    input[y][lastX].isRound = true;
                    input[y][lastX].isEmpty = false;
                  }
                }
              }
            }
            // S
            for (let x = 0; x < xmax; x++) {
              for (let y = ymax; y--;) {
                if (input[y][x].isRound) {
                  let newY = y;
                  let lastY = y;
                  while (newY < ymax - 1) {
                    newY = newY + 1;
                    if (input[newY][x].isEmpty) {
                      lastY = newY;
                    } else {
                      break;
                    }
                  }
                  if (lastY !== y) {
                    input[y][x].isRound = false;
                    input[y][x].isEmpty = true;
                    input[lastY][x].isRound = true;
                    input[lastY][x].isEmpty = false;
                  }
                }
              }
            }
            // E
            for (let y = 0; y < ymax; y++) {
              for (let x = xmax; x--;) {
                if (input[y][x].isRound) {
                  let newX = x;
                  let lastX = x;
                  while (newX < xmax - 1) {
                    newX = newX + 1;
                    if (input[y][newX].isEmpty) {
                      lastX = newX;
                    } else {
                      break;
                    }
                  }
                  if (lastX !== x) {
                    input[y][x].isRound = false;
                    input[y][x].isEmpty = true;
                    input[y][lastX].isRound = true;
                    input[y][lastX].isEmpty = false;
                  }
                }
              }
            }
            // i > 1000 &&
            if (!found) {
              lookup[key] = input.slice(0).map(row => row.slice(0));
              idtokey[id] = key;
              keytoid[key] = id;
              loads[key] = getLoad(input);
              pattern.push(id);
              id++;
            }
          }
        }
        const load = getLoad(input);
        console.log('last:\n' + render(input) + '\nload:', load, '\ncached count: ', Object.keys(lookup).length);
        // 102802 too low
        return load;
      }
    },
    day15: {
      part1: (data) => {
        const input = data.trim().replace(/\n/g, '').split(',').map(cmd => cmd.split(''));
        const hash = (v, c) => {
          const asc = c.charCodeAt(0);
          v += asc;
          v *= 17;
          v %= 256;
          return v;
        };
        const result = input.reduce((sum, cmd) => sum + cmd.reduce(hash, 0), 0);
        console.log(result);
        return result;
      },
      part2: (data) => {
        const boxes = [...new Array(256)].map(() => []);
        const hash = (v, c) => {
          const asc = c.charCodeAt(0);
          v += asc;
          v *= 17;
          v %= 256;
          return v;
        };
        const rxcmd = /^(\w+)([-=])(\d?)$/;
        const input = data.trim().replace(/\n/g, '').split(',').map(cmd => {
          const matched = cmd.match(rxcmd);
          const parsed = {
            label: matched[1],
            op: matched[2],
            focal: 0
          };
          parsed.hash = parsed.label.split('').reduce(hash, 0);
          if (parsed.op === '=') {
            parsed.focal = +matched[3];
          }
          return parsed;
        });
        console.log(input);
        input.forEach(cmd => {
          const i = cmd.hash;
          if (cmd.op === '-') {
            const index = boxes[i].findIndex(box => box[0] === cmd.label);
            if (index > -1) {
              boxes[i].splice(index, 1);
            }
          } else if (cmd.op === '=') {
            let found = 0;
            boxes[i].forEach(box => {
              if (box[0] === cmd.label) {
                box[1] = cmd.focal;
                found++;
              }
            });
            if (found === 0) {
              boxes[i].push([cmd.label, cmd.focal]);
            }
          }
        });
        console.log(boxes);
        const result = boxes.reduce((sum, box, bi) => sum + box.reduce((bsum, slot, si) => bsum + ((bi + 1) * (si + 1) * slot[1]), 0), 0);
        console.log(result);
        return result;
      }
    },
    day16: {
      part1: (data) => {
        const mirrors = {
          '.': (dy, dx) => [[dy, dx]],
          '/': (dy, dx) => [[-dx, -dy]],
          '\\': (dy, dx) => [[dx, dy]],
          '|': (dy, dx) => {
            const beams = [];
            if (dx === 0) {
              beams.push([dy, dx]);
            } else {
              beams.push([-dx, dy]);
              beams.push([dx, dy]);
            }
            return beams;
          },
          '-': (dy, dx) => {
            const beams = [];
            if (dy === 0) {
              beams.push([dy, dx]);
            } else {
              beams.push([dx, -dy]);
              beams.push([dx, dy]);
            }
            return beams;
          }
        };
        const input = data.trim().split('\n').map(l => l.split(''));
        const ymax = input.length;
        const xmax = input[0].length;
        console.log(input, ymax, xmax);
        const tileDirs = { '0,0,0,1': 1 };
        const tiles = { '0,0': 1 };
        let beams = [{ y: 0, x: 0, dy: 0, dx: 1 }];
        let safety = 1000;
        let lastDirs = 0;
        let lastEnergy = 0;
        while (safety-- > 0 && beams.length > 0) {
          const newBeams = [];
          for (let l = beams.length; l--;) {
            const beam = beams[l];
            beam.y += beam.dy;
            beam.x += beam.dx;
            if (beam.y >= 0 && beam.x >= 0 && beam.y < ymax && beam.x < xmax) {
              tileDirs[beam.y + ',' + beam.x + ',' + beam.dy + ',' + beam.dx] = 1;
              tiles[beam.y + ',' + beam.x] = 1;
              const mirror = mirrors[input[beam.y][beam.x]];
              const newDeltas = mirror(beam.dy, beam.dx);
              newBeams.push(...newDeltas.map(dd => {
                return {
                  y: beam.y,
                  x: beam.x,
                  dy: dd[0],
                  dx: dd[1]
                };
              }));
            }
          }
          beams = newBeams;
          const dirs = Object.values(tileDirs).length;
          const energy = Object.values(tiles).length;
          if (dirs === lastDirs) {
            break;
          }
          lastEnergy = energy;
          lastDirs = dirs;
        }
        if (safety <= 0) {
          console.warn('safety.');
        }
        const result = lastEnergy;
        console.log(result);
        return result;
      },
      part2: (data) => {
        const mirrors = {
          '.': (dy, dx) => [[dy, dx]],
          '/': (dy, dx) => [[-dx, -dy]],
          '\\': (dy, dx) => [[dx, dy]],
          '|': (dy, dx) => {
            const beams = [];
            if (dx === 0) {
              beams.push([dy, dx]);
            } else {
              beams.push([-dx, dy]);
              beams.push([dx, dy]);
            }
            return beams;
          },
          '-': (dy, dx) => {
            const beams = [];
            if (dy === 0) {
              beams.push([dy, dx]);
            } else {
              beams.push([dx, -dy]);
              beams.push([dx, dy]);
            }
            return beams;
          }
        };
        const input = data.trim().split('\n').map(l => l.split(''));
        const ymax = input.length;
        const xmax = input[0].length;
        const starters = [];
        for (let x = xmax; x--;) {
          starters.push({ y: 0, x, dy: 1, dx: 0 });
          starters.push({ y: ymax - 1, x, dy: -1, dx: 0 });
        }
        for (let y = ymax; y--;) {
          starters.push({ y, x: 0, dy: 0, dx: 1 });
          starters.push({ y, x: xmax - 1, dy: 0, dx: -1 });
        }
        console.log(input, ymax, xmax, starters);
        let max = 0;
        // progress
        const startLen = starters.length;
        starters.forEach((start, i) => {
          const tileDirs = {};
          tileDirs[start.y + ',' + start.x + ',' + start.dy + ',' + start.dx] = 1;
          const tiles = {};
          tiles[start.y + ',' + start.x] = 1;
          let beams = [start];
          let lastDirs = 0;
          let lastEnergy = 0;
          while (beams.length > 0) {
            const newBeams = [];
            for (let l = beams.length; l--;) {
              const beam = beams[l];
              beam.y += beam.dy;
              beam.x += beam.dx;
              if (beam.y >= 0 && beam.x >= 0 && beam.y < ymax && beam.x < xmax) {
                tileDirs[beam.y + ',' + beam.x + ',' + beam.dy + ',' + beam.dx] = 1;
                tiles[beam.y + ',' + beam.x] = 1;
                const mirror = mirrors[input[beam.y][beam.x]];
                const newDeltas = mirror(beam.dy, beam.dx);
                newBeams.push(...newDeltas.map(dd => {
                  return {
                    y: beam.y,
                    x: beam.x,
                    dy: dd[0],
                    dx: dd[1]
                  };
                }));
              }
            }
            beams = newBeams;
            const dirs = Object.values(tileDirs).length;
            const energy = Object.values(tiles).length;
            if (dirs === lastDirs) {
              break;
            }
            lastEnergy = energy;
            lastDirs = dirs;
          }
          max = Math.max(lastEnergy, max);
          console.log((i + 1) + ' of ' + startLen + ' ' + (new Date()).toISOString(), max);
        });
        console.log(max);
        // 7965 too low
        // 8079 too low
        return max;
      }
    },
    day17: {
      part1: (data) => {
        // 😩
        const grid = data.trim().split('\n').map(row => row.split('').map(Number));
        console.log(grid);
        const dirs = [
          { d: 'N', f: [-1, 0] },
          { d: 'E', f: [0, 1] },
          { d: 'S', f: [1, 0] },
          { d: 'W', f: [0, -1] }
        ];
        // there is a max of 3 in a row in any direction
        const ymax = grid.length;
        const xmax = grid[0].length;
        const inRange = (p, max) => p >= 0 && p < max;
        const inY = y => inRange(y, ymax);
        const inX = x => inRange(x, xmax);
        // const isLastDirValid = (last3, dir) => !last3.every(d => d === dir);
        const points = grid.map((row, y) => row.map((point, x) => {
          const neighbors = [];
          // look N, E, S, W
          dirs.forEach(dir => {
            const ynew = y + dir.f[0];
            if (inY(ynew)) {
              const xnew = x + dir.f[1];
              if (inX(xnew)) {
                neighbors.push({
                  y: ynew,
                  x: xnew,
                  from: dir.d,
                  val: grid[ynew][xnew]
                });
              }
            }
          });
          return {
            y,
            x,
            value: point,
            neighbors
          };
        }));
        console.log(points);
        const path = [];
        const sum = pathArr => pathArr.reduce((acc, p) => acc + grid[p.y][p.x], 0);
        // modified from https://github.com/tcort/dijkstrajs/blob/master/dijkstra.js
        const singleSourceShortestPaths = (graph, s, d) => {
          // Predecessor map for each node that has been encountered.
          // node ID => predecessor node ID
          const predecessors = {};

          // Costs of shortest paths from s to all nodes encountered.
          // node ID => cost
          const costs = {};
          costs[s] = 0;

          // Costs of shortest paths from s to all nodes encountered; differs from
          // `costs` in that it provides easy access to the node that currently has
          // the known shortest path from s.
          // XXX: Do we actually need both `costs` and `open`?
          const open = []; // qmake();
          qpush(open, s, 0);

          while (!qempty(open)) {
            // In the nodes remaining in graph that have a known cost from s,
            // find the node, u, that currently has the shortest path from s.
            const closest = qpop(open);
            const u = closest.value;
            const costOfSToU = closest.cost;

            // Get nodes adjacent to u...
            const adjacentNodes = graph[u] || {};

            // ...and explore the edges that connect u to those nodes, updating
            // the cost of the shortest paths to any or all of those nodes as
            // necessary. v is the node across the current edge from u.
            for (const v in adjacentNodes) {
              if (Object.hasOwn(adjacentNodes, v)) {
                // Get the cost of the edge running from u to v.
                const costOfE = adjacentNodes[v];

                // Cost of s to u plus the cost of u to v across e--this is *a*
                // cost from s to v that may or may not be less than the current
                // known cost to v.
                const costOfSToUPlusCostOfE = costOfSToU + costOfE;

                // If we haven't visited v yet OR if the current known cost from s to
                // v is greater than the new cost we just found (cost of s to u plus
                // cost of u to v across e), update v's cost in the cost list and
                // update v's predecessor in the predecessor list (it's now u).
                const costOfSToV = costs[v];
                const firstVisit = !costs[v];
                if (firstVisit || costOfSToV > costOfSToUPlusCostOfE) {
                  costs[v] = costOfSToUPlusCostOfE;
                  open.push(v, costOfSToUPlusCostOfE);
                  predecessors[v] = u;
                }
              }
            }
          }

          if (!d || !costs[d]) {
            console.error('Could not find a path from ', s, ' to ', d, '.');
          }

          return predecessors;
        };

        const extractShortestPathFromPredecessorList = (predecessors, d) => {
          const nodes = [];
          let u = d;
          // let predecessor;
          while (u) {
            nodes.push(u);
            // predecessor = predecessors[u];
            u = predecessors[u];
          }
          nodes.reverse();
          return nodes;
        };

        const findPath = (graph, s, d) => {
          const predecessors = singleSourceShortestPaths(graph, s, d);
          return extractShortestPathFromPredecessorList(predecessors, d);
        };
        console.info(findPath);

        const qsorter = (a, b) => {
          return a.cost - b.cost;
        };

        // Add a new item to the queue and ensure the highest priority element
        // is at the front of the queue.
        const qpush = (q, value, cost) => {
          const item = { value, cost };
          q.push(item);
          q.sort(qsorter);
        };

        // Return the highest priority element in the queue.
        const qpop = (q) => {
          return q.shift();
        };

        const qempty = (q) => {
          return q.length === 0;
        };
        // const start = { y: 0, x: 0 };
        // const end = { y: ymax - 1, x: xmax - 1 };
        // const manh = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);
        // const look = (p, prevp) => {
        //  const around = [];
        //  // TODO: finish this
        // };
        const result = sum(path);
        console.log(result);
        return result;
      },
      part2: d => d
    },
    day18: {
      part1: (data) => {
        // R 6 (#70c710)
        const input = data.trim().split('\n').map(cmd => {
          const dig = cmd.trim().split(' ');
          const instruct = {
            d: dig[0],
            a: dig[1],
            c: dig[2].slice(1, -1)
          };
          instruct.s = 'color:' + instruct.c;
          return instruct;
        });
        console.log(input);
        const d = { U: [-1, 0], R: [0, 1], D: [1, 0], L: [0, -1] };
        const p = { y: 0, x: 0 };
        const dict = {};
        const poly = [];
        const dug = input.reduce((acc, instr) => {
          for (let i = instr.a; i--;) {
            p.y += d[instr.d][0];
            p.x += d[instr.d][1];
            poly.push([p.y, p.x]);
            acc.push({ y: p.y, x: p.x, c: instr.c, s: instr.s });
            dict[p.y + ',' + p.x] = instr.s;
          }
          return acc;
        }, []);
        console.log(dug);
        const pip = (polygon, point) => {
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
        const render = (d) => {
          const range = d.reduce((r, i) => {
            r.ymin = Math.min(r.ymin, i.y);
            r.xmin = Math.min(r.xmin, i.x);
            r.ymax = Math.max(r.ymax, i.y);
            r.xmax = Math.max(r.xmax, i.x);
            return r;
          }, { ymin: Infinity, xmin: Infinity, ymax: -Infinity, xmax: -Infinity });
          console.log(range);
          let yy = 0;
          let sum = 0;
          for (let y = range.ymin - 1; y <= range.ymax + 1; y++) {
            let text = (yy++) + '\t';
            const colors = [];
            for (let x = range.xmin - 1; x <= range.xmax + 1; x++) {
              const found = dict[y + ',' + x];
              if (found) {
                colors.push(found);
                text += '%c#';
                sum++;
              } else {
                const inside = pip(poly, [y, x]);
                if (inside) {
                  text += '%cL';
                  colors.push('color:#F00');
                  sum++;
                } else {
                  text += '%c.';
                  colors.push('color:#000');
                }
              }
            }
            console.log(text, ...colors);
          }
          console.log(sum);
          return sum;
        };
        return render(dug);
      },
      part2: (data) => {
        const dirs = ['R', 'D', 'L', 'U'];
        const input = data.trim().split('\n').map(cmd => {
          const dig = cmd.trim().split(' ');
          return {
            d: dirs[+dig[2].slice(-2, -1)],
            a: parseInt(dig[2].slice(2, -2), 16)
          };
        });
        console.log(input);
        const d = { U: [-1, 0], R: [0, 1], D: [1, 0], L: [0, -1] };
        const p = { y: 0, x: 0 };
        const poly = [];
        const inputLen = input.length;
        const inputPc = inputLen / 100;
        let ipc = 0;
        let edgeSum = 0;
        input.forEach((instr, i) => {
          if (i % inputPc === 0) {
            console.log(ipc++ + '% of ' + inputLen + ' ' + (new Date()).toISOString());
          }
          for (let i = instr.a; i--;) {
            p.y += d[instr.d][0];
            p.x += d[instr.d][1];
            edgeSum++;
          }
          poly.push([p.y, p.x]);
        });
        let sum = 0;
        // A = 1/2 * Sum((x[i+1] + x[i]) * ([y[i+1] - y[i]))
        const getArea = () => {
          const points = poly.length;
          return poly.reduce((area, pt, i) => {
            const next = poly[(i + 1) % points];
            const addX = pt[1];
            const addY = next[0];
            const subX = next[1];
            const subY = pt[0];
            area += ((addX * addY) / 2);
            area -= ((subX * subY) / 2);
            return area;
          }, 0);
        };
        sum = getArea();
        console.log(edgeSum, sum);
        const total = (edgeSum / 2) + sum + 1;
        return total;
      }
    },
    day19: {
      part1: (data) => {
        const input = data.trim().split('\n\n').map(b => b.trim());
        const A = [];
        const R = [];
        const xfun = {
          T: () => true,
          '<': (o, p, v) => o[p] < v,
          '>': (o, p, v) => o[p] > v,
          A: (o) => A.push(o),
          R: (o) => R.push(o)
        };
        const xmas = /([xmas])([<>])(\d+):(\w+)/;
        const w = input[0].split('\n').map(f => {
          const ws = f.trim().split('{');
          const name = ws[0];
          const funs = ws[1].slice(0, -1).split(',').map(fun => {
            const matched = fun.match(xmas);
            const o = {};
            if (matched) {
              o.prop = matched[1];
              o.test = xfun[matched[2]];
              o.val = +matched[3];
              o.result = matched[4];
              o.direct = false;
            } else if (fun === 'A' || fun === 'R') {
              o.direct = true;
              o.result = fun;
            } else {
              o.test = xfun.T;
              o.direct = false;
              o.result = fun;
            }
            return o;
          });
          return { name, fun: { funs, len: funs.length } };
        }).reduce((obj, f) => {
          obj[f.name] = f.fun;
          return obj;
        }, {});
        const parts = input[1].split('\n').map(p => {
          return p.trim().slice(1, -1).split(',').reduce((acc, propval) => {
            const s = propval.split('=');
            acc[s[0]] = +s[1];
            return acc;
          }, {});
        });
        console.log(w, parts);
        const process = (part, wname) => {
          if (wname === 'A' || wname === 'R') {
            xfun[wname](part);
            return false;
          }
          const funs = w[wname];
          for (let f = 0; f < funs.len; f++) {
            const fun = funs.funs[f];
            if (fun.direct) {
              xfun[fun.result](part);
              return false;
            }
            if (fun.test(part, fun.prop, fun.val)) {
              return process(part, fun.result);
            }
          }
        };
        const partLen = parts.length;
        const chunk = partLen / 100;
        let nextpc = 0;
        parts.forEach((p, i) => {
          if (i >= nextpc) {
            console.log((i * 100 / partLen) + '% of ' + partLen + ' ' + (new Date()).toISOString());
            nextpc += chunk;
          }
          process(p, 'in');
        });
        const result = A.reduce((sum, p) => sum + p.x + p.m + p.a + p.s, 0);
        console.log(R, A, result);
        return result;
      },
      part2: (data) => {
        const input = data.trim().split('\n\n').map(b => b.trim());
        const A = 0;
        const xfun = {
          T: () => true,
          '<': (o, p, v) => o[p] < v,
          '>': (o, p, v) => o[p] > v
        };
        const xmas = /([xmas])([<>])(\d+):(\w+)/;
        const w = input[0].split('\n').map(f => {
          const ws = f.trim().split('{');
          const name = ws[0];
          const funs = ws[1].slice(0, -1).split(',').map(fun => {
            const matched = fun.match(xmas);
            const o = {};
            if (matched) {
              o.prop = matched[1];
              o.split = matched[2];
              o.test = xfun[o.split];
              o.val = +matched[3];
              o.result = matched[4];
              o.direct = false;
            } else if (fun === 'A' || fun === 'R') {
              o.direct = true;
              o.result = fun;
            } else {
              o.test = xfun.T;
              o.direct = false;
              o.result = fun;
            }
            return o;
          });
          return { name, fun: { funs, len: funs.length } };
        }).reduce((obj, f) => {
          obj[f.name] = f.fun;
          return obj;
        }, {});
        const process = (part, wname) => {
          const funs = w[wname];
          for (let f = 0; f < funs.len; f++) {
            const fun = funs.funs[f];
            if (fun.direct) {
              xfun[fun.result](part);
              return false;
            }
            if (fun.test(part, fun.prop, fun.val)) {
              if (fun.result === 'R') {
                // remove range
              } else if (fun.result === 'A') {
                // add difference of range to A
                // A += upper - lower + 1
                // remove range
              }
              return process(part, fun.result);
            }
          }
        };
        // only track ranges
        const parts = {
          x: [[1, 4000]],
          m: [[1, 4000]],
          a: [[1, 4000]],
          s: [[1, 4000]]
        };
        console.log(A, process, parts);
        return A;
      }
    },
    day20: {
      part1: (data) => {
        const mods = {};
        const mod = {
          '%': (mod, pulse) => {
            let out = pulse;
            if (mod.state) {
              out = !mod.last;
            } else {
              if (!pulse) {
                mod.state = true;
              }
            }
            mod.last = out;
            return out;
          },
          '&': (mod, pulse, from) => {
            let out = true;
            if (!mod.from[from]) {
              mod.from[from] = {
                last: false
              };
            }
            mod.from[from].last = pulse;
            if (Object.values(mod.from).every(m => m.last)) {
              out = false;
            }
            return out;
          }
        };
        const input = data.trim().split('\n').map(m => {
          const line = m.split(' -> ').map(f => f.trim());
          const type = line[0].slice(0, 1);
          const name = line[0].slice(1);
          const dest = line[1].split(', ');
          return {
            type,
            name,
            dest,
            lastMod: ''
          };
        }).reduce((acc, item) => {
          acc[item.name] = item;
          return acc;
        }, {});
        const queue = input.roadcast.dest;
        console.log(mod, mods, input, queue);
        const button = (pulse) => {
          queue.forEach(i => {
            const item = input[i];
            mod[item.type](item, pulse, 'roadcast');
          });
        };
        // TODO
        button(false);
      },
      part2: d => d
    },
    day21: {
      part1: (data) => {
        const stepCount = 64;
        let sy = -1;
        let sx = -1;
        const input = data.trim().split('\n').map((line, y) => {
          const items = line.trim().split('');
          const s = items.indexOf('S');
          if (s >= 0) {
            sy = y;
            sx = s;
          }
          return items.map(i => (i === '.' || i === 'S'));
        });
        const ymax = input.length;
        const xmax = input[0].length;
        /*
        const render = (s) => {
          let out = '';
          for (let y = 0; y < ymax; y++) {
            for (let x = 0; x < xmax; x++) {
              if (input[y][x]) {
                if (s.has(y + ',' + x)) {
                  out += 'O';
                } else if (y === sy && x === sx) {
                  out += 'S';
                } else {
                  out += '.';
                }
              } else {
                out += '#';
              }
            }
            out += '\n';
          }
          return out;
        };
        */
        let steps = new Set([sy + ',' + sx]);
        console.log(input);
        for (let s = stepCount; s--;) {
          const newSteps = new Set();
          const oldSteps = Array.from(steps);
          for (let f = oldSteps.length; f--;) {
            const fs = oldSteps[f].split(',').map(Number);
            // console.log(fs);
            const fy = fs[0];
            const fx = fs[1];
            // N
            const nfy = fy - 1;
            if (nfy >= 0 && input[nfy][fx]) {
              newSteps.add(nfy + ',' + fx);
            }
            // E
            const efx = fx + 1;
            if (efx < xmax && input[fy][efx]) {
              newSteps.add(fy + ',' + efx);
            }
            // S
            const sfy = fy + 1;
            if (sfy < ymax && input[sfy][fx]) {
              newSteps.add(sfy + ',' + fx);
            }
            // W
            const wfx = fx - 1;
            if (wfx >= 0 && input[fy][wfx]) {
              newSteps.add(fy + ',' + wfx);
            }
          }
          steps = newSteps;
          // console.log(s, '\n' + render(steps));
        }
        console.log(steps);
        return steps.size;
      },
      part2: (data) => {
        const stepCount = 26501365;
        let sy = -1;
        let sx = -1;
        const input = data.trim().split('\n').map((line, y) => {
          const items = line.trim().split('');
          const s = items.indexOf('S');
          if (s >= 0) {
            sy = y;
            sx = s;
          }
          return items.map(i => (i === '.' || i === 'S'));
        });
        const ymax = input.length;
        const xmax = input[0].length;
        let steps = new Set([sy + ',' + sx]);
        console.log(input);
        const box = (n, nmax) => {
          let tn = n % nmax;
          if (tn < 0) {
            tn += nmax;
          }
          return tn;
        };
        const chunk = stepCount / 100;
        let nextpc = 0;
        for (let i = 0; i < stepCount; i++) {
          if (i >= nextpc) {
            console.log((i * 100 / stepCount) + '% of ' + stepCount + ' ' + (new Date()).toISOString());
            nextpc += chunk;
          }
          const newSteps = new Set();
          const oldSteps = Array.from(steps);
          for (let f = oldSteps.length; f--;) {
            const fs = oldSteps[f].split(',').map(Number);
            const fy = fs[0];
            const tfy = box(fy, ymax);
            const fx = fs[1];
            const tfx = box(fx, xmax);
            // N
            const nfy = fy - 1;
            const tnfy = box(nfy, ymax);
            if (input[tnfy][tfx]) {
              newSteps.add(nfy + ',' + fx);
            }
            // E
            const efx = fx + 1;
            const tefx = box(efx, xmax);
            if (input[tfy][tefx]) {
              newSteps.add(fy + ',' + efx);
            }
            // S
            const sfy = fy + 1;
            const tsfy = box(sfy, ymax);
            if (input[tsfy][tfx]) {
              newSteps.add(sfy + ',' + fx);
            }
            // W
            const wfx = fx - 1;
            const twfx = box(wfx, xmax);
            if (input[tfy][twfx]) {
              newSteps.add(fy + ',' + wfx);
            }
          }
          steps = newSteps;
        }
        console.log(steps.size);
        return steps.size;
      }
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
