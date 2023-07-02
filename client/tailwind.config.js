const plugin = require('tailwindcss/plugin')

module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				dark_blue: 'var(--dark_blue)',
				inert_blue: 'var(--inert_blue)',
				light_blue: 'var(--light_blue)',
				bright_blue: 'var(--bright_blue)',
				light_gray: 'var(--light_gray)',
				dust_black: 'var(--dust_black)',
				dust_gray: 'var(--dust_gray)',
				indian_red: 'var(--indian_red)',
				light_red: 'var(--light_red)',
				light_green: 'var(--light_green)'
			},
			spacing: {
				0.5: '0.12rem'
			},
			borderRadius: {
				image: '0.5rem'
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
