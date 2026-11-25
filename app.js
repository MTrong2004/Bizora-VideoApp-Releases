(() => {
  'use strict';

  const REPO_OWNER = 'MTrong2004';
  const REPO_NAME = 'Bizora-VideoApp-Releases';
  const RELEASES_FEED_URL = './releases.json';
  const RELEASES_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases?per_page=5`;
  const PREVIEWS_FEED_URL = './previews.json';
  const LATEST_RELEASE_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest`;

  const FALLBACK_RELEASE = {
    tag: 'v0.1.0',
    version: '0.1.0',
    title: 'Bizora Video Studio v0.1.0',
    publishedAt: '2026-11-24T08:08:48Z',
    size: 122348422,
    downloadUrl: LATEST_RELEASE_URL,
    assetName: 'Bizora-Video-Studio-Setup-0.1.0.exe',
    sha256: '',
    notes: 'Phiên bản phát hành đầu tiên có hỗ trợ tự động kiểm tra và cập nhật ngay trong ứng dụng.',
    isLatest: true
  };

  const CINEMA_STAGE_META = Object.freeze({
    'stage-tab-film': {
      title: 'Review phim điện ảnh · Phụ đề khớp nhịp',
      spec: '16:9 · Giọng Việt tự nhiên · Xuất MP4 cục bộ'
    },
    'stage-tab-manga': {
      title: 'Review truyện tranh · Tách khung tự động',
      spec: '16:9 · Cuộn dọc mượt mà · Đồng bộ từng câu'
    },
    'stage-tab-ratio': {
      title: 'Xuất đồng bộ đa khung hình từng kênh',
      spec: '16:9 YouTube · 9:16 Shorts & Reels · 1:1 Bảng tin'
    }
  });

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const ICON_PATHS = Object.freeze({
    download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3'],
    'external-link': ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'],
    copy: [
      'M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z',
      'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'
    ],
    'shield-check': [
      'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z',
      'm9 12 2 2 4-4'
    ],
    film: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M7 3v18', 'M17 3v18', 'M3 12h18', 'M3 7.5h4', 'M3 16.5h4', 'M17 7.5h4', 'M17 16.5h4'],
    clapperboard: ['M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z', 'm6.2 5.3 3.1 3.9', 'm12.4 3.4 3.1 4', 'M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z'],
    'hard-drive': ['M22 12H2', 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z', 'M6 16h.01', 'M10 16h.01'],
    'arrow-right': ['M5 12h14', 'm12 5 7 7-7 7'],
    check: ['M20 6 9 17l-5-5'],
    'refresh-cw': ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
    monitor: ['M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z', 'M8 21h8', 'M12 17v4'],
    layers: ['m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
    cpu: ['M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z', 'M9 9h6v6H9Z', 'M15 2v2', 'M15 20v2', 'M2 15h2', 'M2 9h2', 'M20 15h2', 'M20 9h2', 'M9 2v2', 'M9 20v2'],
    github: ['M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4', 'M9 18c-4.51 2-5-2-7-2'],
    lock: [
      'M7 11V7a5 5 0 0 1 10 0v4',
      'M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z'
    ],
    'maximize-2': ['M15 3h6v6', 'M9 21H3v-6', 'M21 3l-7 7', 'M3 21l7-7'],
    x: ['M18 6 6 18', 'm6 6 12 12'],
    'chevron-left': ['m15 18-6-6 6-6'],
    'chevron-right': ['m9 18 6-6-6-6'],
    sparkles: [
      'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z',
      'M20 3v4',
      'M22 5h-4',
      'M4 17v2',
      'M5 18H3'
    ],
    languages: ['m5 8 6 6', 'm4 14 6-6 2-3', 'M2 5h12', 'M7 2h1', 'm22 22-5-10-5 10', 'M14 18h6'],
    'book-open': [
      'M12 7v14',
      'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z'
    ],
    send: [
      'M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z',
      'm21.854 2.147-10.94 10.939'
    ],
    'layout-grid': ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z']
  });

  function createIconSvg(name, size = 16) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', String(size));
    svg.setAttribute('height', String(size));
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.65');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    for (const d of ICON_PATHS[name] || []) {
      const p = document.createElementNS(SVG_NS, 'path');
      p.setAttribute('d', d);
      svg.append(p);
    }
    return svg;
  }

  class BizoraIcon extends HTMLElement {
    static observedAttributes = ['name', 'size'];

    connectedCallback() {
      this._render();
    }

    attributeChangedCallback() {
      this._render();
    }

    _render() {
      const name = this.getAttribute('name') || '';
      const size = Number(this.getAttribute('size')) || 16;
      this.replaceChildren(createIconSvg(name, size));
    }
  }

  function makeIconNode(name, size = 16, className = '') {
    const el = document.createElement('bizora-icon');
    el.setAttribute('name', name);
    el.setAttribute('size', String(size));
    if (className) el.className = className;
    return el;
  }

  function formatBytes(bytes) {
    const num = Number(bytes);
    if (!Number.isFinite(num) || num <= 0) return '';
    const mb = num / (1024 * 1024);
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    return `${(mb / 1024).toFixed(2)} GB`;
  }

  function formatDateVi(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return '';
      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(d);
    } catch {
      return '';
    }
  }

  class BizoraHeroAmbient extends HTMLElement {
    constructor() {
      super();
      this._bound = false;
      this._inView = true;
      this._video = null;
      this._reducedQuery = null;
      this._observer = null;
    }

    connectedCallback() {
      if (this._bound) return;
      this._bound = true;

      this._video = this.querySelector('.hero-ambient-video');
      if (!this._video) return;

      this._reducedQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      if (this._reducedQuery?.matches) {
        this._video.removeAttribute('autoplay');
        this._video.pause();
      }

      this._reducedQuery?.addEventListener?.('change', event => {
        if (event.matches) {
          this._video.removeAttribute('autoplay');
          this._video.pause();
        } else if (this._inView) {
          this._video.play().catch(() => {});
        }
      });

      if (typeof IntersectionObserver !== 'undefined') {
        this._observer = new IntersectionObserver(
          entries => {
            for (const entry of entries) {
              this._inView = entry.isIntersecting;
              if (entry.isIntersecting) {
                if (!this._reducedQuery?.matches) {
                  this._video.play().catch(() => {});
                }
              } else {
                this._video.pause();
              }
            }
          },
          { threshold: 0.1 }
        );
        this._observer.observe(this);
      }
    }

    disconnectedCallback() {
      this._observer?.disconnect();
    }
  }

  class BizoraCinemaStage extends HTMLElement {
    constructor() {
      super();
      this._bound = false;
      this._inView = false;
      this._activeVideo = null;
      this._observer = null;
      this._reducedQuery = null;
    }

    connectedCallback() {
      if (this._bound) return;
      this._bound = true;

      const tablist = this.querySelector('[role="tablist"]');
      const tabs = Array.from(this.querySelectorAll('[role="tab"]'));
      const panels = Array.from(this.querySelectorAll('[role="tabpanel"]'));
      const hudTitle = this.querySelector('#cinema-hud-title');
      const hudSpec = this.querySelector('#cinema-hud-spec');
      if (!tablist || !tabs.length || !panels.length) return;

      this._reducedQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      const hasNativeFocusgroup = Object.hasOwn(HTMLElement.prototype, 'focusGroup');

      const syncActivePlayback = (resetTime = false) => {
        if (!this._activeVideo) return;
        if (this._reducedQuery?.matches) {
          this._activeVideo.removeAttribute('autoplay');
          this._activeVideo.pause();
          return;
        }
        if (this._inView) {
          if (this._activeVideo.preload === 'none') {
            this._activeVideo.preload = 'auto';
          }
          if (resetTime && Number.isFinite(this._activeVideo.duration)) {
            this._activeVideo.currentTime = 0;
          }
          this._activeVideo.play().catch(() => {});
        } else {
          this._activeVideo.pause();
        }
      };

      const selectTab = (targetTab, shouldFocus = false, isUserSwitch = false) => {
        if (!targetTab) return;
        for (const tab of tabs) {
          const isSelected = tab === targetTab;
          tab.ariaSelected = isSelected ? 'true' : 'false';
          tab.toggleAttribute('focusgroupstart', isSelected);
          if (!hasNativeFocusgroup) {
            tab.tabIndex = isSelected ? 0 : -1;
          }
        }
        let nextVideo = null;
        for (const panel of panels) {
          const matches = panel.getAttribute('aria-labelledby') === targetTab.id;
          const panelVideo = panel.querySelector('video');
          if (matches) {
            panel.hidden = false;
            panel.tabIndex = 0;
            nextVideo = panelVideo;
          } else {
            panel.hidden = 'until-found';
            panel.removeAttribute('tabindex');
            if (panelVideo) panelVideo.pause();
          }
        }
        this._activeVideo = nextVideo;

        const meta = CINEMA_STAGE_META[targetTab.id];
        if (meta) {
          if (hudTitle) hudTitle.textContent = meta.title;
          if (hudSpec) hudSpec.textContent = meta.spec;
        }

        syncActivePlayback(isUserSwitch);
        targetTab.scrollIntoView({ block: 'nearest', inline: 'nearest', container: 'nearest' });

        if (shouldFocus) {
          targetTab.focus({ preventScroll: true });
        }
      };

      const initialSelected = tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
      selectTab(initialSelected, false, false);

      tablist.addEventListener('click', event => {
        const tab = event.target.closest('[role="tab"]');
        if (tab) selectTab(tab, false, true);
      });

      tablist.addEventListener('keydown', event => {
        const current = event.target.closest('[role="tab"]');
        if (!current) return;
        const idx = tabs.indexOf(current);
        let nextIdx = -1;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          nextIdx = (idx + 1) % tabs.length;
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          nextIdx = (idx - 1 + tabs.length) % tabs.length;
        } else if (event.key === 'Home') {
          nextIdx = 0;
        } else if (event.key === 'End') {
          nextIdx = tabs.length - 1;
        }
        if (nextIdx >= 0) {
          event.preventDefault();
          selectTab(tabs[nextIdx], true, true);
        }
      });

      this.addEventListener('beforematch', event => {
        const panel = event.target.closest('[role="tabpanel"]');
        if (!panel) return;
        const tabId = panel.getAttribute('aria-labelledby');
        const tab = tabs.find(t => t.id === tabId);
        if (tab) selectTab(tab, false, false);
      });

      this._reducedQuery?.addEventListener?.('change', () => syncActivePlayback(false));

      if (typeof IntersectionObserver !== 'undefined') {
        this._observer = new IntersectionObserver(
          entries => {
            for (const entry of entries) {
              this._inView = entry.isIntersecting;
              syncActivePlayback(false);
            }
          },
          { threshold: 0.2 }
        );
        this._observer.observe(this);
      } else {
        this._inView = true;
        syncActivePlayback(false);
      }
    }

    disconnectedCallback() {
      this._observer?.disconnect();
    }
  }

  class BizoraChecksumCard extends HTMLElement {
    constructor() {
      super();
      this._release = FALLBACK_RELEASE;
      this._copyTimer = null;
      this._dom = null;
    }

    connectedCallback() {
      this._ensureDom();
      this._render();
    }

    setRelease(release) {
      if (release && typeof release === 'object') {
        this._release = { ...FALLBACK_RELEASE, ...release };
      }
      if (this.isConnected) {
        this._ensureDom();
        this._render();
      }
    }

    _ensureDom() {
      if (this._dom) return;

      const panel = document.createElement('div');
      panel.className = 'spec-panel';

      const head = document.createElement('div');
      head.className = 'spec-panel-head';
      const title = document.createElement('div');
      title.className = 'spec-panel-title';
      const titleSpan = document.createElement('span');
      titleSpan.textContent = 'Thông số bộ cài hiện tại';
      title.append(makeIconNode('shield-check', 17), titleSpan);

      const badge = document.createElement('span');
      badge.className = 'spec-badge';
      head.append(title, badge);

      const dl = document.createElement('dl');
      dl.className = 'spec-dl';
      const addRow = label => {
        const row = document.createElement('div');
        row.className = 'spec-row';
        const dt = document.createElement('dt');
        dt.textContent = label;
        const dd = document.createElement('dd');
        row.append(dt, dd);
        dl.append(row);
        return dd;
      };

      const fileVal = addRow('Tên tệp');
      fileVal.className = 'mono';
      const dateVal = addRow('Ngày phát hành');
      const sizeVal = addRow('Dung lượng');
      const osVal = addRow('Hệ điều hành');
      osVal.textContent = 'Windows 10 / 11 (64-bit)';

      const shaBlock = document.createElement('div');
      shaBlock.className = 'sha-block';
      shaBlock.hidden = true;

      const shaHead = document.createElement('div');
      shaHead.className = 'sha-head';
      const shaLabel = document.createElement('span');
      shaLabel.className = 'sha-label';
      shaLabel.textContent = 'SHA-256 Checksum';

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'copy-btn';
      const copyText = document.createElement('span');
      copyText.textContent = 'Sao chép';
      copyBtn.append(makeIconNode('copy', 13), copyText);

      shaHead.append(shaLabel, copyBtn);

      const shaCode = document.createElement('code');
      shaCode.className = 'sha-code';

      const copyStatus = document.createElement('p');
      copyStatus.className = 'copy-status';
      copyStatus.setAttribute('role', 'status');
      copyStatus.setAttribute('aria-live', 'polite');
      copyStatus.hidden = true;

      copyBtn.addEventListener('click', () => {
        const hash = this._release.sha256;
        if (!hash) return;
        const onCopied = () => {
          copyText.textContent = 'Đã chép';
          copyStatus.textContent = 'Đã sao chép mã SHA-256 vào bộ nhớ tạm.';
          copyStatus.hidden = false;
          clearTimeout(this._copyTimer);
          this._copyTimer = setTimeout(() => {
            copyText.textContent = 'Sao chép';
            copyStatus.hidden = true;
          }, 3000);
        };
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(hash).then(onCopied).catch(() => {});
        }
      });

      shaBlock.append(shaHead, shaCode, copyStatus);

      const foot = document.createElement('div');
      foot.className = 'spec-panel-foot';
      const releasePageLink = document.createElement('a');
      releasePageLink.className = 'ext-link';
      releasePageLink.href = '#phien-ban';
      const linkLabel = document.createElement('span');
      linkLabel.textContent = 'Xem ghi chú phiên bản';
      releasePageLink.append(linkLabel, makeIconNode('arrow-right', 13));

      const cardDownload = document.createElement('a');
      cardDownload.className = 'btn btn-accent-solid btn-sm';
      const dlLabel = document.createElement('span');
      dlLabel.textContent = 'Tải .exe';
      cardDownload.append(makeIconNode('download', 14), dlLabel);

      foot.append(releasePageLink, cardDownload);
      panel.append(head, dl, shaBlock, foot);
      this.replaceChildren(panel);

      this._dom = {
        badge,
        fileVal,
        dateVal,
        sizeVal,
        shaBlock,
        shaCode,
        cardDownload
      };
    }

    _render() {
      if (!this._dom) return;
      const r = this._release;
      const d = this._dom;

      d.badge.textContent = r.tag || `v${r.version}`;
      d.fileVal.textContent = r.assetName || `Bizora-Video-Studio-Setup-${r.version}.exe`;
      d.dateVal.textContent = formatDateVi(r.publishedAt) || '—';
      d.sizeVal.textContent = formatBytes(r.size) || '—';
      d.cardDownload.href = r.downloadUrl || LATEST_RELEASE_URL;

      const hash = r.sha256 || '';
      d.shaBlock.hidden = !hash;
      d.shaCode.textContent = hash;
    }
  }

  function sanitizeReleases(list) {
    if (!Array.isArray(list)) return [];
    const valid = list.filter(item => item && typeof item === 'object' && typeof item.tag === 'string' && item.tag.trim());
    return valid.map((item, idx) => {
      const tag = item.tag.trim();
      const base = {
        tag,
        version: typeof item.version === 'string' && item.version.trim() ? item.version.trim() : tag.replace(/^v/i, ''),
        title: typeof item.title === 'string' && item.title.trim() ? item.title.trim() : `Bizora Video Studio ${tag}`,
        publishedAt: typeof item.publishedAt === 'string' ? item.publishedAt : '',
        notes: typeof item.notes === 'string' ? item.notes : ''
      };
      if (idx === 0) {
        return {
          ...base,
          size: Number.isFinite(Number(item.size)) && Number(item.size) > 0 ? Number(item.size) : 0,
          downloadUrl: typeof item.downloadUrl === 'string' && item.downloadUrl.trim() ? item.downloadUrl.trim() : LATEST_RELEASE_URL,
          assetName: typeof item.assetName === 'string' ? item.assetName.trim() : '',
          sha256: typeof item.sha256 === 'string' ? item.sha256.trim() : '',
          isLatest: true
        };
      }
      return {
        ...base,
        size: 0,
        downloadUrl: '',
        assetName: '',
        sha256: '',
        isLatest: false
      };
    });
  }

  class BizoraReleaseNotes extends HTMLElement {
    constructor() {
      super();
      this._releases = [FALLBACK_RELEASE];
      this._fallbackNotice = '';
    }

    connectedCallback() {
      this._render();
    }

    setReleases(releases, fallbackNotice = '') {
      const sanitized = sanitizeReleases(releases);
      if (sanitized.length) {
        this._releases = sanitized;
      }
      this._fallbackNotice = typeof fallbackNotice === 'string' ? fallbackNotice : '';
      if (this.isConnected) {
        this._render();
      }
    }

    _renderNotesContent(container, rawText) {
      const clean = String(rawText || '').replace(/\r\n?/g, '\n').trim();
      if (!clean) {
        const empty = document.createElement('p');
        empty.className = 'release-notes-plain';
        empty.textContent = 'Cải thiện hiệu năng và độ ổn định ứng dụng.';
        container.append(empty);
        return;
      }

      const lines = clean.split('\n').map(l => l.trim()).filter(Boolean);
      const bulletLines = lines.filter(l => /^[-*•]\s+/.test(l));
      if (bulletLines.length >= 1 && bulletLines.length === lines.length) {
        const ul = document.createElement('ul');
        ul.className = 'release-notes-lines';
        for (const line of bulletLines) {
          const li = document.createElement('li');
          li.textContent = line.replace(/^[-*•]\s+/, '');
          ul.append(li);
        }
        container.append(ul);
        return;
      }

      const p = document.createElement('p');
      p.className = 'release-notes-plain';
      p.textContent = lines.map(l => l.replace(/^#{1,6}\s+/, '')).join('\n');
      container.append(p);
    }

    _render() {
      const wrap = document.createElement('div');
      wrap.className = 'release-list';

      if (this._fallbackNotice) {
        const note = document.createElement('p');
        note.className = 'release-fallback-note';
        note.textContent = this._fallbackNotice;
        wrap.append(note);
      }

      this._releases.forEach((rel, idx) => {
        const isLatest = idx === 0;
        const card = document.createElement('article');
        card.className = isLatest ? 'release-card release-card--latest' : 'release-card release-card--archived';

        const head = document.createElement('div');
        head.className = 'release-head';

        const titleGroup = document.createElement('div');
        titleGroup.className = 'release-title-group';

        const tagPill = document.createElement('span');
        tagPill.className = 'release-tag';
        tagPill.textContent = rel.tag || `v${rel.version}`;
        titleGroup.append(tagPill);

        if (isLatest) {
          const latestBadge = document.createElement('span');
          latestBadge.className = 'release-latest-badge';
          latestBadge.textContent = 'Mới nhất';
          titleGroup.append(latestBadge);
        }

        const parts = [];
        const dateStr = formatDateVi(rel.publishedAt);
        if (dateStr) parts.push(`Phát hành ${dateStr}`);
        if (isLatest) {
          const sizeStr = formatBytes(rel.size);
          if (sizeStr) parts.push(sizeStr);
          if (rel.assetName) parts.push(rel.assetName);
        }

        if (parts.length) {
          const metaEl = document.createElement('span');
          metaEl.className = 'release-meta';
          metaEl.textContent = parts.join(' · ');
          titleGroup.append(metaEl);
        }

        if (isLatest) {
          const dlBtn = document.createElement('a');
          dlBtn.className = 'btn btn-accent-solid btn-sm';
          dlBtn.href = rel.downloadUrl || LATEST_RELEASE_URL;
          const dlSpan = document.createElement('span');
          dlSpan.textContent = 'Tải bản mới nhất';
          dlBtn.append(makeIconNode('download', 14), dlSpan);
          head.append(titleGroup, dlBtn);
        } else {
          const archivedPill = document.createElement('span');
          archivedPill.className = 'release-archived-pill';
          const archivedLabel = document.createElement('span');
          archivedLabel.textContent = 'Chỉ lưu lịch sử';
          archivedPill.append(makeIconNode('lock', 13), archivedLabel);
          head.append(titleGroup, archivedPill);
        }

        const notesScroll = document.createElement('div');
        notesScroll.className = 'notes-scroll';
        this._renderNotesContent(notesScroll, rel.notes);

        card.append(head, notesScroll);
        wrap.append(card);
      });

      this.replaceChildren(wrap);
    }
  }

  function buildPreviewAssetUrl(rawPath, hash = '') {
    if (typeof rawPath !== 'string' || !rawPath.trim()) return '';
    const clean = rawPath.trim();
    if (!hash) return clean;
    return `${clean}${clean.includes('?') ? '&' : '?'}h=${encodeURIComponent(hash)}`;
  }

  function sanitizePreviewManifest(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const screens = Array.isArray(raw.screens) ? raw.screens : [];
    const valid = screens
      .filter(item => item && typeof item === 'object' && typeof item.id === 'string' && item.id.trim() && (typeof item.videoWebm === 'string' || typeof item.videoMp4 === 'string' || typeof item.image === 'string'))
      .map((item, index) => ({
        id: item.id.trim(),
        order: Number(item.order) || (index + 1),
        badge: typeof item.badge === 'string' && item.badge.trim() ? item.badge.trim() : `Màn ${index + 1}`,
        icon: typeof item.icon === 'string' && item.icon.trim() ? item.icon.trim() : 'monitor',
        title: typeof item.title === 'string' && item.title.trim() ? item.title.trim() : item.badge || item.id,
        subtitle: typeof item.subtitle === 'string' ? item.subtitle.trim() : '',
        actionHint: typeof item.actionHint === 'string' ? item.actionHint.trim() : '',
        highlights: Array.isArray(item.highlights) ? item.highlights.filter(h => typeof h === 'string' && h.trim()).slice(0, 4) : [],
        videoWebm: typeof item.videoWebm === 'string' ? item.videoWebm.trim() : '',
        videoMp4: typeof item.videoMp4 === 'string' ? item.videoMp4.trim() : '',
        poster: typeof item.poster === 'string' && item.poster.trim() ? item.poster.trim() : (typeof item.image === 'string' ? item.image.trim() : ''),
        hash: typeof item.hash === 'string' ? item.hash.trim() : '',
        width: Number(item.width) || 1280,
        height: Number(item.height) || 800
      }))
      .sort((a, b) => a.order - b.order);

    if (!valid.length) return null;
    return {
      appVersion: typeof raw.appVersion === 'string' && raw.appVersion.trim() ? raw.appVersion.trim() : '0.2.0',
      capturedAt: typeof raw.capturedAt === 'string' ? raw.capturedAt : '',
      screens: valid
    };
  }

  function createWalkthroughVideoElement(screen, { lazy = true, preload = 'metadata', className = '' } = {}) {
    const video = document.createElement('video');
    if (className) video.className = className;
    video.width = screen.width || 1280;
    video.height = screen.height || 800;
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    if (lazy) {
      video.setAttribute('loading', 'lazy');
    }
    video.preload = preload;

    const posterUrl = buildPreviewAssetUrl(screen.poster, screen.hash);
    if (posterUrl) {
      video.poster = posterUrl;
    }

    const supportsNativeLazy = typeof HTMLMediaElement !== 'undefined' && Object.hasOwn(HTMLMediaElement.prototype, 'loading');
    const appendSource = (rawUrl, type) => {
      const url = buildPreviewAssetUrl(rawUrl, screen.hash);
      if (!url) return;
      const srcEl = document.createElement('source');
      srcEl.type = type;
      if (lazy && !supportsNativeLazy) {
        srcEl.dataset.src = url;
      } else {
        srcEl.src = url;
      }
      video.append(srcEl);
    };

    appendSource(screen.videoWebm, 'video/webm');
    appendSource(screen.videoMp4, 'video/mp4');

    if (lazy && !supportsNativeLazy && posterUrl) {
      video.dataset.poster = posterUrl;
      video.removeAttribute('poster');
      video.dataset.preload = preload;
      video.preload = 'none';
    }
    return video;
  }

  function ensureVideoSourcesLoaded(media) {
    if (!media) return false;
    let changed = false;
    if (media.dataset.poster) {
      media.poster = media.dataset.poster;
      delete media.dataset.poster;
      changed = true;
    }
    if (media.dataset.preload) {
      media.preload = media.dataset.preload;
      delete media.dataset.preload;
      changed = true;
    }
    for (const source of media.querySelectorAll('source[data-src]')) {
      source.src = source.dataset.src;
      delete source.dataset.src;
      changed = true;
    }
    media.removeAttribute('loading');
    if (changed) {
      media.load();
    }
    return changed;
  }

  class BizoraUiShowcase extends HTMLElement {
    constructor() {
      super();
      this._manifest = null;
      this._activeId = '';
      this._dom = null;
      this._loadStarted = false;
      this._inView = false;
      this._stepObserver = null;
      this._stageObserver = null;
      this._lazyMediaObserver = null;
      this._reducedQuery = null;
      this._onVisibilityChange = null;
      this._stageVideos = new Map();
      this._inlineVideos = new Map();
      this._stepEls = new Map();
    }

    connectedCallback() {
      this._ensureDom();
      if (!this._loadStarted) {
        this._loadStarted = true;
        void this.loadManifest();
      }
    }

    disconnectedCallback() {
      this._stepObserver?.disconnect();
      this._stageObserver?.disconnect();
      this._lazyMediaObserver?.disconnect();
      if (this._onVisibilityChange) {
        document.removeEventListener('visibilitychange', this._onVisibilityChange);
      }
    }

    setManifest(raw) {
      const parsed = sanitizePreviewManifest(raw);
      if (!parsed) return;
      this._manifest = parsed;
      if (!parsed.screens.some(s => s.id === this._activeId)) {
        this._activeId = parsed.screens[0].id;
      }
      if (this.isConnected) {
        this._ensureDom();
        this._renderAll();
      }
    }

    async loadManifest() {
      const signal = typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function'
        ? AbortSignal.timeout(8000)
        : undefined;
      try {
        const res = await fetch(PREVIEWS_FEED_URL, { cache: 'no-cache', signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = await res.json();
        const parsed = sanitizePreviewManifest(payload);
        if (!parsed) throw new Error('Invalid previews manifest');
        this.setManifest(parsed);
      } catch {
        this._renderUnavailable();
      }
    }

    _ensureDom() {
      if (this._dom) return;

      const wrap = document.createElement('div');
      wrap.className = 'ui-story-layout';

      const rail = document.createElement('div');
      rail.className = 'ui-story-rail';
      rail.setAttribute('aria-label', 'Danh sách tính năng nổi bật theo bước');

      const stageCol = document.createElement('div');
      stageCol.className = 'ui-story-stage-col';

      const sticky = document.createElement('div');
      sticky.className = 'ui-story-stage-sticky';

      const frame = document.createElement('div');
      frame.className = 'ui-story-stage-frame';

      const mediaStack = document.createElement('div');
      mediaStack.className = 'ui-story-media-stack';

      const stageOpenBtn = document.createElement('button');
      stageOpenBtn.type = 'button';
      stageOpenBtn.className = 'ui-story-stage-trigger';
      stageOpenBtn.setAttribute('aria-label', 'Mở rộng video thao tác toàn màn hình');

      const hud = document.createElement('div');
      hud.className = 'ui-story-stage-hud';

      const progressTrack = document.createElement('div');
      progressTrack.className = 'ui-story-progress-track';
      progressTrack.setAttribute('aria-hidden', 'true');
      const progressFill = document.createElement('div');
      progressFill.className = 'ui-story-progress-fill';
      progressTrack.append(progressFill);

      const hudRow = document.createElement('div');
      hudRow.className = 'ui-story-hud-row';

      const hudLeft = document.createElement('div');
      hudLeft.className = 'ui-story-hud-left';
      const stepCounter = document.createElement('span');
      stepCounter.className = 'ui-story-step-counter mono';
      const hudTitle = document.createElement('strong');
      hudTitle.className = 'ui-story-hud-title';
      hudLeft.append(stepCounter, hudTitle);

      const hudRight = document.createElement('div');
      hudRight.className = 'ui-story-hud-right';
      const syncPill = document.createElement('span');
      syncPill.className = 'ui-sync-pill';
      const zoomBtn = document.createElement('button');
      zoomBtn.type = 'button';
      zoomBtn.className = 'ui-zoom-btn';
      zoomBtn.setAttribute('aria-label', 'Phóng to xem chi tiết thao tác');
      const zoomText = document.createElement('span');
      zoomText.textContent = 'Phóng to';
      zoomBtn.append(makeIconNode('maximize-2', 14), zoomText);
      hudRight.append(syncPill, zoomBtn);

      hudRow.append(hudLeft, hudRight);
      hud.append(progressTrack, hudRow);

      frame.append(mediaStack, stageOpenBtn, hud);
      sticky.append(frame);
      stageCol.append(sticky);

      const emptyMsg = document.createElement('p');
      emptyMsg.className = 'ui-showcase-status';
      emptyMsg.hidden = true;

      // Borderless 16:10 Live-Video Lightbox Dialog
      const dialog = document.createElement('dialog');
      dialog.className = 'ui-lightbox-dialog';
      dialog.setAttribute('closedby', 'any');
      dialog.setAttribute('aria-labelledby', 'ui-lightbox-title');

      const dlgShell = document.createElement('div');
      dlgShell.className = 'ui-lightbox-shell';

      const dlgHead = document.createElement('header');
      dlgHead.className = 'ui-lightbox-head';
      const dlgTitleWrap = document.createElement('div');
      dlgTitleWrap.className = 'ui-lightbox-title-wrap';
      const dlgBadge = document.createElement('span');
      dlgBadge.className = 'ui-lightbox-badge';
      const dlgTitle = document.createElement('h3');
      dlgTitle.id = 'ui-lightbox-title';
      dlgTitle.className = 'ui-lightbox-title';
      dlgTitleWrap.append(dlgBadge, dlgTitle);

      const dlgActions = document.createElement('div');
      dlgActions.className = 'ui-lightbox-actions';
      const dlgCounter = document.createElement('span');
      dlgCounter.className = 'ui-lightbox-counter mono';
      const prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'ui-lightbox-nav-btn';
      prevBtn.setAttribute('aria-label', 'Tính năng trước');
      prevBtn.append(makeIconNode('chevron-left', 16));
      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'ui-lightbox-nav-btn';
      nextBtn.setAttribute('aria-label', 'Tính năng tiếp theo');
      nextBtn.append(makeIconNode('chevron-right', 16));
      const closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'ui-lightbox-close-btn';
      closeBtn.setAttribute('aria-label', 'Đóng xem lớn');
      closeBtn.append(makeIconNode('x', 16));
      dlgActions.append(dlgCounter, prevBtn, nextBtn, closeBtn);
      dlgHead.append(dlgTitleWrap, dlgActions);

      const dlgBody = document.createElement('div');
      dlgBody.className = 'ui-lightbox-body';

      const dlgFoot = document.createElement('div');
      dlgFoot.className = 'ui-lightbox-foot';
      const dlgDesc = document.createElement('p');
      dlgDesc.className = 'ui-lightbox-desc';
      const dlgTags = document.createElement('ul');
      dlgTags.className = 'ui-story-highlights';
      dlgFoot.append(dlgDesc, dlgTags);

      dlgShell.append(dlgHead, dlgBody, dlgFoot);
      dialog.append(dlgShell);

      wrap.append(rail, stageCol, emptyMsg, dialog);
      this.replaceChildren(wrap);

      const stepScreen = delta => {
        const screens = this._manifest?.screens || [];
        if (!screens.length) return;
        const curIdx = Math.max(0, screens.findIndex(s => s.id === this._activeId));
        const nextIdx = (curIdx + delta + screens.length) % screens.length;
        this._setActiveScreen(screens[nextIdx].id, { scrollStep: false });
      };

      const openLightbox = (screenId = '') => {
        if (!this._manifest?.screens?.length) return;
        if (screenId) this._setActiveScreen(screenId, { scrollStep: false });
        if (!dialog.open) dialog.showModal();
        this._renderLightbox();
        this._syncPlayback();
      };

      zoomBtn.addEventListener('click', () => openLightbox());
      stageOpenBtn.addEventListener('click', () => openLightbox());
      closeBtn.addEventListener('click', () => dialog.close());
      prevBtn.addEventListener('click', () => stepScreen(-1));
      nextBtn.addEventListener('click', () => stepScreen(1));

      dialog.addEventListener('close', () => {
        const dlgVideo = dlgBody.querySelector('video');
        dlgVideo?.pause();
        dlgBody.replaceChildren();
        this._syncPlayback();
      });

      dialog.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          stepScreen(-1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          stepScreen(1);
        }
      });

      if (!('closedBy' in HTMLDialogElement.prototype)) {
        dialog.addEventListener('click', event => {
          if (event.target !== dialog) return;
          const rect = dialog.getBoundingClientRect();
          const isDialogContent = (
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
          );
          if (isDialogContent) return;
          dialog.close();
        });
      }

      this._reducedQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      this._reducedQuery?.addEventListener?.('change', () => this._syncPlayback());

      this._onVisibilityChange = () => this._syncPlayback();
      document.addEventListener('visibilitychange', this._onVisibilityChange);

      if (typeof IntersectionObserver !== 'undefined') {
        this._stageObserver = new IntersectionObserver(
          entries => {
            for (const entry of entries) {
              this._inView = entry.isIntersecting;
              this._syncPlayback();
            }
          },
          { threshold: 0.01 }
        );
        this._stageObserver.observe(this);
      } else {
        this._inView = true;
      }

      this._dom = {
        rail,
        mediaStack,
        progressFill,
        stepCounter,
        hudTitle,
        syncPill,
        emptyMsg,
        dialog,
        dlgBadge,
        dlgTitle,
        dlgCounter,
        dlgBody,
        dlgDesc,
        dlgTags,
        openLightbox
      };
    }

    _renderUnavailable() {
      if (!this._dom) return;
      this._dom.emptyMsg.textContent = 'Đang đồng bộ video minh họa thao tác mới nhất — vui lòng tải lại trang sau ít phút.';
      this._dom.emptyMsg.hidden = false;
    }

    _attachLazyFallbackObserver(videos) {
      this._lazyMediaObserver?.disconnect();
      const supportsNativeLazy = typeof HTMLMediaElement !== 'undefined' && Object.hasOwn(HTMLMediaElement.prototype, 'loading');
      if (supportsNativeLazy || typeof IntersectionObserver === 'undefined') return;

      this._lazyMediaObserver = new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            ensureVideoSourcesLoaded(entry.target);
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '240px 0px' }
      );
      for (const v of videos) {
        this._lazyMediaObserver.observe(v);
      }
    }

    _renderAll() {
      const d = this._dom;
      const m = this._manifest;
      if (!d || !m) return;
      d.emptyMsg.hidden = true;
      this._stepObserver?.disconnect();
      this._stageVideos.clear();
      this._inlineVideos.clear();
      this._stepEls.clear();

      const allLazyVideos = [];
      const railNodes = m.screens.map((screen, idx) => {
        const card = document.createElement('article');
        card.className = 'ui-story-step';
        card.dataset.screenId = screen.id;

        const head = document.createElement('div');
        head.className = 'ui-story-step-head';
        const numBadge = document.createElement('span');
        numBadge.className = 'ui-story-step-num mono';
        numBadge.textContent = String(idx + 1).padStart(2, '0');
        const kicker = document.createElement('span');
        kicker.className = 'ui-story-step-badge';
        kicker.append(makeIconNode(screen.icon, 14));
        const badgeText = document.createElement('span');
        badgeText.textContent = screen.badge;
        kicker.append(badgeText);
        head.append(numBadge, kicker);

        const titleBtn = document.createElement('button');
        titleBtn.type = 'button';
        titleBtn.className = 'ui-story-step-trigger';
        const h3 = document.createElement('h3');
        h3.className = 'ui-story-step-title';
        h3.textContent = screen.title;
        titleBtn.append(h3);
        titleBtn.addEventListener('click', () => {
          this._setActiveScreen(screen.id, { scrollStep: false });
        });

        const desc = document.createElement('p');
        desc.className = 'ui-story-step-desc';
        desc.textContent = screen.subtitle;

        const actionHint = document.createElement('div');
        actionHint.className = 'ui-story-action-hint';
        const pulse = document.createElement('span');
        pulse.className = 'ui-action-dot';
        pulse.setAttribute('aria-hidden', 'true');
        const hintText = document.createElement('span');
        hintText.textContent = screen.actionHint || 'Xem thao tác trực tiếp trên giao diện thật';
        actionHint.append(pulse, hintText);

        const list = document.createElement('ul');
        list.className = 'ui-story-highlights';
        for (const item of screen.highlights) {
          const li = document.createElement('li');
          li.append(makeIconNode('check', 13));
          const span = document.createElement('span');
          span.textContent = item;
          li.append(span);
          list.append(li);
        }

        // Mobile inline live motion stage (hidden on desktop where right sticky stage plays)
        const inlineWrap = document.createElement('div');
        inlineWrap.className = 'ui-story-inline-media';
        const inlineVideo = createWalkthroughVideoElement(screen, {
          lazy: true,
          preload: 'metadata',
          className: 'ui-story-inline-video'
        });
        const inlineZoom = document.createElement('button');
        inlineZoom.type = 'button';
        inlineZoom.className = 'ui-story-inline-zoom';
        inlineZoom.setAttribute('aria-label', `Phóng to ${screen.title}`);
        inlineZoom.append(makeIconNode('maximize-2', 14));
        inlineZoom.addEventListener('click', () => d.openLightbox(screen.id));
        inlineWrap.append(inlineVideo, inlineZoom);

        card.append(head, titleBtn, desc, actionHint, list, inlineWrap);
        this._stepEls.set(screen.id, card);
        this._inlineVideos.set(screen.id, inlineVideo);
        allLazyVideos.push(inlineVideo);
        return card;
      });
      d.rail.replaceChildren(...railNodes);

      const stageVideoNodes = m.screens.map((screen, idx) => {
        const video = createWalkthroughVideoElement(screen, {
          lazy: idx > 0,
          preload: idx === 0 ? 'auto' : 'metadata',
          className: 'ui-story-stage-video'
        });
        video.dataset.screenId = screen.id;
        video.addEventListener('timeupdate', () => {
          if (screen.id !== this._activeId || !Number.isFinite(video.duration) || video.duration <= 0) return;
          const pct = Math.min(100, Math.max(0, (video.currentTime / video.duration) * 100));
          d.progressFill.style.width = `${pct.toFixed(1)}%`;
        });
        this._stageVideos.set(screen.id, video);
        if (idx > 0) allLazyVideos.push(video);
        return video;
      });
      d.mediaStack.replaceChildren(...stageVideoNodes);

      this._attachLazyFallbackObserver(allLazyVideos);

      if (typeof IntersectionObserver !== 'undefined') {
        this._stepObserver = new IntersectionObserver(
          entries => {
            if (this._dom?.dialog?.open) return;
            for (const entry of entries) {
              if (entry.isIntersecting) {
                const sid = entry.target.dataset.screenId;
                if (sid && sid !== this._activeId) {
                  this._setActiveScreen(sid, { scrollStep: false });
                }
              }
            }
          },
          { rootMargin: '-36% 0px -44% 0px', threshold: 0 }
        );
        for (const el of this._stepEls.values()) {
          this._stepObserver.observe(el);
        }
      }

      this._setActiveScreen(this._activeId || m.screens[0].id, { scrollStep: false });
    }

    _setActiveScreen(id, { scrollStep = false } = {}) {
      const m = this._manifest;
      const d = this._dom;
      if (!m || !d) return;
      const idx = m.screens.findIndex(s => s.id === id);
      const active = idx >= 0 ? m.screens[idx] : m.screens[0];
      const activeIdx = idx >= 0 ? idx : 0;
      if (!active) return;

      const changed = this._activeId !== active.id;
      this._activeId = active.id;

      for (const [sid, el] of this._stepEls.entries()) {
        const isCurrent = sid === active.id;
        el.classList.toggle('is-active', isCurrent);
        el.setAttribute('aria-current', isCurrent ? 'step' : 'false');
      }

      for (const [sid, vid] of this._stageVideos.entries()) {
        const isCurrent = sid === active.id;
        vid.classList.toggle('is-active', isCurrent);
        if (isCurrent) {
          ensureVideoSourcesLoaded(vid);
          if (vid.preload === 'none' || vid.preload === 'metadata') vid.preload = 'auto';
          if (changed && Number.isFinite(vid.duration)) {
            try { vid.currentTime = 0; } catch {}
          }
          if (changed) d.progressFill.style.width = '0%';
        }
      }

      d.stepCounter.textContent = `${String(activeIdx + 1).padStart(2, '0')} / ${String(m.screens.length).padStart(2, '0')}`;
      d.hudTitle.textContent = active.title;
      const dateStr = formatDateVi(m.capturedAt);
      d.syncPill.textContent = dateStr
        ? `v${m.appVersion} · Đồng bộ ${dateStr}`
        : `v${m.appVersion} · Đồng bộ tự động`;

      if (scrollStep) {
        this._stepEls.get(active.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      this._syncPlayback();
      if (d.dialog.open) {
        this._renderLightbox();
      }
    }

    _syncPlayback() {
      const reduced = Boolean(this._reducedQuery?.matches);
      const hiddenDoc = typeof document !== 'undefined' && document.hidden;
      const isMobile = typeof window !== 'undefined' && window.matchMedia?.('(max-width: 960px)')?.matches;
      const d = this._dom;
      const lightboxOpen = Boolean(d?.dialog?.open);

      const playIfReady = (vid, shouldPlay) => {
        if (!shouldPlay) {
          vid.autoplay = false;
          if (!vid.paused) vid.pause();
          return;
        }
        ensureVideoSourcesLoaded(vid);
        vid.muted = true;
        vid.autoplay = true;
        const attemptPlay = () => {
          if (!vid.paused) return;
          const p = vid.play();
          if (p && typeof p.catch === 'function') {
            p.catch(() => {});
          }
        };
        if (vid.readyState >= 2) {
          attemptPlay();
        } else if (!vid.dataset.playRetryBound) {
          vid.dataset.playRetryBound = '1';
          vid.addEventListener('loadeddata', () => {
            delete vid.dataset.playRetryBound;
            if (this._activeId === vid.dataset.screenId || vid.closest('dialog[open]')) {
              attemptPlay();
            }
          }, { once: true });
          attemptPlay();
        }
      };

      for (const [sid, vid] of this._stageVideos.entries()) {
        const shouldPlay = !isMobile && !lightboxOpen && this._inView && !reduced && !hiddenDoc && sid === this._activeId;
        playIfReady(vid, shouldPlay);
      }

      for (const [sid, vid] of this._inlineVideos.entries()) {
        const shouldPlay = isMobile && !lightboxOpen && this._inView && !reduced && !hiddenDoc && sid === this._activeId;
        playIfReady(vid, shouldPlay);
      }

      const dlgVideo = d?.dlgBody?.querySelector('video');
      if (dlgVideo) {
        playIfReady(dlgVideo, lightboxOpen && !reduced && !hiddenDoc);
      }
    }

    _renderLightbox() {
      const d = this._dom;
      const m = this._manifest;
      if (!d || !m) return;
      const idx = Math.max(0, m.screens.findIndex(s => s.id === this._activeId));
      const active = m.screens[idx] || m.screens[0];
      if (!active) return;

      d.dlgBadge.textContent = active.badge;
      d.dlgTitle.textContent = active.title;
      d.dlgCounter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(m.screens.length).padStart(2, '0')}`;
      d.dlgDesc.textContent = active.subtitle;

      const tags = active.highlights.map(text => {
        const li = document.createElement('li');
        li.append(makeIconNode('check', 13));
        const span = document.createElement('span');
        span.textContent = text;
        li.append(span);
        return li;
      });
      d.dlgTags.replaceChildren(...tags);

      const dlgVideo = createWalkthroughVideoElement(active, {
        lazy: false,
        preload: 'auto',
        className: 'ui-lightbox-video'
      });
      dlgVideo.dataset.screenId = active.id;
      d.dlgBody.replaceChildren(dlgVideo);
      this._syncPlayback();
    }
  }

  customElements.define('bizora-icon', BizoraIcon);
  customElements.define('bizora-hero-ambient', BizoraHeroAmbient);
  customElements.define('bizora-ui-showcase', BizoraUiShowcase);
  customElements.define('bizora-cinema-stage', BizoraCinemaStage);
  customElements.define('bizora-checksum-card', BizoraChecksumCard);
  customElements.define('bizora-release-notes', BizoraReleaseNotes);

  function mapReleaseItem(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const assets = Array.isArray(raw.assets) ? raw.assets : [];
    const exeAsset =
      assets.find(a => typeof a?.name === 'string' && /Setup.*\.exe$/i.test(a.name)) ||
      assets.find(a => typeof a?.name === 'string' && /\.exe$/i.test(a.name)) ||
      null;

    const rawDigest = typeof exeAsset?.digest === 'string' ? exeAsset.digest.trim() : '';
    const sha256 = rawDigest.startsWith('sha256:') ? rawDigest.slice(7) : rawDigest;
    const tag = typeof raw.tag_name === 'string' && raw.tag_name.trim() ? raw.tag_name.trim() : 'v0.1.0';

    return {
      tag,
      version: tag.replace(/^v/i, ''),
      title: typeof raw.name === 'string' && raw.name.trim() ? raw.name.trim() : `Bizora Video Studio ${tag}`,
      publishedAt: raw.published_at || '',
      size: exeAsset?.size || 0,
      downloadUrl: exeAsset?.browser_download_url || raw.html_url || LATEST_RELEASE_URL,
      assetName: exeAsset?.name || '',
      sha256,
      notes: typeof raw.body === 'string' ? raw.body.trim() : ''
    };
  }

  function applyLatestToPage(latest) {
    if (!latest) return;
    const dlUrl = latest.downloadUrl || LATEST_RELEASE_URL;
    const tag = latest.tag || `v${latest.version}`;

    const headerBtn = document.getElementById('header-download-btn');
    if (headerBtn) headerBtn.href = dlUrl;

    const heroBtn = document.getElementById('hero-download-btn');
    if (heroBtn) heroBtn.href = dlUrl;

    const stepBtn = document.getElementById('step-download-btn');
    if (stepBtn) stepBtn.href = dlUrl;

    const ctaBtn = document.getElementById('cta-download-btn');
    if (ctaBtn) ctaBtn.href = dlUrl;

    const heroVer = document.getElementById('hero-download-ver');
    if (heroVer) heroVer.textContent = tag;

    const ctaVer = document.getElementById('cta-download-ver');
    if (ctaVer) ctaVer.textContent = tag;

    const assetName = document.getElementById('hero-asset-name');
    if (assetName && latest.assetName) assetName.textContent = latest.assetName;

    const assetSize = document.getElementById('hero-asset-size');
    const sizeStr = formatBytes(latest.size);
    if (assetSize && sizeStr) assetSize.textContent = sizeStr;

    const certSnippet = document.querySelector('#main-content .code-snippet code');
    if (certSnippet && latest.assetName) {
      certSnippet.textContent = `certutil -hashfile ${latest.assetName} SHA256`;
    }

    document.getElementById('checksum-card')?.setRelease?.(latest);
  }

  async function fetchSameOriginReleases(signal) {
    const res = await fetch(RELEASES_FEED_URL, {
      cache: 'no-cache',
      signal
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const payload = await res.json();
    const list = Array.isArray(payload?.releases) ? payload.releases : [];
    const valid = sanitizeReleases(list);
    if (!valid.length || !valid[0].downloadUrl) throw new Error('Empty releases feed');
    return valid;
  }

  async function fetchGitHubApiReleases(signal) {
    const res = await fetch(RELEASES_API_URL, {
      headers: { Accept: 'application/vnd.github+json' },
      signal
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const payload = await res.json();
    const published = sanitizeReleases(
      (Array.isArray(payload) ? payload : [])
        .filter(item => item && !item.draft && !item.prerelease)
        .map(mapReleaseItem)
        .filter(Boolean)
    );
    if (!published.length) throw new Error('No published releases');
    return published;
  }

  async function syncReleases() {
    const checksumCard = document.getElementById('checksum-card');
    const notesEl = document.getElementById('release-notes');
    checksumCard?.setRelease?.(FALLBACK_RELEASE);
    notesEl?.setReleases?.([FALLBACK_RELEASE]);

    const signal = typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function'
      ? AbortSignal.timeout(8000)
      : undefined;

    try {
      const published = await fetchSameOriginReleases(signal);
      applyLatestToPage(published[0]);
      notesEl?.setReleases?.(published);
      return;
    } catch { /* fall through to GitHub API */ }

    try {
      const published = await fetchGitHubApiReleases(signal);
      applyLatestToPage(published[0]);
      notesEl?.setReleases?.(published);
    } catch {
      applyLatestToPage(FALLBACK_RELEASE);
      notesEl?.setReleases?.(
        [FALLBACK_RELEASE],
        'Đang hiển thị thông tin phiên bản mặc định — vui lòng tải lại trang sau ít phút để cập nhật bản mới nhất.'
      );
    }
  }

  function initTopbarScrollState() {
    if (typeof window === 'undefined') return;
    const topbar = document.querySelector('.topbar');
    const veil = document.querySelector('.gradient-blur');
    const sentinel = document.getElementById('nav-sentinel');
    if (!topbar) return;

    const applyState = isScrolled => {
      topbar.classList.toggle('is-scrolled', isScrolled);
      veil?.classList.toggle('is-scrolled', isScrolled);
    };

    if (sentinel && typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            applyState(!entry.isIntersecting);
          }
        },
        { threshold: 0 }
      );
      observer.observe(sentinel);
      return;
    }

    const onScroll = () => applyState(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initImpactBandVideo() {
    if (typeof window === 'undefined') return;
    const band = document.querySelector('.impact-band');
    const video = band?.querySelector('.impact-bg-video');
    if (!band || !video) return;

    const reducedQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let inView = false;

    const sync = () => {
      if (reducedQuery?.matches || !inView) {
        video.pause();
        return;
      }
      if (video.preload === 'none') {
        video.preload = 'auto';
      }
      video.play().catch(() => {});
    };

    reducedQuery?.addEventListener?.('change', sync);

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            inView = entry.isIntersecting;
            sync();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(band);
    } else {
      inView = true;
      sync();
    }
  }

  function initLuxuryInteractions() {
    if (typeof window === 'undefined') return;
    const motionOk = window.matchMedia?.('(prefers-reduced-motion: no-preference)')?.matches;
    if (!motionOk) return;

    if (window.matchMedia?.('(pointer: fine)')?.matches) {
      const cards = document.querySelectorAll('.tier-card, .spec-panel, .release-card');
      for (const card of cards) {
        let rafId = 0;
        let nextX = 0;
        let nextY = 0;
        card.addEventListener('pointermove', event => {
          const rect = card.getBoundingClientRect();
          nextX = Math.round(event.clientX - rect.left);
          nextY = Math.round(event.clientY - rect.top);
          if (rafId) return;
          rafId = requestAnimationFrame(() => {
            card.style.setProperty('--spot-x', `${nextX}px`);
            card.style.setProperty('--spot-y', `${nextY}px`);
            rafId = 0;
          });
        }, { passive: true });
      }
    }

    const supportsViewTimeline = typeof CSS !== 'undefined' &&
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
    if (!supportsViewTimeline && typeof IntersectionObserver !== 'undefined') {
      const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
      for (const el of revealEls) {
        el.classList.add('reveal-pending');
      }
      const io = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        }
      }, { threshold: 0.12 });
      for (const el of revealEls) {
        io.observe(el);
      }
    }
  }

  initTopbarScrollState();
  initImpactBandVideo();
  initLuxuryInteractions();
  void syncReleases();
})();
