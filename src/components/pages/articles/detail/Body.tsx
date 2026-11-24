interface ArticleDetailBodyProps {
  html: string;
}

export function ArticleDetailBody({ html }: ArticleDetailBodyProps) {
  return (
    <div
      className="rich-text-content container-x mx-auto mt-12 max-w-3xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
