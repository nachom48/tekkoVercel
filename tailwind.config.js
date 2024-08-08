const { nextui } = require('@nextui-org/react')

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.tsx',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '824px',
        lg: '1024px',
        xl: '1440px',
      },
      fontSize: {
        'font-size-24': '24px',
        'font-size-20': '20px',
        'font-size-17': '17px',
        'font-size-14': '14px',
        'font-size-12': '12px',
        'font-size-11': '11px',


        'font-size-27': '27px',
        'font-size-21': '21px',
      
        'font-size-16': '16px',
        'font-size-15': '15px',
        'font-size-13': '13px',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
      lineHeight: {
        'line-height-32': '32px',
        'line-height-28': '28px',
        'line-height-24': '24px',
        'line-height-18': '18px',


        'line-height-36': '36px',
        'line-height-20': '20px',
        'line-height-16': '16px'
      },
      colors: {
        // COLORES
        'black': '#332E29',
        'danger': '#F00F0F',
        'dark-medium-grey': '#645E5A',       
        'light-grey': '#E4E7E9', 
        'light-medium-grey': '#9F9C9A', 
        'light-yellow': '#F5F3B5', 
        'medium-yellow': '#ACA81F', 
        'white': '#FCFCFC',
        'yellow': '#E8E215', 

        brownishGrey: '#645E5A',
        lightGrey: '#9F9C9A',
        white: '#FAFAFA',
        lemonYellow: '#E8E215',
        oliveMustard: '#ACA81F',
        oliveDrab: '#7A7720',
        paleButter: '#F5F3B5',
        inforDark: {
          100: 'rgba(51, 46, 41, 1)',
          500: 'rgba(51, 46, 41, 0.5)',
        },
        exitoDark: {
          100: 'rgba(52, 199, 89, 1)',
          500: 'rgba(52, 199, 89, 0.5)',
        },
        errorDark: {
          100: 'rgba(240, 15, 15, 1)',
          500: 'rgba(240, 15, 15, 0.5)',
        },
        advertenciaDark: {
          100: 'rgba(232, 226, 21, 1)',
          500: 'rgba(232, 226, 21, 0.5)',
        },
      }, 
      boxShadow: {
        'shadow-1': '0px 0px 1px 0px rgba(0, 0, 0, 0.14)',   // #00000024
        'shadow-2': '-2px 0px 2px 0px rgba(0, 0, 0, 0.12)',  // #0000001F
        'shadow-3': '-4px 0px 2px 0px rgba(0, 0, 0, 0.07)',  // #00000012
        'shadow-4': '-7px 0px 3px 0px rgba(0, 0, 0, 0.03)',  // #00000005
        'shadow-5': '-11px 0px 3px 0px rgba(0, 0, 0, 0.00)'  // #00000000
      },
      backgroundImage: {
        // CONTENEDORES VALIDOS
        'gradient-btn-primary': 'linear-gradient(to right, #ACA81F, #E8E215)',
        'gradient-btn-primary-hover': 'linear-gradient(to right, #E8E215, #F5F3B5)',
        'gradient-btn-secondary': 'linear-gradient(to right,rgba(172, 168, 31, 0.15), rgba(232, 226, 21, 0.15))',
        'gradient-btn-secondary-2': 'linear-gradient(to right, rgba(100, 94, 90, 0.2), rgba(245, 243, 181, 0.2))',
        'gradient-container': 'linear-gradient(to bottom, #332E29, #413B37)',
        'gradient-container-blue': 'linear-gradient(to bottom, #332E40, #413B37)',
        'gradient-radial': 'radial-gradient(circle, #9F9C9A, #645E5A)',
        


        'gradient-container-user': 'linear-gradient(to top, #645E5A, #332E29)',
        'gradient-container-tekko': 'linear-gradient(to top, #413B37, #332E40)',
        // 'gradient-btn-primary': 'linear-gradient(to left, #E8E215, #ACA81F)',
        'gradient-btn-hover': 'linear-gradient(to left, #F5F3B5, #E8E215)',
        'gradient-btn-primary-disable': 'linear-gradient(to left, #E8E215, #ACA81F)',
        'gradient-btn-primary-focus': 'linear-gradient(to left, #E8E215, #ACA81F)',
        // 'gradient-btn-secondary': 'linear-gradient(to left, #E8E215, #ACA81F)',
        'gradient-btn-secondary-disable': 'linear-gradient(to left, #E8E215, #ACA81F)',
        'gradient-input': 'radial-gradient(circle, #645E5A, #9F9C9A)',
        'gradient-input-file': 'linear-gradient(90deg,  #332E29, #645E5A)',
        'gradient-input-file-filled': 'linear-gradient(90deg,  #ACA81F26, #E8E21526)',
        'gradient-progress-bar': 'linear-gradient(to top, #E8E215, #F5F3B5)',
        'background-mobile': "url('../public/images/background-mobile.png')", 
        'background-tablet': "url('../public/images/background-tablet.png')",
        'background-desktop': "url('../public/images/background-desktop.png')",  
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      backgroundImage: {
        'gradient-btn-primary': 'linear-gradient(to left, #E8E215, #ACA81F)',
      },
      themes: {
        light: {
          colors: {
            'primary': '#E8E215', 
            'white': '#FAFAFA'
          }
        }
      }
    }),
  ],
}
