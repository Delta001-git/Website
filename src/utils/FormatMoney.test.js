import {describe, expect, it} from 'vitest';
import { FormatMoney } from './formatMoney';

describe('Format Money',()=>{
    it('format 1999 to $19.99',()=>{
    expect(FormatMoney(1999)).toBe('$19.99');
});

it('formats 1090 to $10.90',()=>{
    expect(FormatMoney(1090)).toBe('$10.90');
})
})