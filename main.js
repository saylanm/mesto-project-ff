(()=>{"use strict";var e=document.querySelector("#card-template");function t(e){e.target.classList.toggle("card__like-button_is-active")}function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function o(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}function c(e,t,n){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.inputErrorClass),r.classList.remove(e.errorClass),r.textContent=""}function a(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))}function i(e,t,n,r){t.forEach((function(t){c(e,r,t),t.value=""})),a(e,t,n)}var u={baseUrl:"https://nomoreparties.co/v1/wff-cohort-14",headers:{authorization:"4b1fefa3-9f63-465e-b242-9eeac7bfd3bb","Content-Type":"application/json"}},s={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"submit_inactive",inputErrorClass:"popup__input_type_error",errorClass:"input-error_active"};function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var d=document.forms["edit-profile"],p=document.forms["new-place"],f=document.querySelectorAll(".popup"),m=document.querySelector(".places__list"),_=document.querySelector(".profile__edit-button"),y=document.querySelector(".popup_type_edit"),h=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_new-card"),b=d.elements.name,S=d.elements.description,g=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),q=document.querySelector(".popup_type_image"),L=document.querySelector(".popup__image"),E=document.querySelector(".popup__caption"),C=document.querySelectorAll(".popup__form"),j=Array.from(d.querySelectorAll(".popup__input")),A=d.querySelector(".popup__button"),w=Array.from(p.querySelectorAll(".popup__input")),x=p.querySelector(".popup__button"),P=document.querySelector(".profile__image"),U=p.elements["place-name"],T=p.elements.link,O=document.querySelector(".popup_type_question"),B=document.querySelector(".popup_type_question .button"),M=document.querySelector(".popup_type_new-avatar"),N=document.querySelector(".profile__image"),D=document.forms["edit-avatar"],H=D.elements.link,I=D.querySelector(".popup__button");function J(r,o){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"prepend",a=function(t,n,r){var o=e.content.cloneNode(!0),c=o.querySelector(".card__image");return o.querySelector(".card__title").textContent=t,c.src=n,c.alt=t,c.addEventListener("click",r),o}(r.name,r.link,V),i=a.querySelector(".card__delete-button"),s=a.querySelector(".card__like-button");r.owner._id!==o&&i.setAttribute("style","display: none"),r.likes.length>0&&(s.dataset.after=r.likes.length),function(e,t){return e.likes.some((function(e){return e._id===t}))}(r,o)&&s.classList.add("card__like-button_is-active"),i.addEventListener("click",(function(e){return function(e,t,r){n(O),B.addEventListener("click",(function(){return z(e,t,r)}))}(r,o,e)})),s.addEventListener("click",(function(e){return function(e,n,r){r.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(u.baseUrl+"/cards/likes/"+e),{method:"DELETE",headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(e).then((function(e){0==e.likes.length?r.dataset.after="":r.dataset.after=e.likes.length,t(n)})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(u.baseUrl+"/cards/likes/"+e),{method:"PUT",headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(e).then((function(e){r.dataset.after=e.likes.length,t(n)})).catch((function(e){return console.log(e)}))}(r._id,e,s)})),m[c](a)}function V(e){e.target.classList.contains("card__image")&&(n(q),L.src=e.target.src,L.alt=e.target.alt,E.textContent=e.target.alt)}function z(e,t,n){var o;e.owner._id===t&&(o=e._id,fetch("".concat(u.baseUrl+"/cards/"+o),{method:"DELETE",headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){n.target.closest(".card").remove(),B.removeEventListener("click",(function(){return z(e,t,n)})),r(O)})).catch((function(e){return console.log(e)}))}function $(e,t){e.preventDefault(),t.innerHTML="Сохранение<span>.</span><span>.</span><span>.</span>",t.querySelectorAll("span").forEach((function(e){e.style.display="inline-block"}))}Promise.all([fetch("".concat(u.baseUrl,"/users/me"),{headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(u.baseUrl,"/cards"),{headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0];r[1].forEach((function(e){J(e,o._id,"append")})),function(e){P.src=e.avatar,g.textContent=e.name,k.textContent=e.about}(o)})).catch((function(e){return console.log(e)})),_.addEventListener("click",(function(){n(y),i(s,j,A,d),b.value=g.textContent,S.value=k.textContent,A.disabled=!1,A.classList.remove("submit_inactive")})),d.addEventListener("submit",(function(e){return function(e){$(e,A),function(e,t){return fetch("".concat(u.baseUrl,"/users/me"),{method:"PATCH",headers:u.headers,body:JSON.stringify({name:e.value,about:t.value})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(b,S).then((function(e){g.textContent=e.name,k.textContent=e.about,A.textContent="Сохранить",r(y)})).catch((function(e){return console.log(e)}))}(e)})),h.addEventListener("click",(function(){n(v),i(s,w,x,p)})),p.addEventListener("submit",(function(e){!function(e){$(e,x),function(e,t){return fetch("".concat(u.baseUrl,"/cards"),{method:"POST",headers:u.headers,body:JSON.stringify({name:e.value,link:t.value})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(U,T).then((function(e){J(e,e.owner._id),x.textContent="Сохранить",r(v)})).catch((function(e){return console.log(e)}))}(e)})),N.addEventListener("click",(function(){n(M),i(s,[H],I,D)})),D.addEventListener("submit",(function(e){var t;$(e,I),(t=H,fetch("".concat(u.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:u.headers,body:JSON.stringify({avatar:t.value})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){N.src=e.avatar,I.textContent="Сохранить",r(M)})).catch((function(e){return console.log(e)}))})),function(e,t){t.forEach((function(t){!function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?c(e,t,n):function(e,t,n,r){var o=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),o.classList.add(e.errorClass),o.textContent=r}(e,t,n,n.validationMessage)}(e,t,o),a(e,n,r)}))}))}(e,t)}))}(s,C),f.forEach((function(e){e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_is-opened")||t.target.classList.contains("popup__close"))&&r(e)}))}))})();