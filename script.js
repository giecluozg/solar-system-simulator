/**
 * 太阳系模拟器 - 交互式行星动画
 * 包含8大行星的轨道运动和详细信息展示
 */

class SolarSystem {
    constructor() {
        this.isPlaying = true;
        this.animationSpeed = 1;
        this.selectedPlanet = null;
        
        // 行星数据
        this.planetData = {
            mercury: {
                name: '水星',
                distance: '5790万公里',
                diameter: '4,879公里',
                dayLength: '59天',
                yearLength: '88天',
                temperature: '167°C',
                moons: 0,
                description: '太阳系最小的行星，也是离太阳最近的行星。表面布满陨石坑。'
            },
            venus: {
                name: '金星',
                distance: '1.08亿公里',
                diameter: '12,104公里',
                dayLength: '243天',
                yearLength: '225天',
                temperature: '464°C',
                moons: 0,
                description: '被称为地球的姊妹星，拥有浓厚的大气层和极端高温。'
            },
            earth: {
                name: '地球',
                distance: '1.5亿公里',
                diameter: '12,742公里',
                dayLength: '24小时',
                yearLength: '365.25天',
                temperature: '15°C',
                moons: 1,
                description: '我们唯一的家园，拥有液态水和适合生命的环境。'
            },
            mars: {
                name: '火星',
                distance: '2.28亿公里',
                diameter: '6,779公里',
                dayLength: '24.6小时',
                yearLength: '687天',
                temperature: '-65°C',
                moons: 2,
                description: '红色星球，拥有太阳系最大的火山和最深峡谷。'
            },
            jupiter: {
                name: '木星',
                distance: '7.78亿公里',
                diameter: '139,820公里',
                dayLength: '9.9小时',
                yearLength: '12年',
                temperature: '-110°C',
                moons: 95,
                description: '太阳系最大的行星，拥有著名的大红斑和众多卫星。'
            },
            saturn: {
                name: '土星',
                distance: '14.3亿公里',
                diameter: '116,460公里',
                dayLength: '10.7小时',
                yearLength: '29年',
                temperature: '-140°C',
                moons: 146,
                description: '以其壮观的环系统而闻名，拥有最多的卫星。'
            },
            uranus: {
                name: '天王星',
                distance: '28.7亿公里',
                diameter: '50,724公里',
                dayLength: '17.2小时',
                yearLength: '84年',
                temperature: '-195°C',
                moons: 27,
                description: '一颗冰巨星，独特的侧向自转轴。'
            },
            neptune: {
                name: '海王星',
                distance: '45亿公里',
                diameter: '49,244公里',
                dayLength: '16.1小时',
                yearLength: '165年',
                temperature: '-200°C',
                moons: 16,
                description: '太阳系最外层的行星，拥有最强风暴和深蓝色外观。'
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAnimation();
        this.setupResponsive();
    }

    setupEventListeners() {
        // 控制按钮
        const playPauseBtn = document.getElementById('playPauseBtn');
        const speedBtn = document.getElementById('speedBtn');
        const resetBtn = document.getElementById('resetBtn');

        playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        speedBtn.addEventListener('click', () => this.toggleSpeed());
        resetBtn.addEventListener('click', () => this.resetAnimation());

        // 行星交互事件
        const planets = document.querySelectorAll('.planet');
        planets.forEach(planet => {
            planet.addEventListener('mouseenter', (e) => this.showPlanetInfo(e.target));
            planet.addEventListener('mouseleave', () => this.hidePlanetInfo());
            planet.addEventListener('click', (e) => this.selectPlanet(e.target));
            
            // 防止动画影响交互
            planet.style.pointerEvents = 'auto';
        });

        // 键盘控制
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.increaseSpeed();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.decreaseSpeed();
                    break;
                case 'r':
                case 'R':
                    this.resetAnimation();
                    break;
            }
        });
    }

    startAnimation() {
        // 设置动画持续时间
        const orbits = document.querySelectorAll('.orbit');
        orbits.forEach((orbit, index) => {
            const planet = orbit.querySelector('.planet');
            if (planet) {
                const orbitDistance = orbit.offsetWidth / 2;
                planet.style.setProperty('--orbit-distance', `${orbitDistance}px`);
            }
        });
    }

    togglePlayPause() {
        const solarSystem = document.querySelector('.solar-system');
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            solarSystem.classList.remove('paused');
            playPauseBtn.innerHTML = '⏸️ 暂停';
        } else {
            solarSystem.classList.add('paused');
            playPauseBtn.innerHTML = '▶️ 播放';
        }
    }

    toggleSpeed() {
        const solarSystem = document.querySelector('.solar-system');
        const speedBtn = document.getElementById('speedBtn');
        
        const speeds = [1, 2, 4, 0.5];
        const speedLabels = ['1x', '2x', '4x', '0.5x'];
        
        const currentIndex = speeds.indexOf(this.animationSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        
        this.animationSpeed = speeds[nextIndex];
        speedBtn.innerHTML = `⚡ ${speedLabels[nextIndex]}`;
        
        // 移除所有速度类
        solarSystem.classList.remove('speed-2x', 'speed-4x');
        
        if (this.animationSpeed === 2) {
            solarSystem.classList.add('speed-2x');
        } else if (this.animationSpeed === 4) {
            solarSystem.classList.add('speed-4x');
        }
    }

    increaseSpeed() {
        if (this.animationSpeed < 4) {
            this.animationSpeed *= 2;
            this.updateSpeedDisplay();
        }
    }

    decreaseSpeed() {
        if (this.animationSpeed > 0.5) {
            this.animationSpeed /= 2;
            this.updateSpeedDisplay();
        }
    }

    updateSpeedDisplay() {
        const speedBtn = document.getElementById('speedBtn');
        speedBtn.innerHTML = `⚡ ${this.animationSpeed}x`;
    }

    resetAnimation() {
        this.isPlaying = true;
        this.animationSpeed = 1;
        
        const solarSystem = document.querySelector('.solar-system');
        const playPauseBtn = document.getElementById('speedBtn');
        
        solarSystem.classList.remove('paused', 'speed-2x', 'speed-4x');
        document.getElementById('playPauseBtn').innerHTML = '⏸️ 暂停';
        document.getElementById('speedBtn').innerHTML = '⚡ 1x';
        
        this.hidePlanetInfo();
    }

    showPlanetInfo(planet) {
        const planetId = planet.dataset.planet;
        const data = this.planetData[planetId];
        const planetInfo = document.getElementById('planetInfo');
        
        if (data) {
            planetInfo.innerHTML = `
                <h3>${data.name}</h3>
                <p><strong>距离太阳：</strong> ${data.distance}</p>
                <p><strong>直径：</strong> ${data.diameter}</p>
                <p><strong>公转周期：</strong> ${data.yearLength}</p>
                <p><strong>表面温度：</strong> ${data.temperature}</p>
                <p><strong>卫星数量：</strong> ${data.moons}</p>
                <p>${data.description}</p>
            `;
            
            // 添加高亮效果
            planet.style.boxShadow = `0 0 15px ${this.getPlanetColor(planetId)}`;
            
            // 添加悬停提示
            this.showHoverTooltip(planet, data);
        }
    }

    hidePlanetInfo() {
        const planetInfo = document.getElementById('planetInfo');
        planetInfo.innerHTML = `
            <h3>选择一个行星查看详情</h3>
            <p>悬停在行星上获取信息</p>
        `;
        
        // 移除所有高亮
        const planets = document.querySelectorAll('.planet');
        planets.forEach(planet => {
            planet.style.boxShadow = '';
        });
        
        // 移除悬停提示
        this.hideHoverTooltip();
    }

    selectPlanet(planet) {
        const planetId = planet.dataset.planet;
        const data = this.planetData[planetId];
        
        if (this.selectedPlanet) {
            this.selectedPlanet.classList.remove('selected');
        }
        
        this.selectedPlanet = planet;
        planet.classList.add('selected');
        
        // 显示详细信息
        this.showDetailedInfo(planetId, data);
    }

    showHoverTooltip(planet, data) {
        // 移除现有的提示
        this.hideHoverTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'planet-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <h4>${data.name}</h4>
                <p>${data.distance}</p>
                <p>点击查看详情</p>
            </div>
        `;
        
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(26, 26, 46, 0.95);
            color: white;
            padding: 10px;
            border-radius: 8px;
            font-size: 12px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
            pointer-events: none;
            transition: opacity 0.2s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        // 定位提示框
        const rect = planet.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    }

    hideHoverTooltip() {
        const existingTooltip = document.querySelector('.planet-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
    }

    showDetailedInfo(planetId, data) {
        const planetDetails = document.getElementById('planetDetails');
        planetDetails.innerHTML = `
            <h3 style="color: ${this.getPlanetColor(planetId)}; margin-bottom: 15px;">${data.name} 详细信息</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <label>距离太阳：</label>
                    <span>${data.distance}</span>
                </div>
                <div class="detail-item">
                    <label>直径：</label>
                    <span>${data.diameter}</span>
                </div>
                <div class="detail-item">
                    <label>自转周期：</label>
                    <span>${data.dayLength}</span>
                </div>
                <div class="detail-item">
                    <label>公转周期：</label>
                    <span>${data.yearLength}</span>
                </div>
                <div class="detail-item">
                    <label>表面温度：</label>
                    <span>${data.temperature}</span>
                </div>
                <div class="detail-item">
                    <label>卫星数量：</label>
                    <span>${data.moons}</span>
                </div>
            </div>
            <p style="margin-top: 15px; line-height: 1.5; color: var(--text-secondary);">${data.description}</p>
        `;
    }

    getPlanetColor(planetId) {
        const colors = {
            mercury: '#8c7853',
            venus: '#ffc649',
            earth: '#6b93d6',
            mars: '#cd5c5c',
            jupiter: '#d8ca9d',
            saturn: '#fad5a5',
            uranus: '#4fd0e7',
            neptune: '#4b70dd'
        };
        return colors[planetId] || '#ffffff';
    }

    setupResponsive() {
        // 响应式调整
        const handleResize = () => {
            const width = window.innerWidth;
            const solarSystem = document.querySelector('.solar-system');
            
            if (width < 768) {
                solarSystem.style.transform = 'scale(0.7)';
            } else if (width < 480) {
                solarSystem.style.transform = 'scale(0.5)';
            } else {
                solarSystem.style.transform = 'scale(1)';
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 初始调用
    }

    // 添加键盘快捷键提示
    showKeyboardShortcuts() {
        const shortcuts = document.createElement('div');
        shortcuts.className = 'keyboard-shortcuts';
        shortcuts.innerHTML = `
            <div class="shortcuts-panel">
                <h4>键盘快捷键</h4>
                <ul>
                    <li>空格键：播放/暂停</li>
                    <li>↑/↓：调整速度</li>
                    <li>R：重置动画</li>
                    <li>ESC：关闭提示</li>
                </ul>
            </div>
        `;
        document.body.appendChild(shortcuts);
        
        setTimeout(() => {
            shortcuts.remove();
        }, 5000);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const solarSystem = new SolarSystem();
    
    // 显示使用提示
    setTimeout(() => {
        const welcomeTip = document.createElement('div');
        welcomeTip.className = 'welcome-tip';
        welcomeTip.innerHTML = `
            <div class="welcome-panel">
                <h4>🪐 欢迎使用太阳系模拟器！</h4>
                <ul>
                    <li>🖱️ 悬停在行星上查看基本信息</li>
                    <li>👆 点击行星查看详细信息</li>
                    <li>⌨️ 使用空格键播放/暂停</li>
                    <li>⬆️⬇️ 调整动画速度</li>
                </ul>
                <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 10px;">知道了</button>
            </div>
        `;
        
        welcomeTip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(26, 26, 46, 0.95);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 20px;
            z-index: 1000;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            max-width: 300px;
            text-align: center;
        `;
        
        document.body.appendChild(welcomeTip);
        
        // 5秒后自动消失
        setTimeout(() => {
            if (welcomeTip.parentElement) {
                welcomeTip.remove();
            }
        }, 5000);
    }, 1000);
    
    // 显示键盘快捷键提示
    setTimeout(() => {
        solarSystem.showKeyboardShortcuts();
    }, 6000);
});

// 添加CSS样式支持
const additionalStyles = `
    .selected {
        outline: 3px solid #ffd700 !important;
        outline-offset: 3px;
    }
    
    .detail-grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 8px;
        margin-top: 15px;
    }
    
    .detail-item label {
        font-weight: 600;
        color: var(--text-secondary);
    }
    
    .keyboard-shortcuts {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(26, 26, 46, 0.95);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 20px;
        z-index: 1000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    }
    
    .shortcuts-panel ul {
        list-style: none;
        padding: 0;
    }
    
    .shortcuts-panel li {
        padding: 5px 0;
        color: var(--text-secondary);
    }
`;

// 动态添加额外样式
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);