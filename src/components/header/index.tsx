// Componente de cabeçalho com navegação e autenticação
import { useSession, signIn, signOut } from "next-auth/react"

import styles from "./styles.module.css";
import Link from "next/link";

export function Header() {

  const { data: session, status } = useSession()

  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href="/">
            <h1 className={styles.logo}>
              G<span>a</span>br<span>iel</span>
            </h1>
          </Link>
          {/* Exibe link para painel se usuário estiver logado */}
          {session?.user && (
            <Link href="/dashboard" className={styles.link}>
            Meu Painel
          </Link>
          )}
        </nav>
        
        {/* Exibe botão de login ou logout conforme status da sessão */}
        {status === "loading" ? (
          <></>
        ) : session ? (
          <button className={styles.loginButton} onClick={() => signOut()}>
            Olá {session?.user?.name}
          </button>
        ) : (
          <button className={styles.loginButton} onClick={() => signIn("google")}>
            Acessar
          </button>
        )}
      </section>
    </header>
  );
}
