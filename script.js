// Firebase Configuration
const firebaseConfig = {
    // ここにあなたのFirebase設定を貼り付けてください
    apiKey: "AIzaSyCthuPIrtKeLBJM7_ywwV0knYiTc7faf4Y",
    authDomain: "prins-data-shop.firebaseapp.com",
    databaseURL: "https://prins-data-shop-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "prins-data-shop",
    storageBucket: "prins-data-shop.firebasestorage.app",
    messagingSenderId: "164682588044",
    appId: "1:164682588044:web:befb10a3f2549d3f2740a9",
    measurementId: "G-EVF43HDYJW"
}

// Initialize Firebase
let database;
try {
firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization failed:', error);
}

// Firebase Heart Count Management
const HeartManager = {
    // Initialize heart counts from Firebase
    async initializeHeartCounts() {
        if (!database) return;
        
        try {
            const snapshot = await database.ref('hearts').once('value');
            const firebaseHearts = snapshot.val() || {};
            
            // Update product heart counts from Firebase
            products.forEach(product => {
                if (firebaseHearts[product.id]) {
                    product.hearts = firebaseHearts[product.id].count || product.hearts;
                }
            });
            
            console.log('Heart counts loaded from Firebase');
        } catch (error) {
            console.error('Error loading heart counts:', error);
        }
    },

    // Get current heart count for a product
    async getHeartCount(productId) {
        if (!database) return products.find(p => p.id === productId)?.hearts || 0;
        
        try {
            const snapshot = await database.ref(`hearts/${productId}/count`).once('value');
            return snapshot.val() || products.find(p => p.id === productId)?.hearts || 0;
        } catch (error) {
            console.error('Error getting heart count:', error);
            return products.find(p => p.id === productId)?.hearts || 0;
        }
    },

    // Update heart count in Firebase
    async updateHeartCount(productId, increment = true) {
        if (!database) return;
        
        try {
            const heartRef = database.ref(`hearts/${productId}`);
            const snapshot = await heartRef.once('value');
            const currentData = snapshot.val() || { count: products.find(p => p.id === productId)?.hearts || 0 };
            
            const newCount = increment ? currentData.count + 1 : Math.max(0, currentData.count - 1);
            
            await heartRef.set({
                count: newCount,
                lastUpdated: firebase.database.ServerValue.TIMESTAMP
            });
            
            // Update local product data
            const product = products.find(p => p.id === productId);
            if (product) {
                product.hearts = newCount;
            }
            
            console.log(`Heart count updated for product ${productId}: ${newCount}`);
            return newCount;
        } catch (error) {
            console.error('Error updating heart count:', error);
            return null;
        }
    }
};

// Sample product data
const products = [
    {
        id: 1,
        title: "ショート缶　1インナー",
        description: "ショート缶に6段入れられます　仕切り無し",
        price: 100,
        category: "ショート缶",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        rating: 4.5,
        hearts: 128,
        badge: "ショート缶",
        model: "short_1.stl",
        externalUrl: "https://prinsdata.booth.pm/items/7389237"
    },
    {
        id: 2,
        title: "ショート缶　2インナー",
        description: "ショート缶に6段入れられます　2仕切り　12ポケット",
        price: 100,
        originalPrice: null,
        category: "ショート缶",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        rating: 4.7,
        hearts: 256,
        badge: "ショート缶",
        model: "short_2.stl",
        externalUrl: "https://prinsdata.booth.pm/items/7393458"
    },
    {
        id: 3,
        title: "ショート缶　4インナー", 
        description: "ショート缶に6段入れられます　4仕切り　24ポケット",
        price: 100,
        category: "ショート缶",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        rating: 4.3,
        hearts: 89,
        badge: "ショート缶",
        model: "short_4.stl",
        externalUrl: "https://example.com/leather-jacket"
    },
    {
        id: 4,
        title: "ショート缶アタッチメント",
        description: "ショート缶をキッチンフェンスに引っ掛ける事が出来るようにするアタッチメント",
        price: 100,
        originalPrice: null,
        category: "ショート缶",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        rating: 4.8,
        hearts: 342,
        badge: "ショート缶",
        model: "short_add.stl",
        externalUrl: "https://prinsdata.booth.pm/items/7389154"
    },
        {
        id: 5,
        title: "usbc電源基板用box",
        description: "usbc充電基板をセット出来る枠",
        price: 100,
        originalPrice: null,
        category: "電子機器",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        rating: 4.8,
        hearts: 342,
        badge: "電子機器",
        model: "short_add.stl",
        externalUrl: "https://prinsdata.booth.pm/items/7378367"
    },
        {
        id: 6,
        title: "白光半田リール　キッチンフェンス",
        description: "キッチンフェンスに引っ掛ける事が出来るようにするアタッチメント",
        price: 100,
        originalPrice: null,
        category: "電子機器",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        rating: 4.8,
        hearts: 342,
        badge: "電子機器",
        model: "short_add.stl",
        externalUrl: "https://prinsdata.booth.pm/items/7370419"
    },
        {
        id: 7,
        title: "トイレットペーパーフォルダー　キッチンフェンス対応版",
        description: "キッチンフェンスに引っ掛ける事が出来るようにするアタッチメント",
        price: 0,
        originalPrice: null,
        category: "キッチンフェンス",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        rating: 4.8,
        hearts: 342,
        badge: "キッチンフェンス",
        model: "short_add.stl",
        externalUrl: "https://prinsdata.booth.pm/items/7370383"
    },
        {
        id: 8,
        title: "キッチンフェンス34mm　ガイドデータ",
        description: "キッチンフェンスのガイド",
        price: 100,
        originalPrice: null,
        category: "キッチンフェンス",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        rating: 4.8,
        hearts: 342,
        badge: "キッチンフェンス",
        model: "short_add.stl",
        externalUrl: "https://prinsdata.booth.pm/items/7369940"
    }
    //     {
    //     id: 9,
    //     title: "ショート缶小皿深さ2倍",
    //     description: "ショート缶に3段入れられます　0仕切り",
    //     price: 100,
    //     originalPrice: null,
    //     category: "キッチンフェンス",
    //     image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    //     rating: 4.8,
    //     hearts: 342,
    //     badge: "キッチンフェンス",
    //     model: "short_add.stl",
    //     externalUrl: "https://prinsdata.booth.pm/items/7369940"
    // }
];

