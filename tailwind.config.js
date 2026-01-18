/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,vue}'],
    
    theme: {
        extend: {
            backgroundColor: {
                darkPurple: '#3b3462',
                semiDark: '#2c2650',
                darkBlack: '#312c50',
 
                purpleForm: '#7863d4', 
            },
 
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
                'montserrat': ['Montserrat', 'sans-serif'],
                'onest': ['Onest', 'sans-serif'],
                'popins': ['Popins', 'sans-serif'],
				'satoshi': ['Satoshi', 'sans-serif'],
            },

            colors: {
                dark: '#292929',
                light: '#dfdfdf'
            },
 
            boxShadow: {
                'customindigo': '0 0px 10px rgb(99, 102, 241);',
            },

            textShadow: {
                custom: '0px 0px 10px rgb(99, 102, 241);', 
            },

            animation: {
                'openPage': 'fadeIn 3s',
				'rotate': 'rotate 1.5s ease-in-out'
            } 
        }
    },
    plugins: [],
    corePlugins: {}
};