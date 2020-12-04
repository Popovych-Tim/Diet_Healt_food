document.addEventListener('DOMContentLoaded', () => {
   //Tabs
   const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

   function hideTabsContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }

   function showTabsContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabsContent();
   showTabsContent();

   tabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabsContent();
               showTabsContent(i);
            }
         });
      }
   });
   //Timer

   const deadline = "2020-12-31";

   let getTimeRemaining = (endtime) => {
      const t = Date.parse(endtime) - Date.parse(new Date()),
         days = Math.floor(t / (1000 * 60 * 60 * 24)),
         hours = Math.floor((t / (1000 * 60 * 60) % 24)),
         minutes = Math.floor((t / 1000 / 60) % 60),
         seconds = Math.floor((t / 1000) % 60);

      return {
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   };

   let getZero = (num) => {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   };

   let setClock = (selector, endtime) => {
      const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
         const t = getTimeRemaining(endtime);

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   };

   setClock('.timer', deadline);

   //Modal Call Window

   const modalOpen = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      pageHeight = document.documentElement.scrollHeight;

   let openModalFunc = () => {
      modal.classList.add('show');
      // modal.classList.toggle('show');
      document.body.style.overflow = 'hidden';
      modal.classList.remove('hide');
      clearInterval(modalTimer);
   };

   let closeModalFunc = () => {
      modal.classList.add('hide');
      modal.classList.remove('show');
      // modal.classList.toggle('show');
      document.body.style.overflow = '';
   };

   let showModalByScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight >= pageHeight) {
         openModalFunc();
         window.removeEventListener('scroll', showModalByScroll);
      }
   };

   const modalTimer = setTimeout(openModalFunc, 50000);

   window.addEventListener('scroll', showModalByScroll);

   modalOpen.forEach(btn => {
      btn.addEventListener('click', openModalFunc);
   });

   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') === '') {
         closeModalFunc();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModalFunc();
      }
   });

   // используем Классы для карточек 

   class MenuCard {
      constructor(img, aleterImg, title, descr, price, parentSelector, ...classes) {
         this.img = img;
         this.aleterImg = aleterImg;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
         this.tranfer = 27;
         this.changeCurrency();

      }
      changeCurrency() {
         this.price = this.price * this.tranfer;
      }
      render() {
         const element = document.createElement('div');
         if (this.classes.length === 0) {
            element.classList.add('menu__item');
         } else {
            this.classes.forEach(className => element.classList.add(className));
         }
         element.innerHTML = `
            <img src=${this.img} alt=${this.aleterImg}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
         `;
         this.parent.append(element);
      }
   }

   const getResourse = async (url) => {
      const res = await fetch(url);

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      return await res.json();
   };

   axios.get('http://localhost:3000/menu')
       .then(data => {
         data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
         });
      });

   // getResourse('http://localhost:3000/menu')
   //    .then(data => {
   //       data.forEach(({img, altimg, title, descr, price}) => {
   //          new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
   //       });
   //    });



   // Без Шаблонизации для "постройки" один раз:

   // getResourse('http://localhost:3000/menu')
   //    .then(data => createCard(data));

   // function createCard (data) {
   //    data.forEach(({img, altimg, title, descr, price}) => {
   //       const element = document.createElement('div');
   //          price = price * 27; // or put a function here
   //       element.classList.add('menu__item');

   //       element.innerHTML = `
   //          <img src=${img} alt=${altimg}>
   //          <h3 class="menu__item-subtitle">${title}</h3>
   //          <div class="menu__item-descr">${descr}</div>
   //          <div class="menu__item-divider"></div>
   //          <div class="menu__item-price">
   //             <div class="menu__item-cost">Цена:</div>
   //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
   //          </div>
   //       `;

   //       document.querySelector('.menu .container').append(element);
   //    });
   // }

   //Forms

   const message = {
      loading: 'img/form/spinner.svg',
      success: 'We will call You soon!',
      failure: 'error'
   };

   const forms = document.querySelectorAll('form');

   forms.forEach(item => {
      bindPostData(item);
   });

   const postData = async (url, data) => {
      const res = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-type': 'application/json'
         },
         body: data
      });

      return await res.json();
   };

   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         const statusMessage = document.createElement('img');

         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;  
         `;
         form.insertAdjacentElement('afterend', statusMessage);

         const formData = new FormData(form);

         // fetch('server.php', {
         //    method: 'POST',
         //    body: formData
         // }).then(data => data.text())
         // .then(data =>{
         //    console.log(data);
         //    showThanksModal(message.success);
         //    statusMessage.remove();
         // })
         // .catch(() => {
         //    showThanksModal(message.failure);
         // })
         // .finally(() => {
         //    form.reset();
         // });

         // For JSON request 

         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         postData('http://localhost:3000/requests', json)
            .then(data => {
               console.log(data);
               showThanksModal(message.success);
               statusMessage.remove();
            })
            .catch(() => {
               showThanksModal(message.failure);
            })
            .finally(() => {
               form.reset();
            });
         /* */
      });
   }

   function showThanksModal(message) {
      const prevModal = document.querySelector('.modal__dialog');

      prevModal.classList.add('hide');
      openModalFunc();

      const thanksWrapper = document.createElement('div');

      thanksWrapper.classList.add('modal__dialog');
      thanksWrapper.innerHTML = `
         <div class="modal__content">
            <div  class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
         </div>
      `;

      document.querySelector('.modal').append(thanksWrapper);
      setTimeout(() => {
         thanksWrapper.remove();
         prevModal.classList.add('show');
         prevModal.classList.remove('hide');
         closeModalFunc();
      }, 5000);
   }

   // fetch('http://localhost:3000/menu')
   //    .then(data => data.json())
   //    .then(res => console.log(res));
});