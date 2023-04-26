import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

interface useModalArgs {
	onClose?: () => void
	animationDelay?: number
	isOpen?: boolean
}

export function useModal({animationDelay, onClose, isOpen}: useModalArgs) {
	const [isClosing, setIsClosing] = useState(false)
	const [isMounted, setIsMounted] = useState(false)
	const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

	const close = useCallback(() => {
		if (onClose) {
			setIsClosing(true)
			timeRef.current = setTimeout(() => {
				onClose()
				setIsClosing(false)
			}, animationDelay)
		}
	}, [animationDelay, onClose])

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			close()
		}
	}, [close])

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
			setIsMounted(true)
		}
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isOpen])

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', onKeyDown)
		}

		return () => {
			clearTimeout(timeRef.current)
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, onKeyDown])

	return {
		isClosing,
		isMounted,
		close
	}
}