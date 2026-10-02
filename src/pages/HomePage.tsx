import type { Category, Prompt } from '../types';
import { categories } from '../data/categories';
import { featuredPrompts, latestPrompts, prompts } from '../data/prompts';
import { CategoryCard, ImagePlaceholder, PromptCard } from '../components/PromptUI';
import { SectionMarker } from '../components/SiteChrome';

type Props = { navigate: (path: string) => void; onOpenPrompt: (prompt: Prompt) => void };

export function HomePage({ navigate, onOpenPrompt }: Props) {
  const profileImage = `${import.meta.env.BASE_URL}assets/profile.jpg`;
  const categoryCount = (category: Category) => prompts.filter((prompt) => prompt.categoryId === category.id).length;
  return <main>
    <section className="hero page-section">
      <div className="hero-copy"><SectionMarker>AI CREATOR · PROMPT LIBRARY</SectionMarker><h1>CREATE.<br /><span>TEACH.</span><br />INSPIRE.</h1><p className="hero-lede">AI tools, creative workflows<br />& prompts for modern creators.</p><p className="hero-description">I'm a content creator, video editor, 2D animator, graphic designer and motion graphics artist with 5+ years of experience. I share practical knowledge for people making things with intention.</p><div className="hero-actions"><button className="button button-red" onClick={() => navigate('/prompts')}>EXPLORE PROMPTS <span>↗</span></button><button className="button button-outline" onClick={() => navigate('/about')}>ABOUT FLUNG</button></div></div>
      <div className="hero-visual"><div className="hero-photo"><img src={profileImage} alt="Mahendra Yadav" onError={(event) => { event.currentTarget.style.display = 'none'; }} /><div className="hero-photo-fallback"><ImagePlaceholder label="CREATOR PORTRAIT" accent="#9b2c2c" /></div><span className="photo-caption">MAHENDRA YADAV / CREATOR</span></div><span className="hero-stamp stamp-one">5+<small>YEARS</small></span><span className="hero-stamp stamp-two">AI +<small>CONTENT</small></span><span className="hero-stamp stamp-three">VIDEO +<small>DESIGN</small></span></div>
    </section>

    <section className="intro-band page-section"><div className="intro-label"><SectionMarker>01 / MEET THE CREATOR</SectionMarker><span className="hand-note">practical over perfect.</span></div><div className="intro-content"><h2>Ideas are only<br /><em>the beginning.</em></h2><div className="intro-text"><p>I'm Mahendra Yadav — a creator working across video, motion, design and the new tools that make all three more expressive.</p><p>I built FLUNG to share the useful parts: the prompts, workflows and small techniques that help an idea leave your head and become something worth sharing.</p><button className="text-link" onClick={() => navigate('/about')}>MORE ABOUT MAHENDRA <span>↗</span></button></div></div></section>

    <section className="create-section page-section"><SectionMarker>02 / WHAT I CREATE</SectionMarker><div className="create-grid">{[['01', 'AI CONTENT', 'Ideas, images and videos made more intentional with AI.'], ['02', 'VIDEO EDITING', 'Rhythm, story and the tiny decisions that make a cut work.'], ['03', '2D ANIMATION', 'Simple movement, clear ideas and frames with a point of view.'], ['04', 'GRAPHIC DESIGN', 'Systems, type and visual decisions that hold together.'], ['05', 'MOTION GRAPHICS', 'Information with energy, built for eyes that are always moving.'], ['06', 'AI WORKFLOWS', 'Practical combinations of tools that save time without flattening the craft.']].map(([number, title, text]) => <div className="create-item" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><b>↗</b></div>)}</div></section>

    <section className="featured-section page-section"><div className="section-heading"><div><SectionMarker>03 / FEATURED PROMPTS</SectionMarker><h2>Start with a<br /><em>strong frame.</em></h2></div><button className="text-link" onClick={() => navigate('/prompts')}>VIEW ALL PROMPTS <span>↗</span></button></div><div className="prompt-grid featured-grid">{featuredPrompts.slice(0, 3).map((prompt) => { const category = categories.find((item) => item.id === prompt.categoryId); return category ? <PromptCard key={prompt.id} prompt={prompt} category={category} onOpen={onOpenPrompt} onCategory={(item) => navigate(`/prompts/${item.slug}`)} /> : null; })}</div></section>

    <section className="library-section page-section"><div className="section-heading"><div><SectionMarker>04 / THE FLUNG PROMPT LIBRARY</SectionMarker><h2>Find your<br /><em>starting point.</em></h2></div><p>Practical prompts built for creators who want more control, more clarity and fewer blank canvases.</p></div><div className="category-grid">{categories.map((category) => <CategoryCard key={category.id} category={category} count={categoryCount(category)} onOpen={(item) => navigate(`/prompts/${item.slug}`)} />)}</div></section>

    <section className="latest-section page-section"><div className="latest-heading"><SectionMarker>05 / LATEST PROMPTS</SectionMarker><p>Fresh experiments, added automatically as the library grows.</p><button className="text-link" onClick={() => navigate('/prompts')}>OPEN LIBRARY <span>↗</span></button></div><div className="latest-list">{latestPrompts.slice(0, 4).map((prompt, index) => { const category = categories.find((item) => item.id === prompt.categoryId); return category ? <button className="latest-row" key={prompt.id} onClick={() => onOpenPrompt(prompt)}><span>0{index + 1}</span><strong>{prompt.title}</strong><em>{category.title}</em><small>{prompt.addedAt}</small><b>↗</b></button> : null; })}</div></section>

    <section className="stats-section page-section"><div><SectionMarker>06 / A LITTLE CONTEXT</SectionMarker><h2>Make room<br /><em>for the work.</em></h2></div><div className="stats-grid"><div><strong>5<span>+</span></strong><span>YEARS EXPERIENCE</span></div><div><strong>06</strong><span>CREATIVE DISCIPLINES</span></div><div><strong>AI</strong><span>CONTENT & WORKFLOWS</span></div></div></section>

    <section className="follow-section page-section"><SectionMarker>07 / FOLLOW FLUNG</SectionMarker><div><h2>Keep making<br /><em>things.</em></h2><p>The library is growing. Follow along for new experiments, prompts and useful creative rabbit holes.</p><button className="button button-dark" onClick={() => navigate('/about')}>MEET THE CREATOR <span>↗</span></button></div></section>
  </main>;
}
