import './css/common.scss'
import './css/mpeditor.scss'
import './css/theme-white.scss'
import Clipboard from 'clipboard'
import _ from 'underscore'
import $ from 'jQuery'
import pangu from 'pangu'
// import './js/jquery.easing.js'
// ace
import * as ace from 'brace'
import 'brace/mode/markdown'
import 'brace/theme/solarized_light'
import 'brace/theme/solarized_dark'
import 'brace/theme/chrome'
import 'brace/theme/chaos'
import 'brace/theme/ambiance'
import 'brace/theme/clouds'
import 'brace/theme/clouds_midnight'
import 'brace/theme/cobalt'
import 'brace/theme/dawn'
import 'brace/theme/github'
import 'brace/theme/monokai'
import 'brace/theme/textmate'
import 'brace/theme/kuroir'
import 'brace/theme/twilight'
import 'brace/theme/merbivore'
import 'brace/theme/mono_industrial'
import 'brace/theme/merbivore_soft'
import 'brace/theme/tomorrow'
import 'brace/theme/tomorrow_night'
import 'brace/theme/tomorrow_night_bright'
import 'brace/theme/tomorrow_night_blue'
import hotkeys from 'hotkeys-js'

// showdown
import showdown from 'showdown'
import './js/showdown-plugins/showdown-prettify-for-wechat.js'
import './js/showdown-plugins/showdown-task-list.js'
import './js/showdown-plugins/showdown-section-divider.js'
import './js/showdown-plugins/showdown-emoji.js'
import './js/showdown-plugins/showdown-image-size.js'
import './js/showdown-plugins/showdown-rich.js'

// 语法高亮
import './js/google-code-prettify/run_prettify.js'

const PR = require('PR')
const LS = window.localStorage
LS.mpe_previewClass = LS.mpe_previewClass || 'mpe_fr'
LS.mpe_editorClass = LS.mpe_editorClass || 'mpe_fl'

