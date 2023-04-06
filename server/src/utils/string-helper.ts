// Create function toTitleCase
export function toTitleCase(str: string): string {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1)).join(' ');
}