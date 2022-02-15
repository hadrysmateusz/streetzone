import "styled-components/macro"
import { BREAKPOINTS } from "./constants"

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: typeof BREAKPOINTS
  }
}
