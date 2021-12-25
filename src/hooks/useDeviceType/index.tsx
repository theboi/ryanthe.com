import { useMediaQuery } from "../useMediaQuery";

export const useMinWidth = (width?: number) => useMediaQuery(`(min-width: ${width ?? 768}px)`, true) // default desktop at 768px