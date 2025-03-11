export interface UserCreate {
    cpf: string
    email: string
    name: string
    phone: string
    sex: string
    birthDate: string
    active: boolean
    role: string
    password: string
    storeId: number | null
}

export interface UserUpdate extends UserCreate {
    id: number;
}


export interface UserAuth {
    email: string
    password: string
}