import { useMemo, useState } from 'react';
import { categories, getCategory } from '../data/categories';
import { prompts } from '../data/prompts';
import type { Prompt } from '../types';
import { PromptCard, SearchBar } from '../components/PromptUI';
import { SectionMarker } from '../components/SiteChrome';

export function CategoryPage({ slug, navigate, onOpenPrompt }: { slug: string; navigate: (path: string) => void; onOpenPrompt: (prompt: Prompt) => void }) {
  const category = getCategory(slug);
  const [search, setSearch] = useState('');
  const visible = useMemo(() => prompts.filter((prompt) => prompt.categoryId === category?.id && `${prompt.title} ${prompt.description} ${prompt.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase().trim())), [category?.id, search]);
  if (!category) return <main className="not-found page-section"><SectionMarker>404 / CATEGORY NOT FOUND</SectionMarker><h1>That shelf<br /><em>is empty.</em></h1><button className="button button-dark" onClick={() => navigate('/prompts')}>BACK TO PROMPTS</button></main>;
  return <main className="category-page page-section"><button className="back-link" onClick={() => navigate('/prompts')}>← BACK TO PROMPTS</button><div className="category-head"><div><SectionMarker>CATEGORY {category.number} / {category.title}</SectionMarker><h1>{category.title}<em>.</em></h1><p>{category.description}</p></div><SearchBar value={search} onChange={setSearch} /></div><div className="category-rule"><span>{visible.length} PROMPTS</span><span>CURATED BY MAHENDRA YADAV</span></div><div className="prompt-grid library-grid">{visible.map((prompt) => <PromptCard key={prompt.id} prompt={prompt} category={category} onOpen={onOpenPrompt} onCategory={() => undefined} />)}</div>{visible.length === 0 && <div className="empty-state compact"><span className="eyebrow">NO PROMPTS FOUND</span><button className="button button-light" onClick={() => setSearch('')}>CLEAR SEARCH</button></div>}<div className="category-switcher"><span className="eyebrow">KEEP EXPLORING</span>{categories.filter((item) => item.id !== category.id).map((item) => <button key={item.id} onClick={() => navigate(`/prompts/${item.slug}`)}><span>{item.number}</span>{item.title}<b>↗</b></button>)}</div></main>;
}
