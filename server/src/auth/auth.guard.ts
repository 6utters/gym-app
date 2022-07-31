import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthService } from './auth.service'
import { TokensService } from './tokens.service'
import { Observable } from 'rxjs'
import { validateToken } from '../utils/guard/guard.helper'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private tokensService: TokensService,
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		validateToken(context, this.tokensService)
		return true
	}
}
