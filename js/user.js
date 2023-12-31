class FieldValidator {
  constructor(txtId, validatorFunc) {
    this.input = $('#' + txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    this.input.onblur = () => {
      this.validate()
    }
  }
  // 原型方法
  async validate() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      this.p.innerText = err
      return false;
    } else {
      this.p.innerText = '';
      return true;
    }
  };

  // 静态方法
  static async validate(...validators) {
    const proms = validators.map(v => v.validate());
    const result = await Promise.all(proms);
    return result.every( r => r);
  }
}