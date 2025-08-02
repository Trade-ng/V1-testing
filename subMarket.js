// Marketplace Data

// Global function for back button
window.goBackToMarket = function() {
  if (appState.currentPage !== 'market') {
    window.location.href = 'market.html';
  }
};


const marketplaceData = {
    products: [
        {
            id: 1,
            name: "Samsung 55-inch 4K Smart TV",
            price: 120000,
            image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
            seller: "TechHub Electronics",
            market: "Computer Village",
            category: "Electronics",
            rating: 4.5,
            reviews: 89,
            colors: ["Black", "Silver"],
            sizes: ["55 inch", "65 inch", "75 inch"],
            description: "Experience stunning 4K picture quality with this Samsung Smart TV. Features built-in streaming apps and voice control."
        },
        {
            id: 2,
            name: "Ankara Fabric Collection",
            price: 8500,
            image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
            seller: "Fashion Palace",
            market: "Ariaria International",
            category: "Fashion",
            rating: 4.8,
            reviews: 156,
            colors: ["Blue", "Red", "Green", "Yellow"],
            sizes: ["2 yards", "4 yards", "6 yards"],
            description: "Premium quality Ankara fabric perfect for traditional and modern designs. Vibrant colors and durable material."
        },
        {
            id: 3,
            name: "Toyota Corolla Headlights",
            price: 45500,
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
            seller: "AutoParts Plus",
            market: "Ladipo Auto Market",
            category: "Automotive",
            rating: 4.2,
            reviews: 67,
            description: "Original Toyota Corolla headlights. Compatible with 2014-2019 models. Easy installation and long-lasting."
        },
        {
            id: 4,
            name: "Office Chair Executive",
            price: 85000,
            image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400",
            seller: "Quality Furniture",
            market: "Alaba International",
            category: "Furniture",
            rating: 4.6,
            reviews: 234,
            colors: ["Black", "Brown", "Gray"],
            description: "Ergonomic executive office chair with lumbar support. Perfect for long working hours with premium comfort."
        },
        {
            id: 5,
            name: "iPhone 13 Pro Max",
            price: 580000,
            image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c1?w=400",
            seller: "Fashion Palace",
            market: "Computer Village",
            category: "Electronics",
            rating: 5.0,
            reviews: 342,
            colors: ["Sierra Blue", "Graphite", "Gold", "Silver"],
            sizes: ["128GB", "256GB", "512GB", "1TB"],
            description: "Latest iPhone 13 Pro Max with ProRAW capabilities and cinematic mode. Unlocked and brand new."
        },
        {
            id: 6,
            name: "Samsung Galaxy S21",
            price: 450000,
            image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
            seller: "Fashion Palace",
            market: "Computer Village",
            category: "Electronics",
            rating: 4.7,
            reviews: 198,
            colors: ["Phantom Black", "Phantom White", "Phantom Violet"],
            sizes: ["128GB", "256GB"],
            description: "Samsung Galaxy S21 with 5G connectivity and triple camera system. Fast performance and sleek design."
        },
        {
            id: 7,
            name: "MacBook Pro M1",
            price: 850000,
            image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
            seller: "Fashion Palace",
            market: "Computer Village",
            category: "Electronics",
            rating: 4.9,
            reviews: 276,
            colors: ["Space Gray", "Silver"],
            sizes: ["8GB RAM", "16GB RAM"],
            description: "MacBook Pro with M1 chip delivers incredible performance and up to 20 hours of battery life."
        }
    ],
    
    shopProducts: [
        {
            id: 101,
            name: "iPhone 13 Pro Max",
            price: "₦580,000",
            image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c1?w=400"
        },
        {
            id: 102,
            name: "Samsung Galaxy S21",
            price: "₦450,000",
            image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
        },
        {
            id: 103,
            name: "MacBook Pro M1",
            price: "₦850,000",
            image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400"
        },
        {
            id: 104,
            name: "AirPods Pro",
            price: "₦120,000",
            image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400"
        }
    ]
};

