interface schemaParts<R, E, C> {
  readonly: R
  editable: E
  calculated: C
}

export function combineSchema<R, E, C>(parts: schemaParts<R, E, C>): R & E & C {
  return {
    ...parts.readonly,
    ...parts.editable,
    ...parts.calculated,
  }
}

export function removeDuplicates<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

export function trimString(str: string): string {
  return str.trim()
}

export function ensurePositiveInt(num: number): number {
  return Math.max(0, num)
}
