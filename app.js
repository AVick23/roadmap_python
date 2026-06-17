// app.js — Material Design 3 приложение с улучшенной мобильной логикой
import { topics, categories } from './data.js';

// ═══════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════

const state = {
    read: loadFromStorage('pythonMapRead', {}),
    favorites: loadFromStorage('pythonMapFav', []),
    filter: 'all',
    levelFilter: null,
    categoryFilter: null,
    searchQuery: ''
};

// ═══════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════

function loadFromStorage(key, fallback) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch (e) {
        console.warn(`Failed to load ${key}:`, e);
        return fallback;
    }
}

function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn(`Failed to save ${key}:`, e);
        showSnackbar('Ошибка сохранения');
    }
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function showSnackbar(message) {
    const sb = document.getElementById('snackbar');
    sb.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">info</span>${message}`;
    sb.classList.add('visible');
    clearTimeout(sb._timeout);
    sb._timeout = setTimeout(() => sb.classList.remove('visible'), 2500);
}

function isMobile() {
    return window.innerWidth < 600;
}

// ═══════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════

function renderDrawer() {
    const nav = document.getElementById('drawerNav');
    const counts = {};
    topics.forEach(t => {
        counts[t.category] = (counts[t.category] || 0) + 1;
    });

    nav.innerHTML = categories.map(cat => `
        <button class="nav-item ${state.categoryFilter === cat.id ? 'active' : ''}" 
                data-category="${cat.id}">
            <span class="material-symbols-outlined">${cat.icon}</span>
            <span>${cat.title}</span>
            <span class="count">${counts[cat.id] || 0}</span>
        </button>
    `).join('');
    
    // Add "All topics" option
    nav.innerHTML = `
        <button class="nav-item ${!state.categoryFilter ? 'active' : ''}" data-category="all">
            <span class="material-symbols-outlined">apps</span>
            <span>Все темы</span>
            <span class="count">${topics.length}</span>
        </button>
    ` + nav.innerHTML;
}

function renderBottomNav() {
    const nav = document.getElementById('bottomNav');
    const favCount = state.favorites.length;
    
    // Показываем 5 основных категорий + избранное
    const mainCategories = categories.slice(0, 4);
    
    nav.innerHTML = mainCategories.map(cat => `
        <button class="bottom-nav-item ${state.categoryFilter === cat.id ? 'active' : ''}" 
                data-category="${cat.id}"
                aria-label="${cat.title}">
            <span class="nav-indicator"></span>
            <span class="material-symbols-outlined">${cat.icon}</span>
            <span class="bottom-nav-label">${cat.title.split(' ')[0]}</span>
        </button>
    `).join('') + `
        <button class="bottom-nav-item ${state.categoryFilter === 'favorites' ? 'active' : ''}" 
                data-category="favorites"
                aria-label="Избранное">
            <span class="nav-indicator"></span>
            <span class="material-symbols-outlined">star</span>
            <span class="bottom-nav-label">Избранное</span>
            ${favCount > 0 ? `<span class="fav-badge visible">${favCount}</span>` : ''}
        </button>
    `;
}

function renderTopics() {
    const container = document.getElementById('topicsContainer');
    container.innerHTML = '';

    categories.forEach(cat => {
        const catTopics = topics.filter(t => t.category === cat.id);
        const section = document.createElement('section');
        section.className = 'category-section';
        section.id = cat.id;
        section.innerHTML = `
            <h2 class="category-title">
                <span class="material-symbols-outlined">${cat.icon}</span>
                ${cat.title}
            </h2>
            <div class="topics-grid" data-category-grid="${cat.id}">
                ${catTopics.map(renderCard).join('')}
            </div>
        `;
        container.appendChild(section);
    });
}

