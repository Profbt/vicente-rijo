type JsonLdNode = Record<string, unknown>;

/**
 * Injeta um ou mais blocos JSON-LD.
 *
 * `<` é escapado para `\u003c` porque qualquer string do conteúdo poderia
 * conter `</script>` e fechar a tag antes da hora. Em export estático o HTML
 * sai pronto, então a serialização acontece no build.
 */
export default function JsonLd({
  data,
}: {
  data: JsonLdNode | JsonLdNode[];
}) {
  const nodes = Array.isArray(data) ? data : [data];

  return (
    <>
      {nodes.map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(node).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
