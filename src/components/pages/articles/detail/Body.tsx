interface ArticleDetailBodyProps {
  html: string;
}

export function ArticleDetailBody({ html }: ArticleDetailBodyProps) {
  return (
    <div
      className="container-x prose-article mx-auto mt-12 max-w-3xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
