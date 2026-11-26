import { getCollection, getEntry } from 'astro:content';

export const isDraft = (v?: string) => !!v && v.trim().startsWith('[DRAFT');
/** UK number to an international tel: link, e.g. "07727 208418" -> "tel:+447727208418". */
export const telHref = (phone: string) => {
  const digits = phone.replace(/[^\d+]/g, '');
  return `tel:${digits.startsWith('+') ? digits : digits.startsWith('0') ? '+44' + digits.slice(1) : digits}`;
};
export const gbp = (n: number) => `£${n.toLocaleString('en-GB')}`;

/** The email address to publish, or '' if it has not been confirmed as working. */
export const publicEmail = (s: { email: string; emailVerified?: boolean }) => (s.emailVerified && !isDraft(s.email) ? s.email : '');
/** For legal pages: the verified email, or a draft marker that blocks a live build. */

export async function getSite() {
  const s = await getEntry('settings', 'main');
  if (!s) throw new Error('src/data/settings.yaml is missing the "main" entry');
  return s.data;
}
export async function getList<T extends 'packages' | 'care' | 'faqs' | 'portfolio' | 'testimonials'>(name: T) {
  return getCollection(name);
}