// Application State
let appState = {
    currentPage: 'market',
    searchQuery: '',
    filters: {
        category: '',
        market: '',
        priceRange: { min: '', max: '' }
    },
    sortBy: 'featured',
    viewMode: 'grid',
    activeTab: 'products',
    selectedProduct: null,
    notifications: [
        {
            id: 1,
            type: 'message',
            title: 'New Message',
            message: 'TechHub Electronics: Yes, we have that model in stock',
            time: '2m ago',
            read: false
        },
        {
            id: 2,
            type: 'order',
            title: 'Order Update',
            message: 'Your Samsung TV order has been confirmed',
            time: '30m ago',
            read: false
        }
    ]
};

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price).replace('NGN', '₦');
}

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<div class="toast-message">${message}</div>`;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showLoading() {
    document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-spinner').classList.add('hidden');
}

// Navigation Functions
function navigateToPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show target page
  document.getElementById(`${pageId}-page`).classList.add('active');
  
  // Update navigation
  updateBottomNavigation(pageId);
  
  // Update app state
  appState.currentPage = pageId;
  
  // Update header title
  const headerTitle = document.getElementById('header-title');
  if (headerTitle) {
    headerTitle.textContent = pageId.charAt(0).toUpperCase() + pageId.slice(1);
  }
  
  // Load page-specific data
  if (pageId === 'market') {
    renderProducts();
  } else if (pageId === 'shop') {
    renderShopProducts();
  }
}

// Update the bottom navigation click handlers
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        const pageId = this.getAttribute('data-page');
        if (pageId === 'home') {
            window.location.href = 'market.html';
            return;
        }
        e.preventDefault();
        navigateToPage(pageId);
    });
});

// Product Rendering Functions
function renderProducts() {
    const grid = document.getElementById('products-grid');
    const filteredProducts = getFilteredProducts();
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <p style="color: var(--gray-500);">No products found</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-meta">
                    <span>${product.seller}</span>
                    <span>•</span>
                    <span>${product.market}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(event, ${product.id})">
                    <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
                        <path d="M14.6663 15.0003C15.1084 15.0003 15.5323 15.1759 15.8449 15.4885C16.1574 15.801 16.333 16.225 16.333 16.667C16.333 17.109 16.1574 17.5329 15.8449 17.8455C15.5323 18.1581 15.1084 18.3337 14.6663 18.3337C14.2243 18.3337 13.8004 18.1581 13.4878 17.8455C13.1753 17.5329 12.9997 17.109 12.9997 16.667C12.9997 15.742 13.7413 15.0003 14.6663 15.0003ZM1.33301 1.66699H4.05801L4.84134 3.33366H17.1663C17.3874 3.33366 17.5993 3.42146 17.7556 3.57774C17.9119 3.73402 17.9997 3.94598 17.9997 4.16699C17.9997 4.30866 17.958 4.45033 17.8997 4.58366L14.9163 9.97533C14.633 10.4837 14.083 10.8337 13.458 10.8337H7.24967L6.49967 12.192L6.47467 12.292C6.47467 12.3472 6.49662 12.4002 6.53569 12.4393C6.57476 12.4784 6.62775 12.5003 6.68301 12.5003H16.333V14.167H6.33301C5.89098 14.167 5.46706 13.9914 5.1545 13.6788C4.84194 13.3663 4.66634 12.9424 4.66634 12.5003C4.66634 12.2087 4.74134 11.9337 4.86634 11.7003L5.99967 9.65866L2.99967 3.33366H1.33301V1.66699ZM6.33301 15.0003C6.77504 15.0003 7.19896 15.1759 7.51152 15.4885C7.82408 15.801 7.99967 16.225 7.99967 16.667C7.99967 17.109 7.82408 17.5329 7.51152 17.8455C7.19896 18.1581 6.77504 18.3337 6.33301 18.3337C5.89098 18.3337 5.46706 18.1581 5.1545 17.8455C4.84194 17.5329 4.66634 17.109 4.66634 16.667C4.66634 15.742 5.40801 15.0003 6.33301 15.0003ZM13.833 9.16699L16.1497 5.00033H5.61634L7.58301 9.16699H13.833Z" fill="white"/>
                    </svg>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    
    updateResultsCount(filteredProducts.length);
}

function renderShopProducts() {
    const container = document.getElementById('shop-products');
    
    container.innerHTML = marketplaceData.shopProducts.map(product => `
        <div class="shop-product-card" onclick="openShopProductModal(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="shop-product-image">
            <div class="shop-product-info">
                <h3 class="shop-product-name">${product.name}</h3>
                <div class="shop-product-footer">
                    <span class="shop-product-price">${product.price}</span>
                    <button class="favorite-btn" onclick="toggleFavorite(event, ${product.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M20.84 4.61A5.5 5.5 0 0 0 7.5 7.5L12 13L16.5 7.5A5.5 5.5 0 0 0 20.84 4.61Z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getFilteredProducts() {
    let filtered = marketplaceData.products;
    
    // Search filter
    if (appState.searchQuery) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(appState.searchQuery.toLowerCase()) ||
            product.seller.toLowerCase().includes(appState.searchQuery.toLowerCase())
        );
    }
    
    // Category filter
    if (appState.filters.category) {
        filtered = filtered.filter(product => 
            product.category === appState.filters.category
        );
    }
    
    // Market filter
    if (appState.filters.market) {
        filtered = filtered.filter(product => 
            product.market === appState.filters.market
        );
    }
    
    // Price range filter
    if (appState.filters.priceRange.min) {
        filtered = filtered.filter(product => 
            product.price >= parseInt(appState.filters.priceRange.min)
        );
    }
    
    if (appState.filters.priceRange.max) {
        filtered = filtered.filter(product => 
            product.price <= parseInt(appState.filters.priceRange.max)
        );
    }
    
    // Sort products
    switch (appState.sortBy) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Keep original order for featured
            break;
    }
    
    return filtered;
}

