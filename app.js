(() => {
  'use strict';

  const REPO_OWNER = 'MTrong2004';
  const REPO_NAME = 'Bizora-VideoApp-Releases';
  const RELEASES_FEED_URL = './releases.json';
  const RELEASES_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases?per_page=5`;
  const RELEASES_PAGE_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`;
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
    notes: 'Phiên bản phát hành đầu tiên có hỗ trợ tự động kiểm tra và cập nhật ngay trong ứng dụng.'
  };

  const SHOWCASE_CAPTIONS = Object.freeze({
    'tab-overview': 'Không gian Tổng quan quản lý lối tắt quy trình review, sao lưu dữ liệu cục bộ và danh sách dự án gần đây.',
    'tab-video': 'Màn hình Tạo video với lựa chọn thời lượng, thư viện nhạc nền và thiết lập tỷ lệ khung hình xuất MP4.',
    'tab-publish': 'Khu vực Kênh đăng chuẩn bị tiêu đề, chú thích, thẻ nhanh và lịch xuất bản theo từng kênh.'
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
    'book-open': ['M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z', 'M8 7h8', 'M8 11h8'],
    'hard-drive': ['M22 12H2', 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z', 'M6 16h.01', 'M10 16h.01'],
    'arrow-right': ['M5 12h14', 'm12 5 7 7-7 7'],
    check: ['M20 6 9 17l-5-5'],
    'refresh-cw': ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
    monitor: ['M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z', 'M8 21h8', 'M12 17v4'],
    layers: ['m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z', 'm22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65', 'm22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65'],
    cpu: ['M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z', 'M9 9h6v6H9Z', 'M15 2v2', 'M15 20v2', 'M2 15h2', 'M2 9h2', 'M20 15h2', 'M20 9h2', 'M9 2v2', 'M9 20v2'],
    github: ['M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4', 'M9 18c-4.51 2-5-2-7-2']
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

  class BizoraAppShowcase extends HTMLElement {
    constructor() {
      super();
      this._bound = false;
    }

    connectedCallback() {
      if (this._bound) return;
      this._bound = true;

      const tablist = this.querySelector('[role="tablist"]');
      const tabs = Array.from(this.querySelectorAll('[role="tab"]'));
      const panels = Array.from(this.querySelectorAll('[role="tabpanel"]'));
      const captionEl = this.querySelector('#showcase-caption-text');
      if (!tablist || !tabs.length || !panels.length) return;

      const selectTab = (targetTab, shouldFocus = false) => {
        if (!targetTab) return;
        for (const tab of tabs) {
          const isSelected = tab === targetTab;
          tab.ariaSelected = isSelected ? 'true' : 'false';
          tab.toggleAttribute('focusgroupstart', isSelected);
          if (!Object.hasOwn(HTMLElement.prototype, 'focusGroup')) {
            tab.tabIndex = isSelected ? 0 : -1;
          }
        }
        for (const panel of panels) {
          const matches = panel.getAttribute('aria-labelledby') === targetTab.id;
          if (matches) {
            panel.hidden = false;
            panel.tabIndex = 0;
          } else {
            panel.hidden = 'until-found';
            panel.removeAttribute('tabindex');
          }
        }
        if (captionEl && SHOWCASE_CAPTIONS[targetTab.id]) {
          captionEl.textContent = SHOWCASE_CAPTIONS[targetTab.id];
        }
        targetTab.scrollIntoView({ block: 'nearest', inline: 'nearest', container: 'nearest' });
        if (shouldFocus) {
          targetTab.focus({ preventScroll: true });
        }
      };

      const initialSelected = tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
      selectTab(initialSelected, false);

      tablist.addEventListener('click', event => {
        const tab = event.target.closest('[role="tab"]');
        if (tab) selectTab(tab, false);
      });

      tablist.addEventListener('keydown', event => {
        const current = event.target.closest('[role="tab"]');
        if (!current) return;
        const idx = tabs.indexOf(current);
        let nextIdx = -1;
        if (event.key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') nextIdx = 0;
        else if (event.key === 'End') nextIdx = tabs.length - 1;
        if (nextIdx >= 0) {
          event.preventDefault();
          selectTab(tabs[nextIdx], true);
        }
      });

      this.addEventListener('beforematch', event => {
        const panel = event.target.closest('[role="tabpanel"]');
        if (!panel) return;
        const tabId = panel.getAttribute('aria-labelledby');
        const tab = tabs.find(t => t.id === tabId);
        if (tab) selectTab(tab, false);
      });
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
      releasePageLink.href = RELEASES_PAGE_URL;
      releasePageLink.target = '_blank';
      releasePageLink.rel = 'noopener noreferrer';
      const linkLabel = document.createElement('span');
      linkLabel.textContent = 'Xem trên GitHub Releases';
      releasePageLink.append(linkLabel, makeIconNode('external-link', 13));

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
      d.shaCode.title = hash;
    }
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
      if (Array.isArray(releases) && releases.length) {
        this._releases = releases;
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

      for (const rel of this._releases) {
        const card = document.createElement('article');
        card.className = 'release-card';

        const head = document.createElement('div');
        head.className = 'release-head';

        const titleGroup = document.createElement('div');
        titleGroup.className = 'release-title-group';

        const tagPill = document.createElement('span');
        tagPill.className = 'release-tag';
        tagPill.textContent = rel.tag || `v${rel.version}`;
        titleGroup.append(tagPill);

        const parts = [];
        const dateStr = formatDateVi(rel.publishedAt);
        if (dateStr) parts.push(`Phát hành ${dateStr}`);
        const sizeStr = formatBytes(rel.size);
        if (sizeStr) parts.push(sizeStr);
        if (rel.assetName) parts.push(rel.assetName);

        if (parts.length) {
          const metaEl = document.createElement('span');
          metaEl.className = 'release-meta';
          metaEl.textContent = parts.join(' · ');
          titleGroup.append(metaEl);
        }

        const dlBtn = document.createElement('a');
        dlBtn.className = 'btn btn-ghost btn-sm';
        dlBtn.href = rel.downloadUrl || LATEST_RELEASE_URL;
        const dlSpan = document.createElement('span');
        dlSpan.textContent = 'Tải bản này';
        dlBtn.append(makeIconNode('download', 14), dlSpan);

        head.append(titleGroup, dlBtn);

        const notesScroll = document.createElement('div');
        notesScroll.className = 'notes-scroll';
        this._renderNotesContent(notesScroll, rel.notes);

        card.append(head, notesScroll);
        wrap.append(card);
      }

      this.replaceChildren(wrap);
    }
  }

  customElements.define('bizora-icon', BizoraIcon);
  customElements.define('bizora-app-showcase', BizoraAppShowcase);
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

    const versionText = document.getElementById('hero-version-text');
    if (versionText) versionText.textContent = `Bizora Video Studio ${tag} đã phát hành`;

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
    const valid = list.filter(item => item && typeof item.tag === 'string' && typeof item.downloadUrl === 'string' && item.downloadUrl);
    if (!valid.length) throw new Error('Empty releases feed');
    return valid;
  }

  async function fetchGitHubApiReleases(signal) {
    const res = await fetch(RELEASES_API_URL, {
      headers: { Accept: 'application/vnd.github+json' },
      signal
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const payload = await res.json();
    const published = (Array.isArray(payload) ? payload : [])
      .filter(item => item && !item.draft && !item.prerelease)
      .map(mapReleaseItem)
      .filter(Boolean);
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
        'Đang hiển thị thông tin mặc định — mở GitHub Releases để xem đầy đủ các bản phát hành mới nhất.'
      );
    }
  }

  void syncReleases();
})();
