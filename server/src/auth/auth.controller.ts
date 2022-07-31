import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	Res,
	UsePipes,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { TokensService } from './tokens.service'
import { ValidationPipe } from '../pipes/validation.pipe'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly tokensService: TokensService,
	) {}

	@HttpCode(200)
	@Post('register')
	@UsePipes(ValidationPipe)
	async register(@Body() userDto: CreateUserDto, @Res() response) {
		const userData = await this.authService.register(userDto)
		await response.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		return response.json(userData)
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() userDto: LoginDto, @Res() response) {
		const userData = await this.authService.login(userDto)
		await response.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		return response.json(userData)
	}

	@HttpCode(200)
	@Post('logout')
	async logout(@Req() request, @Res() response) {
		const { refreshToken } = request.cookies
		const token = await this.authService.logout(refreshToken)
		response.clearCookie('refreshToken')
		return response.json(token)
	}

	@Get('refresh')
	async refresh(@Req() request, @Res() response) {
		const { refreshToken } = request.cookies
		const userData = await this.tokensService.refresh(refreshToken)
		response.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		})
		return response.json(userData)
	}
}
