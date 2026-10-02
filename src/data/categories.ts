import type { Category } from '../types';

export const categories: Category[] = [
  {
    id: '3d-cartoon', number: '01', slug: '3d-cartoon', title: '3D CARTOON',
    description: 'Cinematic 3D cartoon prompts for expressive worlds, characters and polished visual storytelling.', colorAccent: '#9b2c2c',
  },
  {
    id: 'history', number: '02', slug: 'history', title: 'HISTORY',
    description: 'Atmospheric historical scenes built with period detail, documentary texture and narrative scale.', colorAccent: '#667b5a',
  },
  {
    id: 'stick-man', number: '03', slug: 'stick-man', title: 'STICK MAN',
    description: 'Minimal character prompts that turn simple linework into clear, kinetic visual stories.', colorAccent: '#b27a41',
  },
  {
    id: 'vox-style', number: '04', slug: 'vox-style', title: 'VOX STYLE',
    description: 'Editorial explainer prompts for visual systems, maps, timelines and crisp information design.', colorAccent: '#456878',
  },
];

export const getCategory = (idOrSlug: string) => categories.find((category) => category.id === idOrSlug || category.slug === idOrSlug);
