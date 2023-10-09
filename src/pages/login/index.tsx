import { FormEvent, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";

import { auth } from '../../services/firebaseConnections'
import {signInWithEmailAndPassword } from 'firebase/auth'

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if(email === '' || password === '') {
            alert("Preencha seus dados")
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(()  => {
            console.log("Logado com sucesso")
            navigate("/admin", {replace: true})
        })
        .catch((error) => {
            console.log("ERRO AO FAZER O LOGIN:")
            console.log(error)
        })
    }

    return(
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to='/'>
            <h1 className="h-9 text-lg font-medium text-white"> Meus Links 
            </h1>
            </Link>

            <form 
            onSubmit={handleSubmit}
            className="w-full max-w-xl flex flex-col px-2">
            <Input
            placeholder="Digite o seu e-mail"
            type='email'
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
            />

            <Input
            placeholder="************"
            type='password'
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
            />

            <button 
            type="submit"
            className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white"> Acessar </button>
            </form>
        </div>
    )
}