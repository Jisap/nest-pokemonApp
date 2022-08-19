


export interface HttpAdapter {              // Interfaz que define los métodos que debe implementar el adapter
    get<T>(url: string): Promise<T>         // Método get que usa un argumento génerico <T> y que devuelve una promesa de tipo <T>
}
