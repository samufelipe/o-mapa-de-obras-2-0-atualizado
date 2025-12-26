import mentorasImg from "@/assets/mentoras.png";

const AboutSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <img
              src={mentorasImg}
              alt="Ingrid e Fernanda"
              className="w-full max-w-md mx-auto rounded-lg"
            />
          </div>
          
          <div className="order-1 lg:order-2 space-y-6">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              De Arquiteta para Arquiteta
            </span>
            
            <h2 className="text-3xl md:text-4xl font-black uppercase">
              Criamos o Cronograma 2.0 como a{" "}
              <span className="text-primary italic">ponte prática que você precisa.</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Somos <strong className="text-foreground">Ingrid Zarza</strong> e{" "}
                <strong className="text-foreground">Fernanda Bradaschia</strong>. Com mais de 250 
                execuções entregues, descobrimos que a chave do sucesso na obra não é o improviso, 
                mas o <strong className="text-foreground">conhecimento estratégico do fluxo de serviços</strong>.
              </p>
              
              <p>
                O <strong className="text-foreground">Cronograma O Mapa de Obras 2.0</strong> é a 
                ponte prática que a formação acadêmica não consegue alcançar em profundidade. 
                Não entregamos apenas uma ferramenta, mas a segurança que você precisa para ser 
                a líder técnica respeitada em cada projeto.
              </p>
            </div>
            
            <button
              onClick={scrollToForm}
              className="bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              Quero Dominar a Execução
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
