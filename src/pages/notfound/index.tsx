import { Link } from "react-router-dom"
export default function NotFound() {
    return (
        <div className="flex w-full justify-center items-center flex-col text-white min-h-screen"> 
        <h1 className="font-bold text-5xl mb-4 "> 404</h1>
            <h2 className="font-bold text-4xl mb-4 "> Página não encontrada</h2>
            <p className="italic text-1xl mb-4"> Você caiu em uma página que não existe!</p>
            <Link className=" bg-gray-50/20 py-2 px-4 rounded" to="/"> Retorne ao menu inicial</Link>
        </div>
    )
}