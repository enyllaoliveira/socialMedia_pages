import { FormEvent, useEffect, useState } from "react";

import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnections";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

// addDoc - chama o autoid
// onSnapshot pra observar e fazer a busca em tempo real (atualiza sempre, mas gasta mt recurso)

interface LinkProps {
  id: string;
  url: string;
  name: string;
  color: string;
  bg: string;
}
export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [newLinks, setNewLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));
    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          color: doc.data().color,
          bg: doc.data().bg,
        });
      });
      setNewLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (nameInput === "" || urlInput === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      color: textColorInput,
      backgroundColor: backgroundColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        console.log("Cadastrado com sucesso");
      })
      .catch((error) => {
        if (error.code === "permission-denied") {
          alert("Você não tem permissão para realizar essa operação.");
        } else {
          console.error("Erro ao cadastrar no banco de dados: ", error);
        }
      });
  }

 async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">URL do Link</label>
        <Input
          type="url"
          placeholder="Digite a URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Cor do Link
            </label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Fundo do Link
            </label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== "" && (
          <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">
              Veja como está ficando
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {" "}
                {nameInput}
              </p>
            </article>
          </div>
        )}
        <button
          type="submit"
          className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gao-4 justify-center items-center flex"
        >
          {" "}
          Cadastrar{" "}
        </button>
      </form>

      <h2 className="font-bold text-white text-2xl"> Meus links </h2>
      {newLinks.map((item) => (
 <article key={item.id}
 className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
 style={{ backgroundColor: item.bg, color: item.color }}
>
 {" "}
 <span> {item.name}</span>{" "}
 <div>
   {" "}
   <button className="border border-dashed p-1 rounded bg-neutral-900"
onClick={() => handleDeleteLink(item.id)}

>
     {" "}
     <FiTrash size={18} color="white" />{" "} 
   </button>
 </div>
</article>
      ))}
     
    </div>
  );
}
