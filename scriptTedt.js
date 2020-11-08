let t = setInterval(()=> {
   setTimeout(() => {
      clearInterval(t);
   },3000);
   console.log('hi');
}, 1000);