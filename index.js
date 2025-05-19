import{a as p,S as y,i as s}from"./assets/vendor-BLPZKqeQ.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const g="50377156-76a0d970257c0a39042cd42de",h="https://pixabay.com/api/";function b(o){return new Promise(r=>setTimeout(r,o))}async function L(o){try{return await b(2e3),(await p.get(`${h}`,{params:{key:g,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}catch(r){throw console.error("Error fetching images:",r),r}}const d=document.querySelector(".gallery");let c;function q(o){const r=o.map(({webformatURL:i,largeImageURL:n,tags:e,likes:t,views:a,comments:f,downloads:m})=>`
            <li class="gallery-item">
                <a href="${n}">
                    <img class="gallery-image" src="${i}" alt="${e}" loading="lazy" />
                    <div class="info">
                        <p class="info-item"><b>Likes</b> ${t}</p>
                        <p class="info-item"><b>Views</b> ${a}</p>
                        <p class="info-item"><b>Comments</b> ${f}</p>
                        <p class="info-item"><b>Downloads</b> ${m}</p>
                    </div>
                </a>
            </li>
        `).join("");d.innerHTML=r,c?c.refresh():c=new y(".gallery a")}function w(){d.innerHTML=""}function S(){document.querySelector(".loader-container").classList.add("is-loading")}function u(){document.querySelector(".loader-container").classList.remove("is-loading")}const l=document.querySelector(".search-form"),P=l.querySelector('input[name="search-text"]');document.querySelector(".gallery");l.addEventListener("submit",async o=>{o.preventDefault();const r=P.value.trim();if(!r){s.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}w(),S();try{const i=await L(r);u(),i.hits.length>0?q(i.hits):s.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}catch(i){u(),s.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"}),console.error(i)}finally{l.reset()}});
//# sourceMappingURL=index.js.map
