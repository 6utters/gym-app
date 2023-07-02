import { useMemo } from 'react'

interface UseProgressProps {
	radius: number
	percentage: number
}

interface UseProgressResult {
	dashArray: number
	dashOffset: number
}

export function useProgress({
	radius,
	percentage
}: UseProgressProps): UseProgressResult {
	const dashArray = useMemo(() => radius * Math.PI * 2, [radius])
	const dashOffset = useMemo(
		() => dashArray - (dashArray * percentage) / 100,
		[percentage, dashArray]
	)

	return {
		dashArray,
		dashOffset
	}
}
