/** Copy that appears on more than one page, kept in one place. */

export const NAME = { first: "Franco", rest: "Miguel Valencia" };

export const ROLES = ["data scientist", "applied researcher", "human being"];

export const SLOGAN = {
  lead: "I love experiencing things I ",
  accent: "know nothing about",
  tail: ".",
};
export const SLOGAN_TEXT = SLOGAN.lead + SLOGAN.accent + SLOGAN.tail;

/** Hover note beside the footer self-portrait. */
export const SIGNOFF_NOTE = [
  "This website was inspired by Steins;Gate.",
  "For making me realize that determination precedes intelligence.",
];
export const SIGNOFF = "El Psy Kongroo.";

export const EMAIL = "francomiguel.valencia@gmail.com";

export const GITHUB = { label: "github.com/Funkey08", href: "https://github.com/Funkey08" };

export const LINKS: { label: string; href: string }[] = [
  { label: "github", href: GITHUB.href },
  { label: "linkedin", href: "https://www.linkedin.com/in/franco-miguel-valencia-6a650b219/" },
  { label: "email", href: `mailto:${EMAIL}` },
  // { label: "resume", href: `${import.meta.env.BASE_URL}resume.pdf` },  // add once a current PDF is in public/
];
