// Shared dashboard chrome + page styles, scoped under .fithub-app.
// Used by both the student and trainer dashboards.
export const DASHBOARD_CSS = `
  :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #f6f8fc; color: #182338; }
  button { font: inherit; }
  .fithub-app { --ink: #182338; --muted: #778196; --border: #e8edf5; --blue: #4968e8; --navy: #17233e; min-height: 100vh; background: #f6f8fc; }
  .topbar { align-items: center; background: rgba(255,255,255,.94); border-bottom: 1px solid var(--border); display: flex; height: 76px; justify-content: space-between; left: 258px; padding: 0 42px; position: fixed; right: 0; top: 0; z-index: 20; }
  .topbar-left, .topbar-actions, .profile-menu, .stat-value-row { align-items: center; display: flex; }
  .topbar-left { gap: 25px; }
  .breadcrumb { align-items: center; color: var(--ink); display: flex; font-size: 13px; gap: 10px; }
  .breadcrumb-muted, .breadcrumb-divider { color: #9aa3b5; }
  .icon-button { align-items: center; background: transparent; border: 0; border-radius: 10px; color: #68748b; cursor: pointer; display: inline-flex; height: 38px; justify-content: center; padding: 0; position: relative; transition: .2s ease; width: 38px; }
  .icon-button:hover { background: #f0f3fb; color: var(--blue); }
  .menu-button { display: none; }
  .topbar-actions { gap: 8px; }
  .notification-button { margin-right: 15px; }
  .notification-dot { background: #f07866; border: 2px solid white; border-radius: 50%; height: 8px; position: absolute; right: 7px; top: 7px; width: 8px; }
  .profile-menu { border-left: 1px solid var(--border); gap: 10px; padding-left: 23px; }
  .profile-menu > svg { color: #8e98aa; margin-left: 5px; }
  .profile-copy { display: flex; flex-direction: column; gap: 2px; }
  .profile-copy strong { color: #27344b; font-size: 12px; font-weight: 700; }
  .profile-copy span { color: #99a2b3; font-size: 11px; }
  .avatar { align-items: center; background: #dce5ff; border-radius: 50%; color: #4a62c5; display: inline-flex; font-weight: 800; justify-content: center; }
  .avatar-small { font-size: 11px; height: 36px; width: 36px; }
  .logout-button { background: transparent; border: 1px solid var(--border); border-radius: 9px; color: #77839a; cursor: pointer; font-size: 11px; font-weight: 700; margin-left: 16px; padding: 9px 13px; transition: .2s ease; }
  .logout-button:hover { background: #fdeeec; border-color: #f3cdc6; color: #d9614f; }

  .sidebar { background: var(--navy); bottom: 0; color: white; display: flex; flex-direction: column; left: 0; padding: 27px 17px 18px; position: fixed; top: 0; width: 258px; z-index: 30; }
  .brand-lockup { align-items: center; display: flex; gap: 11px; padding: 0 12px; }
  .brand-lockup > div:last-child { display: flex; flex-direction: column; gap: 3px; }
  .brand-lockup strong { color: #fff; font-size: 15px; letter-spacing: -.2px; }
  .brand-lockup span:not(.brand-mark span) { color: #8895b0; font-size: 10px; }
  .brand-mark { align-items: center; background: linear-gradient(145deg, #6688ff, #435dd6); border-radius: 11px; box-shadow: 0 8px 18px rgba(43,70,173,.35); display: flex; height: 38px; justify-content: center; width: 38px; }
  .brand-mark span { color: white; font-size: 12px; font-weight: 900; letter-spacing: -.6px; }
  .sidebar-section-label { color: #687795; font-size: 10px; font-weight: 800; letter-spacing: .12em; margin: 45px 12px 12px; text-transform: uppercase; }
  .sidebar-section-label-spaced { margin-top: 35px; }
  .sidebar-nav { display: flex; flex-direction: column; gap: 4px; }
  .nav-item { align-items: center; background: transparent; border: 0; border-radius: 10px; color: #97a5c1; cursor: pointer; display: flex; font-size: 12px; gap: 14px; padding: 12px 13px; position: relative; text-align: left; transition: .2s ease; width: 100%; }
  .nav-item:hover { background: rgba(255,255,255,.06); color: #e5eaff; }
  .nav-item.active { background: rgba(87,112,230,.2); color: #fff; font-weight: 700; }
  .nav-item.active svg { color: #91a7ff; }
  .active-indicator { background: #7890ff; border-radius: 2px; height: 19px; position: absolute; right: 0; width: 3px; }
  .sidebar-bottom-card { align-items: center; background: linear-gradient(135deg, rgba(85,110,226,.3), rgba(50,70,139,.15)); border: 1px solid rgba(141,158,255,.12); border-radius: 12px; display: flex; gap: 9px; margin: auto 5px 15px; padding: 12px 10px; }
  .mini-card-icon { align-items: center; background: rgba(133,154,255,.18); border-radius: 8px; color: #aabdff; display: flex; height: 29px; justify-content: center; width: 29px; }
  .sidebar-bottom-card > div:nth-child(2) { display: flex; flex: 1; flex-direction: column; gap: 3px; }
  .sidebar-bottom-card strong { color: #e9edff; font-size: 11px; }
  .sidebar-bottom-card span { color: #96a5d0; font-size: 9px; }
  .sidebar-bottom-card > svg { color: #96a5d0; }
  .sidebar-footer { color: #60708f; font-size: 9px; padding: 0 8px; }
  .sidebar-footer span { color: #8491ac; padding: 0 3px; }
  .sidebar-overlay { display: none; }

  .main-content { margin-left: 258px; min-height: 100vh; padding: 76px 42px 45px; }
  .dashboard-container { margin: 0 auto; max-width: 1390px; }
  .welcome-row { align-items: flex-end; display: flex; justify-content: space-between; padding: 38px 1px 28px; }
  .eyebrow { color: #7c89a0; font-size: 11px; font-weight: 700; letter-spacing: .08em; margin: 0 0 9px; text-transform: uppercase; }
  .welcome-row h1 { color: var(--ink); font-size: clamp(24px, 3vw, 30px); letter-spacing: -.8px; line-height: 1.15; margin: 0; }
  .welcome-row h1 span { color: var(--blue); }
  .welcome-copy { color: #8994a6; font-size: 12px; margin: 9px 0 0; }
  .date-chip { align-items: center; background: #fff; border: 1px solid var(--border); border-radius: 9px; color: #7c879a; display: flex; font-size: 11px; gap: 9px; padding: 10px 13px; }
  .date-chip svg { color: #6a80e3; }
  .grid-4 { display: grid; gap: 15px; grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .stat-card { background: #fff; border: 1px solid var(--border); border-radius: 12px; min-height: 150px; padding: 18px 18px 16px; }
  .stat-icon { align-items: center; border-radius: 9px; display: flex; height: 35px; justify-content: center; margin-bottom: 15px; width: 35px; }
  .stat-icon.blue { background: #e8edff; color: #536fe5; }
  .stat-icon.orange { background: #fff0e2; color: #ed984b; }
  .stat-icon.violet { background: #f0eafd; color: #8a6bd4; }
  .stat-icon.green { background: #e4f7f0; color: #3aa77b; }
  .stat-label { color: #7c879a; font-size: 11px; }
  .stat-value-row { gap: 10px; margin-top: 4px; }
  .stat-value-row strong { color: #202c43; font-size: 25px; letter-spacing: -.7px; }
  .trend { align-items: center; color: #3aa77b; display: inline-flex; font-size: 10px; font-weight: 700; gap: 2px; }
  .stat-detail { color: #a1a9b8; font-size: 10px; margin-top: 3px; }
  .content-grid { display: grid; gap: 15px; grid-template-columns: minmax(0, 1.25fr) minmax(300px, .75fr); margin-top: 15px; }
  .panel { background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 22px; }
  .panel-header { align-items: flex-start; display: flex; justify-content: space-between; }
  .panel-title { color: #253149; font-size: 14px; font-weight: 800; margin: 0; }
  .panel-subtitle { color: #9ca5b4; font-size: 10px; margin: 5px 0 0; }
  .panel-link { align-items: center; background: transparent; border: 0; color: #5b73dc; cursor: pointer; display: inline-flex; font-size: 10px; gap: 5px; padding: 3px; }

  .occupancy-panel { min-height: 225px; }
  .occupancy-status { align-items: center; display: flex; gap: 7px; }
  .status-dot { background: #48bc8d; border-radius: 50%; box-shadow: 0 0 0 4px #e5f7ef; height: 7px; width: 7px; }
  .status-dot.red { background: #ec6a58; box-shadow: 0 0 0 4px #fdece8; }
  .occupancy-status span:last-child { color: #3ea77e; font-size: 10px; font-weight: 800; }
  .occupancy-status.full span:last-child { color: #d9614f; }
  .occupancy-main { align-items: center; display: flex; gap: 30px; margin-top: 27px; }
  .occupancy-ring { align-items: center; background: conic-gradient(#5772e7 var(--ring-deg, 137deg), #eef1f7 0); border-radius: 50%; display: flex; height: 128px; justify-content: center; position: relative; width: 128px; }
  .occupancy-ring:before { background: #fff; border-radius: 50%; content: ''; height: 102px; position: absolute; width: 102px; }
  .ring-copy { align-items: center; display: flex; flex-direction: column; position: relative; }
  .ring-copy strong { color: #253149; font-size: 28px; letter-spacing: -1px; line-height: 1; }
  .ring-copy span { color: #99a3b3; font-size: 10px; margin-top: 5px; }
  .occupancy-copy { flex: 1; }
  .occupancy-copy h3 { color: #26334b; font-size: 15px; margin: 0 0 7px; }
  .occupancy-copy p { color: #8d98aa; font-size: 11px; line-height: 1.6; margin: 0; max-width: 300px; }
  .occupancy-copy strong { color: #29354a; }
  .occupancy-note { align-items: center; color: #9aa4b4; display: flex; font-size: 10px; gap: 6px; margin-top: 17px; }
  .occupancy-note svg { color: #93a0b6; }
  .chart-panel { min-height: 225px; }
  .chart-legend { align-items: center; color: #94a0b1; display: flex; font-size: 10px; gap: 6px; }
  .legend-dot { background: #6c85ee; border-radius: 50%; height: 6px; width: 6px; }
  .bars { align-items: flex-end; display: flex; gap: 14px; height: 130px; margin-top: 25px; padding: 0 4px; }
  .bar-column { align-items: center; cursor: pointer; display: flex; flex: 1; flex-direction: column; height: 100%; justify-content: flex-end; }
  .bar-track { align-items: flex-end; background: #f1f3f8; border-radius: 6px 6px 3px 3px; display: flex; height: 105px; overflow: hidden; width: 100%; }
  .bar-fill { background: linear-gradient(180deg, #758bf2, #536fe5); border-radius: 6px 6px 3px 3px; min-height: 7px; transition: .25s ease; width: 100%; }
  .bar-column:hover .bar-fill, .bar-column.selected .bar-fill { background: linear-gradient(180deg, #304fc7, #6c85ee); }
  .bar-label { color: #9da6b6; font-size: 9px; margin-top: 9px; }
  .bar-column.selected .bar-label { color: #5069d9; font-weight: 800; }

  .quick-actions { display: grid; gap: 10px; grid-template-columns: repeat(3, 1fr); margin-top: 15px; }
  .quick-action { align-items: center; background: #fff; border: 1px solid var(--border); border-radius: 12px; cursor: pointer; display: flex; gap: 11px; min-height: 76px; padding: 13px 15px; text-align: left; transition: .2s ease; }
  .quick-action:hover { border-color: #cfd8fb; box-shadow: 0 8px 22px rgba(44,64,125,.06); transform: translateY(-1px); }
  .quick-action-icon { align-items: center; border-radius: 9px; display: flex; flex: 0 0 35px; height: 35px; justify-content: center; }
  .quick-action-icon.blue { background: #e8edff; color: #536fe5; }
  .quick-action-icon.orange { background: #fff0e2; color: #e79442; }
  .quick-action-icon.green { background: #e4f7f0; color: #32a276; }
  .quick-action-icon.violet { background: #f0eafd; color: #8a6bd4; }
  .quick-action-copy { display: flex; flex: 1; flex-direction: column; gap: 4px; }
  .quick-action-copy strong { color: #2a354c; font-size: 11px; }
  .quick-action-copy small { color: #9ba4b3; font-size: 9px; }
  .quick-action-arrow { color: #a1aaba; }
  .lower-grid { display: grid; gap: 15px; grid-template-columns: minmax(0, 1.25fr) minmax(300px, .75fr); margin-top: 15px; }
  .upcoming-list { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
  .upcoming-item { align-items: center; display: flex; gap: 12px; }
  .event-date { align-items: center; background: #f1f3ff; border-radius: 8px; display: flex; flex: 0 0 39px; flex-direction: column; height: 42px; justify-content: center; }
  .event-date.violet { background: #f1edff; color: #8269d2; }
  .event-date.blue { background: #eaf0ff; color: #5b76e2; }
  .event-date.orange { background: #fff1e4; color: #e7994e; }
  .event-date strong { font-size: 14px; line-height: 1; }
  .event-date span { font-size: 7px; font-weight: 800; margin-top: 3px; }
  .event-copy { display: flex; flex: 1; flex-direction: column; gap: 4px; }
  .event-copy strong { color: #303b51; font-size: 11px; }
  .event-copy span { color: #9aa4b4; font-size: 9px; }
  .event-type { border-radius: 5px; font-size: 8px; font-weight: 800; padding: 5px 7px; }
  .event-type.violet { background: #f4f1ff; color: #8269d2; }
  .event-type.blue { background: #eef3ff; color: #5c77de; }
  .event-type.orange { background: #fff5ea; color: #dd9147; }
  .equipment-list { display: flex; flex-direction: column; gap: 16px; margin-top: 21px; }
  .equipment-row { align-items: center; display: flex; gap: 10px; }
  .equipment-row > svg { color: #8591a6; }
  .equipment-copy { flex: 1; }
  .equipment-copy strong { color: #354057; display: block; font-size: 10px; font-weight: 700; margin-bottom: 6px; }
  .progress-track { background: #eff2f7; border-radius: 4px; height: 5px; overflow: hidden; width: 100%; }
  .progress-fill { border-radius: 4px; height: 100%; }
  .progress-fill.green { background: #51bd91; }.progress-fill.orange { background: #f0a159; }.progress-fill.red { background: #ed7c77; }.progress-fill.blue { background: #5a76e6; }
  .equipment-count { color: #8994a6; font-size: 9px; white-space: nowrap; }
  .equipment-count strong { color: #38445b; font-size: 11px; }
  .toast { align-items: center; background: #25345d; border-radius: 9px; bottom: 25px; box-shadow: 0 10px 30px rgba(23,35,62,.2); color: #fff; display: flex; font-size: 11px; gap: 8px; left: 50%; padding: 12px 16px; position: fixed; transform: translateX(-50%); z-index: 100; }
  .toast svg { color: #8fa6ff; }

  /* ---- Shared sub-page building blocks ---- */
  .page-head { padding: 38px 1px 6px; }
  .page-head h1 { color: var(--ink); font-size: clamp(23px, 3vw, 29px); letter-spacing: -.7px; margin: 6px 0 0; }
  .page-head p.page-sub { color: #8994a6; font-size: 12px; margin: 9px 0 0; max-width: 620px; }
  .page-section { margin-top: 22px; }
  .grid-2 { display: grid; gap: 15px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-3 { display: grid; gap: 15px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .section-title { color: #253149; font-size: 15px; font-weight: 800; margin: 0 0 3px; }
  .section-sub { color: #9ca5b4; font-size: 11px; margin: 0 0 16px; }

  .tabs { background: #eef1f8; border-radius: 10px; display: inline-flex; gap: 4px; margin: 18px 0 4px; padding: 4px; }
  .tab { background: transparent; border: 0; border-radius: 7px; color: #7a8499; cursor: pointer; font-size: 11px; font-weight: 700; padding: 8px 15px; transition: .18s ease; }
  .tab.active { background: #fff; box-shadow: 0 2px 6px rgba(40,60,120,.08); color: #384768; }
  .tab:hover:not(.active) { color: #4a5c86; }

  .btn { align-items: center; background: var(--blue); border: 0; border-radius: 9px; color: #fff; cursor: pointer; display: inline-flex; font-size: 11px; font-weight: 700; gap: 7px; justify-content: center; padding: 11px 16px; transition: .2s ease; }
  .btn:hover { background: #3a58d8; box-shadow: 0 8px 18px rgba(58,88,216,.22); }
  .btn.ghost { background: #eef2fb; color: #4a5c86; }
  .btn.ghost:hover { background: #e2e9f8; box-shadow: none; }
  .btn.sm { font-size: 10px; padding: 8px 12px; border-radius: 8px; }
  .btn.full { width: 100%; }
  .btn:disabled { background: #dfe4ee; color: #9aa3b5; cursor: not-allowed; box-shadow: none; }

  .field { display: flex; flex-direction: column; gap: 7px; }
  .field label { color: #56617a; font-size: 11px; font-weight: 700; }
  .text-input, .select { background: #f7f9fc; border: 1px solid #e4e9f2; border-radius: 9px; color: #29344b; font-size: 12px; outline: none; padding: 11px 13px; transition: .18s ease; width: 100%; }
  .text-input:focus, .select:focus { background: #fff; border-color: #b9c6f4; box-shadow: 0 0 0 3px rgba(90,118,230,.12); }
  .form-grid { display: grid; gap: 14px; grid-template-columns: 1fr 1fr; margin-top: 6px; }

  .list { display: flex; flex-direction: column; gap: 10px; margin-top: 18px; }
  .list-row { align-items: center; background: #fff; border: 1px solid var(--border); border-radius: 11px; display: flex; gap: 14px; padding: 14px 16px; transition: .18s ease; }
  .list-row:hover { border-color: #d6def6; box-shadow: 0 7px 18px rgba(44,64,125,.05); }
  .list-row .row-icon { align-items: center; background: #eef2ff; border-radius: 9px; color: #556fe0; display: flex; flex: 0 0 40px; height: 40px; justify-content: center; }
  .list-row .row-main { flex: 1; min-width: 0; }
  .list-row .row-main strong { color: #2c3852; display: block; font-size: 12px; }
  .list-row .row-main span { color: #93a0b6; font-size: 10px; }
  .list-row .row-meta { color: #7c879a; font-size: 11px; text-align: right; white-space: nowrap; }
  .list-row .row-meta strong { color: #36435c; display: block; font-size: 12px; }

  .tag { border-radius: 6px; display: inline-block; font-size: 9px; font-weight: 800; letter-spacing: .02em; padding: 5px 8px; text-transform: uppercase; }
  .tag.blue { background: #eaf0ff; color: #5570df; }
  .tag.green { background: #e3f6ee; color: #35a279; }
  .tag.orange { background: #fff2e3; color: #dd9147; }
  .tag.violet { background: #f2edfe; color: #8368d4; }
  .tag.red { background: #fdece8; color: #d9614f; }
  .tag.grey { background: #eef1f6; color: #7a8398; }

  .card-grid { display: grid; gap: 15px; grid-template-columns: repeat(auto-fill, minmax(275px, 1fr)); margin-top: 18px; }
  .info-card { background: #fff; border: 1px solid var(--border); border-radius: 13px; display: flex; flex-direction: column; gap: 12px; padding: 20px; transition: .18s ease; }
  .info-card:hover { border-color: #d6def6; box-shadow: 0 10px 24px rgba(44,64,125,.06); transform: translateY(-1px); }
  .info-card .ic-head { align-items: center; display: flex; gap: 12px; }
  .info-card .ic-avatar { align-items: center; border-radius: 11px; color: #fff; display: flex; flex: 0 0 46px; font-size: 15px; font-weight: 800; height: 46px; justify-content: center; }
  .info-card h4 { color: #29344b; font-size: 13px; margin: 0; }
  .info-card .ic-role { color: #93a0b6; font-size: 10px; margin-top: 3px; }
  .info-card p.ic-body { color: #8d98aa; font-size: 11px; line-height: 1.6; margin: 0; }
  .info-card .ic-foot { align-items: center; border-top: 1px solid #f0f3f9; display: flex; justify-content: space-between; margin-top: 2px; padding-top: 13px; }
  .rating { align-items: center; color: #e0a63c; display: inline-flex; font-size: 11px; font-weight: 800; gap: 4px; }

  .exercise-item { align-items: center; background: #fff; border: 1px solid var(--border); border-radius: 11px; display: flex; gap: 13px; padding: 13px 15px; }
  .exercise-item .ex-check { align-items: center; background: #eef2ff; border: 0; border-radius: 8px; color: #566fe0; cursor: pointer; display: flex; flex: 0 0 34px; height: 34px; justify-content: center; transition: .18s ease; }
  .exercise-item.done .ex-check { background: #e3f6ee; color: #35a279; }
  .exercise-item .ex-main { flex: 1; }
  .exercise-item .ex-main strong { color: #2c3852; display: block; font-size: 12px; }
  .exercise-item.done .ex-main strong { color: #9aa4b4; text-decoration: line-through; }
  .exercise-item .ex-main span { color: #93a0b6; font-size: 10px; }

  .empty-state { align-items: center; color: #9aa4b4; display: flex; flex-direction: column; gap: 10px; font-size: 12px; padding: 40px 20px; text-align: center; }
  .empty-state svg { color: #c2cbdb; }

  .line-chart { margin-top: 22px; position: relative; }
  .line-chart svg { display: block; height: 200px; width: 100%; }
  .metric-row { display: flex; gap: 22px; margin-top: 18px; }
  .metric { flex: 1; }
  .metric .m-label { color: #93a0b6; font-size: 10px; }
  .metric .m-value { color: #26334b; font-size: 22px; font-weight: 800; letter-spacing: -.6px; margin-top: 4px; }
  .metric .m-delta { color: #35a279; font-size: 10px; font-weight: 700; margin-top: 2px; }

  .badge-grid { display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); margin-top: 18px; }
  .badge-card { align-items: center; background: #fff; border: 1px solid var(--border); border-radius: 12px; display: flex; flex-direction: column; gap: 8px; padding: 20px 14px; text-align: center; }
  .badge-card.locked { opacity: .5; }
  .badge-emoji { font-size: 26px; }
  .badge-card strong { color: #2c3852; font-size: 11px; }
  .badge-card span { color: #96a1b3; font-size: 9px; }

  .leader-row { align-items: center; display: flex; gap: 13px; padding: 12px 4px; }
  .leader-row + .leader-row { border-top: 1px solid #f0f3f9; }
  .leader-rank { align-items: center; background: #eef1f8; border-radius: 8px; color: #6a7690; display: flex; flex: 0 0 28px; font-size: 11px; font-weight: 800; height: 28px; justify-content: center; }
  .leader-rank.top { background: #fff3db; color: #d59a2e; }
  .leader-row .lr-main { flex: 1; }
  .leader-row .lr-main strong { color: #2c3852; font-size: 12px; }
  .leader-row .lr-main span { color: #93a0b6; display: block; font-size: 10px; }
  .leader-row .lr-score { color: #4a5c86; font-size: 12px; font-weight: 800; }

  .faq-item { border-bottom: 1px solid #eef1f7; padding: 16px 2px; }
  .faq-item summary { color: #2f3b54; cursor: pointer; font-size: 12px; font-weight: 700; list-style: none; }
  .faq-item summary::-webkit-details-marker { display: none; }
  .faq-item p { color: #8b96a9; font-size: 11px; line-height: 1.65; margin: 11px 0 2px; }

  @media (max-width: 1100px) { .topbar { padding: 0 25px; } .main-content { padding-left: 25px; padding-right: 25px; } .occupancy-main { gap: 20px; } .bars { gap: 8px; } }
  @media (max-width: 850px) { .sidebar { box-shadow: 12px 0 30px rgba(11,21,49,.12); transform: translateX(-100%); transition: transform .25s ease; } .sidebar.is-open { transform: translateX(0); } .sidebar-overlay.is-visible { background: rgba(17,27,52,.35); bottom: 0; display: block; left: 0; position: fixed; right: 0; top: 0; z-index: 25; } .topbar { left: 0; } .menu-button { display: inline-flex; } .main-content { margin-left: 0; } .grid-4 { grid-template-columns: repeat(2, 1fr); } .grid-3 { grid-template-columns: 1fr; } .content-grid, .lower-grid, .grid-2, .form-grid { grid-template-columns: 1fr; } }
  @media (max-width: 600px) { .topbar { height: 66px; padding: 0 16px; } .breadcrumb { display: none; } .profile-copy, .profile-menu > svg { display: none; } .profile-menu { border: 0; padding-left: 0; } .logout-button { margin-left: 8px; } .notification-button { margin-right: 3px; } .main-content { padding: 66px 15px 28px; } .welcome-row { align-items: flex-start; flex-direction: column; gap: 17px; padding: 27px 0 22px; } .date-chip { align-self: stretch; justify-content: center; } .grid-4, .quick-actions { grid-template-columns: 1fr 1fr; } .quick-action { padding: 12px; } .quick-action-copy small { display: none; } .quick-action-arrow { display: none; } .panel { padding: 17px; } .occupancy-main { align-items: flex-start; flex-direction: column; gap: 20px; } .occupancy-ring { align-self: center; } .occupancy-copy { width: 100%; } .bars { gap: 6px; } .panel-link { font-size: 9px; } .tabs { display: flex; overflow-x: auto; } }
  @media (max-width: 390px) { .grid-4 { gap: 8px; } .stat-card { padding: 13px; } .stat-value-row strong { font-size: 22px; } .quick-actions { gap: 8px; } }
`;
