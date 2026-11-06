import { useState } from 'react';

export default function AuthView({ isRegister }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const action = isRegister ? '/auth/register' : '/auth/login';

  return (
    <main className="auth-container">
      <div className="auth-wrapper">
        <section className="auth-left">
          <img
            className="auth-image"
            src={isRegister ? "/loginn.jpg?v=2" : "/cadastro.jpg?v=2"}
            alt="Pets recebendo carinho"
          />
        </section>
        <section className="auth-right">
          <div className="auth-header">
            <a href="/" className="auth-logo">
              <img src="/logo_petvita.png" alt="PetVita Logo" style={{ height: '50px', width: 'auto' }} />
            </a>
            <div className="auth-nav">
              <a className="auth-nav-link" href={isRegister ? '/auth/login' : '/auth/register'}>
                {isRegister ? 'Entrar' : 'Cadastrar'}
              </a>
            </div>
          </div>
          <div className="auth-form-container">
            <h2 className="auth-title">{isRegister ? 'Cadastro' : 'Login'}</h2>
            <form method="POST" action={action} className="auth-form">
              <div className="form-group">
                <label htmlFor="email_or_phone">Email ou Telefone</label>
                <input
                  type="text"
                  id="email_or_phone"
                  name="email_or_phone"
                  placeholder="Digite seu email ou telefone"
                  autoComplete="username"
                  required
                />
              </div>
              {isRegister && (
                <div className="form-group">
                  <label htmlFor="full_name">Nome Completo</label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    placeholder="Digite seu nome completo"
                    autoComplete="name"
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <div className="password-input">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder={isRegister ? 'Crie uma senha' : 'Digite sua senha'}
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    minLength={isRegister ? 6 : undefined}
                    required
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    aria-label={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                    onClick={() => setPasswordVisible((visible) => !visible)}
                  >
                    {passwordVisible ? '🔒' : '👁️'}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn-primary">
                {isRegister ? 'Vamos Começar!' : 'Entrar'}
              </button>
            </form>
            <div className="auth-footer">
              {isRegister ? (
                <p>Já é membro? <a href="/auth/login">Entrar</a></p>
              ) : (
                <p>Ainda não é membro? <a href="/auth/register">Cadastre-se</a></p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
