import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import {login as loginService} from '../services/AuthService'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Tentar recuperar o usuário do localStorage ao carregar a página
        const storagedUser = localStorage.getItem('@ArborizacaoInteligente:user');

        if (storagedUser) {
            try {
                setUser(JSON.parse(storagedUser));
            } catch (error) {
                console.error('Erro ao recuperar usuário do localStorage:', error);
                localStorage.removeItem('@ArborizacaoInteligente:user');
            }
        }
        setLoading(false);
    }, []);

    async function login(email, senha) {
        try {
            const response = await loginService(email, senha)
            
            const userData = response.user || response.usuario;
            if (!userData) {
                return { success: false, message: 'Resposta de login inválida.' };
            }
            
            setUser(userData);
            localStorage.setItem('@ArborizacaoInteligente:user', JSON.stringify(userData));

            // Sincronizar carrinho local se existir
            // const localCart = JSON.parse(localStorage.getItem('@ArborizacaoInteligente:localCart') || '[]');
            // if (localCart.length > 0) {
            //     for (const item of localCart) {
            //         try {
            //             await adicionarAoCarrinho(
            //                 userData.id_pessoa,
            //                 item.id_produto,
            //                 item.quantidade,
            //                 item.preco_unitario
            //             );
            //         } catch (syncError) {
            //             console.error('Erro ao sincronizar item do carrinho:', syncError);
            //         }
            //     }
            //     localStorage.removeItem('@ArborizacaoInteligente:localCart');
            // }
            
            return { success: true };
        } catch (error) {
            console.error('Erro no login:', error);
            const message = error.response?.data?.error || 'Erro ao realizar login. Verifique suas credenciais.';
            return { success: false, message };
        }
    }

    function logout() {
        localStorage.removeItem('@ArborizacaoInteligente:user');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}