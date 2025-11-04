import { api } from "./api";

import { LoginValues, RegisterValues } from "../validation/authSchemas";

const register = async (userData: RegisterValues) => {

    const { name, email, password } = userData;

    const response = await api.post('/auth/register', {
        name,
        email,
        password
    });

    return response.data;
};

const login = async (userData: LoginValues) => {
    const { email, password } = userData;
    const response = await api.post('/auth/signin', {
        email,
        password
    })
    return response.data;

}
export const authService = {
    register,
    login
}