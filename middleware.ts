// Vercel Edge Middleware. Roda ANTES da resolucao de arquivos estaticos,
// diferente de "rewrites" no vercel.json (que so entra em acao quando NAO
// existe arquivo estatico no path exato -- e "/" sempre resolve pra
// dist/index.html direto, ignorando rewrite condicional por host).
//
// Serve natal.html (title/OG/description proprios) na raiz "/" quando o
// host for o dominio da campanha de Natal. Qualquer outro host segue o
// fluxo normal (index.html + roteamento client-side do React).

export const config = {
  matcher: "/",
};

const NATAL_HOST = "cronogramadenatal.inovandonasuaobra.com.br";

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const host = request.headers.get("host") || "";

  if (host === NATAL_HOST) {
    url.pathname = "/natal.html";
    return new Response(null, {
      headers: { "x-middleware-rewrite": url.toString() },
    });
  }

  return undefined;
}
