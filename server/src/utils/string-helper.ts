// Create function toTitleCase
export function toTitleCase(str: string): string {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1)).join(' ');
}

// Create function bytesToText (KB, MB, GB, TB, etc.)
export function bytesToText(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log2(bytes) / 10);
    return `${(bytes / (1 << (i * 10))).toFixed(2)} ${sizes[i]}`;
}