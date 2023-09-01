import { comparePasswords } from "../../../helpers/encrypt/passwords.encrypt";
import { HttpResponse, IHttpResponse } from "../../../helpers/http-response";
import { UserRepository } from "../../../repositories/user/user.repository";
import { ILoginUserRequestDTO, ILoginUserResponseDTO } from "./login-user.dto";

class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: ILoginUserRequestDTO): Promise<IHttpResponse> {
    try {
      const { email, password } = data;

      const userFound = await this.userRepository.getByOne("email", email);
  
      if (!userFound) {
        throw new Error("Utilize um email válido ou cadastre-se.");
      }

      const matchPassword = comparePasswords(password, userFound.Password);

      if (!matchPassword) {
        throw new Error("Email e/ou senha inválidos!");
      }

      const user: ILoginUserResponseDTO = {
        id: userFound.Id,
        name: userFound.Name,
        email: userFound.Email,
      }

      return HttpResponse.ok({
        success: true,
        status: "Usuário logado com sucesso!",
        body: user
      })
    } catch (error: any) {
      return HttpResponse.badRequest(error);
    }
  }
}

export { LoginUserUseCase };

