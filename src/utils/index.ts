export * from './env'
export * from './git'
export * from './object'
export * from './type'
export * from './format'
export * from './version'

export const symbols: SymbolsType = require('enquirer/lib/symbols')

export const timeMeasurement = (
  name: string | undefined,
  cacheObject: Record<string, any>
): string => {
  if (!name || !name.trim()) {
    return ''
  }
  let str = ''
  const sym: string = (Symbol.for(name) as unknown) as string
  if (cacheObject[sym]) {
    const diff = process.hrtime(cacheObject[sym])
    const ms = ((diff[0] * 1000 + diff[1] / 1000000).toFixed(0) as any) * 1
    str = ms < 1000 ? ms + 'ms' : ms / 1000 + 's'
    delete cacheObject[sym]
  } else {
    cacheObject[sym] = process.hrtime()
  }
  return str
}

export function applyMixins(
  derivedCtor: any,
  baseCtors: any[],
  exclude: string[] = ['constructor']
) {
  baseCtors.forEach(baseCtor => {
    const instance = baseCtor.prototype || baseCtor
    const propertyNames = Object.getOwnPropertyNames(instance).filter(
      (name: string) => !exclude.includes(name)
    )
    propertyNames.forEach(name => {
      if (exclude.includes(name)) return
      const propDesc = Object.getOwnPropertyDescriptor(instance, name) as
        | PropertyDescriptor
        | ThisType<any>
      Object.defineProperty(derivedCtor.prototype, name, propDesc)
    })
  })

  return derivedCtor
}

export function pathResolve(path: string, options: Record<string, any> = {}) {
  try {
    return require.resolve(path, options)
  } catch (e) {
    return ''
  }
}

interface SymbolsType {
  check: string
  cross: string
  info: string
  line: string
  pointer: string
  pointerSmall: string
  question: string
  warning: string
  upDownDoubleArrow: string
  upDownDoubleArrow2: string
  upDownArrow: string
  asterisk: string
  asterism: string
  bulletWhite: string
  electricArrow: string
  ellipsisLarge: string
  ellipsisSmall: string
  fullBlock: string
  identicalTo: string
  indicator: string
  leftAngle: string
  mark: string
  minus: string
  multiplication: string
  obelus: string
  percent: string
  pilcrow: string
  pilcrow2: string
  pencilUpRight: string
  pencilDownRight: string
  pencilRight: string
  plus: string
  plusMinus: string
  pointRight: string
  rightAngle: string
  section: string
  hexagon: { off: string; on: string; disabled: string }
  ballot: { on: string; off: string; disabled: string }
  stars: { on: string; off: string; disabled: string }
  folder: { on: string; off: string; disabled: string }
  prefix: {
    pending: string
    submitted: string
    cancelled: string
  }
  separator: {
    pending: string
    submitted: string
    cancelled: string
  }
  radio: {
    off: string
    on: string
    disabled: string
  }
  numbers: string[]
}
