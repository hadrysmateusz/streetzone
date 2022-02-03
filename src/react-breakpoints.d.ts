declare module "react-breakpoints" {
  export const withBreakpoints: <P = any>(
    C: React.ComponentType<P & { currentBreakpoint: number }>
  ) => React.ComponentType<P>
  declare const ReactBreakpoints: React.ComponentType<{
    breakpoints: Record<number,number>
    debounceResize: boolean
    debounceDelay: number
  }>
  export default ReactBreakpoints
}