const tmpl = `<div class="mpeditor">
<div class="mpe-nav-wrap" eid="nav">
  <div class="mpe-nav">
    <ul class="mpe-nav-tools mpe_fl">

    </ul>
    <ul class="mpe-nav-tools mpe_fr">
      <li class="mpe-nav-item mpe-nav-text">
        <span>选择编辑器主题</span>
      </li>
      <li class="mpe-nav-item mpe-nav-select">
        <select eid="editorTheme">
          <option value="solarized_light">「默认」solarized_light</option>
          <option selected value="solarized_dark">solarized_dark</option>
          <option value="chrome">chrome</option>
          <option value="chaos">chaos</option>
          <option value="ambiance">ambiance</option>
          <option value="clouds">clouds</option>
          <option value="clouds_midnight">clouds_midnight</option>
          <option value="cobalt">cobalt</option>
          <option value="dawn">dawn</option>
          <option value="github">github</option>
          <option value="monokai">monokai</option>
          <option value="textmate">textmate</option>
          <option value="kuroir">kuroir</option>
          <option value="twilight">twilight</option>
          <option value="merbivore">merbivore</option>
          <option value="mono_industrial">mono_industrial</option>
          <option value="merbivore_soft">merbivore_soft</option>
          <option value="tomorrow">tomorrow</option>
          <option value="tomorrow_night">tomorrow_night</option>
          <option value="tomorrow_night_bright">tomorrow_night_bright</option>
          <option value="tomorrow_night_blue">tomorrow_night_blue</option>
        </select>
      </li>
      <li class="mpe-nav-item">
        <a href="javascript:void(0)" eid="transferBtn" title="左右屏转换">
        <svg style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4277"><path d="M64 448l896 0c57.6 0 83.2-70.4 44.8-108.8l-192-192c-25.6-25.6-64-25.6-89.6 0s-25.6 64 0 89.6L806.4 320 64 320C25.6 320 0 345.6 0 384S25.6 448 64 448zM960 576 64 576c-57.6 0-83.2 70.4-44.8 108.8l192 192c25.6 25.6 64 25.6 89.6 0 25.6-25.6 25.6-64 0-89.6L217.6 704 960 704c38.4 0 64-25.6 64-64S998.4 576 960 576z" p-id="4278"></path></svg>
        </a>
      </li>
      <li class="mpe-nav-item">
        <a href="javascript:void(0)" eid="copyBtn" title="复制内容">
          <svg style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1808"><path d="M672 832 224 832c-52.928 0-96-43.072-96-96L128 160c0-52.928 43.072-96 96-96l448 0c52.928 0 96 43.072 96 96l0 576C768 788.928 724.928 832 672 832zM224 128C206.368 128 192 142.368 192 160l0 576c0 17.664 14.368 32 32 32l448 0c17.664 0 32-14.336 32-32L704 160c0-17.632-14.336-32-32-32L224 128zM800 960 320 960c-17.664 0-32-14.304-32-32s14.336-32 32-32l480 0c17.664 0 32-14.336 32-32L832 256c0-17.664 14.304-32 32-32s32 14.336 32 32l0 608C896 916.928 852.928 960 800 960zM544 320 288 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l256 0c17.696 0 32 14.336 32 32S561.696 320 544 320zM608 480 288.032 480c-17.664 0-32-14.336-32-32s14.336-32 32-32L608 416c17.696 0 32 14.336 32 32S625.696 480 608 480zM608 640 288 640c-17.664 0-32-14.304-32-32s14.336-32 32-32l320 0c17.696 0 32 14.304 32 32S625.696 640 608 640z" p-id="1809"></path></svg>
        </a>
      </li>
      <li class="mpe-nav-item">
        <a href="javascript:void(0)" eid="clearBtn" title="清空内容">
          <svg style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1086"><path d="M608 768c-17.696 0-32-14.304-32-32L576 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C640 753.696 625.696 768 608 768zM416 768c-17.696 0-32-14.304-32-32L384 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C448 753.696 433.696 768 416 768zM928 224l-160 0L768 160c0-52.928-42.72-96-95.264-96L352 64C299.072 64 256 107.072 256 160l0 64L96 224C78.304 224 64 238.304 64 256s14.304 32 32 32l832 0c17.696 0 32-14.304 32-32S945.696 224 928 224zM320 160c0-17.632 14.368-32 32-32l320.736 0C690.272 128 704 142.048 704 160l0 64L320 224 320 160zM736.128 960 288.064 960c-52.928 0-96-43.072-96-96L192.064 383.52c0-17.664 14.336-32 32-32s32 14.336 32 32L256.064 864c0 17.664 14.368 32 32 32l448.064 0c17.664 0 32-14.336 32-32L768.128 384.832c0-17.664 14.304-32 32-32s32 14.336 32 32L832.128 864C832.128 916.928 789.056 960 736.128 960z" p-id="1087"></path></svg>
        </a>
      </li>
      <li class="mpe-nav-item">
        <a href="//github.com/yanxi-me/mpeditor" target="_blank" title="本项目github">
          <svg style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2535"><path d="M1.3 525.3c0 223 142.9 412.6 342.1 482.2 26.8 6.8 22.7-12.4 22.7-25.4l0-88.5C211.2 911.8 205 809.2 194.5 792.1c-21.1-35.9-70.7-45-55.9-62.1 35.3-18.2 71.2 4.6 112.9 66.1 30.2 44.6 88.8 37.1 118.7 29.6 6.5-26.8 20.5-50.7 39.6-69.4-160.3-28.5-227.3-126.5-227.3-243 0-56.4 18.6-108.4 55.2-150.3-23.2-69.2 2.2-128.2 5.6-137 66.3-6 135.1 47.4 140.5 51.6 37.7-10.1 80.7-15.6 128.8-15.6 48.4 0 91.6 5.6 129.5 15.8 12.9-9.8 76.8-55.6 138.4-50 3.3 8.8 28.1 66.5 6.3 134.7 37 42 55.8 94.3 55.8 151 0 116.7-67.3 214.8-228.2 243.1 26.9 26.5 43.5 63.3 43.5 104l0 128.4c0.9 10.2 0 20.5 17.2 20.5 202.1-68.1 347.6-259.1 347.6-484.1 0-282.1-228.7-510.7-510.7-510.7C229.9 14.6 1.3 243.2 1.3 525.3z" p-id="2536"></path></svg>
        </a>
      </li>
      <!--li class="mpe-nav-item">
        <a href="javascript:void(0)" eid="donationBtn">
          <svg style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1456"><path d="M516 352c-1.888 0-3.808-0.16-5.664-0.512l-356-64C139.104 284.736 128 271.488 128 256L128 160c0-52.928 43.072-96 96-96l576 0c52.928 0 96 43.072 96 96l0 96c0 15.424-11.04 28.672-26.208 31.456l-348 64C519.872 351.84 517.952 352 516 352zM192 229.248l323.936 58.24L832 229.344 832 160c0-17.632-14.336-32-32-32L224 128C206.368 128 192 142.368 192 160L192 229.248zM800 960 224 960c-52.928 0-96-43.072-96-96L128 384c0-17.664 14.336-32 32-32s32 14.336 32 32l0 480c0 17.664 14.368 32 32 32l576 0c17.664 0 32-14.336 32-32L832 384c0-17.664 14.304-32 32-32s32 14.336 32 32l0 480C896 916.928 852.928 960 800 960zM607.808 640c17.696 0 32-14.304 32-32s-14.304-32-32-32l-51.84 0 76.16-73.312c12.704-12.288 13.088-32.448 0.8-45.152-12.288-12.736-32.512-12.992-45.248-0.768l-76.256 73.6-73.344-73.216c-12.512-12.48-32.8-12.48-45.28 0.064-12.48 12.512-12.448 32.608 0.032 45.088L466.88 576l-51.136 0c-17.664 0-32 14.304-32 32s14.336 32 32 32L480 640l0 32-64.256 0c-17.664 0-32 14.304-32 32s14.336 32 32 32L480 736l0 64.384c0 17.696 14.336 32 32 32s32-14.304 32-32L544 736l63.808 0c17.696 0 32-14.304 32-32s-14.304-32-32-32L544 672l0-32L607.808 640z" p-id="1457"></path></svg>
        </a>
      </li-->
    </ul>
  </div>
</div>
<div class="mpe-wrap">
  <div eclass="mpe-col" class="mpe-editor-col mpe-col ${LS.mpe_editorClass}">
    <div class="mpe-editor-wrap">
      <div eid="editor" class="mpe-editor"></div>
    </div>
  </div>
  <div eclass="mpe-col" class="mpe-preview-col mpe-col ${LS.mpe_previewClass}">
    <div class="mpe-preview-wrap">
      <div class="mpe-preview" eid="preview"></div>
    </div>
  </div>
</div>
<div class="mpe-toast" eid="toast">
  <i class="mpe-toast-icon"><svg style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="524"><path d="M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448S759.04 960 512 960zM512 128.288C300.416 128.288 128.288 300.416 128.288 512c0 211.552 172.128 383.712 383.712 383.712 211.552 0 383.712-172.16 383.712-383.712C895.712 300.416 723.552 128.288 512 128.288zM726.976 393.184c-12.544-12.448-32.832-12.32-45.248 0.256l-233.28 235.84-103.264-106.112c-12.352-12.704-32.608-12.928-45.248-0.64-12.672 12.32-12.96 32.608-0.64 45.248l126.016 129.504c0.064 0.096 0.192 0.096 0.256 0.192 0.064 0.064 0.096 0.192 0.16 0.256 2.016 1.984 4.512 3.2 6.88 4.544 1.248 0.672 2.24 1.792 3.52 2.304 3.872 1.6 8 2.4 12.096 2.4 4.064 0 8.128-0.8 11.968-2.336 1.248-0.512 2.208-1.536 3.392-2.176 2.4-1.344 4.896-2.528 6.944-4.544 0.064-0.064 0.096-0.192 0.192-0.256 0.064-0.096 0.16-0.128 0.256-0.192l256.224-259.008C739.648 425.856 739.52 405.6 726.976 393.184z" p-id="525"></path></svg></i>
  <p class="mpe-toast-text">已保存</p>
</div>
</div>
`
const $win = $(window)
let mdSections = []
let offsetBegin = 0
$win.on('createMdSection', (evt, ...data) => {
  mdSections = data
}).on('markdownTrim', (e, offset) => {
  offsetBegin = offset
})

