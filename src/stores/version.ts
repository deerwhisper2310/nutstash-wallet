import { readable } from 'svelte/store';

const version = readable<string>('0.2.6');

export { version };
