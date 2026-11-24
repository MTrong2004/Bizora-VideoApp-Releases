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
    publishedAt: '2026-11-24T08:08:37Z',
    size: 122348422,
    downloadUrl: LATEST_RELEASE_URL,
    assetName: 'Bizora-Video-Studio-Setup-0.1.0.exe',
    sha256: '',
    notes: 'Phiên bản phát hành đầu tiên có hỗ trợ tự động kiểm tra và cập nhật ngay trong ứng dụng.'
  };

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const ICON_PATHS = Object.freeze({
    download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3'],
    'external-link': ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'],
    copy: [
      'M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z',
      'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'
    ],
    check: ['M20 6 9 17l-5-5'],
    'check-circle': ['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'm9 11 3 3L22 4'],
    'shield-check': [
      'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z',
      'm9 12 2 2 4-4'
    ],
    film: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M7 3v18', 'M17 3v18', 'M3 12h18', 'M3 7.5h4', 'M3 16.5h4', 'M17 7.5h4', 'M17 16.5h4'],
    'book-open': ['M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z', 'M8 7h8', 'M8 11h8'],
    sparkles: ['m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z'],
    send: ['m22 2-7 20-4-9-9-4Z', 'M22 2 11 13'],
    refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
    'layout-grid': ['M3 3h7v9H3z', 'M14 3h7v5h-7z', 'M14 12h7v9h-7z', 'M3 16h7v5H3z'],
    calendar: ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'],
    'hard-drive': ['M22 12H2', 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z', 'M6 16h.01', 'M10 16h.01']
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

  function makeIconNode(name, size = 16) {
    const el = document.createElement('bizora-icon');
    el.setAttribute('name', name);
    el.setAttribute('size', String(size));
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

  class BizoraDownloadCard extends HTMLElement {
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
      const card = document.createElement('div');
      card.className = 'download-card';

      const actions = document.createElement('div');
      actions.className = 'download-actions';

      const primaryBtn = document.createElement('a');
      primaryBtn.className = 'btn btn-primary download-btn-main';
      primaryBtn.id = 'hero-download-btn';
      const primaryLabel = document.createElement('span');
      primaryLabel.textContent = 'Tải cho Windows';
      const primaryVer = document.createElement('span');
      primaryVer.className = 'download-btn-version';
      primaryBtn.append(makeIconNode('download', 17), primaryLabel, primaryVer);

      const releasesLink = document.createElement('a');
      releasesLink.className = 'btn';
      releasesLink.href = RELEASES_PAGE_URL;
      releasesLink.target = '_blank';
      releasesLink.rel = 'noopener noreferrer';
      const relSpan = document.createElement('span');
      relSpan.textContent = 'Trang phát hành';
      releasesLink.append(relSpan, makeIconNode('external-link', 15));

      actions.append(primaryBtn, releasesLink);

      const meta = document.createElement('div');
      meta.className = 'download-meta';

      const makeMetaItem = iconName => {
        const item = document.createElement('span');
        item.className = 'download-meta-item';
        const label = document.createElement('span');
        item.append(makeIconNode(iconName, 14), label);
        return { item, label };
      };

      const osMeta = makeMetaItem('shield-check');
      osMeta.label.textContent = 'Windows 10/11 (64-bit)';
      const sizeMeta = makeMetaItem('hard-drive');
      const dateMeta = makeMetaItem('calendar');
      const updateMeta = makeMetaItem('refresh');
      updateMeta.label.textContent = 'Tự cập nhật trong app';
      meta.append(osMeta.item, sizeMeta.item, dateMeta.item, updateMeta.item);

      const checksumBox = document.createElement('div');
      checksumBox.className = 'checksum-box';
      checksumBox.hidden = true;

      const checksumCopyWrap = document.createElement('div');
      checksumCopyWrap.className = 'checksum-copy-wrap';
      const checksumLabel = document.createElement('span');
      checksumLabel.className = 'checksum-label';
      checksumLabel.textContent = 'Mã kiểm tra tệp cài đặt (SHA-256)';
      const checksumCode = document.createElement('code');
      checksumCode.className = 'checksum-value';
      checksumCopyWrap.append(checksumLabel, checksumCode);

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'btn copy-btn';
      const copyText = document.createElement('span');
      copyText.textContent = 'Sao chép';
      copyBtn.append(makeIconNode('copy', 14), copyText);

      checksumBox.append(checksumCopyWrap, copyBtn);

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

      card.append(actions, meta, checksumBox, copyStatus);
      this.replaceChildren(card);

      this._dom = {
        primaryBtn,
        primaryVer,
        sizeItem: sizeMeta.item,
        sizeLabel: sizeMeta.label,
        dateItem: dateMeta.item,
        dateLabel: dateMeta.label,
        checksumBox,
        checksumCode
      };
    }

    _render() {
      if (!this._dom) return;
      const r = this._release;
      const d = this._dom;

      d.primaryBtn.href = r.downloadUrl || LATEST_RELEASE_URL;
      d.primaryVer.textContent = r.tag || `v${r.version}`;

      const sizeStr = formatBytes(r.size);
      d.sizeItem.hidden = !sizeStr;
      d.sizeLabel.textContent = sizeStr;

      const dateStr = formatDateVi(r.publishedAt);
      d.dateItem.hidden = !dateStr;
      d.dateLabel.textContent = dateStr ? `Phát hành ${dateStr}` : '';

      const hash = r.sha256 || '';
      d.checksumBox.hidden = !hash;
      d.checksumCode.textContent = hash;
      d.checksumCode.title = hash;
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
        card.className = 'surface-card release-card';

        const head = document.createElement('div');
        head.className = 'release-head';

        const titleGroup = document.createElement('div');
        titleGroup.className = 'release-title-group';

        const tagPill = document.createElement('span');
        tagPill.className = 'release-tag';
        tagPill.textContent = rel.tag || `v${rel.version}`;
        titleGroup.append(tagPill);

        const dateStr = formatDateVi(rel.publishedAt);
        if (dateStr) {
          const dateEl = document.createElement('span');
          dateEl.className = 'release-date';
          dateEl.textContent = dateStr;
          titleGroup.append(dateEl);
        }

        const sizeStr = formatBytes(rel.size);
        if (sizeStr) {
          const sizeEl = document.createElement('span');
          sizeEl.className = 'release-size';
          sizeEl.textContent = `· ${sizeStr}`;
          titleGroup.append(sizeEl);
        }

        const dlBtn = document.createElement('a');
        dlBtn.className = 'btn btn-sm';
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
  customElements.define('bizora-download-card', BizoraDownloadCard);
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

  function applyLatestToHeaderAndHero(latest) {
    if (!latest) return;
    const headerBtn = document.getElementById('header-download-btn');
    if (headerBtn && latest.downloadUrl) {
      headerBtn.href = latest.downloadUrl;
    }
    const versionText = document.getElementById('hero-version-text');
    if (versionText) {
      versionText.textContent = `Phiên bản ${latest.tag} · Windows 64-bit`;
    }
    const certSnippet = document.querySelector('#huong-dan .code-snippet code');
    if (certSnippet && latest.assetName) {
      certSnippet.textContent = `certutil -hashfile ${latest.assetName} SHA256`;
    }
    document.getElementById('download-card')?.setRelease?.(latest);
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
    const card = document.getElementById('download-card');
    const notesEl = document.getElementById('release-notes');
    card?.setRelease?.(FALLBACK_RELEASE);
    notesEl?.setReleases?.([FALLBACK_RELEASE]);

    const signal = typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function'
      ? AbortSignal.timeout(8000)
      : undefined;

    try {
      const published = await fetchSameOriginReleases(signal);
      applyLatestToHeaderAndHero(published[0]);
      notesEl?.setReleases?.(published);
      return;
    } catch { /* fall through to GitHub API */ }

    try {
      const published = await fetchGitHubApiReleases(signal);
      applyLatestToHeaderAndHero(published[0]);
      notesEl?.setReleases?.(published);
    } catch {
      applyLatestToHeaderAndHero(FALLBACK_RELEASE);
      notesEl?.setReleases?.(
        [FALLBACK_RELEASE],
        'Đang hiển thị thông tin mặc định — bấm Trang phát hành để xem đầy đủ tất cả phiên bản mới nhất.'
      );
    }
  }

  void syncReleases();
})();
