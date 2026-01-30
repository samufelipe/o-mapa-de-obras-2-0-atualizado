
# Plano: Recriar LP Mentoria + Validação Completa do Funil RD Station

## Resumo Executivo

Criar a Landing Page completa da Mentoria "Inovando na sua Obra" no Lovable, com formulário de captura integrado ao funil de automação já existente.

**Eventos RD Station (já configurados e funcionando):**
- `checkout-mentoria` → Entra no funil
- `mentoria-inovando-na-sua-obra-carrinho-abandonado` → 8 e-mails de recuperação
- `mentoria-inovando-na-sua-obra-compra-aprovada` → Sai da jornada de abandono

## Implementação

### Fase 1: Criar Página Principal e Constantes

Criar `src/pages/MentoriaLanding.tsx` como página principal que importa todos os componentes modulares, e `src/lib/mentoria-constants.ts` com todos os dados centralizados (FAQ, módulos, skills, URLs de checkout).

### Fase 2: Criar Componentes da Landing Page

Criar 12 componentes modulares em `src/components/mentoria/`:

1. **MentoriaHeader.tsx** - Logo + CTA fixo no scroll
2. **MentoriaHero.tsx** - Título, subtítulo, imagem das mentoras
3. **MentoriaSkills.tsx** - Habilidades técnicas e comportamentais
4. **MentoriaAudience.tsx** - Para quem é a mentoria
5. **MentoriaHowItWorks.tsx** - Como funciona
6. **MentoriaInside.tsx** - Screenshots da plataforma
7. **MentoriaModules.tsx** - 4 módulos com accordion
8. **MentoriaMentors.tsx** - Bio de Ingrid e Fernanda
9. **MentoriaRevenue.tsx** - Projeção de faturamento
10. **MentoriaPricing.tsx** - Preço + Formulário de captura integrado
11. **MentoriaGuarantee.tsx** - Garantia 15 dias
12. **MentoriaFAQ.tsx** - Perguntas frequentes

### Fase 3: Formulário com Integração RD Station

O componente `MentoriaPricing.tsx` terá:
- Campos: Nome + E-mail
- Checkbox: "Prefiro pagar com boleto parcelado"
- Captura automática de UTMs da URL
- Redirecionamento para `/checkout/mentoria?payment=boleto` (se checkbox) ou `/checkout/mentoria`

### Fase 4: Atualizar CheckoutBridge

Modificar `src/pages/CheckoutBridge.tsx` para:
- Detectar parâmetro `?payment=boleto`
- Redirecionar para URL correta da Hotmart:
  - Cartão: `https://pay.hotmart.com/Y93975016X?off=22jnl093&bid=1759350326376`
  - Boleto: `https://pay.hotmart.com/Y93975016X?off=et69m72o&bid=1759350383011`

### Fase 5: Registrar Nova Rota

Adicionar em `src/App.tsx`:
```
/mentoria → MentoriaLanding
```

## Design e Animações

- Paleta de cores da Imersão (dourado/preto)
- Animações sutis de fade-up ao scroll
- Sticky CTA mobile (botão fixo no rodapé em celulares)
- Hover effects nos cards e botões
- Todas as imagens e textos mantidos exatamente como no WordPress

## Fluxo Completo do Lead

```
┌──────────────────────────────────────────────────────────────┐
│ Meta Ads → /mentoria                                         │
│ (com UTMs: ?utm_source=facebook&utm_campaign=mentoria)       │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ Landing Page /mentoria                                       │
│ Lead preenche: Nome + Email                                  │
│ Checkbox: Boleto parcelado                                   │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ /checkout/mentoria?payment=boleto                            │
│ CheckoutBridge executa:                                      │
│ 1. Salva no banco (checkout_intents)                         │
│ 2. Envia checkout-mentoria para RD Station                   │
│ 3. Redireciona para Hotmart                                  │
└──────────────────────────────────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
┌─────────────────────┐     ┌──────────────────────────────────┐
│ COMPROU             │     │ NÃO COMPROU (10 min)             │
│                     │     │                                  │
│ hotmart-webhook     │     │ abandonment-sweeper              │
│ status: purchased   │     │ status: abandoned                │
│                     │     │                                  │
│ Envia para RD:      │     │ Envia para RD:                   │
│ mentoria-inovando-  │     │ mentoria-inovando-na-sua-obra-   │
│ na-sua-obra-compra- │     │ carrinho-abandonado              │
│ aprovada            │     │                                  │
│                     │     │ Inicia sequência de 8 e-mails    │
└─────────────────────┘     └──────────────────────────────────┘
```

