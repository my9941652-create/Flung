import { useEffect, useState } from 'react';
import type { Category, Prompt } from '../types';
import { downloadPromptPdf } from '../utils/pdf';

export function ImagePlaceholder({ label = 'IMAGE PREVIEW', accent = '#9b2c2c', className = '' }: { label?: string; accent?: string; className?: string }) {
  return <div className={`image-placeholder ${className}`} style={{ '--accent': accent } as React.CSSProperties} aria-label={label} role="img"><span className="placeholder-grid" /><strong>{label}</strong><i>FLUNG / PREVIEW</i></div>;
}

export function PromptCard({ prompt, category, onOpen, onCategory }: { prompt: Prompt; category: Category; onOpen: (prompt: Prompt) => void; onCategory?: (category: Category) => void }) {
  return <article className="prompt-card">
    <button className="prompt-card-image" onClick={() => onOpen(prompt)} aria-label={`Preview ${prompt.title}`}><ImagePlaceholder accent={category.colorAccent} /></button>
    <div className="prompt-card-body">
      <div className="card-meta"><button className="category-link" onClick={() => onCategory?.(category)}>{category.title}</button><span>PROMPT {prompt.number}</span></div>
      <h3>{prompt.title}</h3>
      <p>{prompt.description}</p>
      <div className="tag-row">{prompt.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <button className="text-link" onClick={() => onOpen(prompt)}>VIEW PROMPT <span>↗</span></button>
    </div>
  </article>;
}

export function CategoryCard({ category, count, onOpen }: { category: Category; count: number; onOpen: (category: Category) => void }) {
  return <button className="category-card" onClick={() => onOpen(category)} style={{ '--accent': category.colorAccent } as React.CSSProperties}>
    <div className="category-card-top"><span>{category.number}</span><span className="category-arrow">↗</span></div>
    <ImagePlaceholder label="CATEGORY PREVIEW" accent={category.colorAccent} className="category-image" />
    <div className="category-card-bottom"><h3>{category.title}</h3><p>{category.description}</p><span className="prompt-count">{count} PROMPTS</span></div>
  </button>;
}

export function PromptAccordion({ prompt }: { prompt: Prompt }) {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const toggle = (id: string) => setOpenSections((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  return <div className="accordion">
    {prompt.sections.map((section) => { const isOpen = openSections.includes(section.id); return <div className={`accordion-item ${isOpen ? 'open' : ''}`} key={section.id}>
      <button onClick={() => toggle(section.id)} aria-expanded={isOpen}><span className="accordion-number">{section.number}</span><strong>{section.title}</strong><span className="accordion-plus">{isOpen ? '−' : '+'}</span></button>
      <div className="accordion-content"><p>{section.content}</p></div>
    </div>; })}
    {prompt.negativePrompt && <div className="negative-prompt"><span className="eyebrow">NEGATIVE PROMPT</span><p>{prompt.negativePrompt}</p></div>}
  </div>;
}

const fullPrompt = (prompt: Prompt) => [prompt.title, ...prompt.sections.map((section) => `${section.number} — ${section.title}\n${section.content}`), prompt.negativePrompt ? `NEGATIVE PROMPT\n${prompt.negativePrompt}` : ''].filter(Boolean).join('\n\n');

export function PromptModal({ prompt, category, onClose }: { prompt: Prompt; category: Category; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); }; document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; }; }, [onClose]);
  const copy = async () => { try { await navigator.clipboard.writeText(fullPrompt(prompt)); setCopied(true); setError(''); window.setTimeout(() => setCopied(false), 1800); } catch { setError('Copy was blocked by the browser. Select the prompt text manually.'); } };
  const download = async () => { try { await downloadPromptPdf(prompt, category); setError(''); } catch { setError('The PDF could not be generated. Please try again.'); } };
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="prompt-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-head"><div><span className="eyebrow">{category.title} / PROMPT {prompt.number}</span><h2 id="modal-title">{prompt.title}</h2></div><button className="close-button" onClick={onClose} aria-label="Close prompt preview">×</button></div>
      <div className="modal-body"><div className="modal-visual"><ImagePlaceholder accent={category.colorAccent} /><div className="tag-row">{prompt.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="modal-copy"><p className="modal-description">{prompt.description}</p><PromptAccordion prompt={prompt} /></div></div>
      <div className="modal-foot"><div>{error && <p className="error-text">{error}</p>}</div><div className="modal-actions"><button className="button button-light" onClick={copy}>{copied ? 'COPIED ✓' : 'COPY PROMPT'}</button><button className="button button-red" onClick={download}>DOWNLOAD PDF <span>↗</span></button></div></div>
    </section>
  </div>;
}

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <label className="search-bar"><span>⌕</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder="SEARCH PROMPTS..." aria-label="Search prompts" />{value && <button type="button" onClick={() => onChange('')} aria-label="Clear search">×</button>}</label>;
}
