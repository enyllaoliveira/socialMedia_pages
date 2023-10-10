import { useState } from "react"

import { Header } from "../../components/header"
import { Input } from "../../components/input"

export function Admin() {
    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [textColorInput, setTextColorInput] = useState("#f1f1f1")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl">
                <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Input
                placeholder="Digite o nome do link..."
                value={nameInput}
                onChange={ (e) => setNameInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">URL do Link</label>
                <Input
                type="url"
                placeholder="Digite a URL..."
                value={urlInput}
                onChange={ (e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">
                    <div className="flex gap-2">
                    <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
                    <input
                    type="color"
                    value={textColorInput}
                    onChange={ (e) => setTextColorInput(e.target.value)}
                    />
                    </div>

                    <div className="flex gap-2">
                    <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
                    <input
                    type="color"
                    value={backgroundColorInput}
                    onChange={ (e) => setBackgroundColorInput(e.target.value)}
                    />
                    </div>
                </section>

                <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                <label className="text-white font-medium mt-2 mb-3">Veja como está ficando</label>
                    <article 
                    className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                    style={{marginBottom:8, marginTop:8, backgroundColor: backgroundColorInput}}
                    >
                        <p 
                        className="font-medium"
                        style={{color: textColorInput}}> Página do GitHub</p>
                    </article>
                </div>
            </form>

        </div>
    )
}