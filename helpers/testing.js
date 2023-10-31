export const getPart = (element, partName = 'base') => {
    const host = element.shadowRoot || element;
    const part = host.querySelector(`[part="${partName}"]`);
    if (part === null) {
        throw new Error(`Part '${partName}' not found.`);
    }
    return part;
};
//# sourceMappingURL=testing.js.map