// Global variables
let currentFilter = 'all';
let displayedProducts = 6;
const productsPerLoad = 6;

// DOM elements
const productsGrid = document.getElementById('products-grid');
const loadMoreBtn = document.getElementById('load-more');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize the page
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize heart counts from Firebase
    await HeartManager.initializeHeartCounts();
    
    renderProducts();
    setupEventListeners();
    setupSmoothScrolling();
});

// Render products based on current filter
function renderProducts() {
    const filteredProducts = getFilteredProducts();
    const productsToShow = filteredProducts.slice(0, displayedProducts);
    
    productsGrid.innerHTML = '';
    
    productsToShow.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        productsGrid.appendChild(productCard);
    });
    
    // Show/hide load more button
    if (displayedProducts >= filteredProducts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Get filtered products
function getFilteredProducts() {
    if (currentFilter === 'all') {
        return products;
    }
    return products.filter(product => product.category === currentFilter);
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    
    const stars = generateStars(product.rating);
    const badge = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
    card.innerHTML = `
        <div class="product-image">
            <div class="stl-viewer" id="stl-viewer-${product.id}"></div>
            <div class="zoom-controls" id="zoom-controls-${product.id}">
                <button class="zoom-btn zoom-out" onclick="zoomOut(${product.id})">-</button>
                <button class="zoom-btn zoom-in" onclick="zoomIn(${product.id})">+</button>
                <button class="zoom-btn reset-btn" onclick="resetZoom(${product.id})">⌂</button>
            </div>
            ${badge}
            <div class="product-favorite">
                <i class="far fa-heart"></i>
            </div>
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
                <div class="price-line">
                    <span class="price-type">STEP</span>
                    <span class="price-value">¥${product.price.toLocaleString()}</span>
                </div>
                <div class="price-line">
                    <span class="price-type">STL</span>
                    <span class="price-value">¥0</span>
                </div>
            </div>
            <div class="product-rating">
                <span class="rating-text" id="heart-count-${product.id}">${product.hearts} ❤️</span>
            </div>
            <div class="product-actions">
                <a href="${product.externalUrl || '#'}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> 詳細を見る
                </a>
            </div>
        </div>
    `;
    
    // Initialize STL viewer after card creation
    setTimeout(() => {
        initSTLViewer(product.id, product.model, product.image);
    }, 100);
    
    return card;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star star"></i>';
    }
    
    return starsHTML;
}

