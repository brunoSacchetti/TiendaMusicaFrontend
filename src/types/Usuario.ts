export interface Usuario {
    //id: number;
    user: string;
    password: string;
    rol: 'ADMIN' | 'OPERADOR' | 'VISOR'
}