import { FormEvent, useEffect, useState } from "react";

import { Header } from "../../components/header";
import { Input } from "../../components/input";
// import { FiTrash } from "react-icons/fi";

import { db } from "../../services/firebaseConnections";
import { setDoc, addDoc, getDoc, doc } from "firebase/firestore";

export function NetWorks() {
  const [linkGithubInput, setLinkGithubInput] = useState("");
  const [linkLinkedInInput, setLinkLinkedInInput] = useState("");
  const [linkInstagramInput, setLinkInstagramInput] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setLinkGithubInput(snapshot.data()?.github);
          setLinkLinkedInInput(snapshot.data()?.linkedIn);
          setLinkInstagramInput(snapshot.data()?.instagram);
        }
      });
    }
    loadLinks();
  }, []);
  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      LinkedIn: linkLinkedInInput,
      Github: linkGithubInput,
      Instagram: linkInstagramInput,
    })
      .then(() => {
        console.log("cadastrou");
      })
      .catch((error) => console.log("erro ao salvar", error));
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        {" "}
        Minhas redes sociais
      </h1>
      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2">
          Link do Gihub
        </label>
        <Input
          type="url"
          placeholder="Digite a URL do Github"
          value={linkGithubInput}
          onChange={(e) => setLinkGithubInput(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">
          Link do LinkedIn
        </label>
        <Input
          placeholder="Digite a URL do LinkedIn"
          type="url"
          onChange={(e) => setLinkLinkedInInput(e.target.value)}
          value={linkLinkedInInput}
        />

        <label className="text-white font-medium mt-2 mb-2">
          Link do Instagram
        </label>
        <Input
          type="url"
          placeholder="Digite a URL do Instagram"
          value={linkInstagramInput}
          onChange={(e) => setLinkInstagramInput(e.target.value)}
        />
        <button
          type="submit"
          className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7"
        >
          {" "}
          Salvar links
        </button>
      </form>

      <h2 className="font-bold text-white text-2xl"> Meus links </h2>
    </div>
  );
}
