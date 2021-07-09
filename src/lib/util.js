import dayjs from 'dayjs'
import 'dayjs/locale/th'

export default {
  arrayToPack,
  packToArray,
  formatNumber,
  parseDate,
  formatDate,
  parseDateTime,
  parseTime,
  parseDuration,
  genMap,
  genListMap,
  parseJson,
}

function arrayToPack(rows) {
  if (rows.length === 0) {
    return {c: [], d: []}
  }
  let c = Object.keys(rows[0])
  let d = rows.map(row => c.map(col => row[col]))
  return {c, d}
}

function packToArray(obj) {
  if (!obj || !obj.c || !obj.d) {
    return []
  }
  return obj.d.map(row => obj.c.reduce((prev, c, i) => {
    prev[c] = row[i]
    return prev
  }, {}))
}

function formatNumber(n, digit = 0) {
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: digit, maximumFractionDigits: digit })
}

const monthLookup = {
  JAN: 1,
  FEB: 2,
  MAR: 3,
  APR: 4,
  MAY: 5,
  JUN: 6,
  JUL: 7,
  AUG: 8,
  SEP: 9,
  OCT: 10,
  NOV: 11,
  DEC: 12,
}

function parseDate(s, en = false) {
  if (!s || typeof s !== 'string') {
    return ''
  }
  let today = dayjs()
  let y = today.year()
  let m = today.month()
  let d = today.date()

  let tmp = s.split(/[/-]/)

  if (tmp.length > 1) {
    let n1 = parseInt(tmp[0])
    let n2 = parseInt(tmp[1])

    if (isNaN(n2)) {
      n2 = monthLookup[tmp[1].toUpperCase()]
      if (!n2) {
        return ''
      }
    } else if (n2 > 12) {
      // invalid month
      return ''
    }
    m = n2 - 1

    if (n1 > 31) {
      // n1 shoud be year
      if (tmp[0].length === 4) {
        if (n1 > 2400 && n1 < 9000) {
          y = n1 - 543
        } else {
          y = n1
        }
      } else if (tmp[0].length === 2) {
        y = 2500 + n1 - 543
      // } else if (tmp[0].length === 0) {
      } else {
        return ''
      }

      if (tmp.length >= 3) {
        let n3 = parseInt(tmp[2])
        if (n3 < 31) {
          d = n3
        } else {
          return ''
        }
      }
    } else {
      d = n1
      if (tmp.length >= 3) {
        let n3 = parseInt(tmp[2])
        if (tmp[2].length === 4) {
          if (n3 > 2400 && n3 < 9000) {
            y = n3 - 543
          } else {
            y = n3
          }
        } else if (tmp[2].length === 2) {
          if (en) {
            y = 2000 + n3
          } else {
            y = 2500 + n3 - 543
          }
        // } else if (tmp[2].length === 0) {
        } else {
          return ''
        }
      }
    }
  } else {
    // ddmmyyyy only
    d = parseInt(s.substr(0, 2))

    if (s.length > 2) {
      m = parseInt(s.substr(2, 2)) - 1
    }

    if (s.length > 4) {
      let n3 = parseInt(s.substr(4))
      let n3String = n3.toString()

      if (n3String.length === 4) {
        if (n3 > 2400 && n3 < 9000) {
          y = n3 - 543
        } else {
          y = n3
        }
      } else if (n3String.length === 2) {
        if (en) {
          y = 2000 + n3
        } else {
          y = 2500 + n3 - 543
        }
      // } else if (n3String.length === 0) {
      } else {
        return ''
      }
    } // if (s.length > 4)
  } // else

  const newDate = dayjs(new Date(y, m, d))
  if (!newDate.isValid) {
    return ''
  }
  let _y = newDate.get('year')
  let _m = newDate.get('month')
  let _d = newDate.get('date')
  if (_y !== y || _m !== m || _d !== d) {
    return ''
  }
  return newDate.format('YYYY-MM-DD')
}