// Get category display name
function getCategoryName(category) {
    const categoryNames = {
        'ショート缶': 'ショート缶',
        fashion: 'ファッション',
        home: 'ホーム',
        sports: 'スポーツ'
    };
    return categoryNames[category] || category;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current filter
            currentFilter = this.dataset.filter;
            displayedProducts = productsPerLoad;
            
            // Render products with animation
            productsGrid.style.opacity = '0';
            setTimeout(() => {
                renderProducts();
                productsGrid.style.opacity = '1';
            }, 200);
        });
    });
    
    // Load more button
    loadMoreBtn.addEventListener('click', function() {
        displayedProducts += productsPerLoad;
        renderProducts();
        
        // Smooth scroll to new products
        setTimeout(() => {
            const newProducts = document.querySelectorAll('.product-card');
            if (newProducts.length > productsPerLoad) {
                newProducts[displayedProducts - productsPerLoad].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 100);
    });
    
    // Favorite buttons (delegated event listener)
    productsGrid.addEventListener('click', function(e) {
        if (e.target.closest('.product-favorite')) {
            const favoriteBtn = e.target.closest('.product-favorite');
            const icon = favoriteBtn.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                favoriteBtn.style.color = '#ef4444';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                favoriteBtn.style.color = '';
            }
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA button smooth scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#products');
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }
}

// Cart management
const Cart = {
    // Get cart from localStorage
    getCart: function() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    },
    
    // Save cart to localStorage
    saveCart: function(cart) {
        console.log('Saving cart to localStorage:', cart);
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Cart saved successfully');
            const saved = localStorage.getItem('cart');
            console.log('Verification - cart in localStorage:', saved);
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
        this.updateCartIcon();
    },
    
    // Add item to cart
    addItem: function(productId) {
        console.log('Adding item to cart:', productId);
        const cart = this.getCart();
        console.log('Current cart before adding:', cart);
        const existingItem = cart.find(item => item.productId === productId);
        
        if (!existingItem) {
            const newItem = {
                productId: productId,
                checked: false,
                addedAt: new Date().toISOString()
            };
            cart.push(newItem);
            console.log('New item added:', newItem);
            console.log('Cart after adding:', cart);
            this.saveCart(cart);
            return true;
        } else {
            console.log('Item already exists in cart:', existingItem);
            return false; // Already in cart
        }
    },
    
    // Remove item from cart
    removeItem: function(productId) {
        const cart = this.getCart();
        const updatedCart = cart.filter(item => item.productId !== productId);
        this.saveCart(updatedCart);
    },
    
    // Toggle checked status
    toggleChecked: function(productId) {
        const cart = this.getCart();
        const item = cart.find(item => item.productId === productId);
        if (item) {
            item.checked = !item.checked;
            this.saveCart(cart);
        }
    },
    
    // Update cart icon with count
    updateCartIcon: function() {
        const cart = this.getCart();
        const cartIcon = document.querySelector('.fa-shopping-cart');
        console.log('Updating cart icon. Cart length:', cart.length);
        
        // Make cart icon always clickable
        if (cartIcon && cartIcon.parentElement) {
            cartIcon.parentElement.style.cursor = 'pointer';
            cartIcon.parentElement.onclick = function() {
                window.location.href = 'cart.html';
            };
        }
        
        // Remove existing count badge
        const existingBadge = document.querySelector('.cart-count');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        // Add count badge if cart has items
        if (cart.length > 0 && cartIcon) {
            console.log('Adding cart badge with count:', cart.length);
            const badge = document.createElement('span');
            badge.className = 'cart-count';
            badge.textContent = cart.length;
            badge.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                background: #ef4444;
                color: white;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            `;
            cartIcon.parentElement.style.position = 'relative';
            cartIcon.parentElement.appendChild(badge);
        } else {
            console.log('No items in cart or cart icon not found');
        }
    }
};

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const added = Cart.addItem(productId);
        
        if (added) {
            // Animate cart icon
            const cartIcon = document.querySelector('.fa-shopping-cart');
            if (cartIcon) {
                cartIcon.style.transform = 'scale(1.2)';
                cartIcon.style.color = '#16a34a';
                
                setTimeout(() => {
                    cartIcon.style.transform = '';
                    cartIcon.style.color = '';
                }, 300);
            }
            
            showNotification(`${product.title}をカートに追加しました！`);
        } else {
            showNotification(`${product.title}は既にカートに入っています。`);
        }
    }
}

// Toggle favorite function with Firebase
async function toggleFavorite(productId, buttonElement) {
    const heartIcon = document.getElementById(`heart-${productId}`);
    const heartCountElement = document.getElementById(`heart-count-${productId}`);
    
    if (heartIcon) {
        const isCurrentlyFavorited = heartIcon.classList.contains('fas');
        
        try {
            // Update heart count in Firebase
            const newCount = await HeartManager.updateHeartCount(productId, !isCurrentlyFavorited);
            
            if (newCount !== null) {
                if (!isCurrentlyFavorited) {
            // Change to filled heart (favorite)
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            buttonElement.style.color = '#ef4444';
            showNotification('お気に入りに追加しました！');
        } else {
            // Change to empty heart (unfavorite)
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            buttonElement.style.color = '';
            showNotification('お気に入りから削除しました。');
        }
                
                // Update heart count display
                if (heartCountElement) {
                    heartCountElement.textContent = `${newCount} ❤️`;
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            showNotification('エラーが発生しました。もう一度お試しください。');
        }
    }
}

// Show notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #16a34a;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements when they're added to the DOM
const observeElement = (element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
};

// Header scroll effect
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Search functionality (placeholder)
const searchIcon = document.querySelector('.fa-search');
if (searchIcon) {
    searchIcon.addEventListener('click', function() {
        showNotification('検索機能は開発中です！');
    });
}

// Global storage for STL viewer cameras
const stlViewerCameras = {};

// STL Viewer initialization
function initSTLViewer(productId, modelFile = "short_4.stl", fallbackImage = null) {
    const viewerElement = document.getElementById(`stl-viewer-${productId}`);
    if (!viewerElement) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2c3e50);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    // Set camera position for angled view (like dragging down slightly)
    camera.position.set(0, 25, 40); // Y=25 gives the elevated angle, Z=40 for distance
    camera.lookAt(0, 0, 0); // Look at the center
    
    // Store camera reference for zoom controls
    stlViewerCameras[productId] = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(viewerElement.offsetWidth, viewerElement.offsetHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    viewerElement.appendChild(renderer.domElement);

    // Controls setup
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 1.0;
    controls.enableZoom = false; // Disable zoom for product cards
    controls.enablePan = false;  // Disable pan for product cards

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);

    // STL Loader
    const loader = new THREE.STLLoader();
    
    console.log(`Loading STL model: assets/models/${modelFile} for product ${productId}`);
    
    loader.load(`assets/models/${modelFile}`, function(geometry) {
        console.log(`Successfully loaded model: ${modelFile} for product ${productId}`);
        // Geometry processing
        geometry.computeBoundingBox();
        const boundingBox = geometry.boundingBox;
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);

        // Size normalization
        const size = new THREE.Vector3();
        boundingBox.getSize(size);
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scaleFactor = 25 / maxDimension;
        geometry.scale(scaleFactor, scaleFactor, scaleFactor);
        
        console.log(`Model ${modelFile} - Original size: ${size.x.toFixed(2)} x ${size.y.toFixed(2)} x ${size.z.toFixed(2)}, Scale: ${scaleFactor.toFixed(3)}`);

        // Material with specified color RGB(255,237,173) and 5% brightness increase
        const material = new THREE.MeshPhongMaterial({
            color: 0xffedad, // RGB(255,237,173) in hex
            specular: 0x111111,
            shininess: 200,
            emissive: new THREE.Color(0xffedad).multiplyScalar(-0.5) // 5% brightness increase
        });

        // Mesh creation
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    }, undefined, function(error) {
        console.error(`Error loading STL model: ${modelFile} for product ${productId}:`, error);
        
        // Fallback to product image if available
        if (fallbackImage) {
            console.log(`Falling back to image for product ${productId}: ${fallbackImage}`);
            viewerElement.innerHTML = `
                <img src="${fallbackImage}" 
                     alt="Product Image" 
                     style="width:100%;height:100%;object-fit:cover;border-radius:8px 8px 0 0;"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display:none;align-items:center;justify-content:center;height:100%;color:white;font-size:12px;text-align:center;background:#2c3e50;">
                    No 3D Model<br>Available
                </div>
            `;
        } else {
            // No fallback image available
            viewerElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:white;font-size:12px;text-align:center;background:#2c3e50;">No 3D Model<br>Available</div>`;
        }
        
        // Hide zoom controls since we're showing an image
        const zoomControls = document.getElementById(`zoom-controls-${productId}`);
        if (zoomControls) {
            zoomControls.style.display = 'none';
        }
    });

    // Resize handling
    const resizeObserver = new ResizeObserver(() => {
        const width = viewerElement.offsetWidth;
        const height = viewerElement.offsetHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
    resizeObserver.observe(viewerElement);
}

// Zoom functions for STL viewers
function zoomIn(productId) {
    const camera = stlViewerCameras[productId];
    if (camera) {
        const currentDistance = camera.position.length();
        const newDistance = Math.max(currentDistance * 0.8, 15); // Minimum zoom limit
        camera.position.normalize().multiplyScalar(newDistance);
    }
}

function zoomOut(productId) {
    const camera = stlViewerCameras[productId];
    if (camera) {
        const currentDistance = camera.position.length();
        const newDistance = Math.min(currentDistance * 1.25, 100); // Maximum zoom limit
        camera.position.normalize().multiplyScalar(newDistance);
    }
}

function resetZoom(productId) {
    const camera = stlViewerCameras[productId];
    if (camera) {
        camera.position.set(0, 25, 40); // Reset to initial angled position
        camera.lookAt(0, 0, 0); // Look at the center
    }
}