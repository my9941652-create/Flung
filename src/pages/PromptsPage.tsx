import { useMemo, useState } from 'react';
import { categories } from '../data/categories';
import { prompts } from '../data/prompts';
import type { Prompt } from '../types';
import { PromptCard, SearchBar } from '../components/PromptUI';
import { SectionMarker } from '../components/SiteChrome';

export function PromptsPage({ navigate, onOpenPrompt }: { navigate: (path: string) => void; onOpenPrompt: (prompt: Prompt) => void }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');
  const visible = useMemo(() => prompts.filter((prompt) => {
    const category = categories.find((item) => item.id === prompt.categoryId);
    const haystack = [prompt.title, prompt.description, category?.title, ...prompt.tags, ...prompt.sections.map((section) => section.content)].join(' ').toLowerCase();
    return (filter === 'ALL' || category?.title === filter) && haystack.includes(search.toLowerCase().trim());
  }), [filter, search]);
  return <main className="library-page page-section"><div className="library-page-head"><div><SectionMarker>FLUNG / ALL PROMPTS</SectionMarker><h1>A library for<br /><em>the next idea.</em></h1><p>Search the practical stuff: prompts for images, video, motion and visual storytelling.</p></div><SearchBar value={search} onChange={setSearch} /></div><div className="filter-row" role="group" aria-label="Filter prompts"><button className={filter === 'ALL' ? 'active' : ''} onClick={() => setFilter('ALL')}>ALL <span>{prompts.length}</span></button>{categories.map((category) => <button key={category.id} className={filter === category.title ? 'active' : ''} onClick={() => setFilter(category.title)}>{category.title} <span>{prompts.filter((prompt) => prompt.categoryId === category.id).length}</span></button>)}</div>{visible.length ? <div className="prompt-grid library-grid">{visible.map((prompt) => { const category = categories.find((item) => item.id === prompt.categoryId); return category ? <PromptCard key={prompt.id} prompt={prompt} category={category} onOpen={onOpenPrompt} onCategory={(item) => navigate(`/prompts/${item.slug}`)} /> : null; })}</div> : <div className="empty-state"><span className="eyebrow">NO PROMPTS FOUND</span><h2>Try a different<br /><em>starting point.</em></h2><button className="button button-dark" onClick={() => { setSearch(''); setFilter('ALL'); }}>CLEAR SEARCH</button></div>}</main>;
}
