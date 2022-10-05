class Formatter {
  static DisplayDatetime(time: string) {
    const { length } = time;
    return time.replace('T', ' ').substring(0, length - 4);
  }

  static DisplayPrice(price: number) {
    const priceSplit = price.toString().split(/(?=(?:\d{3})+(?:\.|$))/g);
    return priceSplit.join('.');
  }
}

export default Formatter;
