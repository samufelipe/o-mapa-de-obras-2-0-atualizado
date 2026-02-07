import { Construction } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400 blur-3xl opacity-20 rounded-full"></div>
            <div className="relative bg-white rounded-full p-8 shadow-2xl border border-amber-100">
              <Construction className="w-20 h-20 text-amber-600 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Em Manutenção
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <p className="text-xl md:text-2xl text-gray-700 font-medium">
            Estamos trabalhando em melhorias
          </p>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Nossa página está temporariamente indisponível. Voltaremos em breve com novidades!
          </p>
        </div>

        {/* Contact */}
        <div className="pt-8 border-t border-amber-100">
          <p className="text-gray-600">
            Dúvidas? Entre em contato:{" "}
            <a 
              href="mailto:inovandonasuaobra@gmail.com" 
              className="text-amber-600 hover:text-amber-700 font-semibold underline"
            >
              inovandonasuaobra@gmail.com
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="pt-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Inovando Arquitetura. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
