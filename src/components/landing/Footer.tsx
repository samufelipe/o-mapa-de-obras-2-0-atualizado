import logoWhiteGold from "@/assets/logo-white-gold.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <img
            src={logoWhiteGold}
            alt="Cronograma O Mapa de Obras 2.0"
            className="h-10 w-auto"
          />
          
          <p className="text-muted-foreground text-sm text-center max-w-md">
            Cronograma O Mapa de Obras 2.0 - A sequência que protege seu design e seu lucro.
          </p>
          
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidade
            </a>
          </div>
          
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Inovando na Sua Obra. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
