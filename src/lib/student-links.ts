/**
 * URL de connexion de l'espace étudiant — vit sur un sous-domaine externe,
 * distinct du site principal, du site de raccourcissement et du backoffice.
 */
export function buildStudentLoginUrl(): string {
  const origin = import.meta.env.VITE_STUDENT_URL;
  return `${origin}/auth/login`;
}