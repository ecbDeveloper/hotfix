import { SignupDto } from "../auth/dto/signup.dto";

export type UserCreateInput = Omit<SignupDto, 'languages'>

