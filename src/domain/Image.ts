export default class Image {
  private value: string

  constructor(content: string) {
    if (!content || content.length <= 21) {
      throw new Error('Extensão de arquivo não suportada')
    }
    if (
      !(
        content.startsWith('data:image/jpeg;base64') ||
        content.startsWith('data:image/png;base64') ||
        content.startsWith('data:image/gif;base64') ||
        content.startsWith('data:image/webp;base64')
      )
    ) {
      throw new Error('Extensão de arquivo não suportada')
    }
    this.value = content
  }

  static createDefault() {
    return new Image(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAACKCAMAAABCWSJWAAAAMFBMVEXm5uaztbSusK/f39/P0M/p6em7vbzi4uLFxsXCw8K+wL/a2trLzMvIyci3ubjW19Yu8EXDAAAC3klEQVR4nO2Z627rIAyAaYwxd97/bWfTy9kSUm1SITqSvx9Rc9n4asA41BhFURRFURRFURRFURRFURRFUZaAA64xaW5Au0AE7XYbsNn1gcGRiLDcxMAwKBwWWG2C7Uylre4hzGcdVJarhDOVsEYFU/YP6plKfT6R00ypctb+SV9NE8F8MlTP2PKsuMC4vZuL0d3GlrNmdhs1FhLJPUrDcWwnqdhjRAK8ugAhHCOzTuXngoODBxap3Jc+NNAamP7xkIIXqfT5gabUjalFZA5zbJGKM5LzXqdVMhq6K1T6uvdjfoN00RUqPSg/0n+V8eIuUOGRshumEqfdir1EZZOhsUtrUQbPtl6FRwbtlufKiZcuUCFVGajIorvLIjKp4AIVe5gufVLZ9SoyXXa9IX22m1SLEj/sL0m7u/JqkYq8ZWB5xWW7n1+i0pMcttpltipL0i7BratXZO5yadB8jL71goV2T6yr4uq9nHzuqyAcXo7WFZTc1L/adlSGL1TZIg+YHhVMcfD+MUslHZuS8RqytTnU4YvQtE0oN2rtHW6WCQ7D8o55L/AI8bb9mluEqfsbBL+GZnr8Z0zec/rDlGzHTELpL//gPeTuSQx7jv9+EO4nvCb3vRQH5nEDH4/wWMf6qX0WVsk5thLIFF8MHzKY7OX7o7XBInleDqtsd9mawPtk+J6lXELD5ktA96khzCq1pUrFcvgDFEsOsnySjcpsHMVmIrAAV06B40J8xZhIN0oRorER44dMRCUSBY4AB6SmyDUtuCKRMOgTem4ObesdBJ6f44tdxaEJjWMWMHxWJbKKb9xMSBiAD61HhVUoEvuErsKdYVBiwaERleR5ncRPDltHfLC2Oe8axeAAapABgN2ruVjQ9lcPFnbOYnEhUkX257qKO+hj6Q77Ns7zpygL/LVf5RKaZ5WAj0fvJ/jtj6YlGwhhVhnyZy77XU5RFEVRFEVRFEVRFEVRFEVRlBdfr4QaQrxsfb4AAAAASUVORK5CYII=',
    )
  }

  getValue() {
    return this.value
  }
}
