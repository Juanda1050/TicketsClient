interface IAuthContextType {
  token: string | null;
  usuarioId: string;
  login: (token: string, userId: string) => void;
  logout: () => void;
}
