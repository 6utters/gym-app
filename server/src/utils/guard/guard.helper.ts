import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { TokensService } from '../../auth/tokens.service'

export const validateToken = (
	context: ExecutionContext,
	tokensService: TokensService,
) => {
	const req = context.switchToHttp().getRequest()
	const authorizationHeader = req.headers.authorization
	if (!authorizationHeader) {
		throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
	}
	const accessToken = authorizationHeader.split(' ')[1]
	if (!accessToken) {
		throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
	}
	const userData = tokensService.validateAccessToken(accessToken)
	if (!userData) {
		throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
	}
	req.user = userData
	return userData
}
