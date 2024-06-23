import{a as y,i as a}from"./assets/vendor-1c96f17f.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();async function h(t){const s={key:"7794456-14148324ae4ced2c6e82d12c0",image_type:"photo",orientation:"horizontal",safesearch:!0,...t};return(await y.get("https://pixabay.com/api/",{method:"GET",params:s})).data}const d=document.querySelector("#search-form"),l=document.querySelector(".gallery"),c=document.querySelector("#load-more"),p=40;let u=1;d.addEventListener("submit",g);c.addEventListener("click",b);function g(t){t.preventDefault();const s=t.currentTarget.elements.searchQuery.value.trim();if(u=1,l.innerHTML="",c.style.display="none",!s){a.error({title:"Error",message:"Enter search query"});return}f({searchQuery:s,page:1,per_page:p})}function b(){u+=1,c.style.display="none",f({searchQuery:d.elements.searchQuery.value.trim(),page:u,per_page:p},!0)}async function f(t,s=!1){const{searchQuery:i,page:n,per_page:e}=t;try{const r=await h({q:i,page:n,per_page:e});if(r.total===0){a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again."});return}s||a.success({title:"Success",message:`Hooray! We found ${r.totalHits} images.`}),r.totalHits>n*e?c.style.display="flex":a.error({title:"Error",message:"We're sorry, but you've reached the end of search results."});const o=r.hits.map(m=>v(m)).join("");if(s){l.insertAdjacentHTML("beforeend",o);return}l.innerHTML=o}catch(r){a.error({title:"Error",message:r.message})}}function v(t){return`
    <div class="photo-card">
      <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${t.likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${t.views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${t.comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${t.downloads}</span>
        </p>
      </div>
    </div>`}
//# sourceMappingURL=commonHelpers.js.map
