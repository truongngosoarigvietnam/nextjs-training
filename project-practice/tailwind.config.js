// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      dropShadow: {
        'text': '1px 1px 1px #333'
      },
      backgroundImage: {
        'text':'linear-gradient(rgba(126,126,126,0.25),rgba(255,255,255,0.1))' ,
        'background' : 'linear-gradient(135deg, rgba(34,193,195,1) 0%,  rgba(253,187,45,1) 100%)'
      },
      backgroundColor :{
        'mainColor' : '#0071ba'  ,
        'button' :"#0d6efd"
      },
      colors: {
        GFGtext: '#379237',
        paraBG: '#59C1BD',
        black: '#292929',
},
      boxShadow :{
        'menu' : '2px 2px 4px 0 #0000004d' ,
        'submenu' : '2px 2px 4px 0 #0000004d'

      },
      flex: {
        'col12': '0 0 auto'
      },
      translate :{
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
   
    // ...
  ],
}