function parseDateTime(s) {
  let tmp = ('' + s).trim().split(/\s+/)
  if (tmp.length === 2) {
    return parseDate(tmp[0]) + ' ' + parseTime(tmp[1], 'HH:mm:ss')
  }
  if (/^[0-9]{10,}/.test(s)) {
    return parseDate(s.substr(0, 8)) + ' ' + parseTime(s.substr(8), 'HH:mm:ss')
  }
  return parseDate(s)
}

function formatDate(d, f, year) {
  let date = dayjs(d)
  let newFormat = year === 'be' ? f.replace('YYYY', 'BBBB').replace('YY', 'BB') : f
  let s = date.format(newFormat)
  let y = date.year()
  let thYear = y
  if (y < 9000) {
    thYear += 543
  }
  return s.replace(/B+/g, m => m.length >= 3 ? thYear : (thYear % 100)).toUpperCase()
}

function parseTime(t, format = 'HH:mm') {
  let s = '' + t
  let tmp = s.split(/[:.-]/)
  let hh = 0
  let mm = 0
  let ss = 0
  if (tmp.length === 1) {
    if (s.length <= 2) {
      hh = parseInt(s)
    } else if (s.length === 3) {
      hh = parseInt(s.substr(0, 1))
      mm = parseInt(s.substr(1, 2))
    } else if (s.length === 4) {
      hh = parseInt(s.substr(0, 2))
      mm = parseInt(s.substr(2, 2))
    } else if (s.length === 5) {
      hh = parseInt(s.substr(0, 1))
      mm = parseInt(s.substr(1, 2))
      ss = parseInt(s.substr(3, 2))
    } else if (s.length === 6) {
      hh = parseInt(s.substr(0, 2))
      mm = parseInt(s.substr(2, 2))
      ss = parseInt(s.substr(4, 2))
    }
  } else if (tmp.length <= 3) {
    hh = parseInt(tmp[0])
    mm = parseInt(tmp[1])
    if (tmp.length === 3) {
      ss = parseInt(tmp[2])
    }
  } else {
    return ''
  }

  if (isNaN(hh) || isNaN(mm) || isNaN(ss) || hh < 0 || hh > 23 || mm < 0 || mm > 59 || ss < 0 || ss > 59) {
    return ''
  }

  return format.replace('HH', ('' + hh).padStart(2, '0'))
    .replace('mm', ('' + mm).padStart(2, '0'))
    .replace('ss', ('' + ss).padStart(2, '0'))
}

function parseDuration(t, format = 'HH:mm:ss') {
  let s = '' + t
  let tmp = s.split(/[:.-]/)
  let hh = 0
  let mm = 0
  let ss = 0
  if (tmp.length === 1) {
    if (s.length <= 2) {
      mm = parseInt(s)
    } else if (s.length <= 4) {
      mm = parseInt(s.substr(0, s.length - 2))
      ss = parseInt(s.substr(-2))
    } else if (s.length <= 6) {
      hh = parseInt(s.substr(0, s.length - 4))
      mm = parseInt(s.substr(s.length - 4, 2))
      ss = parseInt(s.substr(-2))
    } else {
      return ''
    }
  } else if (tmp.length === 2) {
    mm = parseInt(tmp[0])
    ss = parseInt(tmp[1])
  } else if (tmp.length === 3) {
    hh = parseInt(tmp[0])
    mm = parseInt(tmp[1])
    ss = parseInt(tmp[2])
  }
  if (isNaN(hh) || isNaN(mm) || isNaN(ss) || hh < 0 || hh > 23 || mm < 0 || mm > 59 || ss < 0 || ss > 59) {
    return ''
  }
  return format.replace('HH', ('' + hh).padStart(2, '0'))
    .replace('mm', ('' + mm).padStart(2, '0'))
    .replace('ss', ('' + ss).padStart(2, '0'))
}

function genMap(list, key) {
  let map = new Map()
  for (let item of list) {
    map.set(item[key], item)
  }
  return map
}

function genListMap(list, key) {
  let map = new Map()
  for (let item of list) {
    let list = map.get(item[key])
    if (!list) {
      map.set(item[key], [item])
    } else {
      list.push(item)
    }
  }
  return map
}

function parseJson(s, def) {
  try {
    return JSON.parse(s)
  } catch (e) {
    return def
  }
}
