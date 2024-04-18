export const common = {
  ascii_to_hex(str: string) {
    const arr1 = [] as any
    for (let n = 0, l = str.length; n < l; n++) {
      const hex = Number(str.charCodeAt(n)).toString(16)
      arr1.push(hex)
    }
    return arr1.join('')
  },

  hex_to_ascii(str: string) {
    const output = Buffer.from(str, 'hex')
    return output.toString()
  },

  buffer_to_hex(bf: Buffer) {
    const hex = [] as Array<string>
    for (const b of bf) {
      const h = Buffer.from([b]).toString('hex')
      hex.push(h)
    }
    return hex.join('')
  }
}

export default common
