export async function getCurrentSession() {
  const response = await fetch('/api/session');
  if (!response.ok) {
    throw new Error('Não foi possível carregar os dados da sua conta.');
  }

  return response.json();
}
