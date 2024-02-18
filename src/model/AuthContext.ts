interface IAuthContextType {
  token: string | null;
  usuarioId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}
