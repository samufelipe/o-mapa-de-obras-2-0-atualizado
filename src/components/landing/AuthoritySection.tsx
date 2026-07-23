const MENTORS_IMAGE_URL =
  "https://inovandonasuaobra.com.br/wp-content/uploads/2025/01/inso4-1-e1738203060570.png";

const AuthoritySection = () => {
  return (
    <section id="mentoras" className="py-16 md:py-20 bg-background reveal">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <img
              src={MENTORS_IMAGE_URL}
              alt="Ingrid Zarza e Fernanda Bradaschia"
              className="w-full max-w-sm h-auto"
              loading="lazy"
            />
          </div>
          <div className="text-center md:text-left order-1 md:order-2">
            <p className="text-sm md:text-base font-bold uppercase tracking-widest text-primary mb-3">
              Quem ensina
            </p>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">
              Ingrid Zarza e Fernanda Bradaschia
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
              Arquitetas e fundadoras da Inovando Arquitetura. Já concluíram mais de 250 obras e criaram a
              comunidade @inovandonasuaobra, onde ensinam arquitetas, designers de interiores e engenheiras a
              gerenciar obras com mais segurança.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
