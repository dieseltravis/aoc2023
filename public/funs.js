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
            dst: match[3]
          };
        });
        console.log(instructions);

        instructions.forEach(instruct => {
          const srcCrate = crateInfo[instruct.src].crates;
          const dstCrate = crateInfo[instruct.dst].crates;
          const newSrc = srcCrate.slice(0, -instruct.amt);
          dstCrate.push(...srcCrate.slice(-instruct.amt).reverse());
          crateInfo[instruct.src].crates = newSrc;
        });
        console.log(crateInfo);

        let result = '';
        for (const key in crateInfo) {
          const stack = crateInfo[key];
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
            dst: match[3]
          };
        });
        console.log(instructions);

        instructions.forEach(instruct => {
          const srcCrate = crateInfo[instruct.src].crates;
          const dstCrate = crateInfo[instruct.dst].crates;
          const newSrc = srcCrate.slice(0, -instruct.amt);
          dstCrate.push(...srcCrate.slice(-instruct.amt));
          crateInfo[instruct.src].crates = newSrc;
        });
        console.log(crateInfo);

        let result = '';
        for (const key in crateInfo) {
          const stack = crateInfo[key];
          result += stack.crates.slice().reverse()[0];
        }
        return result;
      }
    },
    day6: {
      part1: (data) => {
        const buffer = data.trim().split('');
        let marker = [];
        let index = 0;
        for (let i = 4; i < buffer.length; i++) {
          const slice = buffer.slice(i - 4, i);
          const unique = [...new Set(slice)];
          if (unique.length === 4) {
            marker = unique;
            index = i;
            break;
          }
        }
        console.log(marker, index);
        return index;
      },
      part2: (data) => {
        const buffer = data.trim().split('');
        let marker = [];
        let index = 0;
        const len = 14;
        for (let i = len; i < buffer.length; i++) {
          const slice = buffer.slice(i - len, i);
          const unique = [...new Set(slice)];
          if (unique.length === len) {
            marker = unique;
            index = i;
            break;
          }
        }
        console.log(marker, index);
        return index;
      }
    },
    day7: {
      part1: (data) => {
        const rxcmd = /^(cd|ls)\s?(\w+|\/|\.\.)?$/;
        const rxls = /^(dir (\w+))|((\d+) (\w+\.?\w*))$/;
        const path = [];
        const folders = [{
          type: 'dir',
          sum: 0,
          size: 0,
          name: '/',
          parentpath: path.slice(),
          parentfolder: path.join('/'),
          path: ['/'],
          folder: ['/'].join('/'),
          folders: [],
          files: []
        }];
        const files = [];
        const output = data.trim().split(/\$ /).filter(cmd => cmd).map(cmd => cmd.trim().split('\n').map((prog, i) => {
          if (i === 0) {
            // cmd
            console.log(prog);
            const matchcmd = prog.match(rxcmd);
            const cmd = {
              type: 'cmd',
              cmd: matchcmd[1],
              dir: matchcmd[2]
            };
            if (cmd.cmd === 'cd') {
              if (cmd.dir === '..') {
                path.pop();
              } else {
                path.push(cmd.dir);
              }
            }
            cmd.path = path.slice();
            cmd.folder = path.join('/');
            return cmd;
          } else {
            const matchls = prog.match(rxls);
            if (matchls[1]) {
              const dir = {
                type: 'dir',
                sum: 0,
                size: 0,
                name: matchls[2],
                parentpath: path.slice(),
                parentfolder: path.join('/'),
                path: path.slice(),
                folder: path.join('/'),
                folders: [],
                files: []
              };
              dir.path.push(dir.name);
              dir.folder += '/' + dir.name;
              if (dir.name !== '/') {
                console.log(dir, folders, folders.filter(folder => folder.folder === dir.parentfolder));
                const parent = folders.filter(folder => folder.folder === dir.parentfolder)[0];
                parent.folders.push(dir);
              }
              folders.push(dir);
              return dir;
            } else {
              const file = {
                type: 'file',
                size: +matchls[4],
                name: matchls[5],
                parentpath: path.slice(),
                parentfolder: path.join('/'),
                path: path.slice(),
                folder: path.join('/')
              };
              file.path.push(file.name);
              file.folder += '/' + file.name;
              const parent = folders.filter(folder => folder.folder === file.parentfolder)[0];
              parent.size += file.size;
              parent.files.push(file);
              files.push(file);
              return file;
            }
          }
        }));
        console.log(output, folders, files);
        // at this point, immediate files are summed into the folders
        const getSum = (folder) => {
          if (folder.sum !== 0) {
            return folder.sum;
          } else {
            let sum = folder.size;
            for (let l = folder.folders.length; l--;) {
              sum += getSum(folder.folders[l]);
            }
            folder.sum = sum;
            return sum;
          }
        };
        getSum(folders[0]);
        console.log(folders);
        const big = folders.filter(folder => folder.sum <= 100000);
        console.log(big);
        const bigSum = big.reduce((a, b) => a + b.sum, 0);
        return bigSum;
      },
      part2: (data) => {
        const rxcmd = /^(cd|ls)\s?(\w+|\/|\.\.)?$/;
        const rxls = /^(dir (\w+))|((\d+) (\w+\.?\w*))$/;
        const path = [];
        const folders = [{
          type: 'dir',
          sum: 0,
          size: 0,
          name: '/',
          parentpath: path.slice(),
          parentfolder: path.join('/'),
          path: ['/'],
          folder: ['/'].join('/'),
          folders: [],
          files: []
        }];
        const files = [];
        const output = data.trim().split(/\$ /).filter(cmd => cmd).map(cmd => cmd.trim().split('\n').map((prog, i) => {
          if (i === 0) {
            const matchcmd = prog.match(rxcmd);
            const cmd = {
              type: 'cmd',
              cmd: matchcmd[1],
              dir: matchcmd[2]
            };
            if (cmd.cmd === 'cd') {
              if (cmd.dir === '..') {
                path.pop();
              } else {
                path.push(cmd.dir);
              }
            }
            cmd.path = path.slice();
            cmd.folder = path.join('/');
            return cmd;
          } else {
            const matchls = prog.match(rxls);
            if (matchls[1]) {
              const dir = {
                type: 'dir',
                sum: 0,
                size: 0,
                name: matchls[2],
                parentpath: path.slice(),
                parentfolder: path.join('/'),
                path: path.slice(),
                folder: path.join('/'),
                folders: [],
                files: []
              };
              dir.path.push(dir.name);
              dir.folder += '/' + dir.name;
              if (dir.name !== '/') {
                const parent = folders.filter(folder => folder.folder === dir.parentfolder)[0];
                parent.folders.push(dir);
              }
              folders.push(dir);
              return dir;
            } else {
              const file = {
                type: 'file',
                size: +matchls[4],
                name: matchls[5],
                parentpath: path.slice(),
                parentfolder: path.join('/'),
                path: path.slice(),
                folder: path.join('/')
              };
              file.path.push(file.name);
              file.folder += '/' + file.name;
              const parent = folders.filter(folder => folder.folder === file.parentfolder)[0];
              parent.size += file.size;
              parent.files.push(file);
              files.push(file);
              return file;
            }
          }
        }));
        console.log(output, folders, files);
        // at this point, immediate files are summed into the folders
        const getSum = (folder) => {
          if (folder.sum !== 0) {
            return folder.sum;
          } else {
            let sum = folder.size;
            for (let l = folder.folders.length; l--;) {
              sum += getSum(folder.folders[l]);
            }
            folder.sum = sum;
            return sum;
          }
        };
        getSum(folders[0]);
        console.log(folders);
        const total = 70000000;
        const need = 30000000;
        const current = total - folders[0].sum;
        const min = need - current;
        const big = folders.filter(folder => folder.sum >= min);
        console.log(big);
        const sorted = big.sort((a, b) => a.sum - b.sum);
        console.log(sorted);
        const bigSum = sorted[0].sum;
        return bigSum;
      }
    },
    day8: {
      part1: (data) => {
        const forest = data.trim().split('\n').map(row => row.split('').map(Number));
        const ylen = forest.length;
        const xlen = forest[0].length;
        let visible = (2 * ylen) + (2 * xlen) - 4;
        for (let y = 1; y < ylen - 1; y++) {
          for (let x = 1; x < xlen - 1; x++) {
            const tree = forest[y][x];
            // column
            let isVisibleN = true;
            let isVisibleS = true;
            for (let yy = 0; yy < ylen; yy++) {
              const compare = forest[yy][x];
              if (yy < y) {
                if (compare < tree) {
                  isVisibleN = true;
                } else {
                  isVisibleN = false;
                  yy = y;
                }
              } else if (yy > y) {
                if (compare < tree) {
                  isVisibleS = true;
                } else {
                  isVisibleS = false;
                  break;
                }
              }
            }
            // row
            let isVisibleW = true;
            let isVisibleE = true;
            for (let xx = 0; xx < xlen; xx++) {
              const compare = forest[y][xx];
              if (xx < x) {
                if (compare < tree) {
                  isVisibleW = true;
                } else {
                  isVisibleW = false;
                  xx = x;
                }
              } else if (xx > x) {
                if (compare < tree) {
                  isVisibleE = true;
                } else {
                  isVisibleE = false;
                  break;
                }
              }
            }
            if (isVisibleN || isVisibleS || isVisibleW || isVisibleE) {
              visible++;
            }
          }
        }
        return visible;
      },
      part2: (data) => {
        const forest = data.trim().split('\n').map(row => row.split('').map(cell => {
          return {
            height: +cell,
            n: 0,
            s: 0,
            w: 0,
            e: 0,
            score: 0
          };
        }));
        const ylen = forest.length;
        const xlen = forest[0].length;
        let maxScore = 0;
        for (let y = 1; y < ylen - 1; y++) {
          for (let x = 1; x < xlen - 1; x++) {
            const tree = forest[y][x];
            for (let n = y - 1; n >= 0; n--) {
              const north = forest[n][x];
              if (north.height <= tree.height) {
                tree.n++;
              }
              if (north.height >= tree.height) {
                break;
              }
            }
            if (tree.n > 0) {
              for (let s = y + 1; s < ylen; s++) {
                const south = forest[s][x];
                if (south.height <= tree.height) {
                  tree.s++;
                }
                if (south.height >= tree.height) {
                  break;
                }
              }
              if (tree.s > 0) {
                for (let w = x - 1; w >= 0; w--) {
                  const west = forest[y][w];
                  if (west.height <= tree.height) {
                    tree.w++;
                  }
                  if (west.height >= tree.height) {
                    break;
                  }
                }
                if (tree.w > 0) {
                  for (let e = x + 1; e < xlen; e++) {
                    const east = forest[y][e];
                    if (east.height < tree.height) {
                      tree.e++;
                    } else {
                      tree.e++;
                      break;
                    }
                  }
                  if (tree.e > 0) {
                    tree.score = tree.n * tree.s * tree.w * tree.e;
                    maxScore = Math.max(maxScore, tree.score);
                  }
                }
              }
            }
          }
        }
        console.log(forest);
        return maxScore;
      }
    },
    day9: {
      part1: (data) => {
        const DIR = {
          U: { ax: 'y', inc: 1 },
          D: { ax: 'y', inc: -1 },
          R: { ax: 'x', inc: 1 },
          L: { ax: 'x', inc: -1 }
        };
        const motions = data.trim().split('\n').map(motion => motion.split(' ')).map(motion => {
          const dir = DIR[motion[0]];
          return {
            ax: dir.ax,
            inc: dir.inc,
            val: +motion[1]
          };
        });
        const rope = {
          head: { y: 0, x: 0, history: [{ x: 0, y: 0 }] },
          tail: { y: 0, x: 0, history: [{ x: 0, y: 0 }] }
        };
        console.log(motions);

        const isNear = (h, t) => {
          return Math.abs(h.y - t.y) <= 1 && Math.abs(h.x - t.x) <= 1;
        };
        motions.forEach(motion => {
          for (let i = 0; i < motion.val; i++) {
            rope.head[motion.ax] += motion.inc;
            if (!isNear(rope.head, rope.tail)) {
              const previousHead = rope.head.history.slice(-1)[0];
              rope.tail.y = previousHead.y;
              rope.tail.x = previousHead.x;
            }
            rope.head.history.push({ y: rope.head.y, x: rope.head.x });
            rope.tail.history.push({ y: rope.tail.y, x: rope.tail.x });
          }
        });
        console.log(rope);

        const distinct = new Set(rope.tail.history.map(pos => pos.y + ',' + pos.x));
        console.log(distinct);
        return distinct.size;
      },
      part2: (data) => {
        const DIR = {
          U: { ax: 'y', inc: 1 },
          D: { ax: 'y', inc: -1 },
          R: { ax: 'x', inc: 1 },
          L: { ax: 'x', inc: -1 }
        };
        const motions = data.trim().split('\n').map(motion => motion.split(' ')).map(motion => {
          const dir = DIR[motion[0]];
          return {
            ax: dir.ax,
            inc: dir.inc,
            val: +motion[1]
          };
        });
        const rope = [];
        const length = 10;
        for (let i = 0; i < length; i++) {
          rope.push({ y: 0, x: 0, history: [{ x: 0, y: 0 }] });
        }
        console.log(motions);

        const isNear = (h, t) => {
          return Math.abs(h.y - t.y) <= 1 && Math.abs(h.x - t.x) <= 1;
        };

        const show = () => {
          const limits = rope.reduce((values, knot) => {
            values.minY = Math.min(values.minY, knot.y);
            values.maxY = Math.max(values.maxY, knot.y);
            values.minX = Math.min(values.minX, knot.x);
            values.maxX = Math.max(values.maxX, knot.x);
            return values;
          }, {
            minY: 0,
            maxY: 1,
            minX: 0,
            maxX: 1
          });
          const points = rope.reduceRight((values, knot, i) => {
            values[knot.y + ',' + knot.x] = (i > 0) ? i : 'H';
            return values;
          }, {});
          let plot = '';
          for (let y = limits.maxY + 1; y >= limits.minY - 1; y--) {
            for (let x = limits.minX - 1; x <= limits.maxX + 1; x++) {
              if (points[y + ',' + x]) {
                plot += points[y + ',' + x];
              } else {
                plot += '.';
              }
            }
            plot += '\n';
          }
          return plot;
        };

        motions.forEach(motion => {
          for (let i = 0; i < motion.val; i++) {
            rope[0][motion.ax] += motion.inc;
            rope[0].history.push({ y: rope[0].y, x: rope[0].x });
            for (let k = 1; k < length; k++) {
              const prev = rope[k - 1];
              const knot = rope[k];
              // console.log('k' + k + isNear(prev, knot), 'prev', prev, 'knot', knot);
              if (!isNear(prev, knot)) {
                // if in row/col, move directly, else move diagonally
                if (prev.y === knot.y) {
                  knot.x += (prev.x > knot.x) ? 1 : -1;
                } else if (prev.x === knot.x) {
                  knot.y += (prev.y > knot.y) ? 1 : -1;
                } else {
                  // diagonal
                  const dx = prev.x - knot.x;
                  const dy = prev.y - knot.y;
                  knot.x += (dx > 0) ? 1 : -1;
                  knot.y += (dy > 0) ? 1 : -1;
                }
              }
              knot.history.push({ y: knot.y, x: knot.x });
            }
            // console.log(show());
          }
          // console.log(show());
        });
        console.log(rope);
        console.log(show());

        const distinct = new Set(rope.slice(-1)[0].history.map(pos => pos.y + ',' + pos.x));
        console.log(distinct);
        return distinct.size;
      }
    },
    day10: {
      part1: (data) => {
        const signals = [20, 60, 100, 140, 180, 220];
        const cmds = data.trim().split('\n').map(cmd => {
          const params = cmd.split(' ');
          return {
            cmd: params[0],
            val: (params.length > 1) ? +params[1] : null
          };
        });
        let x = 1;
        let c = 1;
        const results = [];
        cmds.forEach(cmd => {
          if (signals.includes(c)) {
            results.push(c * x);
            console.log(c, x);
          }
          if (cmd.cmd === 'addx') {
            c++;
            if (signals.includes(c)) {
              results.push(c * x);
              console.log(c, x, cmd.val);
            }
            x += cmd.val;
            console.log(c, x, cmd.val);
          }
          c++;
        });
        console.log(results);
        return results.reduce((a, b) => a + b, 0);
      },
      part2: (data) => {
        const cmds = data.trim().split('\n').map(cmd => {
          const params = cmd.split(' ');
          return {
            cmd: params[0],
            val: (params.length > 1) ? +params[1] : null
          };
        });
        let x = 1;
        let c = 1;
        const results = [];
        cmds.forEach(cmd => {
          results.push((Math.abs(x + 1 - c % 40) <= 1) ? '#' : '.');
          if (cmd.cmd === 'addx') {
            c++;
            results.push((Math.abs(x + 1 - c % 40) <= 1) ? '#' : '.');
            x += cmd.val;
          }
          c++;
        });
        const output = results.reduce((crt, pixel, i) => {
          return crt + pixel + (((i + 1) % 40 === 0) ? '\n' : '');
        }, '');
        console.log(output);
        return 'look in console';
      }
    },
    day11: {
      part1: (data) => {
        const ops = {
          '+': (a, b) => a + b,
          '*': (a, b) => a * b,
          'o+': (a) => a + a,
          'o*': (a) => a * a
        };
        const monkeys = data.trim().split('\n\n').map(monkey => {
          const info = monkey.split('\n').map(item => item.split(':'));
          const start = info[1][1].split(',').map(num => +(num.trim()));
          const op = info[2][1].split('=').map(val => val.trim().split(' '))[1].slice(-2);
          const div = +info[3][1].split(' ').slice(-1)[0];
          const t = +info[4][1].split(' ').slice(-1)[0];
          const f = +info[5][1].split(' ').slice(-1)[0];
          const m = { start, div, t, f };
          console.log(op);
          if (op[1] === 'old') {
            m.op = ops['o' + op[0]];
            m.opval = 0;
          } else {
            m.op = ops[op[0]];
            m.opval = +op[1];
          }
          return m;
        });
        const inspected = new Array(monkeys.length).fill(0);
        const rounds = 20;
        console.log(monkeys, inspected, rounds);
        for (let r = 0; r < rounds; r++) {
          monkeys.forEach((monkey, i) => {
            const q = monkey.start.slice();
            monkey.start = [];
            q.forEach(item => {
              const v = Math.floor(monkey.op(item, monkey.opval) / 3);
              if (v % monkey.div === 0) {
                monkeys[monkey.t].start.push(v);
              } else {
                monkeys[monkey.f].start.push(v);
              }
              inspected[i]++;
            });
          });
        }
        console.log(monkeys, inspected);
        const active2 = inspected.sort((a, b) => a - b).slice(-2);
        return active2[0] * active2[1];
      },
      part2: (data) => {
        const ops = {
          '+': (a, b) => a + b,
          '*': (a, b) => a * b,
          'o+': (a) => a + a,
          'o*': (a) => a * a
        };
        const gcd = (a, b) => !b ? a : gcd(b, a % b);
        const lcm = (a, b) => (a * b) / gcd(a, b);
        const divs = [];
        const monkeys = data.trim().split('\n\n').map(monkey => {
          const info = monkey.split('\n').map(item => item.split(':'));
          const start = info[1][1].split(',').map(num => BigInt(num.trim()));
          const op = info[2][1].split('=').map(val => val.trim().split(' '))[1].slice(-2);
          const div = info[3][1].split(' ').slice(-1)[0];
          divs.push(div);
          const t = +info[4][1].split(' ').slice(-1)[0];
          const f = +info[5][1].split(' ').slice(-1)[0];
          const m = { start, div: BigInt(div), t, f };
          if (op[1] === 'old') {
            m.op = ops['o' + op[0]];
            m.opval = 0;
          } else {
            m.op = ops[op[0]];
            m.opval = BigInt(op[1]);
          }
          return m;
        });
        console.log(divs);
        const least = BigInt(divs.reduce((multiple, factor) => lcm(multiple, factor), Math.min(...divs)));
        console.log(least);
        const inspected = new Array(monkeys.length).fill(0);
        const rounds = 10000;
        const bigZero = BigInt(0);
        for (let r = 0; r < rounds; r++) {
          monkeys.forEach((monkey, i) => {
            const q = monkey.start.slice();
            monkey.start = [];
            q.forEach(item => {
              let v = monkey.op(item, monkey.opval);
              v = v % least;
              if (v % monkey.div === bigZero) {
                monkeys[monkey.t].start.push(v);
              } else {
                monkeys[monkey.f].start.push(v);
              }
              inspected[i]++;
            });
          });
        }
        console.log(monkeys, inspected);
        const active2 = inspected.sort((a, b) => a - b).slice(-2);
        return active2[0] * active2[1];
      }
    },
    day12: {
      part1: (data) => {
        const start = { y: -1, x: -1, z: 0 };
        const end = { y: -1, x: -1, z: 25 };
        let k = 0;
        const map = data.trim().split('\n').map((row, y) => row.split('').map((cell, x) => {
          let z = -1;
          if (cell === 'S') {
            start.k = k;
            start.y = y;
            start.x = x;
            z = start.z;
          } else if (cell === 'E') {
            end.k = k;
            end.y = y;
            end.x = x;
            z = end.z;
          } else {
            z = cell.charCodeAt(0) - 97;
          }
          return { k: k++, y, x, z };
        }));
        console.log(start, end, map);
        const maxY = map.length - 1;
        const maxX = map[0].length - 1;
        const nodes = map.reduce((acc, row, y) => {
          row.forEach((n, x) => {
            const c = [];
            const loY = Math.max(y - 1, 0);
            const hiY = Math.min(y + 1, maxY);
            const loX = Math.max(x - 1, 0);
            const hiX = Math.min(x + 1, maxX);
            const maxN = n.z + 1;
            for (let yy = loY; yy <= hiY; yy++) {
              if (yy !== y && map[yy][x].z <= maxN) {
                c.push(map[yy][x].k);
              }
            }
            for (let xx = loX; xx <= hiX; xx++) {
              if (xx !== x && map[y][xx].z <= maxN) {
                c.push(map[y][xx].k);
              }
            }
            n.c = c;
            acc[n.k] = n;
          });
          return acc;
        }, {});
        console.log(nodes);
        const q = [start.k];
        const v = [start.k];
        const pre = {};
        let tail = 0;
        let safety = 10000;
        while (tail < q.length && safety--) {
          let u = q[tail++];
          // console.log('u', u);
          const neighbors = nodes[u].c;
          for (let i = 0; i < neighbors.length; ++i) {
            const visit = neighbors[i];
            if (v.includes(visit)) {
              continue;
            }
            v.push(visit);
            if (visit === end.k) {
              const path = [visit];
              while (u !== start.k) {
                path.push(u);
                u = pre[u];
              }
              return path.length;
            }
            pre[visit] = u;
            q.push(visit);
          }
        }
      },
      part2: (data) => {
        const starts = [];
        const end = { y: -1, x: -1, z: 25 };
        let k = 0;
        const map = data.trim().split('\n').map((row, y) => row.split('').map((cell, x) => {
          let z = -1;
          if (cell === 'S') {
            z = 0;
          } else if (cell === 'E') {
            end.k = k;
            end.y = y;
            end.x = x;
            z = end.z;
          } else {
            z = cell.charCodeAt(0) - 97;
          }
          if (z === 0) {
            starts.push(k);
          }
          return { k: k++, y, x, z };
        }));
        console.log(starts, end, map);
        const maxY = map.length - 1;
        const maxX = map[0].length - 1;
        const nodes = map.reduce((acc, row, y) => {
          row.forEach((n, x) => {
            const c = [];
            const loY = Math.max(y - 1, 0);
            const hiY = Math.min(y + 1, maxY);
            const loX = Math.max(x - 1, 0);
            const hiX = Math.min(x + 1, maxX);
            const maxN = n.z + 1;
            for (let yy = loY; yy <= hiY; yy++) {
              if (yy !== y && map[yy][x].z <= maxN && map[yy][x].z > 0) {
                c.push(map[yy][x].k);
              }
            }
            for (let xx = loX; xx <= hiX; xx++) {
              if (xx !== x && map[y][xx].z <= maxN && map[y][xx].z > 0) {
                c.push(map[y][xx].k);
              }
            }
            n.c = c;
            acc[n.k] = n;
          });
          return acc;
        }, {});
        console.log(nodes);
        let shortest = Infinity;
        starts.forEach(start => {
          const q = [start];
          const v = [start];
          const pre = {};
          let tail = 0;
          let safety = 10000;
          while (tail < q.length) {
            let u = q[tail++];
            // console.log('u', u);
            const neighbors = nodes[u].c;
            for (let i = 0; i < neighbors.length; ++i) {
              const visit = neighbors[i];
              if (v.includes(visit)) {
                continue;
              }
              v.push(visit);
              if (visit === end.k) {
                const path = [visit];
                while (u !== start) {
                  path.push(u);
                  u = pre[u];
                }
                shortest = Math.min(shortest, path.length);
              }
              pre[visit] = u;
              q.push(visit);
            }
            if (safety-- <= 0) {
              tail = q.length + 1;
              console.warn('safety');
            }
          }
        });
        // 457 too high
        return shortest;
      }
    },
    day13: {
      part1: (data) => {
        const packets = data.trim().split('\n\n').map(group => group.split('\n').map(pack => JSON.parse(pack)));
        console.log(packets);
        const compare = (left, right) => {
          for (let i = 0; i < left.length; i++) {
            const l = left[i];
            const r = right[i];
            if (typeof r === 'undefined') {
              return -1;
            }
            const isLNum = typeof l === 'number';
            const isRNum = typeof r === 'number';
            if (isLNum && isRNum) {
              if (l < r) {
                return 1;
              } else if (l > r) {
                return -1;
              }
            } else {
              let al = l;
              if (isLNum) {
                al = [l];
              }
              let ar = r;
              if (isRNum) {
                ar = [r];
              }
              const nest = compare(al, ar);
              if (nest !== 0) {
                return nest;
              }
            }
          }
          if (left.length < right.length) {
            return 1;
          }
          return 0;
        };
        const good = [];
        const bad = [];
        packets.forEach((pair, i) => {
          const left = pair[0];
          const right = pair[1];
          const order = compare(left, right);
          if (order > 0) {
            good.push(i + 1);
          } else if (order < 0) {
            bad.push(i + 1);
          }
        });
        console.log(good, bad);
        return good.reduce((sum, index) => sum + index, 0);
      },
      part2: (data) => {
        const packets = data.trim().replace(/\n\n/g, '\n').split('\n').map(pack => JSON.parse(pack));
        const divider1 = [[2]];
        const divider2 = [[6]];
        packets.push(divider1);
        packets.push(divider2);
        console.log(packets);
        const compare = (left, right) => {
          for (let i = 0; i < left.length; i++) {
            const l = left[i];
            const r = right[i];
            if (typeof r === 'undefined') {
              return -1;
            }
            const isLNum = typeof l === 'number';
            const isRNum = typeof r === 'number';
            if (isLNum && isRNum) {
              if (l < r) {
                return 1;
              } else if (l > r) {
                return -1;
              }
            } else {
              let al = l;
              if (isLNum) {
                al = [l];
              }
              let ar = r;
              if (isRNum) {
                ar = [r];
              }
              const nest = compare(al, ar);
              if (nest !== 0) {
                return nest;
              }
            }
          }
          if (left.length < right.length) {
            return 1;
          }
          return 0;
        };
        const sorted = packets.sort(compare).reverse();
        console.log(sorted);
        const stringed = sorted.map(arr => JSON.stringify(arr));
        console.log(stringed);
        const key1 = stringed.indexOf(JSON.stringify(divider1)) + 1;
        const key2 = stringed.indexOf(JSON.stringify(divider2)) + 1;
        console.log(key1, key2);
        return key1 * key2;
      }
    },
    day14: {
      part1: (data) => {
        const source = { x: 500, y: 0 };
        const rock = data.trim().split('\n').map(row => row.split(' -> ').map(cell => {
          const solid = cell.split(',');
          return {
            x: +solid[0],
            y: +solid[1]
          };
        }));
        console.log(rock);
        const graph = [];
        rock.forEach(points => {
          for (let i = 1; i < points.length; i++) {
            const a = points[i - 1];
            const b = points[i];
            const axis = ((a.y - b.y) === 0) ? 'x' : 'y';
            const stable = (axis === 'x') ? 'y' : 'x';
            for (let p = Math.min(a[axis], b[axis]); p <= Math.max(a[axis], b[axis]); p++) {
              const point = {};
              point[stable] = a[stable];
              point[axis] = p;
              if (!graph.some(g => g.y === point.y && g.x === point.x)) {
                graph.push(point);
              }
            }
          }
        });
        console.log(graph);
        const range = graph.reduce((r, p) => {
          ['min', 'max'].forEach(m => ['x', 'y'].forEach(d => {
            r[m][d] = Math[m](r[m][d], p[d]);
          }));
          return r;
        }, {
          min: {
            x: source.x,
            y: source.y
          },
          max: {
            x: source.x,
            y: source.y
          }
        });
        console.log(range);
        const sand = [];
        let prevSand = -1;
        let newSand = 0;
        const inRange = (g) => {
          const inX = range.min.x <= g.x && g.x <= range.max.x;
          const inY = range.min.y <= g.y && g.y <= range.max.y;
          return inX && inY;
        };
        const fall = (g) => {
          const possible = [
            { x: g.x, y: g.y + 1 },
            { x: g.x - 1, y: g.y + 1 },
            { x: g.x + 1, y: g.y + 1 }
          ];
          possible.forEach(pg => {
            pg.inRange = inRange(pg);
            pg.rockExist = graph.some(r => r.x === pg.x && r.y === pg.y);
            pg.sandExist = sand.some(s => s.x === pg.x && s.y === pg.y);
          });
          if (possible.every(p => !p.inRange)) {
            // fell out
            return null;
          }
          const newPoint = possible.find(pg => !pg.rockExist && !pg.sandExist);
          if (typeof newPoint === 'undefined') {
            // g hit bottom
            return g;
          } else {
            // keep falling
            return fall(newPoint);
          }
        };
        let safety = 1000;
        while (newSand !== prevSand && safety--) {
          prevSand = sand.length;
          const grain = { x: source.x, y: source.y };
          const fallen = fall(grain);
          if (fallen !== null) {
            sand.push(fallen);
          }
          newSand = sand.length;
        }
        if (safety <= 0) {
          console.warn('safety hit');
        }
        console.log(sand);
        return sand.length;
      },
      part2: (data) => {
        const source = { x: 500, y: 0 };
        const rock = data.trim().split('\n').map(row => row.split(' -> ').map(cell => {
          const solid = cell.split(',');
          return {
            x: +solid[0],
            y: +solid[1]
          };
        }));
        console.log(rock);
        const graph = [];
        rock.forEach(points => {
          for (let i = 1; i < points.length; i++) {
            const a = points[i - 1];
            const b = points[i];
            const axis = ((a.y - b.y) === 0) ? 'x' : 'y';
            const stable = (axis === 'x') ? 'y' : 'x';
            for (let p = Math.min(a[axis], b[axis]); p <= Math.max(a[axis], b[axis]); p++) {
              const point = {};
              point[stable] = a[stable];
              point[axis] = p;
              if (!graph.some(g => g.y === point.y && g.x === point.x)) {
                graph.push(point);
              }
            }
          }
        });
        console.log(graph);
        const maxY = graph.reduce((y, p) => Math.max(y, p.y + 2), 0);
        console.log(maxY);
        const sand = [];
        let prevSand = -1;
        let newSand = 0;
        const fall = (g) => {
          const possible = [
            { x: g.x, y: g.y + 1 },
            { x: g.x - 1, y: g.y + 1 },
            { x: g.x + 1, y: g.y + 1 }
          ];
          const newPoint = possible.find(pg => !(pg.y >= maxY || graph.some(r => r.x === pg.x && r.y === pg.y)) && !sand.some(s => s.x === pg.x && s.y === pg.y));
          if (typeof newPoint === 'undefined') {
            // g hit bottom
            return g;
          } else {
            // keep falling
            return fall(newPoint);
          }
        };
        let safety = 100000;
        while (newSand !== prevSand && safety--) {
          prevSand = sand.length;
          const grain = { x: source.x, y: source.y };
          const fallen = fall(grain);
          if (fallen !== null && !(fallen.x === source.x && fallen.y === source.y)) {
            sand.push(fallen);
          }
          newSand = sand.length;
        }
        if (safety <= 0) {
          console.warn('safety hit');
        }
        console.log(sand);
        return sand.length + 1;
      }
    },
    day15: {
      part1: (data) => {
        //const target = 10;
        const target = 2000000;
        /*
        const limits = {
          minY: Infinity,
          minX: Infinity,
          maxY: 0,
          maxX: 0
        };
        */
        const points = data.trim().split('\n').map(line => line.split(':').map(half => half.match(/x=(-?\d+), y=(-?\d+)/).slice(-2).map(Number))).reduce((arr, sb) => {
          const s = { c: 'S', x: sb[0][0], y: sb[0][1] };
          const b = { c: 'B', x: sb[1][0], y: sb[1][1] };
          s.r = Math.abs(b.y - s.y) + Math.abs(b.x - s.x);
          s.hitRow = (s.y + s.r) >= target && (s.y - s.r) <= target;
          /*
          limits.minY = Math.min(limits.minY, points.s.y, points.b.y);
          limits.maxY = Math.max(limits.maxY, points.s.y, points.b.y);
          limits.minX = Math.min(limits.minX, points.s.x, points.b.x);
          limits.maxX = Math.max(limits.maxX, points.s.x, points.b.x);
          */
          
          arr.push(s, b);
          return arr;
        }, []);
        points.sort((a, b) => a.x - b.x).sort((a, b) => a.y - b.y);
        console.log(points);
        // count up until no change
        const targetRow = {};
        const pointsOnRow = points.filter(p => p.y === target);
        pointsOnRow.forEach(point => {
          if (!targetRow[point.x]) {
            targetRow[point.x] = point.c;
          }
        });
        console.log(targetRow);
        //let lastLen = 0;
        //do {} while (lastLen <= targetRow.length);
        const signalReach = points.filter(p => p.c === 'S' && p.hitRow)
        console.log(signalReach);
        let targetCount = 0;
        signalReach.forEach(point => {
          const xr = point.r - Math.abs(target - point.y);
          //console.log(point, xr);
          for (let x = point.x - xr; x <= point.x + xr; x++) {
            if (!targetRow[x]) {
              targetRow[x] = '#';
              targetCount++;
            }
          }
        });
        // 5589545 is too high
        return targetCount;
        /*
        limits.oy = 0 - limits.minY;
        limits.ox = 0 - limits.minX;
        const grid = [];
        for (let y = limits.minY; y <= limits.maxY; y++) {
          const row = new Array(limits.maxX - limits.minX + 1).fill('.');
          grid.push(row);
        }
        */
        //pairs.sort((a, b) => a.s.x - b.s.x).sort((a, b) => a.s.y - b.s.y);
        /*
        pairs.forEach(pair => {
          grid[pair.s.y + limits.oy][pair.s.x + limits.ox] = 'S';
          grid[pair.b.y + limits.oy][pair.b.x + limits.ox] = 'B';
          for (let y = Math.max(pair.s.y - pair.range + limits.oy, 0); y <= Math.min(pair.s.y + pair.range + limits.oy, grid.length - 1); y++) {
            const xr = pair.range - Math.abs(pair.s.y - y);
            for (let x = Math.max(pair.s.x - xr + limits.ox, 0); x <= Math.min(pair.s.x + xr + limits.ox, grid[0].length - 1); x++) {
              if (grid[y][x] === '.') {
                grid[y][x] = '#';
              }
            }
          }
        });
        */
        //console.log(pairs, limits);
        //let display = grid.map(row => row.join('')).join('\n');
        //console.log(display);
        //return grid[target + limits.oy].filter(c => c === '#').length;
      },
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
