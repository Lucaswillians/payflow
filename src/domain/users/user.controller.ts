import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserDto } from "./dtos/user.dto";
import { plainToInstance } from "class-transformer";

@Controller('users')
export class UserController {
  @Inject()
  private userService: UserService;

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create (@Body() userDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.createUser(userDto);
    return plainToInstance(UserDto, user)
  }

}