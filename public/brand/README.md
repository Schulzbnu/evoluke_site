# Identidade visual — onde colocar logo e favicon

Esta pasta (`public/`) é servida na raiz do site. Um arquivo em
`public/brand/logo.svg` fica acessível em `https://.../brand/logo.svg`.

## 1. Logo (cabeçalho e rodapé)

1. Coloque o(s) arquivo(s) nesta pasta, por exemplo:
   - `public/brand/logo.svg` — versão para fundos claros (cabeçalho)
   - `public/brand/logo-light.svg` — versão para fundo escuro (rodapé) — opcional
2. Abra `data/site.ts` e preencha o objeto `branding`:
   ```ts
   export const branding = {
     logo: "/brand/logo.svg",
     logoLight: "/brand/logo-light.svg", // opcional
     logoAlt: "Evoluke — logotipo",
     logoWidth: 132,  // largura real do arquivo, em px
     logoHeight: 36,  // altura real do arquivo, em px
     ogImage: "",
   };
   ```
3. Pronto. Enquanto `logo` ficar vazio, o site mostra o wordmark em texto
   (comportamento atual). Assim que preencher, o `components/Logo.tsx` passa
   a renderizar a imagem automaticamente.

Formatos recomendados: **SVG** (ideal, escala sem perda) ou **PNG** com fundo
transparente (~264x72 px para a proporção padrão acima).

## 2. Favicon (ícone da aba do navegador)

O Next.js (App Router) detecta os arquivos de ícone **pela pasta `app/`**,
NÃO por esta pasta. Para trocar o favicon, substitua/adicione na pasta `app/`:

| Arquivo            | Uso                                   |
| ------------------ | ------------------------------------- |
| `app/icon.svg`     | favicon principal (já existe um placeholder) |
| `app/icon.png`     | alternativa em PNG (32x32 ou 48x48)   |
| `app/favicon.ico`  | compatibilidade com navegadores antigos |
| `app/apple-icon.png` | ícone para iOS (180x180)            |

Basta colocar o arquivo com esse nome em `app/` que o Next gera as tags
`<link>` automaticamente. O placeholder atual é `app/icon.svg` (o "E" da
marca no gradiente) — substitua-o pelo ícone definitivo.

## 3. Imagem de compartilhamento social (Open Graph) — opcional

1. Coloque a imagem aqui, ex.: `public/brand/og.png` (recomendado 1200x630 px).
2. Em `data/site.ts`, preencha `ogImage: "/brand/og.png"`.
   Ela passa a ser usada nos cards de Open Graph e Twitter.
