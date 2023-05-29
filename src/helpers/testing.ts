export const getPart = (element: Element, partName = 'base'): Element => {
  const host = element.shadowRoot || element
  const part = host.querySelector(`[part="${partName}"]`)

  if (part === null) {
    throw new Error(`Part '${partName}' not found.`)
  }

  return part
}
