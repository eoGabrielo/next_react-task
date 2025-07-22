
//Arquivo com nome em "[]", recebe parametro na url.
import { ChangeEvent, FormEvent, use, useState } from "react";
import {useSession} from "next-auth/react"
import Head from "next/head";
import styles from "./styles.module.css";
import { GetServerSideProps } from "next";

import { db } from "../../services/firebaseConnection";
import { doc, collection, query, where, getDoc, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { Textarea } from "../../components/textarea";
import { FaTrash } from "react-icons/fa";

interface TaskProps{
    item: {
        tarefa: string;
        created: string;
        public: boolean;
        user: string;
        taskId: string
    };

    allComments: CommentsProps[]
}

interface CommentsProps{
    id: string;
    comment: string;
    taskId: string;
    user: string;
    name: string;
}


export default function Task({item, allComments}: TaskProps){

    const {data: session} = useSession();

    const [input, setInput] = useState("");
    const [comments, setComments] = useState<CommentsProps[]>(allComments || []);

    async function handleComment(event: FormEvent) {
        event.preventDefault();

        if(input === "") return;
        if(!session?.user?.email || !session?.user?.name) return;

        try{
            // Adiciona novo comentário no Firestore
            const docRef = await addDoc(collection(db, "comments"), {
                //session é referente a quem está logado.
                comment: input,
                created: new Date(),
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: item?.taskId //Referente a tarefa já criada.
            });

            const data = {
                id: docRef.id,
                comment: input,
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: item?.taskId
            };

            setComments((oldItems) => [...oldItems, data]);
            
            setInput("");
        }catch(error){
            console.log(error)
        }
    };

    async function handleDeleteComment(id: string) {
        try{
            // Remove comentário do Firestore
            const docRef = doc(db, "comments", id)
            await deleteDoc(docRef);

            const deletComment = comments.filter((item) => item.id !== id)

            setComments(deletComment);
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>Tarefas - Detalhes da tarefa</title>
            </Head>

            <main className={styles.main}>
                <h1>Tarefas</h1>
                <article className={styles.task}>
                    <p>
                        {item.tarefa}
                    </p>
                </article>
            </main>

            <section className={styles.commentsContainer}>
                <h2>Deixar comentário</h2>

                <form onSubmit={handleComment}>
                    <Textarea 
                    value={input}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                    placeholder="Digite seu comentario..."
                    />
                    <button 
                    disabled={!session?.user}
                    className={styles.button}>Comentar</button>
                </form>
            </section>

            <section className={styles.commentsContainer}>
                <h2>Todos comnetários</h2>

                {comments.length === 0 && (
                    <span>Nenhum comentário foi encontrado...</span>
                )}

                {comments.map((item) => (
                
                    <article key={item.id} className={styles.comment}>
                        <div className={styles.headCommnet}>
                            <label className={styles.commentsLabel}>{item.name}</label>
                            {item.user === session?.user?.email && (
                                <button className={styles.buttonTrash} onClick={() => handleDeleteComment(item.id)}>
                                <FaTrash size={18} color="#EA3140"/>
                            </button>
                            )}
                        </div>
                        <p>{item.comment}</p>
                    </article>
                ))}
            </section>
        </div>
    )
}

// getServerSideProps executa no servidor para buscar dados da tarefa e comentários
export const getServerSideProps: GetServerSideProps = async ({params}) =>{

    const id = params?.id as string; // Pega o parâmetro id da URL
    const docRef = doc(db, "tarefas", id); // Referência da tarefa no Firestore

    const q = query(collection(db, "comments"), where("taskId", "==", id)) // Busca comentários da tarefa
    const snapshotComments = await getDocs(q); // Busca os comentários no Firestore

    let allComments: CommentsProps[] = [];
    snapshotComments.forEach((doc) => {
        allComments.push({
            id: doc.id,
            comment: doc.data().comment,
            user: doc.data().user,
            name: doc.data().name,
            taskId: doc.data().taskId,
        })
    })
    

    const snapshot = await getDoc(docRef); // Busca os dados da tarefa no Firestore

    if(snapshot.data === undefined){
        return{
            redirect:{
                destination: "/",
                permanent: false,
            },
        };
    };

    if(!snapshot.data()?.public){
        return{
            redirect:{
                destination: "/",
                permanent: false,
            },
        };
    };

    const miliseconds = snapshot.data()?.created?.seconds * 1000;


    const task = {
        tarefa: snapshot.data()?.tarefa,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: snapshot.data()?.user,
        taskId: id,

    }


    return{
        // Retorna dados da tarefa e comentários para o componente principal
        props: {
            item: task,
            allComments: allComments,
        },
    }







}








