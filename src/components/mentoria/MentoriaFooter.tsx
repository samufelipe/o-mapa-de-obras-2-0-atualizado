export default function MentoriaFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 bg-primary text-foreground">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-medium">
          © {currentYear} | Inovando na Sua Obra | Todos os Direitos Reservados
        </p>
      </div>
    </footer>
  );
}
