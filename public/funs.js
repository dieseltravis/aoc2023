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
              sourceEnd: nums[1] + nums[2],
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
          
          for (let seed = seedStart; seed <= seedEnd; seed++) {
            const last = routes.reduce((seedPos, routeList) => {
              const newRoute = routeList.find(route => seedPos >= route.sourceStart && seedPos <= route.sourceEnd);
              const newPos = newRoute ? (seedPos - newRoute.sourceStart) + newRoute.dest : seedPos;
              return newPos;
            }, seed);
            
            smallest = Math.min(smallest, last);
          }
        });
        
        console.log(smallest);
        // 28580590
        // 28580590
        // 28580590
        // 28580590 is too high
        // 240320250 is too high
        return smallest;
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
      part1: (d) => { return d; },
      part2: (d) => { return d; }
    },
    day23: {
      part1: (d) => { return d; },
      part2: (d) => { return d; }
    },
    day24: {
      part1: (d) => { return d; },
      part2: (d) => { return d; }
    },
    day25: {
      part1: (d) => { return d; },
      part2: (d) => { return d; }
    }
  };

  this.funs = (day, part) => all['day' + day]['part' + part];
}.call(this));
