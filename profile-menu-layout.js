(() => {
  const COMPANY_NAME = 'IntelliStack Systems';
  const COMPANY_DESCRIPTION = 'A multi-layered, multi-tiered IT security and operations platform bringing network monitoring, security help desk, collaboration, governance, and enterprise workflows into one connected command center.';

  const STYLE_ID = 'intellistack-profile-menu-layout';
  const PROFILE_ID = 'intellistack-profile-company-block';
  const MENU_ID = 'intellistack-profile-menu-button';

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .topbar-redesigned > .topbar-main-row { display: none !important; }
      #${PROFILE_ID} { display:grid; grid-template-columns:auto minmax(0,1fr) auto; align-items:center; gap:12px; margin-bottom:10px; }
      #${PROFILE_ID} .profile-company-menu { display:grid; place-items:center; width:38px; height:38px; flex:0 0 38px; border:1px solid rgba(83,214,255,.28); border-radius:10px; background:rgba(17,35,59,.66); color:#dcecff; cursor:pointer; }
      #${PROFILE_ID} .profile-company-menu:hover { border-color:rgba(83,214,255,.65); background:rgba(22,68,100,.48); }
      #${PROFILE_ID} .profile-company-copy { min-width:0; }
      #${PROFILE_ID} .profile-company-name { margin:0; color:#f1f7ff; font-size:clamp(15px,1.7vw,20px); font-weight:850; letter-spacing:-.02em; }
      #${PROFILE_ID} .profile-company-description { margin:3px 0 0; max-width:900px; color:#9fb4d0; font-size:10px; line-height:1.55; }
      #${PROFILE_ID} .profile-company-label { color:#7fdcff; font-size:8px; font-weight:850; letter-spacing:1px; }
      @media(max-width:650px){
        #${PROFILE_ID}{grid-template-columns:auto minmax(0,1fr);gap:9px;align-items:start}
        #${PROFILE_ID} .profile-company-description{font-size:9px}
        #${PROFILE_ID} .profile-company-menu{width:36px;height:36px;flex-basis:36px}
      }
    `;
    document.head.appendChild(style);
  }

  function apply() {
    const header = document.querySelector('.topbar-redesigned');
    const banner = document.querySelector('.workspace-profile-banner');
    if (!header || !banner) return;

    installStyles();

    const oldRow = header.querySelector('.topbar-main-row');
    if (oldRow) oldRow.setAttribute('aria-hidden', 'true');

    let block = banner.querySelector('#' + PROFILE_ID);
    if (!block) {
      block = document.createElement('div');
      block.id = PROFILE_ID;
      block.setAttribute('aria-label', 'Company and navigation');
      const menu = document.createElement('button');
      menu.id = MENU_ID;
      menu.className = 'profile-company-menu';
      menu.type = 'button';
      menu.setAttribute('aria-label', 'Open navigation menu');
      menu.title = 'Open navigation menu';
      menu.innerHTML = '<span aria-hidden="true">☰</span>';
      menu.addEventListener('click', () => {
        const original = document.querySelector('.topbar-main-row .topbar-menu-button, .topbar-main-row .mobile-menu');
        if (original) original.click();
      });

      const copy = document.createElement('div');
      copy.className = 'profile-company-copy';
      copy.innerHTML = `<div class="profile-company-label">YOUR COMPANY · OPTIMUS MAXIMUS</div><h3 class="profile-company-name"></h3><p class="profile-company-description"></p>`;
      copy.querySelector('.profile-company-name').textContent = COMPANY_NAME;
      copy.querySelector('.profile-company-description').textContent = COMPANY_DESCRIPTION;

      block.append(menu, copy);
      banner.prepend(block);
    }
  }

  const observer = new MutationObserver(() => apply());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
  else apply();
})();
