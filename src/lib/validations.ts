import { z } from "zod";

// ============================================
// VALIDAÇÕES DO FORMULÁRIO
// Schemas Zod para validação de dados
// ============================================

/**
 * Schema de validação para o formulário de lead
 */
export const leadFormSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo")
    .regex(
      /^[a-zA-ZÀ-ÿ\s]+$/,
      "Nome deve conter apenas letras"
    ),
  
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido")
    .max(255, "E-mail muito longo")
    .transform((val) => val.toLowerCase().trim()),
  
  phone: z
    .string()
    .min(1, "WhatsApp é obrigatório")
    .regex(
      /^\+?[0-9\s\-\(\)]{8,20}$/,
      "Insira um número de WhatsApp válido (com DDD ou código do país)"
    ),
});

/**
 * Tipo inferido do schema de lead
 */
export type LeadFormData = {
  name: string;
  email: string;
  phone: string;
};

/**
 * Valida os dados do formulário
 * Retorna os dados validados ou os erros de validação
 */
export const validateLeadForm = (data: unknown): { 
  success: boolean; 
  data?: LeadFormData; 
  errors?: Record<string, string>;
} => {
  const result = leadFormSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data as LeadFormData };
  }
  
  // Converter erros do Zod para um objeto simples
  const errors: Record<string, string> = {};
  result.error.errors.forEach((err) => {
    const field = err.path[0] as string;
    errors[field] = err.message;
  });
  
  return { success: false, errors };
};

/**
 * Aplica máscara de telefone brasileiro
 * Formato: (99) 99999-9999
 */
export const applyPhoneMask = (value: string): string => {
  // Se começar com +, é internacional, não aplica máscara rígida, apenas permite números, espaços e hífens
  if (value.startsWith('+')) {
    return value.replace(/[^\+0-9\s\-]/g, '');
  }

  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "");
  
  // Se tiver mais de 11 dígitos, provavelmente é internacional sem o +, não aplica máscara rígida
  if (numbers.length > 11) {
    return value.replace(/[^\+0-9\s\-]/g, '');
  }
  
  // Limita a 11 dígitos para números brasileiros
  const limited = numbers.slice(0, 11);
  
  // Aplica a máscara progressivamente para números brasileiros
  if (limited.length <= 2) {
    return limited.length > 0 ? `(${limited}` : "";
  }
  if (limited.length <= 7) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  }
  return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
};

/**
 * Remove a máscara do telefone
 * Retorna apenas os números
 */
export const removePhoneMask = (value: string): string => {
  return value.replace(/\D/g, "");
};

/**
 * Valida se o telefone tem todos os dígitos
 */
export const isPhoneComplete = (value: string): boolean => {
  const numbers = removePhoneMask(value);
  // Aceita números brasileiros (10 ou 11 dígitos) ou internacionais (até 15 dígitos)
  return numbers.length >= 10 && numbers.length <= 15;
};