export default class Editor {
  constructor (node, { text, updateDelayTime = 300 } = {}) {
    let $container = $(node).html(tmpl)
    this.$container = $container
    let that = this
    $container.find('[eid]').each((i, dom) => {
      dom = $(dom)
      let id = dom.attr('eid')
      that['$' + id] = dom
    })

    this.resize()
    let editor = this.editor = this._initEditor(this.$editor[0], text)
    this.converter = this._initShowdown()
    if (text) {
      this.updatePreview(text)
    }

    let timer
    editor.on('change', () => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => that.updatePreview(), updateDelayTime)
    })

    // 跟滚动相关
    this._scrollingHelper = $('<div>')
    this._isPreviewMoving = false
    this._isEditorMoving = false
    this._bindEvent()
    // 自动保存
    this._autoSave()
  }
  setValue (content) {
    this.editor.getSession().setValue(content)
    this.updatePreview()
    return this
  }
  updatePreview (content) {
    // console.log(this.editor.getValue())
    let val = this.converter.makeHtml(content || this.editor.getValue())
    this.$preview.html(val)
    // pangu
    pangu.spacingNode(this.$preview[0])
    PR.prettyPrint()
    this._buildSection()

    return this
  }

  // 改变大小
  resize (height) {
    height = height || this.$container.height()
    let $nav = this.$nav
    height = height - ($nav.is(':hidden') ? 0 : $nav.height())
    this.$editor.height(height)
    this.$preview.height(height)
    this.$container.find('[eclass=mpe-col]').height(height)
    this.editor && this.editor.resize()
    this._buildSection()
  }
    // 私有方法
  _initShowdown () {
    let converter = new showdown.Converter({
      extensions: ['prettify', 'tasklist', 'section-divider', 'emoji', 'rich'],
      tables: true,
      simpleLineBreaks: true,
      strikethrough: true
    })
    return converter
  }
  _autoSave () {
    // this._autoSaveTimer = setInterval(() => {
    let text = this.editor.getValue()
    if (text !== '')LS.mpe_content = text
    // }, 10e3)
  }
  _buildScrollLink () {
    return _.throttle(() => {
      let that = this
      let mdSectionList = this._mdSectionList
      let htmlSectionList = this._htmlSectionList
      let aceEditor = this.editor
      if (mdSectionList.length === 0 || mdSectionList.length !== htmlSectionList.length) {
        this._doScrollLink()
        return
      }

      let editorScrollTop = aceEditor.renderer.getScrollTop()
      if (editorScrollTop < 0) {
        editorScrollTop = 0
      }

      let $previewElt = this.$preview
      let previewScrollTop = $previewElt.scrollTop()
      function getDestScrollTop (srcScrollTop, srcSectionList, destSectionList) {
        let sectionIndex
        let srcSection = _.find(srcSectionList, (section, index) => {
          sectionIndex = index
          return srcScrollTop < section.endOffset
        })
        if (srcSection === undefined) {
          return
        }
        let posInSection = (srcScrollTop - srcSection.startOffset) / (srcSection.height || 1)
        let destSection = destSectionList[sectionIndex]
        return destSection.startOffset + destSection.height * posInSection
      }

      let lastEditorScrollTop = this.lastEditorScrollTop
      let lastPreviewScrollTop = this.lastPreviewScrollTop
      let destScrollTop
      let isScrollEditor = this._scrollSyncLeader === 'editor'
      let isScrollPreview = this._scrollSyncLeader === 'preview'
      let scrollingHelper = this._scrollingHelper
      if (isScrollEditor === true) {
        if (Math.abs(editorScrollTop - lastEditorScrollTop) <= 9) {
          return
        }
        isScrollEditor = false
        lastEditorScrollTop = editorScrollTop
        destScrollTop = getDestScrollTop(editorScrollTop, mdSectionList, htmlSectionList)
        destScrollTop = _.min([
          destScrollTop,
          $previewElt.prop('scrollHeight') - $previewElt.outerHeight()
        ])
        if (Math.abs(destScrollTop - previewScrollTop) <= 9) {
          lastPreviewScrollTop = previewScrollTop
          return
        }
        scrollingHelper.stop('scrollLinkFx', true).css('value', 0).animate({
          value: destScrollTop - previewScrollTop
        }, {
          // easing: 'easeOutSine',
          duration: 200,
          queue: 'scrollLinkFx',
          step: function (now) {
            that._isPreviewMoving = true
            lastPreviewScrollTop = previewScrollTop + now
            $previewElt.scrollTop(lastPreviewScrollTop)
          },
          done: function () {
            _.defer(function () {
              that._isPreviewMoving = false
            })
          }
        }).dequeue('scrollLinkFx')
      } else if (isScrollPreview === true) {
        if (Math.abs(previewScrollTop - lastPreviewScrollTop) <= 9) {
          return
        }
        isScrollPreview = false
        lastPreviewScrollTop = previewScrollTop
        destScrollTop = getDestScrollTop(previewScrollTop, htmlSectionList, mdSectionList)

        destScrollTop = _.min([
          destScrollTop,
          aceEditor.session.getScreenLength() * aceEditor.renderer.lineHeight + aceEditor.renderer.scrollMargin.bottom - aceEditor.renderer.$size.scrollerHeight
        ])
        destScrollTop < 0 && (destScrollTop = 0)

        if (Math.abs(destScrollTop - editorScrollTop) <= 9) {
          lastEditorScrollTop = editorScrollTop
          return
        }
        scrollingHelper.stop('scrollLinkFx', true).css('value', 0).animate({
          value: destScrollTop - editorScrollTop
        }, {
          // easing: 'easeOutSine',
          duration: 200,
          queue: 'scrollLinkFx',
          step: function (now) {
            that._isEditorMoving = true
            lastEditorScrollTop = editorScrollTop + now
            aceEditor.session.setScrollTop(lastEditorScrollTop)
          },
          done: function () {
            _.defer(function () {
              that._isEditorMoving = false
            })
          }
        }).dequeue('scrollLinkFx')
      }
    }, 100)
  }

  _bindEvent () {
    let sessionEditor = this.editor.getSession()
    let $preview = this.$preview
    // let $editor = this.$editor
    let $container = this.$container
    let that = this

    let buildSection = this._buildSection()
    this._doScrollLink = this._buildScrollLink()
    sessionEditor.on('changeScrollTop', () => {
      if (that._isEditorMoving === false) {
        that._scrollSyncLeader = 'editor'
        buildSection()
      }
    })

    $preview.on('scroll', () => {
      if (that._isPreviewMoving === false) {
        that._scrollSyncLeader = 'preview'
        buildSection()
      }
    })
    // 工具栏
    let clipboard = new Clipboard(this.$copyBtn[0], {
      action: 'cut',
      target: () => this.$preview[0]
    })
    clipboard.on('success', (e) => {
      this._createTips(this.$copyBtn, '复制成功')
    })
    this.$editorTheme.on('change', function () {
      let theme = this.value
      that.editor.setTheme('ace/theme/' + theme)
      // 存储
      LS.mpe_editorTheme = theme
    })
    this.$transferBtn.on('click', () => {
      [LS.mpe_previewClass, LS.mpe_editorClass] = [LS.mpe_editorClass, LS.mpe_previewClass]
      $container.find('.mpe-col').toggleClass('mpe_fr mpe_fl')
    })
    this.$clearBtn.on('click', () => {
      delete LS.mpe_content
      this.setValue('')
    })
    // 快捷键
    hotkeys('⌘+alt+u, ctrl+alt+u', () => {
      this.$nav.toggle()
      this.resize()
      return false
    })
    function save () {
      that._autoSave()
      let $toast = that.$toast.show()
      setTimeout(() => $toast.hide(), 800)
    }
    hotkeys('⌘+s, ctrl+s', () => {
      save()
      return false
    })
    this.editor.commands.addCommand({
      name: 'customSave',
      bindKey: {win: 'Ctrl-s', mac: 'Command-s'},
      exec () {
        save()
      }
    })
    // hotkeys('⌘+alt+n, ctrl+alt+n', (e) => {
    //   delete LS.mpe_content
    //   this.setValue('')
    //   return false
    // })
  }
  _createTips (node, text, dir = 'bottom', timeout = 2000) {
    let tmpl = `
    <div class="mpe-tooltip mpe-tooltip_${dir}" >
      <div class="mpe-tooltip-inner">${text}</div>
    </div>
    `
    let pos = $(node).position()

    let $tip = $(tmpl).appendTo(this.$container)
    $tip.css({
      top: pos.top - 20,
      left: pos.left - $(node).width() / 2
    }).animate({opacity: 1, top: pos.top + $(node).height() + 20}, 300)
    setTimeout(() => {
      $tip.animate({opacity: 0}, 300, () => {
        $tip.remove()
      })
    }, timeout)
    return $tip
  }
  _buildSection () {
    return _.throttle(() => {
      // console.log('buildSection')
      let $preview = this.$preview
      let preScrollTop = $preview.scrollTop()
      // 处理预览html
      let startOffset
      let htmlSectionList = []
      $preview.find('.mpe-section-divider').each((i, dom) => {
        if (startOffset === undefined) {
          startOffset = 0
          return
        }
        let $node = $(dom)
        let top = $node.position().top + preScrollTop
        htmlSectionList.push({
          startOffset: startOffset,
          endOffset: top,
          height: top - startOffset
        })
        startOffset = top
      })
      let scrollHeight = $preview.prop('scrollHeight')
      htmlSectionList.push({
        startOffset: startOffset,
        endOffset: scrollHeight,
        height: scrollHeight - startOffset
      })

      // 处理编辑器
      let mdSectionList = []
      let mdSectionOffset = 0
      let mdTextOffset = 0
      let editorSession = this.editor.session
      let editorLineHeight = this.editor.renderer.lineHeight

      let firstSectionOffset = offsetBegin

      mdSections.forEach((section) => {
        mdTextOffset += section.text.length + firstSectionOffset
        firstSectionOffset = 0
        let documentPosition = editorSession.doc.indexToPosition(mdTextOffset)
        let screenPosition = editorSession.documentToScreenPosition(documentPosition.row, documentPosition.column)
        let newSectionOffset = screenPosition.row * editorLineHeight
        var sectionHeight = newSectionOffset - mdSectionOffset
        mdSectionList.push({
          startOffset: mdSectionOffset,
          endOffset: newSectionOffset,
          height: sectionHeight
        })
        mdSectionOffset = newSectionOffset
      })
      this._mdSectionList = mdSectionList
      this._htmlSectionList = htmlSectionList
      // apply Scroll Link (-10 to have a gap > 9px)
      this.lastEditorScrollTop = -10
      this.lastPreviewScrollTop = -10
      this._doScrollLink()
    }, 80)
  }

  // 初始化编辑器
  _initEditor (id, val) {
    let editor = ace.edit(id)
    let aceSession = editor.getSession()
    let aceRenderer = editor.renderer
    editor.setOption('scrollPastEnd', true)
    aceRenderer.setShowPrintMargin(false)

    aceRenderer.setShowGutter(false)
    aceSession.setUseWrapMode(true)
    aceSession.setNewLineMode('unix')
    aceSession.setMode('ace/mode/markdown')
    aceSession.$selectLongWords = true
    aceRenderer.setPadding(15)
    let theme = LS.mpe_editorTheme ? LS.mpe_editorTheme : 'solarized_light'
    this.$editorTheme.val(theme)
    editor.setTheme('ace/theme/' + theme)
    if (val) {
      aceSession.setValue(val)
    }
    return editor
  }
}