## URLs para Meta Ads

| Campanha | URL de Destino |
|----------|----------------|
| Padrão | `https://inscricao-cronogramainovandonasuaobracombr.lovable.app/mentoria` |
| Boleto | `https://inscricao-cronogramainovandonasuaobracombr.lovable.app/mentoria?payment=boleto` |
| Com UTMs | `...lovable.app/mentoria?utm_source=facebook&utm_medium=cpc&utm_campaign=mentoria-jan26` |

## URLs para WordPress (substituir links atuais)

| Botão Atual | Nova URL |
|-------------|----------|
| "Quero Entrar na Mentoria" | `https://inscricao-cronogramainovandonasuaobracombr.lovable.app/mentoria` |
| "Quero meu acesso agora" | `https://inscricao-cronogramainovandonasuaobracombr.lovable.app/mentoria` |
| "boleto parcelado" | `https://inscricao-cronogramainovandonasuaobracombr.lovable.app/mentoria?payment=boleto` |

---

## Seção Técnica

### Arquivos a Criar

```
src/
├── pages/
│   └── MentoriaLanding.tsx              # Página principal
├── components/
│   └── mentoria/
│       ├── MentoriaHeader.tsx           # Header com logo
│       ├── MentoriaHero.tsx             # Hero section
│       ├── MentoriaSkills.tsx           # O que vai aprender
│       ├── MentoriaAudience.tsx         # Para quem é
│       ├── MentoriaHowItWorks.tsx       # Como funciona
│       ├── MentoriaInside.tsx           # Screenshots
│       ├── MentoriaModules.tsx          # 4 módulos
│       ├── MentoriaMentors.tsx          # Bio mentoras
│       ├── MentoriaRevenue.tsx          # Faturamento
│       ├── MentoriaPricing.tsx          # Preço + Form
│       ├── MentoriaTestimonials.tsx     # Depoimentos
│       ├── MentoriaGuarantee.tsx        # Garantia
│       ├── MentoriaFAQ.tsx              # FAQ
│       └── MentoriaFooter.tsx           # Footer
└── lib/
    └── mentoria-constants.ts            # Dados centralizados
```

### Arquivos a Modificar

```
src/
├── App.tsx                              # Nova rota /mentoria
└── pages/CheckoutBridge.tsx             # Suporte a ?payment=boleto
```

### Eventos RD Station (Validação)

| Momento | Edge Function | Identificador | Status |
|---------|---------------|---------------|--------|
| Checkout | log-checkout-intent | `checkout-mentoria` | Já configurado (linha 31-33) |
| Abandono 10min | abandonment-sweeper | `mentoria-inovando-na-sua-obra-carrinho-abandonado` | Já configurado (linha 19-20) |
| Compra | hotmart-webhook | `mentoria-inovando-na-sua-obra-compra-aprovada` | Já configurado (linha 17-20) |

### Paleta de Cores (Imersão)

- **Primary**: Dourado `hsl(45, 100%, 50%)`
- **Foreground**: Preto `hsl(0, 0%, 7%)`
- **Background**: Branco `hsl(0, 0%, 100%)`

### URLs de Checkout Hotmart

```typescript
const MENTORIA_CHECKOUT_URLS = {
  default: "https://pay.hotmart.com/Y93975016X?off=22jnl093&bid=1759350326376",
  boleto: "https://pay.hotmart.com/Y93975016X?off=et69m72o&bid=1759350383011"
};
```

### Imagens (Mantidas do WordPress)

Todas as imagens serão referenciadas das URLs originais do WordPress para manter consistência e não precisar de uploads adicionais.

### Validação do Funil

Após implementação, testar:
1. Preencher formulário em `/mentoria`
2. Verificar registro em `checkout_intents` (produto: "mentoria")
3. Verificar evento `checkout-mentoria` no RD Station
4. Aguardar 10 minutos ou forçar sweeper
5. Verificar evento `mentoria-inovando-na-sua-obra-carrinho-abandonado` no RD Station
6. Simular compra via webhook para verificar `mentoria-inovando-na-sua-obra-compra-aprovada`
