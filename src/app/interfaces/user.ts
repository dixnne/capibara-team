export interface User {
    id: string;
    data: {
        dates: number[];
        email: string;
        name: {
            username: string;
            firstname: string;
            lastname: string;
        }
        password: string;
        phone: string;
        image: string;
    }
  }
  