import type Lenis from "lenis";

/**
 * Shared handle to the single global Lenis smooth-scroll instance created in
 * the root route. The locked horizontal section needs to freeze / resume the
 * page scroll while it steps through chapters, so it reaches the instance
 * through here instead of prop-drilling it down the tree.
 */
let _lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  _lenis = instance;
};

export const getLenis = (): Lenis | null => _lenis;
