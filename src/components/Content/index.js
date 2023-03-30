import { mapGetters, mapMutations } from 'vuex'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

import Utils from '../../utils'

export default {
  name: 'Content',
  components: {
    VueSlider
  },
  data () {
    return {
      canvaOptions: {
        width: window.innerWidth - 30,
        height: window.innerHeight - 30,
        treeInterval: {
          x: Math.round((window.innerWidth - 30) / 2),
          y: Math.round((window.innerHeight - 30) / 2)
        }
      },
      settingsOptions: {
        dragging: false,
        currentX: 0,
        currentY: 0,
        initialX: 0,
        initialY: 0,
        xOffset: 0,
        yOffset: 0
      },
      sliderOptions: {
        dotSize: 12,
        width: '60%',
        height: 12,
        duration: 0.5,
        clickable: false,
        tooltip: 'active',
        tooltipPlacement: 'top',
        enableCross: true
      },
      general: {
        realtime: true
      },
      tree: {
        x: 400,
        y: 600,
        depth: 5,
        angle: 0,
        shadow: 0.5,
        color: '#005e6a',
        branches: 2,
        randomQty: false
      },
      branch: {
        length: 120,
        width: 10,
        angle: 15,
        lengthPercent: 0.8,
        widthPercent: 0.6,
        randomLength: false
      }
    }
  },
  computed: {
    ...mapGetters(['getDarkmode'])
  },
  methods: {
    ...mapMutations(['switchDarkmode']),
    dragStart (e) {
      this.settingsOptions.initialX = e.clientX - this.settingsOptions.xOffset
      this.settingsOptions.initialY = e.clientY - this.settingsOptions.yOffset
      this.settingsOptions.dragging = true
    },
    dragEnd () {
      this.settingsOptions.initialX = this.settingsOptions.currentX
      this.settingsOptions.initialY = this.settingsOptions.currentY
      this.settingsOptions.dragging = false
    },
    drag (e) {
      e.preventDefault()
      if (this.settingsOptions.dragging) {
        this.settingsOptions.currentX =
          e.clientX - this.settingsOptions.initialX
        this.settingsOptions.currentY =
          e.clientY - this.settingsOptions.initialY

        this.settingsOptions.xOffset = this.settingsOptions.currentX
        this.settingsOptions.yOffset = this.settingsOptions.currentY

        this.setTranslate(
          this.settingsOptions.currentX,
          this.settingsOptions.currentY
        )
      }
    },
    setTranslate (xPos, yPos) {
      this.$refs.settings.style.transform =
        'translate(' + xPos + 'px, ' + yPos + 'px)'
    }
  },
  mounted () {
    var myCanvas = this.$refs.fractals
    var ctx = myCanvas.getContext('2d')

    let branchAngle
    let branchLengthPercent
    let branchWidthPercent
    let randomLength
    let randomQty

    const draw = (depth, startX, startY, len, angle, branchWidth, branches) => {
      if (depth != 0) {
        ctx.lineWidth = branchWidth

        ctx.beginPath()
        ctx.save()

        ctx.strokeStyle = this.tree.color
        ctx.fillStyle = this.tree.color

        ctx.translate(startX, startY)
        ctx.rotate((angle * Math.PI) / 180)
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -len)
        ctx.stroke()

        ctx.shadowBlur = 15
        ctx.shadowColor = `rgba(0,0,0,${this.tree.shadow})`

        const dDepth = depth - 1
        const dLen = randomLength
          ? Utils.getRandom(len * 0.2, len, true)
          : len * branchLengthPercent
        const dLeftAngle = angle - branchAngle
        const dRightAngle = angle + branchAngle
        const dLeft2Angle = angle - branchAngle * 2
        const dRight2Angle = angle + branchAngle * 2
        const dWidth = branchWidth * branchWidthPercent
        const dBranches = randomQty ? Utils.getRandom(1, 5) : branches

        if (dBranches === 1) {
          draw(dDepth, 0, -len, dLen, dLeftAngle, dWidth, dBranches)
        } else if (dBranches === 2) {
          draw(dDepth, 0, -len, dLen, dLeftAngle, dWidth, dBranches)
          draw(dDepth, 0, -len, dLen, dRightAngle, dWidth, dBranches)
        } else if (dBranches == 3) {
          draw(dDepth, 0, -len, dLen, dLeft2Angle, dWidth, dBranches)
          draw(dDepth, 0, -len, dLen, angle, dWidth, dBranches)
          draw(dDepth, 0, -len, dLen, dRight2Angle, dWidth, dBranches)
        } else if (dBranches === 4) {
          draw(dDepth, 0, -len, dLen, dLeft2Angle, dWidth, dBranches)
          draw(dDepth, 0, -len, dLen, dLeftAngle, dWidth, dBranches)
          draw(dDepth, 0, -len, dLen, dRightAngle, dWidth, dBranches)
          draw(dDepth, 0, -len, dLen, dRight2Angle, dWidth, dBranches)
        } else if (dBranches === 5) {
          draw(dDepth, 0, -len, dLen, dLeft2Angle, dWidth, dBranches)
          draw(dDepth, 0, -len, dLen, dLeftAngle, dWidth, dBranches)
          draw(dDepth, 0, -len, dLen, angle, dWidth, dBranches)
          draw(dDepth, 0, -len, dLen, dRightAngle, dWidth, dBranches)
          draw(dDepth, 0, -len, dLen, dRight2Angle, dWidth, dBranches)
        }

        ctx.restore()
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)

      branchAngle = this.branch.angle
      branchLengthPercent = this.branch.lengthPercent
      branchWidthPercent = this.branch.widthPercent
      randomLength = this.branch.randomLength
      randomQty = this.tree.randomQty

      draw(
        this.tree.depth,
        this.tree.x,
        this.tree.y,
        this.branch.length,
        this.tree.angle,
        this.branch.width,
        this.tree.branches
      )

      this.general.realtime && requestAnimationFrame(render)
    }

    render()

    this.$refs.refresh.addEventListener('click', render, false)
    this.$refs.realtime.addEventListener(
      'change',
      e => {
        if (e.target.checked) {
          render()
          this.branch.randomLength = false
          this.tree.randomQty = false
        }
      },
      false
    )
  }
}
