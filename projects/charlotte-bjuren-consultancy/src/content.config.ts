import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const settings = defineCollection({
  loader: file('src/data/settings.yaml'),
  schema: z.object({
    name: z.string(), descriptor: z.string(), location: z.string(), areas: z.string(),
    email: z.string(), emailVerified: z.boolean().optional().default(false), phone: z.string().optional().default(''), bookingUrl: z.string(),
    address: z.string(), headshot: z.string().optional().default(''), hours: z.string(), linkedin: z.string().optional().default(''),
  }),
});
const packages = defineCollection({
  loader: file('src/data/packages.yaml'),
  schema: z.object({
    name: z.string(), price: z.number(), introPrice: z.number().optional(), featured: z.boolean().optional(),
    summary: z.string(), bestFor: z.string(), delivery: z.string(), features: z.array(z.string()),
  }),
});
const care = defineCollection({
  loader: file('src/data/care.yaml'),
  schema: z.object({ name: z.string(), price: z.number(), features: z.array(z.string()) }),
});
const faqs = defineCollection({
  loader: file('src/data/faqs.yaml'),
  schema: z.object({ q: z.string(), a: z.string(), home: z.boolean().optional() }),
});
const portfolio = defineCollection({
  loader: file('src/data/portfolio.yaml'),
  schema: z.object({
    demo: z.boolean(), name: z.string(), sector: z.string(), summary: z.string(), url: z.string(),
    goal: z.string(), features: z.array(z.string()), colours: z.array(z.string()),
  }),
});
const testimonials = defineCollection({
  loader: file('src/data/testimonials.yaml'),
  schema: z.object({ quote: z.string(), name: z.string(), business: z.string() }),
});

export const collections = { settings, packages, care, faqs, portfolio, testimonials };
