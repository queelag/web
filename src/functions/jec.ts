/**
 * The `jec` function stands for `join element classes`.
 * It filters out falsy values and joins the remaining ones with a space.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/web/functions/jec)
 */
export function jec(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}
