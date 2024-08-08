import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto, CreateGoogleUserDto } from './dto/create-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create a new user
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Email address already in use' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('/register')
  @HttpCode(HttpStatus.CREATED) // Set the HTTP status code for success
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.createUser(createUserDto);
      return { success: true, user: result }; // Return a success message and user ID
    } catch (error) {
      throw error;
    }
  }

  // create a new user with Google token
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('/auth/google-signin')
  @HttpCode(HttpStatus.CREATED) // Set the HTTP status code for success
  async createWithGoogleToken(
    @Body() createGoogleUserDto: CreateGoogleUserDto,
  ) {
    try {
      // const {token} = body;
      console.log('token', createGoogleUserDto.token);
      const result =
        await this.userService.verifyGoogleToken(createGoogleUserDto);
      return { success: true, user: result }; // Return a success message and user ID
    } catch (error) {
      throw error;
    }
  }
}
