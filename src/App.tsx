import { useCallback, useEffect, useMemo, useState } from 'react';
import { categories } from './data/categories';
import { getPrompt } from './data/prompts';
import type { Prompt } from './types';
import { Navbar, Footer } from './components/SiteChrome';
import { PromptModal } from './components/PromptUI';
import { HomePage } from './pages/HomePage';
import { PromptsPage } from './pages/PromptsPage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import './styles/global.css';

function routeFromLocation() { return window.location.pathname.replace(/\/$/, '') || '/'; }

export default function App() {
  const [path, setPath] = useState(routeFromLocation);
  const [activePrompt, setActivePrompt] = useState<Prompt | null>(null);
  const navigate = useCallback((nextPath: string) => { window.history.pushState({}, '', nextPath); setPath(nextPath); window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  useEffect(() => { const onPop = () => setPath(routeFromLocation()); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  useEffect(() => { const title = path === '/' ? 'FLUNG — AI Tools, Creative Workflows & Prompt Library' : `FLUNG — ${path.replace('/', '').replace(/-/g, ' ').toUpperCase()}`; document.title = title; }, [path]);
  const categorySlug = useMemo(() => path.startsWith('/prompts/') ? path.split('/')[2] : '', [path]);
  const category = activePrompt ? categories.find((item) => item.id === activePrompt.categoryId) : undefined;
  const page = path === '/' ? <HomePage navigate={navigate} onOpenPrompt={setActivePrompt} /> : path === '/prompts' ? <PromptsPage navigate={navigate} onOpenPrompt={setActivePrompt} /> : path === '/about' ? <AboutPage navigate={navigate} /> : path.startsWith('/prompts/') ? <CategoryPage slug={categorySlug} navigate={navigate} onOpenPrompt={setActivePrompt} /> : <main className="not-found page-section"><span className="eyebrow">404 / PAGE NOT FOUND</span><h1>Nothing here<br /><em>yet.</em></h1><button className="button button-dark" onClick={() => navigate('/')}>BACK HOME</button></main>;
  return <><Navbar navigate={navigate} currentPath={path} />{page}<Footer navigate={navigate} />{activePrompt && category && <PromptModal prompt={activePrompt} category={category} onClose={() => setActivePrompt(null)} />}</>;
}
