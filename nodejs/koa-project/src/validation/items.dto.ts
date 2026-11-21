export function itemName(input: unknown) {
    if (typeof input === 'object' && input !== null && 'name' in input && typeof input.name === 'string') {
        return input.name.trim();
    }
    return '';
}
