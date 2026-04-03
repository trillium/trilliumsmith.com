const { replace } = ''
const ca = /[&<>'"]/g
const esca: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}
const pe = (m: string) => esca[m]

export const escape = (es: string) => replace.call(es, ca, pe)
