document.addEventListener('DOMContentLoaded', function() {
    // DOM要素の取得
    const headlineInput = document.getElementById('headline-input');
    const fontSizeSlider = document.getElementById('font-size');
    const fontSizeValue = document.getElementById('font-size-value');
    const letterSpacingSlider = document.getElementById('letter-spacing');
    const letterSpacingValue = document.getElementById('letter-spacing-value');
    const lineHeightSlider = document.getElementById('line-height');
    const lineHeightValue = document.getElementById('line-height-value');
    const showFontNamesCheckbox = document.getElementById('show-font-names');
    const horizontalBtn = document.getElementById('horizontal-btn');
    const verticalBtn = document.getElementById('vertical-btn');
    const backgroundPatternSelect = document.getElementById('background-pattern');
    const roundedBtn = document.getElementById('rounded-btn');
    const sharpBtn = document.getElementById('sharp-btn');
    const resetBtn = document.getElementById('reset-btn');
    const headlineTexts = document.querySelectorAll('.headline-text');
    const fontNames = document.querySelectorAll('.font-name');
    const fontPreviews = document.querySelectorAll('.font-preview');
    const patternPreview = document.getElementById('pattern-preview');
    const patternPreviewContent = document.querySelector('.pattern-preview-content');

    // 初期化
    updateHeadlineText();
    updateFontSize();
    updateLetterSpacing();
    updateLineHeight();
    updateFontNameVisibility();
    updateWritingMode();
    updateBackgroundPattern();
    updateCornerStyle();

    // イベントリスナーの設定
    headlineInput.addEventListener('input', updateHeadlineText);
    fontSizeSlider.addEventListener('input', updateFontSize);
    letterSpacingSlider.addEventListener('input', updateLetterSpacing);
    lineHeightSlider.addEventListener('input', updateLineHeight);
    showFontNamesCheckbox.addEventListener('change', updateFontNameVisibility);
    horizontalBtn.addEventListener('click', () => setWritingMode('horizontal'));
    verticalBtn.addEventListener('click', () => setWritingMode('vertical'));
    backgroundPatternSelect.addEventListener('change', updateBackgroundPattern);
    roundedBtn.addEventListener('click', () => setCornerStyle('rounded'));
    sharpBtn.addEventListener('click', () => setCornerStyle('sharp'));
    resetBtn.addEventListener('click', resetToDefaults);
    
    // 地紋パターンのプレビュー機能
    setupPatternPreview();

    // 見出しテキストを更新する関数
    function updateHeadlineText() {
        const inputText = headlineInput.value.trim();
        const displayText = inputText || '見出しを入力してください';
        
        headlineTexts.forEach(element => {
            // 改行を考慮してテキストを設定
            if (inputText) {
                // 改行がある場合は<br>タグに変換
                const formattedText = inputText.replace(/\n/g, '<br>');
                element.innerHTML = formattedText;
                element.style.color = '#2c3e50';
                element.style.fontStyle = 'normal';
            } else {
                // プレースホルダーの場合
                element.textContent = displayText;
                element.style.color = '#bdc3c7';
                element.style.fontStyle = 'italic';
            }
        });
    }

    // フォントサイズを更新する関数
    function updateFontSize() {
        const size = fontSizeSlider.value;
        fontSizeValue.textContent = size + 'px';
        
        headlineTexts.forEach(element => {
            element.style.fontSize = size + 'px';
        });
    }

    // 文字間隔を更新する関数
    function updateLetterSpacing() {
        const spacing = parseFloat(letterSpacingSlider.value);
        let displayText;
        
        if (spacing === 0) {
            displayText = '標準';
        } else if (spacing > 0) {
            displayText = `+${spacing}px`;
        } else {
            displayText = `${spacing}px`;
        }
        
        letterSpacingValue.textContent = displayText;
        
        headlineTexts.forEach(element => {
            element.style.letterSpacing = spacing + 'px';
        });
    }

    // 行間隔を更新する関数
    function updateLineHeight() {
        const height = parseFloat(lineHeightSlider.value);
        lineHeightValue.textContent = height.toFixed(1);
        
        headlineTexts.forEach(element => {
            element.style.lineHeight = height;
        });
    }

    // フォント名の表示/非表示を切り替える関数
    function updateFontNameVisibility() {
        const isVisible = showFontNamesCheckbox.checked;
        
        fontNames.forEach(element => {
            if (isVisible) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        });
    }

    // 縦横書きモードを設定する関数
    function setWritingMode(mode) {
        const isVertical = mode === 'vertical';
        
        // ボタンの状態を更新
        horizontalBtn.classList.toggle('active', !isVertical);
        verticalBtn.classList.toggle('active', isVertical);
        
        // プレビューにクラスを追加/削除
        fontPreviews.forEach(preview => {
            if (isVertical) {
                preview.classList.add('vertical');
            } else {
                preview.classList.remove('vertical');
            }
        });
        
        // 設定を保存
        saveSettings();
    }

    // 縦横書きモードを更新する関数
    function updateWritingMode() {
        const isVertical = verticalBtn.classList.contains('active');
        setWritingMode(isVertical ? 'vertical' : 'horizontal');
    }

    // 背景パターンを更新する関数
    function updateBackgroundPattern() {
        const selectedPattern = backgroundPatternSelect.value;
        
        headlineTexts.forEach(element => {
            // 既存のパターンクラスを削除
            element.classList.remove(
                'pattern-dots', 'pattern-lines', 'pattern-grid', 
                'pattern-newspaper', 'pattern-wave', 'pattern-diagonal', 'pattern-cross',
                'pattern-hexagon', 'pattern-brick', 'pattern-diamond', 'pattern-zigzag',
                'pattern-vintage', 'pattern-bamboo', 'pattern-checkerboard', 'pattern-triangles',
                'pattern-circles', 'pattern-scales', 'pattern-flower', 'pattern-mesh',
                'pattern-weave', 'pattern-woodgrain', 'pattern-marble', 'pattern-fabric',
                'pattern-chain', 'pattern-stars'
            );
            
            // 新しいパターンクラスを追加（noneの場合は何も追加しない）
            if (selectedPattern !== 'none') {
                element.classList.add(`pattern-${selectedPattern}`);
            }
        });
        
        // 設定を保存
        saveSettings();
    }

    // 角の形状を設定する関数
    function setCornerStyle(style) {
        const isRounded = style === 'rounded';
        
        // ボタンの状態を更新
        roundedBtn.classList.toggle('active', isRounded);
        sharpBtn.classList.toggle('active', !isRounded);
        
        // プレビューとテキストにクラスを追加/削除
        fontPreviews.forEach(preview => {
            preview.classList.remove('rounded-corners', 'sharp-corners');
            preview.classList.add(isRounded ? 'rounded-corners' : 'sharp-corners');
        });
        
        headlineTexts.forEach(text => {
            text.classList.remove('rounded-corners', 'sharp-corners');
            text.classList.add(isRounded ? 'rounded-corners' : 'sharp-corners');
        });
        
        // 設定を保存
        saveSettings();
    }

    // 角の形状を更新する関数
    function updateCornerStyle() {
        const isSharp = sharpBtn.classList.contains('active');
        setCornerStyle(isSharp ? 'sharp' : 'rounded');
    }

    // キーボードショートカット
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter でフォーカスを入力欄に移動
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            headlineInput.focus();
            headlineInput.select();
        }
        
        // Escape でフォーカスを外す
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });

    // フォントプレビューのクリックイベント（将来的な拡張用）
    document.querySelectorAll('.font-preview').forEach(preview => {
        preview.addEventListener('click', function() {
            // 現在選択中のプレビューをハイライト
            document.querySelectorAll('.font-preview').forEach(p => {
                p.classList.remove('selected');
            });
            this.classList.add('selected');
            
            // 選択されたフォント情報をコンソールに出力（デバッグ用）
            const fontName = this.getAttribute('data-font');
            console.log('Selected font:', fontName);
        });
    });

    // レスポンシブ対応：画面サイズに応じてフォントサイズを調整
    function adjustFontSizeForScreen() {
        const screenWidth = window.innerWidth;
        let maxSize, minSize;
        
        if (screenWidth <= 480) {
            maxSize = 48;
            minSize = 8;
        } else if (screenWidth <= 768) {
            maxSize = 60;
            minSize = 8;
        } else {
            maxSize = 72;
            minSize = 8;
        }
        
        fontSizeSlider.max = maxSize;
        fontSizeSlider.min = minSize;
        
        // 現在の値が範囲外の場合は調整
        const currentValue = parseInt(fontSizeSlider.value);
        if (currentValue > maxSize) {
            fontSizeSlider.value = maxSize;
            updateFontSize();
        } else if (currentValue < minSize) {
            fontSizeSlider.value = minSize;
            updateFontSize();
        }
    }

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', adjustFontSizeForScreen);
    
    // 初期実行
    adjustFontSizeForScreen();

    // ローカルストレージに設定を保存/復元する機能
    function saveSettings() {
        const settings = {
            headline: headlineInput.value,
            fontSize: fontSizeSlider.value,
            letterSpacing: letterSpacingSlider.value,
            lineHeight: lineHeightSlider.value,
            showFontNames: showFontNamesCheckbox.checked,
            writingMode: verticalBtn.classList.contains('active') ? 'vertical' : 'horizontal',
            backgroundPattern: backgroundPatternSelect.value,
            cornerStyle: sharpBtn.classList.contains('active') ? 'sharp' : 'rounded'
        };
        localStorage.setItem('headlineComparerSettings', JSON.stringify(settings));
    }

    function loadSettings() {
        const saved = localStorage.getItem('headlineComparerSettings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                if (settings.headline) {
                    headlineInput.value = settings.headline;
                }
                if (settings.fontSize) {
                    fontSizeSlider.value = settings.fontSize;
                }
                if (settings.letterSpacing !== undefined) {
                    letterSpacingSlider.value = settings.letterSpacing;
                }
                if (settings.lineHeight) {
                    lineHeightSlider.value = settings.lineHeight;
                }
                if (typeof settings.showFontNames === 'boolean') {
                    showFontNamesCheckbox.checked = settings.showFontNames;
                }
                if (settings.writingMode) {
                    setWritingMode(settings.writingMode);
                }
                if (settings.backgroundPattern) {
                    backgroundPatternSelect.value = settings.backgroundPattern;
                }
                if (settings.cornerStyle) {
                    setCornerStyle(settings.cornerStyle);
                }
                
                // UIを更新
                updateHeadlineText();
                updateFontSize();
                updateLetterSpacing();
                updateLineHeight();
                updateFontNameVisibility();
                updateBackgroundPattern();
            } catch (e) {
                console.log('設定の読み込みに失敗しました:', e);
            }
        }
    }

    // 設定の保存イベント
    headlineInput.addEventListener('input', saveSettings);
    fontSizeSlider.addEventListener('input', saveSettings);
    letterSpacingSlider.addEventListener('input', saveSettings);
    lineHeightSlider.addEventListener('input', saveSettings);
    showFontNamesCheckbox.addEventListener('change', saveSettings);
    horizontalBtn.addEventListener('click', saveSettings);
    verticalBtn.addEventListener('click', saveSettings);
    backgroundPatternSelect.addEventListener('change', saveSettings);
    roundedBtn.addEventListener('click', saveSettings);
    sharpBtn.addEventListener('click', saveSettings);

    // デフォルト設定に戻す関数
    function resetToDefaults() {
        // デフォルト値を設定
        headlineInput.value = '甲神静ブロック';
        fontSizeSlider.value = 24;
        letterSpacingSlider.value = 0;
        lineHeightSlider.value = 1.3;
        showFontNamesCheckbox.checked = true;
        backgroundPatternSelect.value = 'none';
        
        // ボタンの状態をデフォルトに
        setWritingMode('horizontal');
        setCornerStyle('sharp');
        
        // UIを更新
        updateHeadlineText();
        updateFontSize();
        updateLetterSpacing();
        updateLineHeight();
        updateFontNameVisibility();
        updateBackgroundPattern();
        
        // ローカルストレージをクリア
        localStorage.removeItem('headlineComparerSettings');
        
        // 確認メッセージ（オプション）
        console.log('設定をデフォルトに戻しました');
    }

    // 地紋パターンプレビュー機能
    function setupPatternPreview() {
        const options = backgroundPatternSelect.querySelectorAll('option');
        
        options.forEach(option => {
            option.addEventListener('mouseenter', function() {
                showPatternPreview(this.value);
            });
            
            option.addEventListener('mouseleave', function() {
                hidePatternPreview();
            });
        });
    }
    
    function showPatternPreview(patternValue) {
        if (patternValue === 'none') {
            patternPreviewContent.textContent = '地紋なし';
            patternPreviewContent.className = 'pattern-preview-content';
        } else {
            patternPreviewContent.textContent = '地紋';
            patternPreviewContent.className = 'pattern-preview-content pattern-' + patternValue;
        }
        patternPreview.classList.add('show');
    }
    
    function hidePatternPreview() {
        patternPreview.classList.remove('show');
    }

    // ページ読み込み時に設定を復元
    loadSettings();

    // フォントの読み込み状況を監視
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('1em "Noto Serif JP"'),
            document.fonts.load('1em "Noto Sans JP"'),
            document.fonts.load('1em "Shippori Mincho"'),
            document.fonts.load('1em "Sawarabi Mincho"'),
            document.fonts.load('1em "M PLUS 1p"'),
            document.fonts.load('1em "Kosugi Maru"'),
            document.fonts.load('1em "Dela Gothic One"'),
            document.fonts.load('1em "Zen Kurenaido"'),
            document.fonts.load('1em "Yuji Syuku"'),
            document.fonts.load('1em "Zen Antique"'),
            document.fonts.load('1em "Kaisei Decol"'),
            document.fonts.load('1em "Rampart One"'),
            document.fonts.load('1em "Stick"'),
            document.fonts.load('1em "Kiwi Maru"'),
            document.fonts.load('1em "Train One"'),
            document.fonts.load('1em "Reggae One"')
        ]).then(() => {
            console.log('すべてのフォントが読み込まれました');
            // フォント読み込み完了後にレイアウトを再計算
            document.body.classList.add('fonts-loaded');
        }).catch(err => {
            console.log('一部のフォントの読み込みに失敗しました:', err);
        });
    }
});