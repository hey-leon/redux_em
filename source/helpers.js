

export const justFnNames =
  (ns, [ name, entity ]) => entity instanceof Function
    ? [ ...ns, name ]
    : ns


export const getPrefix =
  (ws, s=shortestWord(ws)) => s === ""
    ? throwError(Error, noPrefixError)
    : ws.every(w => w.indexOf(s) === 0)
      ? s
      : getPrefix(ws, s.slice(0, -1))


export const shortestWord =
  ws => ws.reduce(
    (sw, w) => sw && sw.length < w.length ? sw : w,
    null
  )


export const throwError =
  (E, message) => {
    throw new E(message)
  }


export const toUpper = i => i.toUpperCase()


export const toSnake =
  i => i.replace(
    /[A-Z]/g,
    ($1, offset) => offset
      ? `_${$1.toLowerCase()}`
      : $1.toLowerCase()
  )


export const noPrefixError = 'module has no prefix'
