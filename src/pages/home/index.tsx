import { Social } from "../../components/social";
import { db } from "../../services/firebaseConnections";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaInstagram, } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";

interface LinkProps {
  id: string;
  url: string;
  name: string;
  color: string;
  bg: string;
}

interface SocialLinkProps {
  github: string;
  linkedin: string; 
  instagram: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinkProps | undefined>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
        const lista = [] as LinkProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            color: doc.data().color,
            bg: doc.data().backgroundColor,
          });
        });
        setLinks(lista);
      });
    }
    loadLinks();
  }, []);

  useEffect(() => {
    async function loadSocialLinks() {
      const docRef = doc(db, "social", "link");
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setSocialLinks({
          github: data.github,
          linkedin: data.linkedin, 
          instagram: data.instagram,
        });
      }
    }
    loadSocialLinks();
  }, []);

  return (
    <>
     <Social url="/login"> <BiLogIn size={30} color="white"/></Social>
    <div className="flex flex-col w-full py-4 items-center justify-center">
     
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        Perfis nas redes sociais
      </h1>
      <span className="text-gray-50 mb-5 mt-3"> Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((item) => (
          <Social
            key={item.id}
            style={{ backgroundColor: item.bg, color: item.color }}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer text-base md:text-lg"
            url={item.url}
          >
            {item.name}
          </Social>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks?.github}>
              <FaGithub size={35} color="white" />
            </Social>
            <Social url={socialLinks?.linkedin}>
              <FaLinkedin size={35} color="white" />
            </Social>
            <Social url={socialLinks?.instagram}>
              <FaInstagram size={35} color="white" />
            </Social>
          </footer>
        )}
      </main>
    </div>
    </>
  );
}