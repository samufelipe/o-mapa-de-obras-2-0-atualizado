import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quando receberei os bônus e materiais?",
    answer: "Todos os bônus e materiais complementares serão liberados imediatamente após o encerramento da imersão ao vivo, no dia 31/01. Você receberá acesso vitalício a todo o conteúdo.",
  },
  {
    question: "Como funciona o Grupo VIP de WhatsApp?",
    answer: "Logo após a confirmação do pagamento, você receberá um link exclusivo para entrar no nosso grupo VIP. Lá você terá acesso a networking com outras profissionais, avisos importantes sobre a imersão e suporte direto conosco.",
  },
  {
    question: "O valor de R$ 49,90 é real? Tem pegadinha?",
    answer: "Sim, é real e não tem pegadinha! Este é o valor do Lote 01, uma condição especial para as primeiras inscritas. Nosso objetivo é impactar o máximo de arquitetas possível com esse conhecimento transformador.",
  },
  {
    question: "A imersão será cansativa por ser o dia todo?",
    answer: "Não! Estruturamos a imersão com intervalos estratégicos, dinâmicas interativas e momentos de aplicação prática. O tempo passa voando porque o conteúdo é extremamente relevante e aplicável.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase">
              Dúvidas Frequentes
            </h2>
            <p className="text-muted-foreground mt-4">
              Tudo o que você precisa saber sobre a imersão
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border px-6 rounded-lg"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-12">
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-primary text-primary px-8 py-4 font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Ainda Tenho Dúvidas, Quero Falar com Vocês
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