function updateResultsCount(count) {
    document.getElementById('results-count').textContent = `${count} results`;
}

// Modal Functions
function openProductModal(productId) {
    const product = marketplaceData.products.find(p => p.id === productId);
    if (!product) return;
    
    appState.selectedProduct = product;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-product-image">
        <h1 class="modal-product-name">${product.name}</h1>
        <div class="modal-product-rating">
            <div class="rating-stars">
                ${Array.from({length: 5}, (_, i) => 
                    `<svg width="16" height="16" viewBox="0 0 24 24" fill="${i < Math.floor(product.rating) ? '#FACC15' : 'none'}" stroke="#FACC15">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>`
                ).join('')}
            </div>
            <span>(${product.reviews} reviews)</span>
        </div>
        <div class="modal-product-price">${formatPrice(product.price)}</div>
        <div class="modal-product-description">
            <h3>Description</h3>
            <p>${product.description}</p>
        </div>
        
        ${product.colors ? `
            <div class="color-selection">
                <h3>Color</h3>
                <div class="color-options">
                    ${product.colors.map((color, index) => 
                        `<button class="color-option ${index === 0 ? 'selected' : ''}" onclick="selectColor(${index})">${color}</button>`
                    ).join('')}
                </div>
            </div>
        ` : ''}
        
        ${product.sizes ? `
            <div class="size-selection">
                <h3>Size</h3>
                <div class="size-options">
                    ${product.sizes.map((size, index) => 
                        `<button class="size-option ${index === 0 ? 'selected' : ''}" onclick="selectSize(${index})">${size}</button>`
                    ).join('')}
                </div>
            </div>
        ` : ''}
        
        <div class="quantity-selection">
            <h3>Quantity</h3>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="decreaseQuantity()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
                <span class="quantity-value" id="quantity-value">1</span>
                <button class="quantity-btn" onclick="increaseQuantity()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2"/>
                        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <div class="modal-actions">
            <button class="modal-btn-primary" onclick="addToCartFromModal()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="21" r="1" stroke="currentColor" stroke-width="2"/>
                    <circle cx="20" cy="21" r="1" stroke="currentColor" stroke-width="2"/>
                    <path d="M1 1H5L7.68 14.39A2 2 0 0 0 9.65 16H19.4A2 2 0 0 0 21.38 14.39L23 6H6" stroke="currentColor" stroke-width="2"/>
                </svg>
                Add to Cart
            </button>
            <button class="modal-btn-secondary" onclick="buyNow()">
                Buy Now
            </button>
        </div>
    `;
    
    document.getElementById('product-modal').classList.remove('hidden');
}

function openShopProductModal(productId) {
    const product = marketplaceData.shopProducts.find(p => p.id === productId);
    if (!product) return;
    
    // Find equivalent product in main data for more details
    const detailedProduct = marketplaceData.products.find(p => p.name === product.name) || {
        ...product,
        rating: 4.5,
        reviews: 50,
        description: "High-quality product from Fashion Palace."
    };
    
    openProductModal(detailedProduct.id || productId);
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
    appState.selectedProduct = null;
}

function selectColor(index) {
    document.querySelectorAll('.color-option').forEach((btn, i) => {
        btn.classList.toggle('selected', i === index);
    });
}

function selectSize(index) {
    document.querySelectorAll('.size-option').forEach((btn, i) => {
        btn.classList.toggle('selected', i === index);
    });
}

function increaseQuantity() {
    const quantityEl = document.getElementById('quantity-value');
    const current = parseInt(quantityEl.textContent);
    quantityEl.textContent = current + 1;
}

function decreaseQuantity() {
    const quantityEl = document.getElementById('quantity-value');
    const current = parseInt(quantityEl.textContent);
    if (current > 1) {
        quantityEl.textContent = current - 1;
    }
}

// Cart Functions
function addToCart(event, productId) {
    event.stopPropagation();
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showToast('Product added to cart successfully!');
    }, 1000);
}

function addToCartFromModal() {
    if (!appState.selectedProduct) return;
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showToast('Product added to cart successfully!');
        closeProductModal();
    }, 1500);
}

function buyNow() {
    if (!appState.selectedProduct) return;
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showToast('Redirecting to checkout...');
        closeProductModal();
    }, 2000);
}

function toggleFavorite(event, productId) {
    event.stopPropagation();
    showToast('Added to favorites!');
}

// Search Functions
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    appState.searchQuery = searchInput.value;
    renderProducts();
}

function handleShopSearch() {
    const searchInput = document.getElementById('shop-search-input');
    const query = searchInput.value.toLowerCase();
    
    const filteredProducts = marketplaceData.shopProducts.filter(product =>
        product.name.toLowerCase().includes(query)
    );
    
    const container = document.getElementById('shop-products');
    
    if (filteredProducts.length === 0 && query) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <p style="color: var(--gray-500);">No products found for "${query}"</p>
            </div>
        `;
    } else {
        const productsToShow = query ? filteredProducts : marketplaceData.shopProducts;
        container.innerHTML = productsToShow.map(product => `
            <div class="shop-product-card" onclick="openShopProductModal(${product.id})">
                <img src="${product.image}" alt="${product.name}" class="shop-product-image">
                <div class="shop-product-info">
                    <h3 class="shop-product-name">${product.name}</h3>
                    <div class="shop-product-footer">
                        <span class="shop-product-price">${product.price}</span>
                        <button class="favorite-btn" onclick="toggleFavorite(event, ${product.id})">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M20.84 4.61A5.5 5.5 0 0 0 7.5 7.5L12 13L16.5 7.5A5.5 5.5 0 0 0 20.84 4.61Z" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Notification Functions
function openNotifications() {
    document.getElementById('notifications-panel').classList.remove('hidden');
}

function closeNotifications() {
    document.getElementById('notifications-panel').classList.add('hidden');
}

function markAllNotificationsRead() {
    appState.notifications.forEach(notification => {
        notification.read = true;
    });
    
    document.querySelectorAll('.notification-item').forEach(item => {
        item.classList.remove('unread');
        item.classList.add('read');
    });
    
    updateNotificationBadges();
    showToast('All notifications marked as read');
}

function updateNotificationBadges() {
    const unreadCount = appState.notifications.filter(n => !n.read).length;
    const badges = document.querySelectorAll('.notification-badge');
    
    badges.forEach(badge => {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
    
    const notificationCount = document.querySelector('.notifications-count');
    if (notificationCount) {
        notificationCount.textContent = unreadCount;
        notificationCount.style.display = unreadCount > 0 ? 'inline' : 'none';
    }
}

// Chat Functions
function openConversation(sellerId) {
    showToast(`Opening conversation with ${sellerId.replace('-', ' ')}`);
    // In a real app, this would navigate to the conversation page
}

// Tab Functions
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    appState.activeTab = tabName;
    
    if (tabName === 'products') {
        renderProducts();
    } else {
        // Show sellers view
        const grid = document.getElementById('products-grid');
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <p style="color: var(--gray-500);">Sellers view coming soon!</p>
            </div>
        `;
    }
}

