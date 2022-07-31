import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { AuthService } from '../auth/auth.service'
import { Reflector } from '@nestjs/core'
import { TokensService } from '../auth/tokens.service'
import { ROLES_KEY } from './roles-auth.decorator'
import { validateToken } from '../utils/guard/guard.helper'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private tokensService: TokensService,
		private reflector: Reflector,
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		)
		if (!requiredRoles) {
			return true
		}
		const userData = validateToken(context, this.tokensService)
		return userData.roles.some(role => requiredRoles.includes(role.value))
	}
}
