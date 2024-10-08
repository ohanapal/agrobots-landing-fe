export const lottieDefaultOptions = (animationData, loop = true, autoplay = true) => ({
  loop,
  autoplay,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
})