function renderCard(topic) {
    const isRead = state.read[topic.id];
    const isFav = state.favorites.includes(topic.id);
    const levelLabel = { basic: 'Базовый', medium: 'Средний', advanced: 'Продвинутый' }[topic.level];

    return `
        <article class="card ${isRead ? 'read' : ''}" 
                 data-id="${topic.id}" 
                 data-level="${topic.level}" 
                 data-category="${topic.category}"
                 data-keywords="${topic.keywords.toLowerCase()} ${topic.title.toLowerCase()} ${topic.desc.toLowerCase()}">
            <div class="card-header">
                <div class="card-badges">
                    <span class="badge ${topic.level}">${levelLabel}</span>
                </div>
                <button class="icon-button fav-btn ${isFav ? 'selected' : ''}" 
                        aria-label="${isFav ? 'Удалить из избранного' : 'В избранное'}"
                        data-action="favorite"
                        style="width: 36px; height: 36px; color: ${isFav ? 'var(--md-sys-color-tertiary)' : 'var(--md-sys-color-on-surface-variant)'};">
                    <span class="material-symbols-outlined" style="font-size: 20px; ${isFav ? 'font-variation-settings: "FILL" 1;' : ''}">star</span>
                </button>
            </div>
            <h3 class="card-title">${topic.title}</h3>
            <div class="card-meta">
                <span><span class="material-symbols-outlined" style="font-size: 14px; vertical-align: text-bottom;">schedule</span> ${topic.time}</span>
            </div>
            <p class="card-desc">${topic.desc}</p>
            <div class="code-snippet"><code>${topic.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></div>
            <div class="card-links">
                ${topic.links.map((link, i) => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
                       class="link-chip ${i === 0 ? 'primary' : 'secondary'}">
                        ${link.text}
                        <span class="material-symbols-outlined">open_in_new</span>
                    </a>
                `).join('')}
            </div>
            <div class="card-footer">
                <label class="checkbox-wrapper">
                    <input type="checkbox" class="md-checkbox" data-action="read" ${isRead ? 'checked' : ''}>
                    <span>Прочитано</span>
                </label>
            </div>
        </article>
    `;
}

function updateDrawerStats() {
    const readCount = Object.values(state.read).filter(Boolean).length;
    const favCount = state.favorites.length;
    
    const readEl = document.getElementById('drawerReadCount');
    const favEl = document.getElementById('drawerFavCount');
    
    if (readEl) readEl.textContent = readCount;
    if (favEl) favEl.textContent = favCount;
}

// ═══════════════════════════════════════════════════
// FILTERS
// ═══════════════════════════════════════════════════

function applyFilters() {
    const cards = document.querySelectorAll('.card');
    const query = state.searchQuery.toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
        const id = card.dataset.id;
        const keywords = card.dataset.keywords;
        const level = card.dataset.level;
        const category = card.dataset.category;

        const matchesSearch = !query || keywords.includes(query);
        
        let matchesFilter = true;
        if (state.filter === 'favorites') {
            matchesFilter = state.favorites.includes(id);
        } else if (state.filter === 'unread') {
            matchesFilter = !state.read[id];
        }
        
        // Special category filter for favorites
        let matchesCategory = true;
        if (state.categoryFilter === 'favorites') {
            matchesCategory = state.favorites.includes(id);
        } else if (state.categoryFilter && state.categoryFilter !== 'all') {
            matchesCategory = category === state.categoryFilter;
        }
        
        const matchesLevel = !state.levelFilter || level === state.levelFilter;

        const visible = matchesSearch && matchesFilter && matchesLevel && matchesCategory;
        card.style.display = visible ? '' : 'none';
        if (visible) visibleCount++;
    });

    // Hide empty sections
    document.querySelectorAll('.category-section').forEach(section => {
        const grid = section.querySelector('.topics-grid');
        const hasVisible = Array.from(grid.children).some(c => c.style.display !== 'none');
        section.style.display = hasVisible ? '' : 'none';
    });

    // No results
    document.getElementById('noResults').classList.toggle('visible', visibleCount === 0);

    // Stats
    const stats = document.getElementById('searchStats');
    stats.textContent = visibleCount === topics.length 
        ? `Показаны все темы (${visibleCount})` 
        : `Найдено тем: ${visibleCount} из ${topics.length}`;

    renderActiveFilters();
    updateStats();
    updateBottomNavActive();
    updateDrawerStats();
}

function renderActiveFilters() {
    const container = document.getElementById('activeFilters');
    const filters = [];

    if (state.filter !== 'all') {
        filters.push({ type: 'filter', value: state.filter, label: state.filter === 'favorites' ? 'Избранное' : 'Непрочитанные' });
    }
    if (state.levelFilter) {
        const labels = { basic: 'Базовый', medium: 'Средний', advanced: 'Продвинутый' };
        filters.push({ type: 'level', value: state.levelFilter, label: labels[state.levelFilter] });
    }
    if (state.categoryFilter && state.categoryFilter !== 'all') {
        const label = state.categoryFilter === 'favorites' 
            ? 'Избранное' 
            : categories.find(c => c.id === state.categoryFilter)?.title || state.categoryFilter;
        filters.push({ type: 'category', value: state.categoryFilter, label });
    }
    if (state.searchQuery) {
        filters.push({ type: 'search', value: state.searchQuery, label: `«${state.searchQuery}»` });
    }

    if (filters.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = filters.map(f => `
        <div class="active-chip">
            ${f.label}
            <button data-remove="${f.type}" aria-label="Удалить фильтр">
                <span class="material-symbols-outlined" style="font-size: 16px;">close</span>
            </button>
        </div>
    `).join('') + `
        <button class="active-chip" id="resetAllBtn" style="color: var(--md-sys-color-primary);">
            <span class="material-symbols-outlined" style="font-size: 16px;">refresh</span>
            Сбросить
        </button>
    `;
}

function resetAllFilters() {
    state.filter = 'all';
    state.levelFilter = null;
    state.categoryFilter = null;
    state.searchQuery = '';
    document.getElementById('searchInput').value = '';

    document.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    document.querySelector('.chip[data-filter="all"]').classList.add('selected');

    applyFilters();
    renderDrawer();
    renderBottomNav();
    showSnackbar('Фильтры сброшены');
}

// ═══════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════

function updateStats() {
    const readTotal = Object.values(state.read).filter(Boolean).length;
    const percent = Math.round((readTotal / topics.length) * 100) || 0;
    document.getElementById('readCount').textContent = readTotal;
    document.getElementById('totalCount').textContent = topics.length;
    document.getElementById('progressPercent').textContent = percent + '%';
    document.getElementById('progressFill').style.width = percent + '%';
}

// ═══════════════════════════════════════════════════
// DRAWER LOGIC (с swipe-to-close)
// ═══════════════════════════════════════════════════

const drawer = document.getElementById('drawer');
const scrim = document.getElementById('scrim');
let touchStartX = 0;
let touchCurrentX = 0;
let isDragging = false;

function openDrawer() {
    drawer.classList.add('open');
    scrim.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    drawer.classList.remove('open');
    scrim.classList.remove('active');
    document.body.style.overflow = '';
    drawer.style.transform = '';
}

function toggleDrawer(force) {
    if (window.innerWidth >= 1200) return; // На десктопе drawer всегда открыт
    
    const isOpen = force !== undefined ? force : !drawer.classList.contains('open');
    if (isOpen) openDrawer();
    else closeDrawer();
}

// Swipe to close drawer
drawer.addEventListener('touchstart', (e) => {
    if (window.innerWidth >= 1200) return;
    touchStartX = e.touches[0].clientX;
    isDragging = true;
    drawer.style.transition = 'none';
}, { passive: true });

drawer.addEventListener('touchmove', (e) => {
    if (!isDragging || window.innerWidth >= 1200) return;
    touchCurrentX = e.touches[0].clientX;
    const diff = touchCurrentX - touchStartX;
    
    if (diff < 0) { // Свайп только влево
        drawer.style.transform = `translateX(${diff}px)`;
    }
}, { passive: true });

drawer.addEventListener('touchend', () => {
    if (!isDragging || window.innerWidth >= 1200) return;
    isDragging = false;
    drawer.style.transition = '';
    
    const diff = touchCurrentX - touchStartX;
    if (diff < -100) { // Порог закрытия
        closeDrawer();
    } else {
        drawer.style.transform = '';
    }
});

// Edge swipe to open drawer (Android-style)
let edgeTouchStartX = 0;
document.addEventListener('touchstart', (e) => {
    if (window.innerWidth >= 1200) return;
    edgeTouchStartX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (window.innerWidth >= 1200) return;
    const endX = e.changedTouches[0].clientX;
    if (edgeTouchStartX < 20 && endX - edgeTouchStartX > 100) {
        openDrawer();
    }
}, { passive: true });

// ═══════════════════════════════════════════════════
// EVENT DELEGATION
// ═══════════════════════════════════════════════════

// Topics container
document.getElementById('topicsContainer').addEventListener('click', (e) => {
    const checkbox = e.target.closest('[data-action="read"]');
    if (checkbox) {
        const card = e.target.closest('.card');
        const id = card.dataset.id;
        state.read[id] = checkbox.checked;
        card.classList.toggle('read', checkbox.checked);
        saveToStorage('pythonMapRead', state.read);
        updateStats();
        updateDrawerStats();
        showSnackbar(checkbox.checked ? 'Отмечено как прочитанное' : 'Метка снята');
        if (state.filter === 'unread') applyFilters();
        return;
    }

    const favBtn = e.target.closest('[data-action="favorite"]');
    if (favBtn) {
        const card = e.target.closest('.card');
        const id = card.dataset.id;
        if (state.favorites.includes(id)) {
            state.favorites = state.favorites.filter(f => f !== id);
            favBtn.classList.remove('selected');
            favBtn.style.color = 'var(--md-sys-color-on-surface-variant)';
            favBtn.querySelector('.material-symbols-outlined').style.fontVariationSettings = '"FILL" 0';
            showSnackbar('Удалено из избранного');
        } else {
            state.favorites.push(id);
            favBtn.classList.add('selected');
            favBtn.style.color = 'var(--md-sys-color-tertiary)';
            favBtn.querySelector('.material-symbols-outlined').style.fontVariationSettings = '"FILL" 1';
            showSnackbar('Добавлено в избранное');
        }
        saveToStorage('pythonMapFav', state.favorites);
        renderBottomNav();
        if (state.filter === 'favorites' || state.categoryFilter === 'favorites') applyFilters();
    }
});

// Active filters
document.getElementById('activeFilters').addEventListener('click', (e) => {
    const removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) {
        const type = removeBtn.dataset.remove;
        if (type === 'filter') {
            state.filter = 'all';
            document.querySelectorAll('.chip[data-filter]').forEach(c => c.classList.remove('selected'));
            document.querySelector('.chip[data-filter="all"]').classList.add('selected');
        } else if (type === 'level') {
            state.levelFilter = null;
            document.querySelectorAll('.chip[data-level]').forEach(c => c.classList.remove('selected'));
        } else if (type === 'category') {
            state.categoryFilter = null;
            renderDrawer();
            renderBottomNav();
        } else if (type === 'search') {
            state.searchQuery = '';
            document.getElementById('searchInput').value = '';
        }
        applyFilters();
        return;
    }

    if (e.target.closest('#resetAllBtn')) {
        resetAllFilters();
    }
});

// Drawer navigation
document.getElementById('drawerNav').addEventListener('click', (e) => {
    const navItem = e.target.closest('.nav-item');
    if (navItem) {
        const cat = navItem.dataset.category;
        
        if (cat === 'all') {
            state.categoryFilter = null;
        } else {
            state.categoryFilter = state.categoryFilter === cat ? null : cat;
        }
        
        applyFilters();
        renderDrawer();
        renderBottomNav();
        
        if (window.innerWidth < 1200) {
            closeDrawer();
        }
        
        if (cat !== 'all' && cat !== 'favorites') {
            setTimeout(() => {
                document.getElementById(cat)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});

// Bottom navigation (мобильная)
document.getElementById('bottomNav').addEventListener('click', (e) => {
    const navItem = e.target.closest('.bottom-nav-item');
    if (navItem) {
        const cat = navItem.dataset.category;
        
        if (cat === 'favorites') {
            state.categoryFilter = state.categoryFilter === 'favorites' ? null : 'favorites';
            state.filter = state.categoryFilter === 'favorites' ? 'favorites' : 'all';
            
            // Update chip states
            document.querySelectorAll('.chip[data-filter]').forEach(c => c.classList.remove('selected'));
            if (state.filter === 'favorites') {
                document.querySelector('.chip[data-filter="favorites"]').classList.add('selected');
            } else {
                document.querySelector('.chip[data-filter="all"]').classList.add('selected');
            }
        } else {
            state.categoryFilter = state.categoryFilter === cat ? null : cat;
        }
        
        applyFilters();
        renderDrawer();
        renderBottomNav();
        
        if (cat !== 'favorites') {
            setTimeout(() => {
                document.getElementById(cat)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
});

function updateBottomNavActive() {
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        const cat = item.dataset.category;
        item.classList.toggle('active', 
            (cat === 'favorites' && state.categoryFilter === 'favorites') ||
            (cat !== 'favorites' && state.categoryFilter === cat)
        );
    });
}

// ═══════════════════════════════════════════════════
// UI CONTROLS
// ═══════════════════════════════════════════════════

// Filter chips
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;
        const level = chip.dataset.level;

        if (level) {
            if (state.levelFilter === level) {
                state.levelFilter = null;
                chip.classList.remove('selected');
            } else {
                document.querySelectorAll('.chip[data-level]').forEach(c => c.classList.remove('selected'));
                state.levelFilter = level;
                chip.classList.add('selected');
            }
        } else {
            document.querySelectorAll('.chip[data-filter]').forEach(c => c.classList.remove('selected'));
            state.filter = filter;
            chip.classList.add('selected');
            
            // Синхронизация с categoryFilter для favorites
            if (filter === 'favorites') {
                state.categoryFilter = 'favorites';
            } else if (state.categoryFilter === 'favorites') {
                state.categoryFilter = null;
            }
        }
        applyFilters();
        renderDrawer();
        renderBottomNav();
    });
});

// Search
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const debouncedFilter = debounce(applyFilters, 200);

searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    searchClear.classList.toggle('visible', e.target.value.length > 0);
    debouncedFilter();
});

searchClear.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    searchClear.classList.remove('visible');
    applyFilters();
    searchInput.focus();
});

// Drawer controls
document.getElementById('menuToggle').addEventListener('click', () => toggleDrawer());
document.getElementById('drawerClose')?.addEventListener('click', closeDrawer);
scrim.addEventListener('click', closeDrawer);

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? 'dark_mode' : 'light_mode';
    document.querySelector('meta[name="theme-color"]').setAttribute('content', 
        theme === 'dark' ? '#141218' : '#FFFBFE');
    saveToStorage('pythonMapTheme', theme);
}

let currentTheme = loadFromStorage('pythonMapTheme', 'dark');
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    showSnackbar(currentTheme === 'dark' ? 'Тёмная тема' : 'Светлая тема');
});

// FAB
const fab = document.getElementById('fabTop');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    fab.classList.toggle('visible', currentY > 400);
    document.getElementById('topAppBar').classList.toggle('scrolled', currentY > 10);
    lastScrollY = currentY;
}, { passive: true });

fab.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Shortcuts dialog
const dialog = document.getElementById('shortcutsDialog');
const dialogScrim = document.getElementById('dialogScrim');

function toggleDialog(show) {
    dialog.classList.toggle('active', show);
    dialogScrim.classList.toggle('active', show);
    document.body.style.overflow = show ? 'hidden' : '';
}

document.getElementById('shortcutsBtn').addEventListener('click', () => toggleDialog(true));
document.getElementById('closeDialog').addEventListener('click', () => toggleDialog(false));
dialogScrim.addEventListener('click', () => toggleDialog(false));

// Reset from no results
document.getElementById('resetFromNoResults')?.addEventListener('click', resetAllFilters);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        themeToggle.click();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        toggleDrawer();
    }
    if (e.key === 'Escape') {
        if (dialog.classList.contains('active')) toggleDialog(false);
        else if (drawer.classList.contains('open')) closeDrawer();
        else if (searchInput.value) {
            searchInput.value = '';
            state.searchQuery = '';
            searchClear.classList.remove('visible');
            applyFilters();
        }
    }
});

// Resize handler
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1200) {
        closeDrawer();
    }
});

// IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.toggle('active', item.dataset.category === id);
            });
        }
    });
}, { rootMargin: '-30% 0px -70% 0px' });

// ═══════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════

function init() {
    renderDrawer();
    renderBottomNav();
    renderTopics();
    applyFilters();
    document.querySelectorAll('.category-section').forEach(s => observer.observe(s));
}

init();