// Sort Functions
function handleSort() {
    const select = document.getElementById('sort-select');
    appState.sortBy = select.value;
    renderProducts();
}

// View Toggle Functions
function toggleView(viewMode) {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${viewMode}"]`).classList.add('active');
    
    appState.viewMode = viewMode;
    
    const grid = document.getElementById('products-grid');
    if (viewMode === 'list') {
        grid.style.gridTemplateColumns = '1fr';
    } else {
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    renderProducts();
    updateNotificationBadges();
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    const shopSearchInput = document.getElementById('shop-search-input');
    if (shopSearchInput) {
        shopSearchInput.addEventListener('input', handleShopSearch);
    }
    
    // Shop search toggle
    const shopSearchBtn = document.getElementById('shop-search-btn');
    if (shopSearchBtn) {
        shopSearchBtn.addEventListener('click', function() {
            const searchContainer = document.getElementById('shop-search-container');
            searchContainer.classList.toggle('hidden');
            if (!searchContainer.classList.contains('hidden')) {
                shopSearchInput.focus();
            }
        });
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const viewMode = this.getAttribute('data-view');
            toggleView(viewMode);
        });
    });
    
    // Bottom navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            navigateToPage(pageId);
        });
    });
    
    // Notification functionality
    document.getElementById('notification-btn').addEventListener('click', openNotifications);
    
    const markAllReadBtn = document.querySelector('.mark-all-read');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', markAllNotificationsRead);
    }
    
    // Close modals when clicking outside
    document.getElementById('product-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeProductModal();
        }
    });
    
    document.getElementById('notifications-panel').addEventListener('click', function(e) {
        if (e.target === this) {
            closeNotifications();
        }
    });
    
    // Filter button (placeholder)
    document.getElementById('filter-btn').addEventListener('click', function() {
        showToast('Filter functionality coming soon!');
    });
    
    // Search button functionality
    document.getElementById('search-btn').addEventListener('click', function() {
        const searchSection = document.querySelector('.search-section');
        searchSection.scrollIntoView({ behavior: 'smooth' });
        searchInput.focus();
    });
});

// Handle hash-based navigation
function handleHashNavigation() {
  const hash = window.location.hash.substring(1);
  
  if (hash) {
    switch(hash) {
      case 'live':
        navigateToPage('live');
        break;
      case 'chat':
        navigateToPage('chat');
        break;
      case 'profile':
        navigateToPage('profile');
        break;
      default:
        navigateToPage('market');
    }
  } else {
    navigateToPage('market');
  }
}

// Call this function on initial load
handleHashNavigation();

// Also handle hash changes
window.addEventListener('hashchange', handleHashNavigation);

// Global functions for inline event handlers
window.navigateToPage = navigateToPage;
window.openProductModal = openProductModal;
window.openShopProductModal = openShopProductModal;
window.closeProductModal = closeProductModal;
window.openConversation = openConversation;
window.closeNotifications = closeNotifications;
window.addToCart = addToCart;
window.addToCartFromModal = addToCartFromModal;
window.buyNow = buyNow;
window.toggleFavorite = toggleFavorite;
window.selectColor = selectColor;
window.selectSize = selectSize;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.markAllNotificationsRead = markAllNotificationsRead;
