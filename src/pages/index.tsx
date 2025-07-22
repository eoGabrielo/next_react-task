import Head from "next/head";
import styles from "../../styles/home.module.css";
import Image from "next/image";

import heroImg from "../../public/assets/hero.png";
import { GetStaticProps } from "next";

import {db} from "../services/firebaseConnection"
import { collection, getDoc, getDocs, } from "firebase/firestore"

interface HomeProps{
  posts: number;
  comments: number;
}

// Componente principal da Home, exibe estatísticas e informações gerais
export default function Home({ posts, comments} : HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tarefas Gabriel NEXT</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="Logo"
            src={heroImg}
            priority
          />
        </div>
        <h1 className={styles.title}>
          Sistema para organizar <br />
          anotações de terefas
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+{posts} Posts</span>
          </section>
          <section className={styles.box}>
            <span>+{comments} Comentarios</span>
          </section>
        </div>
      </main>
    </div>
  );
}

// Função executada em build/revalidação para buscar dados do Firestore
export const getStaticProps: GetStaticProps = async () => {

  const commentRef = collection(db, "comments");
  const postRef = collection(db, "tarefas");


  const commentSnapshot = await getDocs(commentRef);
  const postSnapshot = await getDocs(postRef);
  
  return{
    props: {
      posts: postSnapshot.size || 0,
      comments: commentSnapshot.size || 0
    },
    revalidate: 60 // Revalida a cada 60s
  }
}
