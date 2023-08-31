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

      const matchPassword = userFound.password === password;

      if (!matchPassword) {
        throw new Error("Email e/ou senha inválidos!");
      }

      const body: ILoginUserResponseDTO = {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
      }

      return HttpResponse.ok({
        success: true,
        status: "Usuário logado com sucesso!",
        body
      })
    } catch (error: any) {
      console.log(error);
      return HttpResponse.badRequest(error);
    }
  }
}

export { LoginUserUseCase };

