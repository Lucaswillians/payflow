import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/createUser.dto";
import { hashPassword } from "../utils/hash-passwords";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async getUser (userId: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async createUser (userDto: CreateUserDto): Promise<UserEntity> {
    const { cpfCnpj, email } = userDto;
    const existingUser = await this.userRepository.findOne({ where: [{ cpfCnpj }, { email }] });

    if (existingUser) throw new BadRequestException('CPF/CNPJ or EMAIL already exists');

    const hashedPassword = await hashPassword(userDto.password);

    const user = this.userRepository.create({ ...userDto, password: hashedPassword });

    return this.userRepository.save(user);
  }
}