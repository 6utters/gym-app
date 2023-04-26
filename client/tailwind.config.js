const plugin = require('tailwindcss/plugin')

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			spacing: {
				0.5: '0.12rem'
			},
			fontSize: {
				'2lg': '1.38rem'
			},
			borderRadius: {
				image: '0.5rem'
			},
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out'
			},
			transitionDuration: {
				DEFAULT: '200ms'
			},
			zIndex: {
				1: '1',
				2: '2',
				3: '3'
			},
			keyframes: {
				fade: {
					from: { opacity: 0 },
					to: { opacity: 1 }
				},
				scaleIn: {
					'0%': {
						opacity: 0,
						transform: 'scale(0.9)'
					},
					'50%': {
						opacity: 0.3
					},
					'100%': {
						opacity: 1,
						transform: 'scale(1)'
					}
				},
				lift: {
					'0%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-0.5rem)'
					},

					'100%': {
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				fade: 'fade .5s ease-in-out',
				scaleIn: 'scaleIn .35s ease-in-out',
				lift: 'lift .5s ease-in-out'
			}
		}
	},
	plugins: [
		plugin(({ addComponents, addUtilities }) => {
			addComponents({
				'.btn-primary': {}
			})
			addUtilities({
				'.text-shadow': {
					textShadow: '1px 1px rgba(0, 0, 0, 0.4)'
				},
				'.outline-border-none': {
					outline: 'none',
					border: 'none'
				},
				'.flex-center-between': {
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				},
				'.bg-image': {
					objectPosition: 'center',
					objectFit: 'cover',
					pointerEvents: 'none'
				}
			})
		})
	]
}
