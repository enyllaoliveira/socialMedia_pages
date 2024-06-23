import { Social } from "../../components/social";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export function Home() {
  const headerLinks = [
    {
      title: 'Página do Github',
      url: import.meta.env.VITE_GITHUB
    },
    {
      title: 'Página do LinkedIn',
      url: import.meta.env.VITE_LINKEDIN
    },
    {
      title: 'Página do Instagram',
      url: import.meta.env.VITE_INSTAGRAM
    }
  ]

  const headerLinksIcons = [
    {
      icons: <FaGithub/>,
      url: import.meta.env.VITE_GITHUB
    },
    {
      icons: <FaLinkedin/>,
      url: import.meta.env.VITE_LINKEDIN
    },
    {
      icons: <FaInstagram/>,
      url: import.meta.env.VITE_INSTAGRAM
    }
  ]

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3x1 font-bold text-white mt-20">
        Perfis nas redes sociais
      </h1>
      <span className="text-gray-50 mb-5 mt-3"> Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
      {headerLinks.map((item) => (
        <Social
          className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer text-base md:text-lg"
          url={item.url}
        >

          {item.title}
        </Social>
      ))}
        
        <footer className="flex justify-center gap-3 my-4">
        {headerLinksIcons.map((item) => (
          <Social url={item.url}> {item.icons} </Social>
         ))}
        </footer>
      </main>
    </div>
  );
}
