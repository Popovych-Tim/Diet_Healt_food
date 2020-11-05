let persone = {
   name: 'alex',
   tel: '+949218492',
   parents: {
      mom: 'olga',
      dad: 'mike'
   }
};

const cloneOne = persone,
      cloneTwo = JSON.parse(JSON.stringify(persone));


console.log(persone.parents);        
console.log(cloneTwo.parents); 

cloneOne.parents.mom = 'anna';
cloneTwo.parents.mom = 'elsa';
console.log(persone.parents);        

persone.parents.mom = 'inna';
console.log(persone.parents);    
console.log(cloneTwo.parents);        
