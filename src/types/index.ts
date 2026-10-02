export type PromptSection = {
  id: string;
  number: string;
  title: string;
  content: string;
};

export type Category = {
  id: string;
  number: string;
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  colorAccent: string;
};

export type Prompt = {
  id: string;
  categoryId: string;
  number: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  sections: PromptSection[];
  negativePrompt?: string;
  addedAt: string;
  featured?: boolean;
};
